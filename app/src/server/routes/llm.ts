/**
 * LLM provider integration routes (Vercel AI SDK).
 * Extracted from server/index.ts (lines ~3801-4075).
 */
import { Elysia } from "elysia";
import { existsSync } from "fs";
import { join } from "path";
import { streamText, generateText } from "ai";
import { createAnthropic } from "@ai-sdk/anthropic";
import { createOpenAI } from "@ai-sdk/openai";
import { createAmazonBedrock } from "@ai-sdk/amazon-bedrock";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { createMistral } from "@ai-sdk/mistral";
import { createXai } from "@ai-sdk/xai";
import { createGroq } from "@ai-sdk/groq";
import { createDeepSeek } from "@ai-sdk/deepseek";
import { createCohere } from "@ai-sdk/cohere";
import { createTogetherAI } from "@ai-sdk/togetherai";
import {
  getLLMKeys,
  saveLLMKeys,
  maskSecret,
  HOME,
} from "../lib/shared";

// ============================================================
// LLM PROVIDER INTEGRATION (Vercel AI SDK)
// ============================================================

interface LLMProviderConfig {
  id: string;
  name: string;
  apiKeyField: string; // key in integrations.json
  models: Array<{ id: string; name: string; context?: number }>;
  createProvider: (apiKey: string) => unknown;
}

// Provider registry — all supported LLM providers
const LLM_PROVIDERS: LLMProviderConfig[] = [
  {
    id: "anthropic", name: "Anthropic", apiKeyField: "anthropicApiKey",
    models: [
      { id: "claude-opus-4-6-20260315", name: "Claude Opus 4.6", context: 200000 },
      { id: "claude-sonnet-4-6-20260315", name: "Claude Sonnet 4.6", context: 200000 },
      { id: "claude-haiku-4-5-20251001", name: "Claude Haiku 4.5", context: 200000 },
    ],
    createProvider: (apiKey) => createAnthropic({ apiKey }),
  },
  {
    id: "openai", name: "OpenAI", apiKeyField: "openaiApiKey",
    models: [
      { id: "gpt-4o", name: "GPT-4o", context: 128000 },
      { id: "gpt-4o-mini", name: "GPT-4o Mini", context: 128000 },
      { id: "o3-mini", name: "o3-mini (reasoning)", context: 200000 },
    ],
    createProvider: (apiKey) => createOpenAI({ apiKey }),
  },
  {
    id: "bedrock", name: "AWS Bedrock", apiKeyField: "bedrockApiKey",
    models: [
      { id: "us.anthropic.claude-sonnet-4-6", name: "Claude Sonnet 4.6 (Bedrock)", context: 200000 },
      { id: "global.anthropic.claude-haiku-4-5-20251001-v1:0", name: "Claude Haiku 4.5 (Bedrock)", context: 200000 },
      { id: "us.anthropic.claude-sonnet-4-20250514-v1:0", name: "Claude Sonnet 4 (Bedrock)", context: 200000 },
      { id: "global.anthropic.claude-opus-4-5-20251101-v1:0", name: "Claude Opus 4.5 (Bedrock)", context: 200000 },
    ],
    createProvider: (config) => {
      // Config can be: empty (auto-detect), "profile:name", or an API key
      if (!config) {
        return createAmazonBedrock({ region: "us-east-1" });
      }
      if (config.startsWith("profile:")) {
        const profile = config.slice(8);
        // Set AWS_PROFILE so the credential chain picks it up
        process.env.AWS_PROFILE = profile;
        return createAmazonBedrock({ region: "us-east-1" });
      }
      // Otherwise treat as Bedrock API key
      return createAmazonBedrock({ apiKey: config, region: "us-east-1" });
    },
  },
  {
    id: "google", name: "Google", apiKeyField: "googleApiKey",
    models: [
      { id: "gemini-2.5-pro-latest", name: "Gemini 2.5 Pro", context: 1000000 },
      { id: "gemini-2.5-flash-latest", name: "Gemini 2.5 Flash", context: 1000000 },
    ],
    createProvider: (apiKey) => createGoogleGenerativeAI({ apiKey }),
  },
  {
    id: "mistral", name: "Mistral", apiKeyField: "mistralApiKey",
    models: [
      { id: "mistral-large-latest", name: "Mistral Large", context: 128000 },
      { id: "mistral-small-latest", name: "Mistral Small", context: 128000 },
    ],
    createProvider: (apiKey) => createMistral({ apiKey }),
  },
  {
    id: "xai", name: "xAI Grok", apiKeyField: "xaiApiKey",
    models: [
      { id: "grok-3", name: "Grok-3", context: 131072 },
      { id: "grok-3-mini", name: "Grok-3 Mini", context: 131072 },
    ],
    createProvider: (apiKey) => createXai({ apiKey }),
  },
  {
    id: "groq", name: "Groq", apiKeyField: "groqApiKey",
    models: [
      { id: "llama-3.3-70b-versatile", name: "Llama 3.3 70B (Groq)", context: 128000 },
      { id: "deepseek-r1-distill-llama-70b", name: "DeepSeek R1 70B (Groq)", context: 128000 },
    ],
    createProvider: (apiKey) => createGroq({ apiKey }),
  },
  {
    id: "deepseek", name: "DeepSeek", apiKeyField: "deepseekApiKey",
    models: [
      { id: "deepseek-chat", name: "DeepSeek Chat", context: 64000 },
      { id: "deepseek-reasoner", name: "DeepSeek Reasoner", context: 64000 },
    ],
    createProvider: (apiKey) => createDeepSeek({ apiKey }),
  },
  {
    id: "cohere", name: "Cohere", apiKeyField: "cohereApiKey",
    models: [
      { id: "command-r-plus", name: "Command R+", context: 128000 },
      { id: "command-r", name: "Command R", context: 128000 },
    ],
    createProvider: (apiKey) => createCohere({ apiKey }),
  },
  {
    id: "togetherai", name: "Together AI", apiKeyField: "togetheraiApiKey",
    models: [
      { id: "meta-llama/Meta-Llama-3.1-405B-Instruct-Turbo", name: "Llama 3.1 405B", context: 130000 },
      { id: "Qwen/Qwen2.5-72B-Instruct-Turbo", name: "Qwen 2.5 72B", context: 32768 },
    ],
    createProvider: (apiKey) => createTogetherAI({ apiKey }),
  },
  {
    id: "openrouter", name: "OpenRouter", apiKeyField: "openrouterApiKey",
    models: [
      { id: "anthropic/claude-sonnet-4.6", name: "Claude Sonnet 4.6 (OR)", context: 200000 },
      { id: "openai/gpt-4o", name: "GPT-4o (OR)", context: 128000 },
      { id: "google/gemini-2.5-pro", name: "Gemini 2.5 Pro (OR)", context: 1000000 },
      { id: "meta-llama/llama-3.3-70b-instruct", name: "Llama 3.3 70B (OR)", context: 128000 },
      { id: "deepseek/deepseek-r1", name: "DeepSeek R1 (OR)", context: 64000 },
    ],
    createProvider: (apiKey) => createOpenAI({ apiKey, baseURL: "https://openrouter.ai/api/v1" }),
  },
];

export const llmRoutes = new Elysia()

  // GET /api/llm/providers — list all providers with configuration status
  .get("/api/llm/providers", () => {
    const keys = getLLMKeys();
    const providers = LLM_PROVIDERS.map((p) => ({
      id: p.id,
      name: p.name,
      configured: p.id === "bedrock"
        ? !!(keys[p.apiKeyField] || existsSync(join(HOME, ".aws/credentials")))
        : !!keys[p.apiKeyField],
      models: p.models,
      apiKeyField: p.apiKeyField,
    }));
    return providers;
  })

  // GET /api/llm/models — all models from configured providers
  .get("/api/llm/models", () => {
    const keys = getLLMKeys();
    const models: Array<{ provider: string; providerName: string; id: string; name: string; context?: number }> = [];
    for (const p of LLM_PROVIDERS) {
      const configured = p.id === "bedrock"
        ? !!(keys[p.apiKeyField] || existsSync(join(HOME, ".aws/credentials")))
        : !!keys[p.apiKeyField];
      if (configured) {
        for (const m of p.models) {
          models.push({ provider: p.id, providerName: p.name, ...m });
        }
      }
    }
    return models;
  })

  // PUT /api/llm/keys — save API keys for providers
  .put("/api/llm/keys", ({ body, set }) => {
    const { keys } = body as { keys: Record<string, string> };
    if (!keys || typeof keys !== "object") {
      set.status = 400;
      return { error: "keys object required" };
    }
    const existing = getLLMKeys();
    saveLLMKeys({ ...existing, ...keys });
    return { ok: true };
  })

  // GET /api/llm/keys — get configured keys (masked)
  .get("/api/llm/keys", () => {
    const keys = getLLMKeys();
    const masked: Record<string, string> = {};
    for (const [k, v] of Object.entries(keys)) {
      masked[k] = v ? maskSecret(v) : "";
    }
    return masked;
  })

  // POST /api/llm/chat — streaming chat with any configured provider/model
  .post("/api/llm/chat", async ({ body, set }) => {
    const { provider: providerId, model: modelId, messages, system } = body as {
      provider: string;
      model: string;
      messages: Array<{ role: string; content: string }>;
      system?: string;
    };
    if (!providerId || !modelId || !messages) {
      set.status = 400;
      return { error: "provider, model, and messages are required" };
    }

    const providerConfig = LLM_PROVIDERS.find((p) => p.id === providerId);
    if (!providerConfig) {
      set.status = 404;
      return { error: `Unknown provider: ${providerId}` };
    }

    const keys = getLLMKeys();
    // Bedrock: use saved API key, or fall back to AWS credential chain (empty string triggers auto-detect)
    const apiKey = keys[providerConfig.apiKeyField] || (providerId === "bedrock" ? "" : "");
    if (!apiKey) {
      set.status = 401;
      return { error: `No API key configured for ${providerConfig.name}. Add it in Settings → AI Providers.` };
    }

    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const provider = providerConfig.createProvider(apiKey) as any;
      const model = provider(modelId);

      const result = streamText({
        model,
        messages: messages.map((m: { role: string; content: string }) => ({
          role: m.role as "user" | "assistant" | "system",
          content: m.content,
        })),
        system: system || undefined,
      });

      // Return SSE streaming response via ReadableStream
      const stream = new ReadableStream({
        async start(controller) {
          const encoder = new TextEncoder();
          try {
            // Stream text chunks as SSE
            for await (const chunk of result.textStream) {
              controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: "chunk", content: chunk })}\n\n`));
            }

            // Send done event with usage stats
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: "done", usage: await result.usage })}\n\n`));
            controller.close();
          } catch (streamErr: unknown) {
            console.error("LLM chat stream error:", streamErr);
            const errMsg = streamErr instanceof Error ? `${streamErr.name}: ${streamErr.message}` : "LLM stream failed";
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: "error", error: errMsg })}\n\n`));
            controller.close();
          }
        },
      });

      return new Response(stream, {
        headers: {
          "Content-Type": "text/event-stream",
          "Cache-Control": "no-cache",
          "Connection": "keep-alive",
        },
      });
    } catch (err: unknown) {
      console.error("LLM chat error:", err);
      const msg = err instanceof Error ? `${err.name}: ${err.message}` : "LLM request failed";
      set.status = 500;
      return { error: msg };
    }
  })

  // POST /api/llm/test — test a provider connection
  .post("/api/llm/test", async ({ body, set }) => {
    const { provider: providerId, apiKey } = body as { provider: string; apiKey: string };
    if (!providerId || !apiKey) {
      set.status = 400;
      return { error: "provider and apiKey required" };
    }

    const providerConfig = LLM_PROVIDERS.find((p) => p.id === providerId);
    if (!providerConfig) {
      set.status = 404;
      return { error: `Unknown provider: ${providerId}` };
    }

    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const provider = providerConfig.createProvider(apiKey) as any;
      const model = provider(providerConfig.models[0].id);

      // Use generateText (not stream) — it fails immediately on auth errors
      const { text } = await generateText({
        model,
        messages: [{ role: "user" as const, content: "Say hi in one word." }],
        maxOutputTokens: 10,
      });

      return { ok: true, response: text.trim() || "Connected" };
    } catch (err: unknown) {
      console.error("LLM test error:", err);
      // Extract useful error message
      const e = err as { message?: string; name?: string; statusCode?: number; responseBody?: string };
      let msg = e.message || "Connection failed";
      // Clean up AI SDK error prefixes
      msg = msg.replace(/^[A-Z_]+\s*\[AI_\w+\]:\s*/, "");
      if (msg.length > 120) msg = msg.slice(0, 120) + "...";
      set.status = 400;
      return { ok: false, error: msg };
    }
  });
