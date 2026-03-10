import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { StatusBadge } from "@/components/StatusBadge";
import { MetricCard } from "@/components/MetricCard";
import { EmptyState } from "@/components/EmptyState";
import {
  Bot, Activity, Network, FileText, Palette,
  AlertCircle, CheckCircle, XCircle, Clock, Zap,
  ArrowUp, ArrowDown, Minus, AlertTriangle,
} from "lucide-react";
import { cn } from "@/lib/utils";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">{title}</h2>
      {children}
    </div>
  );
}

function SubSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">{title}</h3>
      {children}
    </div>
  );
}

function ColorSwatch({ name, className }: { name: string; className: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className={cn("h-8 w-8 rounded-md border", className)} />
      <span className="text-xs text-muted-foreground">{name}</span>
    </div>
  );
}

const statuses = ["active", "running", "paused", "idle", "exploring", "implementing", "reviewing", "done", "error", "failed", "pending", "archived"];
const priorities = [
  { label: "Critical", icon: AlertTriangle, color: "text-red-600 dark:text-red-400" },
  { label: "High", icon: ArrowUp, color: "text-orange-600 dark:text-orange-400" },
  { label: "Medium", icon: Minus, color: "text-yellow-600 dark:text-yellow-400" },
  { label: "Low", icon: ArrowDown, color: "text-blue-600 dark:text-blue-400" },
];

export function DesignGuide() {
  return (
    <div className="space-y-10 max-w-5xl">
      <div>
        <h1 className="text-xl font-bold">Design Guide</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Living component showcase — OKLCH tokens, Tailwind v4, shadcn/ui (new-york)
        </p>
      </div>

      {/* Typography */}
      <Section title="Typography">
        <div className="space-y-2 rounded-xl border p-6">
          <p className="text-xl font-bold">Page title (text-xl font-bold)</p>
          <p className="text-lg font-semibold">Section title (text-lg font-semibold)</p>
          <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Section heading (text-sm font-semibold uppercase tracking-wide)
          </p>
          <p className="text-sm font-medium">Card title (text-sm font-medium)</p>
          <p className="text-sm">Body text (text-sm)</p>
          <p className="text-sm text-muted-foreground">Muted text (text-sm text-muted-foreground)</p>
          <p className="text-xs text-muted-foreground">Tiny label (text-xs text-muted-foreground)</p>
        </div>
      </Section>

      <Separator />

      {/* Colors */}
      <Section title="Design Tokens (OKLCH)">
        <SubSection title="Semantic Colors">
          <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
            <ColorSwatch name="background" className="bg-background" />
            <ColorSwatch name="foreground" className="bg-foreground" />
            <ColorSwatch name="card" className="bg-card" />
            <ColorSwatch name="primary" className="bg-primary" />
            <ColorSwatch name="secondary" className="bg-secondary" />
            <ColorSwatch name="muted" className="bg-muted" />
            <ColorSwatch name="accent" className="bg-accent" />
            <ColorSwatch name="destructive" className="bg-destructive" />
            <ColorSwatch name="border" className="bg-border" />
            <ColorSwatch name="ring" className="bg-ring" />
            <ColorSwatch name="sidebar" className="bg-sidebar" />
            <ColorSwatch name="sidebar-accent" className="bg-sidebar-accent" />
          </div>
        </SubSection>
        <SubSection title="Chart Colors">
          <div className="grid grid-cols-5 gap-3">
            <ColorSwatch name="chart-1" className="bg-chart-1" />
            <ColorSwatch name="chart-2" className="bg-chart-2" />
            <ColorSwatch name="chart-3" className="bg-chart-3" />
            <ColorSwatch name="chart-4" className="bg-chart-4" />
            <ColorSwatch name="chart-5" className="bg-chart-5" />
          </div>
        </SubSection>
      </Section>

      <Separator />

      {/* Buttons */}
      <Section title="Buttons">
        <SubSection title="Variants">
          <div className="flex flex-wrap gap-3">
            <Button variant="default">Default</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="link">Link</Button>
          </div>
        </SubSection>
        <SubSection title="Sizes">
          <div className="flex flex-wrap items-center gap-3">
            <Button size="xs">Extra Small</Button>
            <Button size="sm">Small</Button>
            <Button size="default">Default</Button>
            <Button size="lg">Large</Button>
            <Button size="icon"><Bot className="h-4 w-4" /></Button>
            <Button size="icon-sm"><Bot className="h-4 w-4" /></Button>
            <Button size="icon-xs"><Bot className="h-3 w-3" /></Button>
          </div>
        </SubSection>
        <SubSection title="States">
          <div className="flex flex-wrap gap-3">
            <Button>Enabled</Button>
            <Button disabled>Disabled</Button>
          </div>
        </SubSection>
      </Section>

      <Separator />

      {/* Badges */}
      <Section title="Badges">
        <SubSection title="Variants">
          <div className="flex flex-wrap gap-2">
            <Badge variant="default">Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="destructive">Destructive</Badge>
          </div>
        </SubSection>
      </Section>

      <Separator />

      {/* Status System */}
      <Section title="Status System">
        <SubSection title="Status Badges (all statuses)">
          <div className="flex flex-wrap gap-2">
            {statuses.map((s) => (
              <StatusBadge key={s} status={s} />
            ))}
          </div>
        </SubSection>
        <SubSection title="Without Dot">
          <div className="flex flex-wrap gap-2">
            {statuses.slice(0, 6).map((s) => (
              <StatusBadge key={s} status={s} showDot={false} />
            ))}
          </div>
        </SubSection>
        <SubSection title="Priority Indicators">
          <div className="flex flex-wrap gap-4">
            {priorities.map((p) => (
              <div key={p.label} className="flex items-center gap-1.5">
                <p.icon className={cn("h-4 w-4", p.color)} />
                <span className={cn("text-sm font-medium", p.color)}>{p.label}</span>
              </div>
            ))}
          </div>
        </SubSection>
      </Section>

      <Separator />

      {/* Cards */}
      <Section title="Cards">
        <div className="grid gap-4 sm:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Card Title</CardTitle>
              <CardDescription>Card description with supporting text</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm">Card content area with body text.</p>
            </CardContent>
            <CardFooter>
              <Button size="sm">Action</Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Compact Card</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <StatusBadge status="running" />
                <span className="text-sm">Agent working on task...</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </Section>

      <Separator />

      {/* Metric Cards */}
      <Section title="Metric Cards">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard title="Sessions" value={12} icon={Network} />
          <MetricCard title="Active Agents" value={5} subtitle="3 implementing" icon={Bot} />
          <MetricCard title="Events Today" value="1.2k" icon={Activity} />
          <MetricCard title="Skills" value={52} icon={FileText} />
        </div>
      </Section>

      <Separator />

      {/* Empty States */}
      <Section title="Empty States">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border">
            <EmptyState icon={Bot} title="No agents found" description="Agents will appear here when sessions are active" />
          </div>
          <div className="rounded-xl border">
            <EmptyState icon={AlertCircle} title="Something went wrong" description="Please try again later">
              <Button size="sm" variant="outline">Retry</Button>
            </EmptyState>
          </div>
        </div>
      </Section>

      <Separator />

      {/* Skeletons */}
      <Section title="Loading Skeletons">
        <div className="rounded-xl border p-6 space-y-4">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-72" />
          <div className="flex gap-3">
            <Skeleton className="h-10 w-10 rounded-lg" />
            <div className="space-y-2 flex-1">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
        </div>
      </Section>

      <Separator />

      {/* Icons */}
      <Section title="Icon Usage (Lucide)">
        <SubSection title="Navigation (16px)">
          <div className="flex gap-4">
            {[Bot, Activity, Network, FileText, Palette, Zap].map((Icon, i) => (
              <div key={i} className="flex flex-col items-center gap-1">
                <Icon className="h-4 w-4" />
                <span className="text-[10px] text-muted-foreground">{Icon.displayName}</span>
              </div>
            ))}
          </div>
        </SubSection>
        <SubSection title="Status (14px)">
          <div className="flex gap-4">
            {[CheckCircle, XCircle, AlertCircle, Clock, AlertTriangle].map((Icon, i) => (
              <div key={i} className="flex flex-col items-center gap-1">
                <Icon className="h-3.5 w-3.5" />
                <span className="text-[10px] text-muted-foreground">{Icon.displayName}</span>
              </div>
            ))}
          </div>
        </SubSection>
      </Section>

      <Separator />

      {/* Layout Zones */}
      <Section title="Layout Structure">
        <div className="rounded-xl border p-4">
          <div className="flex gap-2 h-40">
            <div className="w-14 bg-sidebar border rounded-lg flex items-center justify-center">
              <span className="text-[10px] text-muted-foreground -rotate-90">Sidebar</span>
            </div>
            <div className="flex-1 bg-background border rounded-lg flex items-center justify-center">
              <span className="text-xs text-muted-foreground">Main Content (flex-1)</span>
            </div>
            <div className="w-20 bg-card border rounded-lg flex items-center justify-center">
              <span className="text-[10px] text-muted-foreground -rotate-90">Panel</span>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-2">Three-zone layout: Sidebar (w-60 collapsible) | Main (flex-1, overflow-auto) | Properties panel (optional)</p>
        </div>
      </Section>
    </div>
  );
}
