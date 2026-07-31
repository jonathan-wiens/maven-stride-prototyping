import { useState } from "react";

const PEEPS = ["Peep!", "Go run", "Nice splits", "Zone 2, always", "Hatched a PR"] as const;

export function EasterEgg() {
  const [open, setOpen] = useState(false);
  const [peep, setPeep] = useState<string>(PEEPS[0]);

  function toggle() {
    if (!open) setPeep(PEEPS[Math.floor(Math.random() * PEEPS.length)]);
    setOpen((v) => !v);
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center gap-2">
      {open && (
        <div
          role="status"
          className="egg-peep rounded-md border border-border bg-surface px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-foreground shadow-sm"
        >
          {peep}
        </div>
      )}

      <button
        onClick={toggle}
        aria-label={open ? "Tuck the chick back in" : "A suspicious egg"}
        aria-expanded={open}
        className="grid h-14 w-14 place-items-center rounded-full border border-border bg-surface transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        <span className="relative block h-10 w-10">
          {open ? (
            <>
              <Chick className="egg-chick absolute inset-0" />
              <ShellTop className="egg-shell-top absolute inset-0" />
              <ShellBottom className="absolute inset-0" />
            </>
          ) : (
            <Egg className="egg-idle h-10 w-10" />
          )}
        </span>
      </button>
    </div>
  );
}

function Egg({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <path
        d="M32 5c10 0 18 13 18 24a18 18 0 0 1-36 0C14 18 22 5 32 5Z"
        fill="var(--surface-2)"
        stroke="var(--border)"
        strokeWidth="2"
      />
      <ellipse cx="25" cy="24" rx="2.5" ry="3" fill="var(--border)" />
      <ellipse cx="38" cy="34" rx="2" ry="2.5" fill="var(--border)" />
      <ellipse cx="30" cy="42" rx="1.5" ry="2" fill="var(--border)" />
    </svg>
  );
}

function ShellBottom({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <path
        d="M14.6 36c1.6 8.4 8.8 14.6 17.4 14.6S47.8 44.4 49.4 36l-6 4.5-5.5-4-5.5 4-5.5-4-5.5 4L14.6 36Z"
        fill="var(--surface-2)"
        stroke="var(--border)"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ShellTop({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <path
        d="M32 5c10 0 18 13 18 24l-6-4.5-5.5 4-5.5-4-5.5 4-5.5-4-6 4.5C14 18 22 5 32 5Z"
        fill="var(--surface-2)"
        stroke="var(--border)"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Chick({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <path
        d="M32 9c0-3 2-5 4-6-1 3 0 5 2 6"
        fill="none"
        stroke="var(--accent)"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <ellipse cx="32" cy="40" rx="17" ry="15" fill="var(--accent)" />
      <circle cx="32" cy="24" r="13" fill="var(--accent)" />
      <ellipse cx="19" cy="40" rx="5.5" ry="8.5" fill="var(--accent-foreground)" opacity="0.12" />
      <circle cx="27.5" cy="22" r="1.8" fill="var(--foreground)" />
      <circle cx="36.5" cy="22" r="1.8" fill="var(--foreground)" />
      <path d="M32 26.5 37 29l-5 2.5Z" fill="var(--primary)" />
    </svg>
  );
}
