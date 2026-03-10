import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { FileText, Search } from "lucide-react";
import { EmptyState } from "@/components/EmptyState";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getSkills } from "@/api/skills";
import { cn } from "@/lib/utils";
import type { SkillMetadata } from "@/types/adapters";

const CATEGORIES = ["all", "role", "workflow", "specialist", "review", "infrastructure", "orchestration"] as const;

const complexityColor: Record<string, string> = {
  simple: "bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300",
  medium: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-300",
  complex: "bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300",
};

export function Skills() {
  const { data: skills = [] } = useQuery({ queryKey: ["skills"], queryFn: getSkills });
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string>("all");

  const filtered = skills.filter((s: SkillMetadata) => {
    const matchSearch = !search || s.name.toLowerCase().includes(search.toLowerCase()) || s.description.toLowerCase().includes(search.toLowerCase());
    const matchCategory = category === "all" || s.category === category;
    return matchSearch && matchCategory;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold">Skills & Commands</h1>
        <p className="text-sm text-muted-foreground mt-1">{skills.length} available commands with metadata</p>
      </div>

      {/* Search + filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search skills..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-9 pl-9 pr-3 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-1 focus:ring-ring"
          />
        </div>
        <div className="flex gap-1 flex-wrap">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={cn(
                "px-2.5 py-1 rounded-md text-xs font-medium capitalize transition-colors",
                category === c ? "bg-secondary text-secondary-foreground" : "text-muted-foreground hover:bg-accent"
              )}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <EmptyState icon={FileText} title="No matching skills" description="Try adjusting your search or filter" />
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((skill: SkillMetadata) => (
            <Card key={skill.filename}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-sm font-semibold">{skill.name}</h3>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{skill.description}</p>
                  </div>
                  <Badge variant="outline" className={cn("text-[10px] shrink-0", complexityColor[skill.complexity])}>
                    {skill.complexity}
                  </Badge>
                </div>
                <div className="flex items-center gap-1.5 mt-3 flex-wrap">
                  <span className="text-[10px] uppercase tracking-wide text-muted-foreground">{skill.category}</span>
                  {skill.triggers.slice(0, 3).map((t) => (
                    <span key={t} className="text-[10px] px-1.5 py-0.5 rounded bg-accent text-accent-foreground">
                      /{t}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
