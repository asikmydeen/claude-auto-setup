import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Check,
  X,
  Loader2,
  Eye,
  EyeOff,
  Zap,
  Cloud,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  fetchLLMProviders,
  fetchLLMKeys,
  saveLLMKeys,
  testLLMProvider,
  type LLMProvider,
} from "@/api/config";
import { cn } from "@/lib/utils";

export function AIProviders() {
  const qc = useQueryClient();
  const [editingKeys, setEditingKeys] = useState<Record<string, string>>({});
  const [showKeys, setShowKeys] = useState<Record<string, boolean>>({});
  const [testResults, setTestResults] = useState<Record<string, { ok: boolean; message: string }>>({});

  const providersQuery = useQuery({ queryKey: ["llm-providers"], queryFn: fetchLLMProviders });
  const keysQuery = useQuery({ queryKey: ["llm-keys"], queryFn: fetchLLMKeys });

  const saveMut = useMutation({
    mutationFn: (keys: Record<string, string>) => saveLLMKeys(keys),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["llm-providers"] });
      qc.invalidateQueries({ queryKey: ["llm-keys"] });
      qc.invalidateQueries({ queryKey: ["llm-models"] });
      setEditingKeys({});
    },
  });

  const testMut = useMutation({
    mutationFn: ({ provider, apiKey }: { provider: string; apiKey: string }) =>
      testLLMProvider(provider, apiKey),
    onSuccess: (data, vars) => {
      setTestResults((prev) => ({
        ...prev,
        [vars.provider]: { ok: data.ok, message: data.ok ? `Connected: "${data.response}"` : data.error || "Failed" },
      }));
    },
    onError: (err, vars) => {
      setTestResults((prev) => ({
        ...prev,
        [vars.provider]: { ok: false, message: err instanceof Error ? err.message : "Failed" },
      }));
    },
  });

  const providers = providersQuery.data || [];
  const savedKeys = keysQuery.data || {};

  function handleSaveKey(provider: LLMProvider) {
    const key = editingKeys[provider.apiKeyField];
    if (key !== undefined) {
      saveMut.mutate({ [provider.apiKeyField]: key });
    }
  }

  function handleTest(provider: LLMProvider) {
    const key = editingKeys[provider.apiKeyField] || savedKeys[provider.apiKeyField] || "";
    if (!key || key.includes("****")) return;
    testMut.mutate({ provider: provider.id, apiKey: key });
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold">AI Model Providers</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Configure API keys to use models from different providers directly. Models appear in the chat model selector.
        </p>
      </div>

      {providersQuery.isLoading && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" /> Loading providers...
        </div>
      )}

      <div className="space-y-3">
        {providers.map((provider) => {
          const hasKey = provider.configured;
          const isEditing = editingKeys[provider.apiKeyField] !== undefined;
          const testResult = testResults[provider.id];

          return (
            <div
              key={provider.id}
              className={cn(
                "rounded-lg border p-4 space-y-3",
                hasKey ? "border-green-600/30 bg-green-50/5" : "border-border"
              )}
            >
              {/* Provider header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {provider.id === "bedrock" ? (
                    <Cloud className="h-4 w-4 text-orange-500" />
                  ) : (
                    <Zap className="h-4 w-4 text-primary" />
                  )}
                  <span className="font-medium text-sm">{provider.name}</span>
                  {hasKey && (
                    <Badge variant="secondary" className="text-[9px] px-1.5 py-0 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400">
                      <Check className="h-2.5 w-2.5 mr-0.5" /> Connected
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                  {provider.models.length} models
                </div>
              </div>

              {/* Model list */}
              <div className="flex flex-wrap gap-1">
                {provider.models.map((m) => (
                  <span
                    key={m.id}
                    className={cn(
                      "text-[10px] px-1.5 py-0.5 rounded",
                      hasKey
                        ? "bg-primary/10 text-primary"
                        : "bg-muted text-muted-foreground"
                    )}
                  >
                    {m.name}
                  </span>
                ))}
              </div>

              {/* Bedrock: custom two-mode auth section */}
              {provider.id === "bedrock" ? (
                <div className="space-y-2">
                  {/* Auth mode toggle */}
                  <div className="flex items-center gap-1 rounded-lg border border-border p-0.5 w-fit">
                    <button
                      type="button"
                      onClick={() => setEditingKeys((prev) => ({ ...prev, _bedrockMode: "profile" }))}
                      className={cn(
                        "rounded-md px-2.5 py-1 text-[10px] font-medium transition-colors",
                        (editingKeys._bedrockMode || "profile") === "profile"
                          ? "bg-accent text-accent-foreground"
                          : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      AWS Profile
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditingKeys((prev) => ({ ...prev, _bedrockMode: "apikey" }))}
                      className={cn(
                        "rounded-md px-2.5 py-1 text-[10px] font-medium transition-colors",
                        editingKeys._bedrockMode === "apikey"
                          ? "bg-accent text-accent-foreground"
                          : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      API Key
                    </button>
                  </div>

                  {(editingKeys._bedrockMode || "profile") === "profile" ? (
                    <div className="space-y-2">
                      <p className="text-[10px] text-muted-foreground">
                        Uses credentials from <code className="text-[9px] bg-muted px-1 rounded">~/.aws/credentials</code>. Configure with <code className="text-[9px] bg-muted px-1 rounded">aws configure</code> or your credential manager.
                      </p>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 text-xs text-muted-foreground bg-muted/30 rounded-md px-3 py-1.5 font-mono">
                          {hasKey ? "AWS profile detected" : "No AWS credentials found"}
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-7 text-xs"
                          disabled={!hasKey || testMut.isPending}
                          onClick={() => handleTest(provider)}
                        >
                          {testMut.isPending && testMut.variables?.provider === provider.id ? (
                            <Loader2 className="h-3 w-3 animate-spin" />
                          ) : "Test"}
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <p className="text-[10px] text-muted-foreground">
                        Get a Bedrock API key from the AWS Console &rarr; Amazon Bedrock &rarr; API keys.
                      </p>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 relative">
                          <input
                            type={showKeys[provider.id] ? "text" : "password"}
                            value={isEditing ? editingKeys[provider.apiKeyField] : (savedKeys[provider.apiKeyField] || "")}
                            onChange={(e) => setEditingKeys((prev) => ({ ...prev, [provider.apiKeyField]: e.target.value }))}
                            placeholder="Bedrock API key"
                            className="w-full rounded-md border border-input bg-background px-3 py-1.5 text-xs font-mono placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring pr-8"
                          />
                          <button
                            type="button"
                            onClick={() => setShowKeys((prev) => ({ ...prev, [provider.id]: !prev[provider.id] }))}
                            className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                          >
                            {showKeys[provider.id] ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                          </button>
                        </div>
                        <Button variant="outline" size="sm" className="h-7 text-xs"
                          disabled={!isEditing || saveMut.isPending}
                          onClick={() => handleSaveKey(provider)}
                        >
                          {saveMut.isPending ? <Loader2 className="h-3 w-3 animate-spin" /> : "Save"}
                        </Button>
                        <Button variant="outline" size="sm" className="h-7 text-xs"
                          disabled={(!hasKey && !isEditing) || testMut.isPending}
                          onClick={() => handleTest(provider)}
                        >
                          {testMut.isPending && testMut.variables?.provider === provider.id ? (
                            <Loader2 className="h-3 w-3 animate-spin" />
                          ) : "Test"}
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                /* Standard API key input for all other providers */
                <div className="flex items-center gap-2">
                  <div className="flex-1 relative">
                    <input
                      type={showKeys[provider.id] ? "text" : "password"}
                      value={isEditing ? editingKeys[provider.apiKeyField] : (savedKeys[provider.apiKeyField] || "")}
                      onChange={(e) => setEditingKeys((prev) => ({ ...prev, [provider.apiKeyField]: e.target.value }))}
                      placeholder={`${provider.name} API key`}
                      className="w-full rounded-md border border-input bg-background px-3 py-1.5 text-xs font-mono placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring pr-8"
                    />
                    <button
                      type="button"
                      onClick={() => setShowKeys((prev) => ({ ...prev, [provider.id]: !prev[provider.id] }))}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showKeys[provider.id] ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                    </button>
                  </div>
                  <Button variant="outline" size="sm" className="h-7 text-xs"
                    disabled={!isEditing || saveMut.isPending}
                    onClick={() => handleSaveKey(provider)}
                  >
                    {saveMut.isPending ? <Loader2 className="h-3 w-3 animate-spin" /> : "Save"}
                  </Button>
                  <Button variant="outline" size="sm" className="h-7 text-xs"
                    disabled={(!hasKey && !isEditing) || testMut.isPending}
                    onClick={() => handleTest(provider)}
                  >
                    {testMut.isPending && testMut.variables?.provider === provider.id ? (
                      <Loader2 className="h-3 w-3 animate-spin" />
                    ) : "Test"}
                  </Button>
                </div>
              )}

              {/* Test result */}
              {testResult && (
                <div className={cn(
                  "text-[10px] px-2 py-1 rounded flex items-center gap-1",
                  testResult.ok
                    ? "bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400"
                    : "bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400"
                )}>
                  {testResult.ok ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                  {testResult.message}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* OpenRouter callout */}
      <div className="rounded-lg border border-dashed border-primary/30 bg-primary/5 p-4 space-y-2">
        <p className="text-sm font-medium">Quick start with OpenRouter</p>
        <p className="text-xs text-muted-foreground">
          One API key gives you access to 100+ models from all major providers (OpenAI, Anthropic, Google, Meta, Mistral, and more).
          Get a key at openrouter.ai — it's the fastest way to get started.
        </p>
      </div>
    </div>
  );
}
