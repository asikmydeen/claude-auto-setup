import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "./Toast";
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

const PROVIDER_KEY_HINTS: Record<string, { placeholder: string; prefix?: string; label: string }> = {
  anthropic: { placeholder: "sk-ant-api03-...", prefix: "sk-ant-", label: "Anthropic" },
  openai: { placeholder: "sk-...", prefix: "sk-", label: "OpenAI" },
  google: { placeholder: "AIza...", prefix: "AIza", label: "Google" },
  mistral: { placeholder: "Enter API key", label: "Mistral" },
  xai: { placeholder: "xai-...", prefix: "xai-", label: "xAI" },
  groq: { placeholder: "gsk_...", prefix: "gsk_", label: "Groq" },
  deepseek: { placeholder: "sk-...", prefix: "sk-", label: "DeepSeek" },
  cohere: { placeholder: "Enter API key", label: "Cohere" },
  togetherai: { placeholder: "Enter API key", label: "Together AI" },
  openrouter: { placeholder: "sk-or-...", prefix: "sk-or-", label: "OpenRouter" },
};

function validateKeyFormat(providerId: string, key: string): string | null {
  if (!key || key.includes("****")) return null;
  const hint = PROVIDER_KEY_HINTS[providerId];
  if (!hint?.prefix) return null;
  if (!key.startsWith(hint.prefix)) {
    return `This doesn't look like a ${hint.label} key (expected ${hint.prefix}...)`;
  }
  return null;
}

export function AIProviders() {
  const qc = useQueryClient();
  const [editingKeys, setEditingKeys] = useState<Record<string, string>>({});
  const { toast } = useToast();
  const [showKeys, setShowKeys] = useState<Record<string, boolean>>({});
  const [testResults, setTestResults] = useState<Record<string, { ok: boolean; message: string }>>({});
  const [keyWarnings, setKeyWarnings] = useState<Record<string, string | null>>({});
  const [bedrockMode, setBedrockMode] = useState<"profile" | "apikey">("profile");
  const [bedrockProfile, setBedrockProfile] = useState("default");

  const providersQuery = useQuery({ queryKey: ["llm-providers"], queryFn: fetchLLMProviders });
  const keysQuery = useQuery({ queryKey: ["llm-keys"], queryFn: fetchLLMKeys });

  const saveMut = useMutation({
    mutationFn: (keys: Record<string, string>) => saveLLMKeys(keys),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["llm-providers"] });
      qc.invalidateQueries({ queryKey: ["llm-keys"] });
      qc.invalidateQueries({ queryKey: ["llm-models"] });
      setEditingKeys({});
      toast("API key saved", "success");
    },
    onError: (err) => {
      toast(`Failed to save: ${err instanceof Error ? err.message : "Unknown error"}`, "error");
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
      const warning = validateKeyFormat(provider.id, key);
      setKeyWarnings((prev) => ({ ...prev, [provider.id]: warning }));
      saveMut.mutate({ [provider.apiKeyField]: key });
    }
  }

  function handleSaveBedrockProfile() {
    saveMut.mutate({ bedrockApiKey: `profile:${bedrockProfile}` });
  }

  function handleTest(provider: LLMProvider) {
    let key: string;
    if (provider.id === "bedrock") {
      key = bedrockMode === "profile" ? `profile:${bedrockProfile}` : (editingKeys[provider.apiKeyField] || savedKeys[provider.apiKeyField] || "");
    } else {
      key = editingKeys[provider.apiKeyField] || savedKeys[provider.apiKeyField] || "";
    }
    if (!key || key.includes("****")) {
      // For bedrock profile mode, empty profile means "default"
      if (provider.id === "bedrock" && bedrockMode === "profile") {
        key = `profile:${bedrockProfile || "default"}`;
      } else {
        return;
      }
    }
    testMut.mutate({ provider: provider.id, apiKey: key });
  }

  function TestResultBadge({ providerId }: { providerId: string }) {
    const result = testResults[providerId];
    if (!result) return null;
    return (
      <div className={cn(
        "text-[10px] px-2 py-1 rounded flex items-center gap-1 mt-2",
        result.ok
          ? "bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400"
          : "bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400"
      )}>
        {result.ok ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
        {result.message}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold">AI Model Providers</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Add API keys to use models directly. Configured models appear in the chat model selector.
        </p>
      </div>

      {providersQuery.isLoading && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" /> Loading...
        </div>
      )}

      <div className="space-y-3">
        {providers.map((provider) => {
          const hasKey = provider.configured;
          const isEditing = editingKeys[provider.apiKeyField] !== undefined;
          const isTesting = testMut.isPending && testMut.variables?.provider === provider.id;

          // --- AWS Bedrock: special layout ---
          if (provider.id === "bedrock") {
            return (
              <div key="bedrock" className={cn(
                "rounded-lg border p-4 space-y-3",
                hasKey ? "border-green-600/30 bg-green-50/5" : "border-border"
              )}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Cloud className="h-4 w-4 text-orange-500" />
                    <span className="font-medium text-sm">AWS Bedrock</span>
                    {hasKey && (
                      <Badge variant="secondary" className="text-[9px] px-1.5 py-0 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400">
                        <Check className="h-2.5 w-2.5 mr-0.5" /> Connected
                      </Badge>
                    )}
                  </div>
                  <span className="text-[10px] text-muted-foreground">{provider.models.length} models</span>
                </div>

                <div className="flex flex-wrap gap-1">
                  {provider.models.map((m) => (
                    <span key={m.id} className={cn("text-[10px] px-1.5 py-0.5 rounded", hasKey ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground")}>
                      {m.name}
                    </span>
                  ))}
                </div>

                {/* Auth mode selector */}
                <div className="space-y-3">
                  <div className="flex gap-3">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="bedrock-auth" checked={bedrockMode === "profile"} onChange={() => setBedrockMode("profile")} className="accent-primary" />
                      <span className="text-xs font-medium">AWS Profile</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="bedrock-auth" checked={bedrockMode === "apikey"} onChange={() => setBedrockMode("apikey")} className="accent-primary" />
                      <span className="text-xs font-medium">Bedrock API Key</span>
                    </label>
                  </div>

                  {bedrockMode === "profile" ? (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={bedrockProfile}
                          onChange={(e) => setBedrockProfile(e.target.value)}
                          placeholder="default"
                          className="w-40 rounded-md border border-input bg-background px-3 py-1.5 text-xs font-mono placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                        />
                        <span className="text-[10px] text-muted-foreground">Profile name from ~/.aws/credentials</span>
                        <div className="ml-auto flex gap-1">
                          <Button variant="outline" size="sm" className="h-7 text-xs" onClick={handleSaveBedrockProfile} disabled={saveMut.isPending} aria-label="Save API key">
                            {saveMut.isPending ? <Loader2 className="h-3 w-3 animate-spin" /> : "Save"}
                          </Button>
                          <Button variant="outline" size="sm" className="h-7 text-xs" onClick={() => handleTest(provider)} disabled={isTesting} aria-label="Test connection">
                            {isTesting ? <Loader2 className="h-3 w-3 animate-spin" /> : "Test"}
                          </Button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <p className="text-[10px] text-muted-foreground">
                        Get a key from AWS Console → Amazon Bedrock → API keys
                      </p>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 relative">
                          <input
                            type={showKeys.bedrock ? "text" : "password"}
                            value={isEditing ? editingKeys[provider.apiKeyField] : (savedKeys[provider.apiKeyField] || "")}
                            onChange={(e) => setEditingKeys((prev) => ({ ...prev, [provider.apiKeyField]: e.target.value }))}
                            placeholder="Bedrock API key"
                            className="w-full rounded-md border border-input bg-background px-3 py-1.5 text-xs font-mono placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring pr-8"
                          />
                          <button type="button" onClick={() => setShowKeys((prev) => ({ ...prev, bedrock: !prev.bedrock }))}
                            className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                            aria-label={showKeys.bedrock ? "Hide API key" : "Show API key"}>
                            {showKeys.bedrock ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                          </button>
                        </div>
                        <Button variant="outline" size="sm" className="h-7 text-xs" disabled={!isEditing || saveMut.isPending} onClick={() => handleSaveKey(provider)} aria-label="Save API key">
                          {saveMut.isPending ? <Loader2 className="h-3 w-3 animate-spin" /> : "Save"}
                        </Button>
                        <Button variant="outline" size="sm" className="h-7 text-xs" disabled={(!hasKey && !isEditing) || isTesting} onClick={() => handleTest(provider)} aria-label="Test connection">
                          {isTesting ? <Loader2 className="h-3 w-3 animate-spin" /> : "Test"}
                        </Button>
                      </div>
                    </div>
                  )}
                </div>

                <TestResultBadge providerId="bedrock" />
              </div>
            );
          }

          // --- Standard provider layout ---
          return (
            <div key={provider.id} className={cn(
              "rounded-lg border p-4 space-y-3",
              hasKey ? "border-green-600/30 bg-green-50/5" : "border-border"
            )}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-primary" />
                  <span className="font-medium text-sm">{provider.name}</span>
                  {hasKey && (
                    <Badge variant="secondary" className="text-[9px] px-1.5 py-0 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400">
                      <Check className="h-2.5 w-2.5 mr-0.5" /> Connected
                    </Badge>
                  )}
                </div>
                <span className="text-[10px] text-muted-foreground">{provider.models.length} models</span>
              </div>

              <div className="flex flex-wrap gap-1">
                {provider.models.map((m) => (
                  <span key={m.id} className={cn("text-[10px] px-1.5 py-0.5 rounded", hasKey ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground")}>
                    {m.name}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <div className="flex-1 relative">
                  <input
                    type={showKeys[provider.id] ? "text" : "password"}
                    value={isEditing ? editingKeys[provider.apiKeyField] : (savedKeys[provider.apiKeyField] || "")}
                    onChange={(e) => setEditingKeys((prev) => ({ ...prev, [provider.apiKeyField]: e.target.value }))}
                    onBlur={(e) => {
                      const warning = validateKeyFormat(provider.id, e.target.value);
                      setKeyWarnings((prev) => ({ ...prev, [provider.id]: warning }));
                    }}
                    placeholder={PROVIDER_KEY_HINTS[provider.id]?.placeholder || `${provider.name} API key`}
                    className="w-full rounded-md border border-input bg-background px-3 py-1.5 text-xs font-mono placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring pr-8"
                  />
                  <button type="button" onClick={() => setShowKeys((prev) => ({ ...prev, [provider.id]: !prev[provider.id] }))}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    aria-label={showKeys[provider.id] ? "Hide API key" : "Show API key"}>
                    {showKeys[provider.id] ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                  </button>
                </div>
                <Button variant="outline" size="sm" className="h-7 text-xs" disabled={!isEditing || saveMut.isPending} onClick={() => handleSaveKey(provider)} aria-label="Save API key">
                  {saveMut.isPending ? <Loader2 className="h-3 w-3 animate-spin" /> : "Save"}
                </Button>
                <Button variant="outline" size="sm" className="h-7 text-xs" disabled={(!hasKey && !isEditing) || isTesting} onClick={() => handleTest(provider)} aria-label="Test connection">
                  {isTesting ? <Loader2 className="h-3 w-3 animate-spin" /> : "Test"}
                </Button>
              </div>
              {keyWarnings[provider.id] && (
                <p className="text-xs text-yellow-600 dark:text-yellow-500 mt-1">
                  {keyWarnings[provider.id]}
                </p>
              )}

              <TestResultBadge providerId={provider.id} />
            </div>
          );
        })}
      </div>

      {/* Quick start tip */}
      <div className="rounded-lg border border-dashed border-primary/30 bg-primary/5 p-4 space-y-2">
        <p className="text-sm font-medium">Quick start with OpenRouter</p>
        <p className="text-xs text-muted-foreground">
          One API key gives you access to 100+ models from all providers. Get a key at openrouter.ai
        </p>
      </div>
    </div>
  );
}
