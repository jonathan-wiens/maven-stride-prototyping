import { useState } from "react";
import { ArrowRight, Apple, Lock, Mail, MapPin, User } from "lucide-react";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";

const AUTH_IMG =
  "https://images.unsplash.com/photo-1486218119243-13883505764c?w=1400&q=80&auto=format&fit=crop";

function mockToast(provider: string) {
  toast(`Mockup only — ${provider} sign-in isn't wired up.`, {
    description: "This screen is a design exploration, not a working auth flow.",
  });
}

export default function SocialLoginPrototype() {
  const [mode, setMode] = useState<"login" | "register">("login");

  return (
    <>
      <Toaster position="top-center" />
      <div className="grid min-h-screen bg-background text-foreground lg:grid-cols-[1.05fr_0.95fr]">
      {/* LEFT — form column */}
      <div className="flex min-h-screen flex-col">
        <header className="flex items-center justify-between px-6 py-6 lg:px-12">
          <div className="flex items-center gap-3">
            <div className="grid h-9 w-9 place-items-center rounded-sm bg-secondary font-display text-base font-bold text-secondary-foreground">
              S
            </div>
            <div className="leading-tight">
              <div className="font-display text-lg font-semibold tracking-tight">Stride</div>
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                Endurance · Est. 2024
              </div>
            </div>
          </div>
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
            Mockup
          </span>
        </header>

        <main className="flex flex-1 items-center justify-center px-6 pb-10 lg:px-12">
          <section className="w-full max-w-md">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-foreground/40" />
              <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                {mode === "login" ? "Welcome back" : "Start training"}
              </span>
            </div>

            <h1 className="mt-5 font-display text-4xl font-bold leading-[1.05] tracking-[-0.02em] sm:text-5xl">
              {mode === "login" ? (
                <>
                  Sign in and <em className="not-italic text-primary">keep the streak alive.</em>
                </>
              ) : (
                <>
                  Create your account. <em className="not-italic text-primary">Build the habit.</em>
                </>
              )}
            </h1>
            <p className="mt-4 text-base leading-7 text-muted-foreground">
              {mode === "login"
                ? "Pick up your training exactly where you left off. Your efforts, segments, and clubs are waiting."
                : "A Stride account takes under a minute. Record the next effort and start building your history today."}
            </p>

            <div className="mt-8 grid grid-cols-2 gap-0 border border-border">
              <button
                onClick={() => setMode("login")}
                className={`py-3 text-sm font-medium transition-colors ${
                  mode === "login"
                    ? "bg-secondary text-secondary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Sign in
              </button>
              <button
                onClick={() => setMode("register")}
                className={`py-3 text-sm font-medium transition-colors ${
                  mode === "register"
                    ? "bg-secondary text-secondary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Create account
              </button>
            </div>

            {/* Social sign-in — the thing this prototype exists to explore */}
            <div className="mt-6 space-y-2.5">
              <button
                onClick={() => mockToast("Apple")}
                className="flex h-12 w-full items-center justify-center gap-2.5 bg-[#000] text-sm font-medium text-white transition-opacity hover:opacity-90"
              >
                <Apple className="h-4 w-4" />
                {mode === "login" ? "Sign in with Apple" : "Continue with Apple"}
              </button>
              <button
                onClick={() => mockToast("Google")}
                className="flex h-12 w-full items-center justify-center gap-2.5 border border-border bg-surface text-sm font-medium text-foreground transition-colors hover:bg-muted"
              >
                <GoogleGlyph className="h-4 w-4" />
                {mode === "login" ? "Sign in with Google" : "Continue with Google"}
              </button>
            </div>

            <div className="mt-6 flex items-center gap-4">
              <span className="h-px flex-1 bg-border" />
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                Or use email
              </span>
              <span className="h-px flex-1 bg-border" />
            </div>

            <form
              className="mt-6 space-y-5"
              onSubmit={(event) => {
                event.preventDefault();
                mockToast("Email");
              }}
            >
              {mode === "register" && (
                <Field label="Full name" icon={User} placeholder="Alex Carter" />
              )}
              <Field label="Email" icon={Mail} placeholder="alex@example.com" type="email" />
              <Field
                label="Password"
                icon={Lock}
                placeholder="At least 8 characters"
                type="password"
              />

              <button
                type="submit"
                className="group inline-flex h-[52px] w-full items-center justify-center gap-2 bg-primary px-5 text-sm font-medium text-primary-foreground transition-all hover:gap-3"
              >
                {mode === "login" ? "Sign in to Stride" : "Create your account"}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </button>
            </form>

            <div className="mt-8 flex items-center gap-4">
              <span className="h-px flex-1 bg-border" />
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                {mode === "login" ? "New to Stride?" : "Already a member?"}
              </span>
              <span className="h-px flex-1 bg-border" />
            </div>
            <button
              onClick={() => setMode(mode === "login" ? "register" : "login")}
              className="mt-4 w-full py-3 text-sm font-medium underline-offset-4 transition-all hover:underline"
            >
              {mode === "login" ? "Create a free account →" : "Sign in to your account →"}
            </button>
          </section>
        </main>

        <footer className="px-6 py-6 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground lg:px-12">
          © 2026 Stride · Endurance training, plainly.
        </footer>
      </div>

      {/* RIGHT — photography column */}
      <aside className="relative hidden lg:block">
        <img
          src={AUTH_IMG}
          alt="Runner on a mountain ridge at dawn"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-secondary/60 via-secondary/10 to-transparent" />

        <div className="relative flex h-full flex-col justify-between p-10 text-secondary-foreground xl:p-14">
          <div className="flex items-center gap-2 self-start bg-background/90 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-foreground backdrop-blur">
            <MapPin className="h-3 w-3 text-primary" /> Cascade Ridge · 06:12
          </div>

          <div className="max-w-lg">
            <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-secondary-foreground/70">
              Field notes · 04
            </div>
            <blockquote className="mt-5 font-display text-3xl font-semibold leading-[1.2] tracking-[-0.015em] sm:text-[2.1rem]">
              <span className="text-primary">&ldquo;</span>
              The training week finally feels connected instead of buried in a pile of workouts.
              <span className="text-primary">&rdquo;</span>
            </blockquote>
            <div className="mt-6 flex items-center gap-3">
              <span className="h-px w-6 bg-secondary-foreground/50" />
              <span className="text-sm text-secondary-foreground/80">
                Nadia Okafor — Mountain runner
              </span>
            </div>

            <div className="mt-10 grid max-w-md grid-cols-3 gap-4 border-t border-secondary-foreground/15 pt-6">
              <SideStat value="280K+" label="Athletes" />
              <SideStat value="14.2M" label="km / month" />
              <SideStat value="96K" label="Segments" />
            </div>
          </div>
        </div>
      </aside>
      </div>
    </>
  );
}

function SideStat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="stat-num text-2xl font-bold tracking-tight">{value}</div>
      <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.22em] text-secondary-foreground/60">
        {label}
      </div>
    </div>
  );
}

function Field({
  label,
  icon: Icon,
  placeholder,
  type = "text",
}: {
  label: string;
  icon: typeof Mail;
  placeholder: string;
  type?: string;
}) {
  return (
    <label className="block">
      <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
        {label}
      </div>
      <div className="relative">
        <Icon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type={type}
          placeholder={placeholder}
          className="h-12 w-full border border-border bg-background pl-10 pr-4 text-sm outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-foreground"
        />
      </div>
    </label>
  );
}

// Standard multi-color "G" mark used on Google sign-in buttons.
function GoogleGlyph({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="#4285F4"
        d="M23.52 12.27c0-.85-.08-1.67-.22-2.45H12v4.64h6.47a5.54 5.54 0 0 1-2.4 3.63v3h3.87c2.27-2.09 3.58-5.17 3.58-8.82Z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.96-1.07 7.94-2.91l-3.87-3c-1.08.72-2.46 1.15-4.07 1.15-3.13 0-5.78-2.11-6.73-4.96H1.27v3.11A12 12 0 0 0 12 24Z"
      />
      <path
        fill="#FBBC05"
        d="M5.27 14.28A7.2 7.2 0 0 1 4.89 12c0-.79.14-1.56.38-2.28V6.61H1.27A12 12 0 0 0 0 12c0 1.94.46 3.77 1.27 5.39l4-3.11Z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.43-3.43C17.95 1.19 15.24 0 12 0A12 12 0 0 0 1.27 6.61l4 3.11C6.22 6.86 8.87 4.75 12 4.75Z"
      />
    </svg>
  );
}
