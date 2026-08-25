// src/pages/LandingPage.tsx
import React, { useEffect, useRef } from "react";
import "../landing.css";

// This page's markup was ported from the original static index.html design.
// Interactive bits (custom cursor pill, scroll reveal, logo marquee) are
// re-wired below as a React effect instead of a raw <script> tag.
export default function LandingPage() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    // custom cursor pill
    const pill = root.querySelector<HTMLDivElement>("#cursor-pill");
    let targetX = 0, targetY = 0, curX = 0, curY = 0;
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    let rafId: number;

    function onMouseMove(e: MouseEvent) {
      targetX = e.clientX + 16;
      targetY = e.clientY + 16;
    }

    function loop() {
      curX += (targetX - curX) * 0.25;
      curY += (targetY - curY) * 0.25;
      if (pill) pill.style.transform = `translate(${curX}px,${curY}px)`;
      rafId = requestAnimationFrame(loop);
    }

    const cursorTargets = root.querySelectorAll<HTMLElement>("[data-cursor]");
    function onEnter(this: HTMLElement) {
      if (pill) {
        pill.textContent = this.getAttribute("data-cursor");
        pill.classList.add("show");
      }
    }
    function onLeave() {
      if (pill) pill.classList.remove("show");
    }

    if (!isTouch && pill) {
      document.addEventListener("mousemove", onMouseMove);
      loop();
      cursorTargets.forEach((el) => {
        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);
      });
    }

    // scroll reveal
    const revealEls = root.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealEls.forEach((el) => io.observe(el));

    // duplicate marquee content for a seamless loop
    const track = root.querySelector("#logo-track");
    if (track && !track.hasAttribute("data-duplicated")) {
      track.innerHTML += track.innerHTML;
      track.setAttribute("data-duplicated", "true");
    }

    return () => {
      if (!isTouch) {
        document.removeEventListener("mousemove", onMouseMove);
        cancelAnimationFrame(rafId);
        cursorTargets.forEach((el) => {
          el.removeEventListener("mouseenter", onEnter);
          el.removeEventListener("mouseleave", onLeave);
        });
      }
      io.disconnect();
    };
  }, []);

  return (
    <div ref={rootRef} dangerouslySetInnerHTML={{ __html: BODY_HTML }} />
  );
}

const BODY_HTML = `<div id="cursor-pill"></div>

<header>
  <nav>
    <a href="#" class="brand" data-cursor="Home">
      <img src="/logo.png" alt="Capacity Connect logo" style="height:34px;width:auto;object-fit:contain;object-position:left;clip-path:inset(0 62% 0 0);width:70px;">
      <span class="brand-name">CAPACITY<span>CONNECT</span></span>
    </a>
    <div class="nav-links">
      <a href="#platform" data-cursor="View">Platform</a>
      <a href="#features" data-cursor="View">Features</a>
      <a href="#process" data-cursor="View">How it works</a>
      <a href="#proof" data-cursor="View">Ministries</a>
    </div>
    <div class="nav-cta">
      <a href="/login" class="btn btn-ghost" data-cursor="Sign in">Sign in</a>
      <a href="/signup" class="btn btn-primary" data-cursor="Let's go">Get Started</a>
    </div>
  </nav>
</header>

<main class="wrap">

  <!-- HERO -->
  <section class="hero" style="padding-top:88px;">
    <div class="eyebrow">Government of India · Capacity Building Commission</div>
    <h1 class="reveal in">
      Officers who
      <span class="badge"><span class="ico"><svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10L12 5 2 10l10 5 10-5Z"/><path d="M6 12v5c0 1.5 3 3 6 3s6-1.5 6-3v-5"/></svg></span>learn</span>,
      programmes that <span class="accent">run themselves</span>,
      and capacity you can
      <span class="badge"><span class="ico"><svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-4 4"/></svg></span>measure</span>.
    </h1>
    <p class="hero-sub">Capacity Connect is the digital platform ministries and departments use to plan trainings, move officers through them, and see — in real numbers — how capability is growing across government.</p>
    <div class="hero-ctas">
      <a href="/signup" class="btn btn-primary btn-lg" data-cursor="Let's go">Get Started</a>
      <a href="#platform" class="link-arrow" data-cursor="Watch">Watch a 2-min tour →</a>
    </div>

    <!-- hero visual mockup -->
    <div class="hero-visual reveal" id="hero-visual">
      <div class="hero-visual-inner">
        <div class="browser-dots"><span></span><span></span><span></span></div>
        <div class="mock-grid">
          <div class="mock-sidebar">
            <div class="item active">Dashboard</div>
            <div class="item">Programmes</div>
            <div class="item">Officers</div>
            <div class="item">Certifications</div>
            <div class="item">Reports</div>
          </div>
          <div class="mock-main">
            <h4>Ministry of Skill Development</h4>
            <p>Q3 capacity building cycle · 4,812 officers enrolled</p>
            <div class="mock-cards">
              <div class="mock-card">
                <div class="num">92%</div>
                <div class="lbl">COMPLETION RATE</div>
                <div class="mock-bar-track"><div class="mock-bar-fill" style="width:92%;"></div></div>
              </div>
              <div class="mock-card">
                <div class="num">4,812</div>
                <div class="lbl">OFFICERS ACTIVE</div>
                <div class="mock-bar-track"><div class="mock-bar-fill" style="width:78%;"></div></div>
              </div>
              <div class="mock-card">
                <div class="num">128</div>
                <div class="lbl">LIVE PROGRAMMES</div>
                <div class="mock-bar-track"><div class="mock-bar-fill" style="width:60%;"></div></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- SOCIAL PROOF -->
  <section class="proof" id="proof" style="padding-top:52px;">
    <p class="proof-label">Trusted by ministries and departments across the Government of India</p>
    <div class="logo-marquee">
      <div class="logo-track" id="logo-track">
        <span class="logo-pill">DEPT. OF PERSONNEL &amp; TRAINING</span>
        <span class="logo-pill">NITI AAYOG</span>
        <span class="logo-pill">MINISTRY OF ELECTRONICS &amp; IT</span>
        <span class="logo-pill">MINISTRY OF SKILL DEVELOPMENT</span>
        <span class="logo-pill">CABINET SECRETARIAT</span>
        <span class="logo-pill">DPIIT</span>
        <span class="logo-pill">iGOT KARMAYOGI</span>
        <span class="logo-pill">MINISTRY OF FINANCE</span>
        <span class="logo-pill">LBSNAA MUSSOORIE</span>
        <span class="logo-pill">MINISTRY OF RURAL DEVELOPMENT</span>
      </div>
    </div>
  </section>

  <!-- STATEMENT -->
  <section class="statement" id="platform">
    <p class="reveal">
      Capacity Connect is the <span class="hi">first training platform</span> built for how government
      actually works — <span class="dim">one officer,</span> one programme,
      <span class="dim">one certificate</span> at a time.
    </p>
  </section>

  <!-- FEATURES -->
  <section id="features">
    <div class="sec-head reveal">
      <div>
        <div class="sec-label">Platform · Everything in one place</div>
        <h2 class="sec-title">Built for the way departments actually run trainings.</h2>
      </div>
      <p class="sec-sub">No more spreadsheets, WhatsApp forwards, and paper attendance sheets. One system, from nomination to certificate.</p>
    </div>

    <div class="feature-grid">
      <div class="fcard reveal" data-cursor="Explore">
        <div class="fmedia">
          <span class="ftag">DASHBOARD</span>
          <div class="dash-mock">
            <div class="dash-row"><span class="dot"></span><span class="name">Revenue Officers — Batch 12</span><span class="pct">96%</span></div>
            <div class="dash-row"><span class="dot"></span><span class="name">Cyber Hygiene — All Depts</span><span class="pct">81%</span></div>
            <div class="dash-row"><span class="dot"></span><span class="name">Public Finance Mgmt</span><span class="pct">64%</span></div>
          </div>
        </div>
        <h3>Live progress tracking</h3>
        <p>See who's enrolled, mid-way, or done — by officer, department, or programme, updated as it happens.</p>
      </div>

      <div class="fcard reveal" data-cursor="Explore">
        <div class="fmedia">
          <span class="ftag">COURSE BUILDER</span>
          <div class="slider-mock">
            <div class="row"><span>MODULE PACING</span><span>68%</span></div>
            <div class="slider-track"><div class="slider-fill"></div><div class="slider-knob"></div></div>
            <div class="row" style="margin-top:16px;"><span>ASSESSMENT WEIGHT</span><span>40%</span></div>
            <div class="slider-track"><div class="slider-fill" style="width:40%;"></div><div class="slider-knob" style="left:40%;"></div></div>
          </div>
        </div>
        <h3>Drag-and-tune programme builder</h3>
        <p>Set pacing, assessment weight, and prerequisites with sliders — no course-authoring degree required.</p>
      </div>

      <div class="fcard reveal" data-cursor="Explore">
        <div class="fmedia">
          <span class="ftag">VIDEO MODULES</span>
          <div class="video-mock" style="display:flex;align-items:center;justify-content:center;height:100%;">
            <div class="play-btn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#fff"><path d="M8 5v14l11-7z"/></svg>
            </div>
            <div class="waveform">
              <span style="height:40%;"></span><span style="height:70%;"></span><span style="height:30%;"></span>
              <span style="height:90%;"></span><span style="height:50%;"></span><span style="height:65%;"></span>
              <span style="height:35%;"></span><span style="height:80%;"></span><span style="height:45%;"></span>
              <span style="height:60%;"></span><span style="height:25%;"></span><span style="height:75%;"></span>
            </div>
          </div>
        </div>
        <h3>Bite-sized video training</h3>
        <p>Officers learn in short, subtitled video modules that work on low bandwidth — no app install needed.</p>
      </div>

      <div class="fcard reveal" data-cursor="Explore">
        <div class="fmedia">
          <span class="ftag">CERTIFICATION</span>
          <div class="dash-mock">
            <div class="dash-row"><span class="dot" style="background:#8dd3a8;"></span><span class="name">A. Sharma — Cert. issued</span><span class="pct">✓</span></div>
            <div class="dash-row"><span class="dot" style="background:#8dd3a8;"></span><span class="name">R. Iyer — Cert. issued</span><span class="pct">✓</span></div>
            <div class="dash-row"><span class="dot" style="background:#f0c96b;"></span><span class="name">K. Verma — In review</span><span class="pct">…</span></div>
          </div>
        </div>
        <h3>Auto-generated certification</h3>
        <p>Certificates and compliance records are issued the moment an officer meets the bar — audit-ready, always.</p>
      </div>

      <div class="fcard reveal" data-cursor="Explore">
        <div class="fmedia">
          <span class="ftag">REPORTS</span>
          <div class="mock-cards" style="width:82%;grid-template-columns:1fr 1fr;gap:10px;">
            <div class="mock-card" style="padding:12px;">
              <div class="num" style="font-size:18px;">3.4L</div>
              <div class="lbl">OFFICERS TRAINED</div>
            </div>
            <div class="mock-card" style="padding:12px;">
              <div class="num" style="font-size:18px;">612</div>
              <div class="lbl">DEPARTMENTS</div>
            </div>
          </div>
        </div>
        <h3>Reports ministries can actually use</h3>
        <p>Export capacity-growth reports by state, department, or scheme — formatted for review meetings, not analysts.</p>
      </div>

      <div class="fcard reveal" data-cursor="Explore">
        <div class="fmedia">
          <span class="ftag">ACCESS</span>
          <div style="display:flex;gap:10px;width:80%;">
            <div style="flex:1;height:60px;border-radius:10px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);display:flex;align-items:center;justify-content:center;color:rgba(255,255,255,.5);font-family:var(--mono);font-size:10px;">2G / 3G</div>
            <div style="flex:1;height:60px;border-radius:10px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);display:flex;align-items:center;justify-content:center;color:rgba(255,255,255,.5);font-family:var(--mono);font-size:10px;">Offline mode</div>
          </div>
        </div>
        <h3>Works where officers actually are</h3>
        <p>Low-bandwidth mode and offline-first sync mean training reaches block-level offices, not just state capitals.</p>
      </div>
    </div>
  </section>

  <!-- STAT STRIP -->
  <section style="padding-top:0;padding-bottom:0;">
    <div class="stat-strip" style="border-top:1px solid var(--line);border-bottom:1px solid var(--line);">
      <div class="stat reveal"><h5>3.4<span>L+</span></h5><p>Officers trained</p></div>
      <div class="stat reveal"><h5>612</h5><p>Departments onboarded</p></div>
      <div class="stat reveal"><h5>96<span>%</span></h5><p>Avg. completion rate</p></div>
      <div class="stat reveal"><h5>18</h5><p>States &amp; UTs live</p></div>
    </div>
  </section>

  <!-- PROCESS -->
  <section id="process">
    <div class="sec-head reveal">
      <div>
        <div class="sec-label">How it works · Four steps</div>
        <h2 class="sec-title">From nomination to certificate, in one flow.</h2>
      </div>
    </div>
    <div class="process">
      <div class="p-step reveal">
        <div class="p-num">01 — ONBOARD</div>
        <h4>Nominate officers</h4>
        <p>Departments upload officer rosters or pull them straight from HRMS — no manual entry.</p>
      </div>
      <div class="p-step reveal">
        <div class="p-num">02 — TRAIN</div>
        <h4>Run the programme</h4>
        <p>Officers move through modules, assessments, and live sessions on any device, any bandwidth.</p>
      </div>
      <div class="p-step reveal">
        <div class="p-num">03 — TRACK</div>
        <h4>Watch it happen</h4>
        <p>Supervisors see completion, drop-off, and scores update in real time on a single dashboard.</p>
      </div>
      <div class="p-step reveal">
        <div class="p-num">04 — CERTIFY</div>
        <h4>Close the loop</h4>
        <p>Certificates issue automatically and feed straight into service records and compliance reports.</p>
      </div>
    </div>
  </section>

  <!-- CTA BANNER -->
  <section id="cta" style="padding-top:20px;">
    <div class="cta-banner reveal">
      <h2>Bring your department's training onto one platform.</h2>
      <p>Set up takes under a week. Your officers won't need training to use the training platform.</p>
      <div class="hero-ctas">
        <a href="/signup" class="btn btn-white btn-lg" data-cursor="Let's go">Get Started</a>
        <a href="#" class="btn btn-ghost btn-lg" style="color:#fff;" data-cursor="Talk">Talk to our team</a>
      </div>
    </div>
  </section>

</main>

<footer>
  <div class="wrap">
    <div class="foot-grid">
      <div class="foot-brand">
        <a href="#" class="brand">
          <img src="/logo.png" alt="Capacity Connect" style="height:32px;width:70px;object-fit:contain;object-position:left;clip-path:inset(0 62% 0 0);">
          <span class="brand-name">CAPACITY<span>CONNECT</span></span>
        </a>
        <p>Digital Capacity Building Portal. Government of India · Capacity Building Commission.</p>
      </div>
      <div class="foot-col">
        <h6>PLATFORM</h6>
        <a href="#features">Features</a>
        <a href="#process">How it works</a>
        <a href="#proof">Ministries</a>
        <a href="#">Security</a>
      </div>
      <div class="foot-col">
        <h6>RESOURCES</h6>
        <a href="#">Documentation</a>
        <a href="#">Case studies</a>
        <a href="#">Support</a>
        <a href="#">Status</a>
      </div>
      <div class="foot-col">
        <h6>GOVERNMENT</h6>
        <a href="#">About CBC</a>
        <a href="#">Contact</a>
        <a href="#">RTI</a>
        <a href="#">Accessibility</a>
      </div>
    </div>
    <div class="foot-bottom">
      <span>© 2026 Capacity Building Commission, Government of India. All rights reserved.</span>
      <span>Learn · Train · Grow · Build</span>
    </div>
  </div>
</footer>`;
