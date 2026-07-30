import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { AlertTriangle, CheckCircle2, LoaderCircle, RefreshCw, Watch } from "lucide-react";
import type { Activity } from "@/lib/mock-data";
import { ActivityCard } from "@/components/ActivityCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type SyncState = "idle" | "pending" | "failed" | "synced";

const MOCK_ACTIVITY: Activity = {
  id: "act-first-sync-demo",
  athleteId: "me",
  sport: "Run",
  title: "Morning shakeout",
  description: "First one logged with Stride. Let's go.",
  date: new Date().toISOString(),
  distanceKm: 5.14,
  movingSeconds: 1584,
  elevationM: 62,
  avgHr: 152,
  avgPaceSecPerKm: 308,
  kudos: 0,
  comments: [],
  achievements: 0,
  routeSeed: 42,
  kudoed: false,
};

const SYNC_DELAY_MS = 1800;

export default function FirstSyncStatusPrototype() {
  const [state, setState] = useState<SyncState>("idle");
  const [attempt, setAttempt] = useState(0);

  function beginSync(nextAttempt: number) {
    setState("pending");
    // First attempt always fails so the demo shows both the failure state and
    // the recovery path; retrying succeeds.
    const willFail = nextAttempt === 0;
    setTimeout(() => setState(willFail ? "failed" : "synced"), SYNC_DELAY_MS);
  }

  function connect() {
    setAttempt(0);
    beginSync(0);
  }

  function retry() {
    const next = attempt + 1;
    setAttempt(next);
    beginSync(next);
  }

  function reset() {
    setState("idle");
    setAttempt(0);
  }

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <header className="border-b border-border">
        <div className="mx-auto flex w-full max-w-[1100px] items-center justify-between px-6 py-5 lg:px-10">
          <div className="flex items-center gap-3">
            <div className="grid h-9 w-9 place-items-center rounded-sm bg-secondary font-display text-base font-bold text-secondary-foreground">
              S
            </div>
            <div className="leading-tight">
              <div className="font-display text-lg font-semibold tracking-tight">Stride</div>
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                Getting set up
              </div>
            </div>
          </div>
          <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
            Step 04 / 04
          </div>
        </div>
      </header>

      <main className="flex flex-1 items-start justify-center px-6 py-12 lg:px-10 lg:py-16">
        <div className="w-full max-w-2xl">
          <div>
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-foreground/40" />
              <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                Device sync
              </span>
            </div>
            <h1 className="mt-5 font-display text-4xl font-bold leading-[1.05] tracking-[-0.02em] sm:text-5xl">
              Your first activity is on its way.
            </h1>
            <p className="mt-4 max-w-xl text-base leading-7 text-muted-foreground">
              Connect a device and Stride pulls in your most recent activity automatically. If
              anything gets stuck, you'll see exactly what's happening — never a silent blank
              screen.
            </p>
          </div>

          <div className="mt-10">
            {state === "idle" && <IdleCard onConnect={connect} />}
            {state === "pending" && <PendingCard />}
            {state === "failed" && <FailedCard onRetry={retry} />}
            {state === "synced" && <SyncedCard />}
          </div>

          {state !== "idle" && (
            <Button variant="link" size="sm" onClick={reset} className="mt-4 h-auto p-0 text-muted-foreground">
              ↺ Restart demo
            </Button>
          )}
        </div>
      </main>

      <Link
        to="/prototypes"
        className="fixed bottom-4 right-4 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground/60 transition-colors hover:text-foreground"
      >
        exit prototype
      </Link>
    </div>
  );
}

function IdleCard({ onConnect }: { onConnect: () => void }) {
  return (
    <div className="border border-dashed border-border bg-surface p-8 text-center">
      <div className="mx-auto grid h-11 w-11 place-items-center bg-muted text-foreground">
        <Watch className="h-5 w-5" />
      </div>
      <div className="mt-4 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
        No device connected yet
      </div>
      <Button onClick={onConnect} size="lg" className="mt-5">
        <Watch className="h-4 w-4" /> Connect Garmin Forerunner 965
      </Button>
    </div>
  );
}

function PendingCard() {
  return (
    <div className="border border-border bg-surface p-8">
      <Badge variant="outline" className="gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
        <LoaderCircle className="h-3 w-3 animate-spin" />
        Pending · syncing
      </Badge>
      <div className="mt-3 font-display text-xl font-bold tracking-tight">
        Importing your first activity from Garmin…
      </div>
      <p className="mt-2 text-sm text-muted-foreground">
        This usually takes a few seconds. We'll show it here the moment it lands.
      </p>
    </div>
  );
}

function FailedCard({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="border border-destructive/40 bg-destructive/8 p-8">
      <div className="flex items-start gap-4">
        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-destructive/15 text-destructive">
          <AlertTriangle className="h-5 w-5" />
        </div>
        <div className="min-w-0 flex-1">
          <Badge variant="destructive" className="font-mono text-[10px] uppercase tracking-[0.18em]">
            Sync failed
          </Badge>
          <div className="mt-2 font-display text-xl font-bold tracking-tight">
            We couldn't import your activity
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            Connect IQ authorization timed out before the upload finished. Nothing was lost —
            your watch still has it.
          </p>
          <Button onClick={onRetry} className="mt-4">
            <RefreshCw className="h-4 w-4" /> Retry sync
          </Button>
        </div>
      </div>
    </div>
  );
}

function SyncedCard() {
  return (
    <div>
      <div className="border border-[color:var(--pr)]/40 bg-[color:var(--pr)]/8 p-8">
        <div className="flex items-start gap-4">
          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[color:var(--pr)]/15 text-[color:var(--pr)]">
            <CheckCircle2 className="h-5 w-5" />
          </div>
          <div className="min-w-0 flex-1">
            <Badge
              variant="outline"
              className="border-[color:var(--pr)]/40 bg-[color:var(--pr)]/8 font-mono text-[10px] uppercase tracking-[0.18em] text-[color:var(--pr)]"
            >
              Synced
            </Badge>
            <div className="mt-2 font-display text-xl font-bold tracking-tight">
              Your first activity is in Stride
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              Garmin Forerunner 965 · synced just now
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
          Preview — this is what lands in your feed
        </div>
        <ActivityCard activity={MOCK_ACTIVITY} />
      </div>
    </div>
  );
}
