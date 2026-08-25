import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BarChart3,
  GraduationCap,
  Play,
  ShieldCheck,
  Sliders,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BrandIcon } from "@/components/brand-logo";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [{ title: "Capacity Connect — Digital Capacity Building Portal" }],
  }),
  component: LandingPage,
});

/* ------------------------------------------------------------------ */
/*  Small building blocks                                              */
/* ------------------------------------------------------------------ */

function Badge({
  icon: Icon,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "mx-1 inline-flex items-center gap-1.5 rounded-full border border-primary/20",
        "bg-gradient-to-b from-white to-primary/5 px-3 py-1 align-middle text-[0.4em]",
        "font-bold text-navy shadow-[0_6px_0_-2px_rgba(30,111,255,0.15),0_14px_24px_-10px_rgba(11,30,61,0.25)]",
        "-rotate-1 transition-transform hover:-translate-y-0.5 hover:rotate-1",
      )}
    >
      <span className="flex size-[1.9em] items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/70 shadow-inner">
        <Icon className="size-[1.05em] text-primary-foreground" />
      </span>
      {children}
    </span>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-4 flex items-center gap-2 font-mono text-[11px] font-medium uppercase tracking-widest text-primary">
      {children}
    </div>
  );
}

const ministries = [
  "Dept. of Personnel & Training",
  "NITI Aayog",
  "Ministry of Electronics & IT",
  "Ministry of Skill Development",
  "Cabinet Secretariat",
  "DPIIT",
  "iGOT Karmayogi",
  "Ministry of Finance",
  "LBSNAA Mussoorie",
  "Ministry of Rural Development",
];

const features = [
  {
    tag: "DASHBOARD",
    icon: BarChart3,
    title: "Live progress tracking",
    body: "See who's enrolled, mid-way, or done — by officer, department, or programme, updated as it happens.",
  },
  {
    tag: "COURSE BUILDER",
    icon: Sliders,
    title: "Drag-and-tune programme builder",
    body: "Set pacing, assessment weight, and prerequisites with sliders — no course-authoring degree required.",
  },
  {
    tag: "VIDEO MODULES",
    icon: Play,
    title: "Bite-sized video training",
    body: "Officers learn in short, subtitled video modules that work on low bandwidth — no app install needed.",
  },
  {
    tag: "CERTIFICATION",
    icon: ShieldCheck,
    title: "Auto-generated certification",
    body: "Certificates and compliance records are issued the moment an officer meets the bar — audit-ready, always.",
  },
  {
    tag: "REPORTS",
    icon: BarChart3,
    title: "Reports ministries can actually use",
    body: "Export capacity-growth reports by state, department, or scheme — formatted for review meetings, not analysts.",
  },
  {
    tag: "ACCESS",
    icon: Users,
    title: "Works where officers actually are",
    body: "Low-bandwidth mode and offline-first sync mean training reaches block-level offices, not just state capitals.",
  },
];

const steps = [
  {
    num: "01 — ONBOARD",
    title: "Nominate officers",
    body: "Departments upload officer rosters or pull them straight from HRMS — no manual entry.",
  },
  {
    num: "02 — TRAIN",
    title: "Run the programme",
    body: "Officers move through modules, assessments, and live sessions on any device, any bandwidth.",
  },
  {
    num: "03 — TRACK",
    title: "Watch it happen",
    body: "Supervisors see completion, drop-off, and scores update in real time on a single dashboard.",
  },
  {
    num: "04 — CERTIFY",
    title: "Close the loop",
    body: "Certificates issue automatically and feed straight into service records and compliance reports.",
  },
];

const stats = [
  { value: "3.4L+", label: "Officers trained" },
  { value: "612", label: "Departments onboarded" },
  { value: "96%", label: "Avg. completion rate" },
  { value: "18", label: "States & UTs live" },
];

/* ------------------------------------------------------------------ */
/*  Page                                                                */
/* ------------------------------------------------------------------ */

function LandingPage() {
  return (
    <div className="bg-background">
      {/* ---------- Nav ---------- */}
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur-md">
        <nav className="mx-auto flex max-w-[1240px] items-center justify-between px-6 py-3.5">
          <Link to="/" className="flex items-center gap-2.5">
            <BrandIcon size={34} className="rounded-md bg-primary p-1 shadow-sm shadow-primary/30" />
            <span className="font-display text-sm font-extrabold tracking-tight">
              CAPACITY<span className="text-primary">CONNECT</span>
            </span>
          </Link>

          <div className="hidden items-center gap-9 text-sm font-medium text-muted-foreground md:flex">
            <a href="#platform" className="transition-colors hover:text-foreground">Platform</a>
            <a href="#features" className="transition-colors hover:text-foreground">Features</a>
            <a href="#process" className="transition-colors hover:text-foreground">How it works</a>
            <a href="#proof" className="transition-colors hover:text-foreground">Ministries</a>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/login">Sign in</Link>
            </Button>
            <Button size="sm" className="rounded-full" asChild>
              <Link to="/register">
                Get Started
              </Link>
            </Button>
          </div>
        </nav>
      </header>

      <main className="mx-auto max-w-[1240px] px-6">
        {/* ---------- Hero ---------- */}
        <section className="pb-14 pt-20 md:pt-24">
          <div className="mb-7 flex items-center gap-2.5 font-mono text-[11.5px] font-medium uppercase tracking-widest text-muted-foreground">
            <span className="inline-block size-1.5 rounded-full bg-primary shadow-[0_0_0_4px_rgba(30,111,255,0.15)]" />
            Government of India · Capacity Building Commission
          </div>

          <h1 className="max-w-4xl text-[40px] font-extrabold leading-[1.03] tracking-tight sm:text-[54px] md:text-[68px] lg:text-[78px]">
            Officers who <Badge icon={GraduationCap}>learn</Badge>, programmes
            that <span className="text-primary">run themselves</span>, and
            capacity you can <Badge icon={BarChart3}>measure</Badge>.
          </h1>

          <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted-foreground">
            Capacity Connect is the digital platform ministries and departments
            use to plan trainings, move officers through them, and see — in
            real numbers — how capability is growing across government.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-5">
            <Button size="lg" className="rounded-full px-7" asChild>
              <Link to="/register">
                Get Started
                <ArrowRight className="ml-1.5 size-4" />
              </Link>
            </Button>
            <a
              href="#platform"
              className="group inline-flex items-center gap-2 border-b border-foreground pb-0.5 text-sm font-semibold transition-colors hover:border-primary hover:text-primary"
            >
              Watch a 2-min tour
              <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>

          {/* Hero visual mock */}
          <div className="mt-16 overflow-hidden rounded-[28px] bg-gradient-to-br from-navy via-navy to-primary/40 p-6 shadow-2xl shadow-navy/20">
            <div className="flex gap-1.5 pb-5">
              <span className="size-2.5 rounded-full bg-white/20" />
              <span className="size-2.5 rounded-full bg-white/20" />
              <span className="size-2.5 rounded-full bg-white/20" />
            </div>
            <div className="grid gap-0 overflow-hidden rounded-t-2xl bg-white/[0.02] md:grid-cols-[200px_1fr]">
              <div className="hidden border-r border-white/10 bg-white/[0.03] p-4 md:block">
                {["Dashboard", "Programmes", "Officers", "Certifications", "Reports"].map(
                  (item, i) => (
                    <div
                      key={item}
                      className={cn(
                        "mb-1 rounded-lg px-3 py-2 text-xs",
                        i === 0
                          ? "bg-primary/25 font-semibold text-white"
                          : "text-white/50",
                      )}
                    >
                      {item}
                    </div>
                  ),
                )}
              </div>
              <div className="p-6">
                <h4 className="text-[15px] font-bold text-white">
                  Ministry of Skill Development
                </h4>
                <p className="mb-5 mt-1 text-[12.5px] text-white/45">
                  Q3 capacity building cycle · 4,812 officers enrolled
                </p>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {[
                    { num: "92%", label: "COMPLETION RATE", fill: 92 },
                    { num: "4,812", label: "OFFICERS ACTIVE", fill: 78 },
                    { num: "128", label: "LIVE PROGRAMMES", fill: 60 },
                  ].map((c) => (
                    <div
                      key={c.label}
                      className="rounded-2xl border border-white/10 bg-white/[0.04] p-4"
                    >
                      <div className="text-xl font-extrabold tracking-tight text-white">
                        {c.num}
                      </div>
                      <div className="mt-1 font-mono text-[10.5px] text-white/40">
                        {c.label}
                      </div>
                      <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-white/10">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-sky-300 to-primary"
                          style={{ width: `${c.fill}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ---------- Social proof ---------- */}
        <section id="proof" className="border-y py-12">
          <p className="mb-7 text-center font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
            Trusted by ministries and departments across the Government of India
          </p>
          <div className="flex flex-wrap justify-center gap-x-10 gap-y-3">
            {ministries.map((m) => (
              <span
                key={m}
                className="font-mono text-[13px] font-semibold uppercase tracking-wide text-muted-foreground/60 grayscale transition-colors hover:text-foreground"
              >
                {m}
              </span>
            ))}
          </div>
        </section>

        {/* ---------- Statement ---------- */}
        <section id="platform" className="py-16 text-center md:py-20">
          <p className="mx-auto max-w-3xl text-2xl font-bold leading-snug tracking-tight text-foreground sm:text-3xl md:text-[42px]">
            Capacity Connect is the{" "}
            <span className="text-primary">first training platform</span> built
            for how government actually works —{" "}
            <span className="text-muted-foreground/40">one officer,</span> one
            programme, <span className="text-muted-foreground/40">one certificate</span>{" "}
            at a time.
          </p>
        </section>

        {/* ---------- Features ---------- */}
        <section id="features" className="py-16 md:py-24">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-8">
            <div>
              <SectionLabel>Platform · Everything in one place</SectionLabel>
              <h2 className="max-w-xl text-3xl font-extrabold tracking-tight sm:text-4xl md:text-[44px]">
                Built for the way departments actually run trainings.
              </h2>
            </div>
            <p className="max-w-sm text-[15px] leading-relaxed text-muted-foreground">
              No more spreadsheets, WhatsApp forwards, and paper attendance
              sheets. One system, from nomination to certificate.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <Card
                key={f.title}
                className="group cursor-pointer overflow-hidden rounded-[20px] transition-all hover:-translate-y-1.5 hover:shadow-xl hover:shadow-navy/10"
              >
                <CardContent className="p-5">
                  <div className="relative mb-4 flex aspect-[16/11] items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-navy to-primary/50">
                    <span className="absolute left-3 top-3 rounded-full bg-white/10 px-2.5 py-1 font-mono text-[10px] tracking-wide text-white/60">
                      {f.tag}
                    </span>
                    <f.icon className="size-10 text-white/70" />
                  </div>
                  <h3 className="text-[17px] font-bold tracking-tight">{f.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {f.body}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* ---------- Stat strip ---------- */}
        <section className="grid grid-cols-2 gap-6 border-y py-12 sm:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label}>
              <div className="text-4xl font-extrabold tracking-tight text-navy md:text-[44px]">
                {s.value}
              </div>
              <p className="mt-2 font-mono text-[11px] uppercase tracking-wide text-muted-foreground">
                {s.label}
              </p>
            </div>
          ))}
        </section>

        {/* ---------- Process ---------- */}
        <section id="process" className="py-16 md:py-24">
          <div className="mb-12">
            <SectionLabel>How it works · Four steps</SectionLabel>
            <h2 className="max-w-xl text-3xl font-extrabold tracking-tight sm:text-4xl md:text-[44px]">
              From nomination to certificate, in one flow.
            </h2>
          </div>
          <div className="grid divide-y overflow-hidden rounded-[20px] border sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
            {steps.map((s) => (
              <div key={s.num} className="p-7 transition-colors hover:bg-muted/40">
                <div className="mb-5 font-mono text-[11px] tracking-wide text-primary">
                  {s.num}
                </div>
                <h4 className="text-[17px] font-bold tracking-tight">{s.title}</h4>
                <p className="mt-2 text-[13.5px] leading-relaxed text-muted-foreground">
                  {s.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ---------- CTA banner ---------- */}
        <section className="pb-20">
          <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-primary/90 via-navy to-navy px-8 py-16 text-center sm:px-14 sm:py-20">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-40 -top-56 size-[520px] rounded-full bg-primary/40 blur-3xl"
            />
            <h2 className="relative mx-auto max-w-2xl text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl md:text-[52px]">
              Bring your department's training onto one platform.
            </h2>
            <p className="relative mt-4 text-[15px] text-white/60">
              Set up takes under a week. Your officers won't need training to
              use the training platform.
            </p>
            <div className="relative mt-9 flex flex-wrap items-center justify-center gap-4">
              <Button size="lg" variant="secondary" className="rounded-full px-7" asChild>
                <Link to="/register">
                  Get Started
                  <ArrowRight className="ml-1.5 size-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="ghost"
                className="rounded-full px-7 text-white hover:bg-white/10 hover:text-white"
                asChild
              >
                <Link to="/admin-login">Sign in as Admin</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* ---------- Footer ---------- */}
      <footer className="border-t py-14">
        <div className="mx-auto grid max-w-[1240px] grid-cols-2 gap-10 px-6 pb-10 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="mb-3.5 flex items-center gap-2.5">
              <BrandIcon size={30} className="rounded-md bg-primary p-1" />
              <span className="font-display text-sm font-extrabold tracking-tight">
                CAPACITY<span className="text-primary">CONNECT</span>
              </span>
            </Link>
            <p className="max-w-[280px] text-[13.5px] leading-relaxed text-muted-foreground">
              Digital Capacity Building Portal. Government of India · Capacity
              Building Commission.
            </p>
          </div>

          <div>
            <h6 className="mb-4 font-mono text-[10.5px] uppercase tracking-widest text-muted-foreground/60">
              Platform
            </h6>
            <div className="space-y-2.5 text-[13.5px] text-muted-foreground">
              <a href="#features" className="block transition-colors hover:text-primary">Features</a>
              <a href="#process" className="block transition-colors hover:text-primary">How it works</a>
              <a href="#proof" className="block transition-colors hover:text-primary">Ministries</a>
            </div>
          </div>

          <div>
            <h6 className="mb-4 font-mono text-[10.5px] uppercase tracking-widest text-muted-foreground/60">
              Account
            </h6>
            <div className="space-y-2.5 text-[13.5px] text-muted-foreground">
              <Link to="/login" className="block transition-colors hover:text-primary">
                Trainee / Trainer login
              </Link>
              <Link to="/admin-login" className="block transition-colors hover:text-primary">
                Admin login
              </Link>
              <Link to="/register" className="block transition-colors hover:text-primary">
                Register
              </Link>
            </div>
          </div>

          <div>
            <h6 className="mb-4 font-mono text-[10.5px] uppercase tracking-widest text-muted-foreground/60">
              Government
            </h6>
            <div className="space-y-2.5 text-[13.5px] text-muted-foreground">
              <a href="#" className="block transition-colors hover:text-primary">About CBC</a>
              <a href="#" className="block transition-colors hover:text-primary">Contact</a>
              <a href="#" className="block transition-colors hover:text-primary">Accessibility</a>
            </div>
          </div>
        </div>

        <div className="mx-auto flex max-w-[1240px] flex-wrap items-center justify-between gap-3 border-t px-6 pt-6 text-[12.5px] text-muted-foreground/70">
          <span>© 2026 Capacity Building Commission, Government of India. All rights reserved.</span>
          <span>Learn · Train · Grow · Build</span>
        </div>
      </footer>
    </div>
  );
}
