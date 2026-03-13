import { readQueue, writeQueue, SCRATCH_DIR } from './state.js';
import { execFile } from 'child_process';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';
import { homedir } from 'os';
import { randomUUID } from 'crypto';

// Search for dispatch.sh in known locations
function findDispatchScript() {
  const candidates = [
    process.env.DISPATCH_SCRIPT_PATH,
    join(homedir(), 'claude-code-setup', 'dispatch.sh'),
    join(homedir(), 'projects', 'claude-auto-setup', 'dispatch.sh'),
    join(new URL('../../..', import.meta.url).pathname, 'dispatch.sh'),
  ].filter(Boolean);
  for (const p of candidates) {
    if (existsSync(p)) return p;
  }
  throw new Error(`Dispatch script not found. Searched: ${candidates.join(', ')}. Set DISPATCH_SCRIPT_PATH to override.`);
}

const DISPATCH_SCRIPT = findDispatchScript();

export function addTask({ prompt, taskType, provider, priority }) {
  const queue = readQueue();
  const id = `task-${Date.now()}-${randomUUID().slice(0, 8)}`;
  const outputFile = join(SCRATCH_DIR, `${id}.output`);

  const task = {
    id,
    created_at: Math.floor(Date.now() / 1000),
    started_at: null,
    completed_at: null,
    status: 'pending',
    provider: provider || 'auto',
    task_type: taskType || 'general',
    prompt,
    priority: priority || 'normal',
    output_file: outputFile,
    result: null,
  };

  queue.tasks.push(task);
  writeQueue(queue);

  return {
    id: task.id,
    status: 'pending',
    message: `Task queued: ${prompt.slice(0, 80)}...`,
    queue_size: queue.tasks.filter(t => t.status === 'pending').length,
  };
}

export function listTasks({ status } = {}) {
  const queue = readQueue();
  let tasks = queue.tasks;

  if (status) {
    tasks = tasks.filter(t => t.status === status);
  }

  return {
    total: queue.tasks.length,
    pending: queue.tasks.filter(t => t.status === 'pending').length,
    running: queue.tasks.filter(t => t.status === 'running').length,
    completed: queue.tasks.filter(t => t.status === 'completed').length,
    failed: queue.tasks.filter(t => t.status === 'failed').length,
    tasks: tasks.map(t => ({
      id: t.id,
      status: t.status,
      provider: t.provider,
      task_type: t.task_type,
      prompt: t.prompt.slice(0, 100),
      created_at: t.created_at,
      completed_at: t.completed_at,
    })),
  };
}

export function dispatchNext() {
  const queue = readQueue();
  const pending = queue.tasks.find(t => t.status === 'pending');

  if (!pending) {
    return { message: 'No pending tasks in queue' };
  }

  if (!existsSync(DISPATCH_SCRIPT)) {
    return { error: `Dispatch script not found: ${DISPATCH_SCRIPT}` };
  }

  pending.status = 'running';
  pending.started_at = Math.floor(Date.now() / 1000);
  writeQueue(queue);

  const args = ['--task', pending.prompt];
  if (pending.task_type && pending.task_type !== 'general') {
    args.push('--type', pending.task_type);
  }
  if (pending.provider && pending.provider !== 'auto') {
    args.push('--provider', pending.provider);
  }

  // Spawn in background — write output to file
  // Unset CLAUDECODE to allow nested claude -p dispatch from MCP server context
  const env = { ...process.env };
  delete env.CLAUDECODE;

  let child;
  try {
    child = execFile('bash', [DISPATCH_SCRIPT, ...args], {
      timeout: 300000,
      maxBuffer: 1024 * 1024,
      env,
    }, (error, stdout, stderr) => {
      const q = readQueue();
      const task = q.tasks.find(t => t.id === pending.id);
      if (task) {
        task.completed_at = Math.floor(Date.now() / 1000);
        if (error) {
          task.status = 'failed';
          task.result = stderr || error.message;
        } else {
          task.status = 'completed';
          task.result = stdout.length > 5000
            ? stdout.slice(0, 5000) + '\n[truncated — full output: ' + stdout.length + ' chars]'
            : stdout;
        }
        writeQueue(q);
      }
    });

    child.unref();
  } catch (spawnError) {
    // execFile can throw synchronously (e.g., script not found, bash not found)
    const q = readQueue();
    const task = q.tasks.find(t => t.id === pending.id);
    if (task) {
      task.status = 'failed';
      task.completed_at = Math.floor(Date.now() / 1000);
      task.result = `Spawn failed: ${spawnError.message}`;
      writeQueue(q);
    }
    return { id: pending.id, status: 'failed', error: `Spawn failed: ${spawnError.message}` };
  }

  return {
    id: pending.id,
    status: 'running',
    provider: pending.provider,
    message: `Dispatched: ${pending.prompt.slice(0, 80)}`,
  };
}

export function getTaskResult(taskId) {
  const queue = readQueue();
  const task = queue.tasks.find(t => t.id === taskId);

  if (!task) {
    return { error: `Task not found: ${taskId}` };
  }

  let output = null;
  if (task.output_file && existsSync(task.output_file)) {
    try { output = readFileSync(task.output_file, 'utf8'); } catch { /* ignore */ }
  }

  return {
    id: task.id,
    status: task.status,
    provider: task.provider,
    created_at: task.created_at,
    started_at: task.started_at,
    completed_at: task.completed_at,
    result: task.result || output,
  };
}

export function clearCompleted() {
  const queue = readQueue();
  const before = queue.tasks.length;
  queue.tasks = queue.tasks.filter(t => t.status === 'pending' || t.status === 'running');
  writeQueue(queue);
  return { cleared: before - queue.tasks.length, remaining: queue.tasks.length };
}
