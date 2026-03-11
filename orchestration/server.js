#!/usr/bin/env node
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';

import { getStatus, setPhase, markDone, setTaskSummary, resetPipeline } from './lib/pipeline.js';
import { writeRichCheckpoint, getCurrentCheckpoint, getResumeInstructions } from './lib/checkpoint.js';
import { addTask, listTasks, dispatchNext, getTaskResult, clearCompleted } from './lib/queue.js';
import { logEvent, startSession, endSession, getSessionSummary, getPatterns } from './lib/analytics.js';

const server = new Server(
  { name: 'orchestration', version: '1.0.0' },
  { capabilities: { tools: {} } }
);

// ── Tool Definitions ────────────────────────────────────────────────────────

const TOOLS = [
  // Pipeline
  {
    name: 'pipeline_status',
    description: 'Get current pipeline state: phase, edit count, files changed, missing steps. Call this to understand where you are in the workflow.',
    inputSchema: { type: 'object', properties: {}, required: [] },
  },
  {
    name: 'pipeline_phase',
    description: 'Set the current pipeline phase. Phases: idle, explore, plan, implement, review, verify, done.',
    inputSchema: {
      type: 'object',
      properties: { phase: { type: 'string', enum: ['idle', 'explore', 'plan', 'implement', 'review', 'verify', 'done'] } },
      required: ['phase'],
    },
  },
  {
    name: 'pipeline_mark',
    description: 'Mark a pipeline step as completed. Use after running tests, code review, or intel refresh.',
    inputSchema: {
      type: 'object',
      properties: { step: { type: 'string', enum: ['tests', 'review', 'intel'] } },
      required: ['step'],
    },
  },
  {
    name: 'pipeline_task',
    description: 'Set a short summary of the current task being worked on. Used in checkpoints.',
    inputSchema: {
      type: 'object',
      properties: { summary: { type: 'string' } },
      required: ['summary'],
    },
  },
  {
    name: 'pipeline_reset',
    description: 'Reset pipeline state for a new task. Clears edit count, files, marks.',
    inputSchema: { type: 'object', properties: {}, required: [] },
  },

  // Checkpoints
  {
    name: 'checkpoint_write',
    description: 'Write a rich checkpoint that survives context compaction. Include your current task, plan, key decisions, and progress. CALL THIS before moving to the next phase.',
    inputSchema: {
      type: 'object',
      properties: {
        task: { type: 'string', description: 'What you are building (1-2 sentences)' },
        plan: { type: 'string', description: 'The approved plan/spec' },
        decisions: { type: 'string', description: 'Key architecture/approach decisions made' },
        progress: { type: 'string', description: 'What is done and what remains (use - [x] and - [ ] format)' },
        phase: { type: 'string', description: 'Current phase override' },
      },
      required: ['task'],
    },
  },
  {
    name: 'checkpoint_read',
    description: 'Read the current checkpoint. Use this on session start to understand where previous work left off.',
    inputSchema: { type: 'object', properties: {}, required: [] },
  },
  {
    name: 'checkpoint_resume',
    description: 'Get formatted resume instructions from the last checkpoint. Use on session start after context compaction.',
    inputSchema: { type: 'object', properties: {}, required: [] },
  },

  // Task Queue
  {
    name: 'queue_add',
    description: 'Add a task to the background dispatch queue. Tasks are sent to the best available provider (Claude, Kiro, Codex, etc).',
    inputSchema: {
      type: 'object',
      properties: {
        prompt: { type: 'string', description: 'The task prompt to send to the provider' },
        task_type: { type: 'string', description: 'Task type for routing: test-writing, code-review, documentation, etc.' },
        provider: { type: 'string', description: 'Force a specific provider: claude, kiro, codex, gemini, amp. Default: auto-route.' },
        priority: { type: 'string', enum: ['high', 'normal', 'low'] },
      },
      required: ['prompt'],
    },
  },
  {
    name: 'queue_list',
    description: 'List tasks in the queue. Filter by status: pending, running, completed, failed.',
    inputSchema: {
      type: 'object',
      properties: { status: { type: 'string', enum: ['pending', 'running', 'completed', 'failed'] } },
      required: [],
    },
  },
  {
    name: 'queue_dispatch',
    description: 'Dispatch the next pending task in the queue to its provider. Runs in background.',
    inputSchema: { type: 'object', properties: {}, required: [] },
  },
  {
    name: 'queue_result',
    description: 'Get the result of a completed queue task by its ID.',
    inputSchema: {
      type: 'object',
      properties: { task_id: { type: 'string' } },
      required: ['task_id'],
    },
  },

  // Analytics
  {
    name: 'analytics_log',
    description: 'Log an event for analytics tracking. Types: enforcement_reminder, build_failure, test_failure, approach_failed, user_correction.',
    inputSchema: {
      type: 'object',
      properties: {
        session_id: { type: 'string' },
        type: { type: 'string' },
        detail: { type: 'string' },
      },
      required: ['type'],
    },
  },
  {
    name: 'analytics_summary',
    description: 'Get a summary of recent sessions: compliance rates, edit counts, common patterns.',
    inputSchema: {
      type: 'object',
      properties: { limit: { type: 'number', description: 'Number of recent sessions to include (default: 10)' } },
      required: [],
    },
  },
  {
    name: 'analytics_patterns',
    description: 'Identify recurring patterns: what gets skipped most, active hours, event frequency. Provides actionable insights.',
    inputSchema: { type: 'object', properties: {}, required: [] },
  },
];

// ── Tool Handler ────────────────────────────────────────────────────────────

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: TOOLS,
}));

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    let result;

    switch (name) {
      // Pipeline
      case 'pipeline_status':
        result = getStatus();
        break;
      case 'pipeline_phase':
        result = setPhase(args.phase);
        break;
      case 'pipeline_mark':
        result = markDone(args.step);
        break;
      case 'pipeline_task':
        result = setTaskSummary(args.summary);
        break;
      case 'pipeline_reset':
        result = resetPipeline();
        break;

      // Checkpoints
      case 'checkpoint_write':
        result = writeRichCheckpoint(args);
        break;
      case 'checkpoint_read':
        result = getCurrentCheckpoint();
        break;
      case 'checkpoint_resume':
        result = getResumeInstructions();
        break;

      // Queue
      case 'queue_add':
        result = addTask(args);
        break;
      case 'queue_list':
        result = listTasks(args);
        break;
      case 'queue_dispatch':
        result = dispatchNext();
        break;
      case 'queue_result':
        result = getTaskResult(args.task_id);
        break;

      // Analytics
      case 'analytics_log':
        result = logEvent(args.session_id || 'unknown', args.type, args.detail);
        break;
      case 'analytics_summary':
        result = getSessionSummary(args.limit);
        break;
      case 'analytics_patterns':
        result = getPatterns();
        break;

      default:
        return {
          content: [{ type: 'text', text: `Unknown tool: ${name}` }],
          isError: true,
        };
    }

    return {
      content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
    };
  } catch (err) {
    return {
      content: [{ type: 'text', text: `Error: ${err.message}` }],
      isError: true,
    };
  }
});

// ── Start ───────────────────────────────────────────────────────────────────

const transport = new StdioServerTransport();
await server.connect(transport);
