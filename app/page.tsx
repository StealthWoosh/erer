"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

/* ──────────────────────────────────────
   Custom Cursor
────────────────────────────────────── */
function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = e.clientX + "px";
        cursorRef.current.style.top = e.clientY + "px";
      }
      setTimeout(() => {
        if (ringRef.current) {
          ringRef.current.style.left = e.clientX + "px";
          ringRef.current.style.top = e.clientY + "px";
        }
      }, 60);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <>
      <div ref={cursorRef} className="cursor" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
}

/* ──────────────────────────────────────
   Phone Frame with real image
────────────────────────────────────── */
function PhoneFrame({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <div
      className={`relative flex-shrink-0 ${className}`}
      style={{
        width: 200,
        height: 433, /* 9:16 ratio at 200px wide */
      }}
    >
      {/* Outer bezel */}
      <div
        className="absolute inset-0 rounded-[2.6rem] overflow-hidden"
        style={{
          background: "#0d0d1a",
          border: "1.5px solid rgba(201,168,76,0.30)",
          boxShadow:
            "0 0 0 5px #0a0a0f, 0 0 0 6.5px rgba(201,168,76,0.10), 0 32px 64px rgba(0,0,0,0.75), inset 0 0 40px rgba(201,168,76,0.04)",
        }}
      >
        {/* Notch */}
        <div
          className="absolute top-2.5 left-1/2 -translate-x-1/2 z-10 rounded-full"
          style={{
            width: 80,
            height: 22,
            background: "#070710",
            border: "1px solid rgba(201,168,76,0.10)",
          }}
        />
        {/* Screenshot */}
        <div className="absolute inset-0 overflow-hidden rounded-[2.6rem]">
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover object-top"
            sizes="200px"
          />
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────
   Section Label
────────────────────────────────────── */
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="inline-block text-xs font-medium tracking-[0.2em] uppercase mb-4 px-4 py-1.5 rounded-full"
      style={{
        color: "var(--gold)",
        background: "rgba(201,168,76,0.1)",
        border: "1px solid rgba(201,168,76,0.22)",
      }}
    >
      {children}
    </div>
  );
}

/* ──────────────────────────────────────
   MAIN PAGE
────────────────────────────────────── */
export default function HomePage() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const screenshots = [
    { src: "/ss1_splash.jpg", alt: "Splash Screen" },
    { src: "/ss2_welcome.jpg", alt: "Welcome Screen" },
    { src: "/ss3_explore.jpg", alt: "Explore / Schedule" },
    { src: "/ss4_games.jpg", alt: "Game List" },
    { src: "/ss5_fruit.jpg", alt: "Fruit Slicing Game" },
  ];

  const features = [
    { icon: "⚔️", title: "Quest-Based Tasks", desc: "Transform every reminder into an epic quest. Complete tasks to earn XP, gold, and rare rewards that power up your hero.", accent: "#C9A84C" },
    { icon: "🏆", title: "Achievement System", desc: "Unlock hundreds of unique achievements across productivity, health, creativity, and more. Show off your rarest badges.", accent: "#6B4FBB" },
    { icon: "🔥", title: "Daily Streaks", desc: "Maintain powerful streak chains that grant escalating bonuses. Missing a day has never felt so dramatic.", accent: "#E85D2A" },
    { icon: "🎮", title: "Mini Games", desc: "Unlock fun mini-games like Fruit Slicing as rewards. Play between tasks to refresh your mind and earn bonus XP.", accent: "#1AADA8" },
    { icon: "📅", title: "Smart Scheduling", desc: "Create and manage your schedule effortlessly. TimeQue learns your patterns and suggests the perfect time for every task.", accent: "#E84CA4" },
    { icon: "📊", title: "Progress Tracking", desc: "Beautiful dashboards reveal your productivity patterns, peak performance hours, and habit strength in vivid detail.", accent: "#4CAF8C" },
  ];

  const reviews = [
    { name: "Aditya R.", handle: "@aditya_dev", text: "TimeQue turned my boring to-do list into something I actually look forward to. The XP system is addictive in the best way possible.", stars: 5 },
    { name: "Sari W.", handle: "@sariworks", text: "Finally an app that understands how my brain works. Completing tasks feels like winning — every single time.", stars: 5 },
    { name: "Marcus L.", handle: "@marcusliu", text: "The streak mechanics alone changed my morning routine completely. 60-day streak and counting!", stars: 5 },
    { name: "Priya K.", handle: "@priyakodes", text: "Beautiful design, smart reminders, and the game rewards keep me accountable. Absolute game changer.", stars: 5 },
    { name: "Johan S.", handle: "@johanstudio", text: "I've tried every productivity app out there. TimeQue is the first one I actually stuck with for more than a week.", stars: 5 },
    { name: "Laila M.", handle: "@lailamaker", text: "The mini-games as rewards? Genius idea. My whole team uses it now and we compete on the leaderboard daily.", stars: 5 },
  ];

  return (
    <main style={{ background: "var(--obsidian)", minHeight: "100vh", cursor: "none" }}>
      <CustomCursor />

      {/* ════════════════════════════
          NAV
      ════════════════════════════ */}
      <nav
        className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-8 py-5 transition-all duration-500"
        style={{
          background: scrollY > 60 ? "rgba(10,10,15,0.92)" : "transparent",
          backdropFilter: scrollY > 60 ? "blur(24px)" : "none",
          borderBottom: scrollY > 60 ? "1px solid rgba(201,168,76,0.08)" : "none",
        }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center text-base font-bold"
            style={{ background: "linear-gradient(135deg, var(--gold), var(--accent-purple))" }}
          >
            ⏱
          </div>
          <span className="font-display text-xl font-semibold tracking-wide" style={{ color: "var(--text-primary)" }}>
            TimeQue
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {["Features", "Screenshots", "Reviews", "Download"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-sm transition-colors duration-300"
              style={{ color: "var(--text-muted)", cursor: "none" }}
              onMouseEnter={e => (e.currentTarget.style.color = "var(--gold)")}
              onMouseLeave={e => (e.currentTarget.style.color = "var(--text-muted)")}
            >
              {item}
            </a>
          ))}
        </div>

        <a
          href="#download"
          className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300"
          style={{
            background: "linear-gradient(135deg, var(--gold), var(--gold-dark))",
            color: "#0a0a0f",
            cursor: "none",
          }}
          onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.05)")}
          onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
        >
          Get App ↗
        </a>
      </nav>

      {/* ════════════════════════════
          HERO
      ════════════════════════════ */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-28 pb-16 overflow-hidden">
        {/* Background orbs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute rounded-full blur-3xl" style={{ width: 700, height: 700, top: "-15%", left: "55%", background: "radial-gradient(circle, rgba(107,79,187,0.18) 0%, transparent 70%)" }} />
          <div className="absolute rounded-full blur-3xl" style={{ width: 500, height: 500, top: "25%", left: "-20%", background: "radial-gradient(circle, rgba(201,168,76,0.10) 0%, transparent 70%)" }} />
          <div className="absolute rounded-full blur-3xl" style={{ width: 400, height: 400, bottom: "5%", right: "5%", background: "radial-gradient(circle, rgba(26,173,168,0.10) 0%, transparent 70%)" }} />
        </div>

        {/* Badge */}
        <div
          className="fade-in-up delay-1 inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium mb-8"
          style={{ background: "rgba(201,168,76,0.10)", border: "1px solid rgba(201,168,76,0.25)", color: "var(--gold-light)" }}
        >
          <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: "var(--gold)", boxShadow: "0 0 6px var(--gold)" }} />
          Now Available — Version 2.0
        </div>

        {/* Headline */}
        <h1
          className="fade-in-up delay-2 font-display font-semibold tracking-tight mb-6"
          style={{ fontSize: "clamp(2.8rem, 7.5vw, 6.5rem)", lineHeight: 1.0, maxWidth: 860 }}
        >
          Your Time,{" "}
          <span className="gold-shimmer">Gamified.</span>
          <br />
          <span style={{ color: "rgba(245,240,232,0.45)" }}>Your Quest, Legendary.</span>
        </h1>

        {/* Sub */}
        <p
          className="fade-in-up delay-3 text-lg leading-relaxed mb-10"
          style={{ color: "var(--text-muted)", maxWidth: 520 }}
        >
          TimeQue transforms ordinary reminders into epic adventures. Level up your
          habits, earn rare rewards, and conquer every deadline — one quest at a time.
        </p>

        {/* CTAs */}
        <div className="fade-in-up delay-4 flex flex-col sm:flex-row items-center gap-4 mb-20">
          <a
            href="#download"
            className="flex items-center gap-3 px-8 py-4 rounded-2xl text-base font-medium transition-all duration-300"
            style={{
              background: "linear-gradient(135deg, var(--gold), #A8731C)",
              color: "#0a0a0f",
              cursor: "none",
              boxShadow: "0 8px 32px rgba(201,168,76,0.3)",
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.05)"; e.currentTarget.style.boxShadow = "0 12px 40px rgba(201,168,76,0.45)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "0 8px 32px rgba(201,168,76,0.3)"; }}
          >
            ⬇ Download Free
          </a>
          <a
            href="#features"
            className="flex items-center gap-2 px-8 py-4 rounded-2xl text-base transition-all duration-300"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.10)", color: "var(--text-primary)", cursor: "none" }}
            onMouseEnter={e => e.currentTarget.style.transform = "scale(1.04)"}
            onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
          >
            Explore Features →
          </a>
        </div>

        {/* Hero phones — 3 phones centered */}
        <div className="fade-in-up delay-5 relative w-full flex items-end justify-center gap-6">
          <div className="hidden lg:block float-delay" style={{ transform: "rotate(-7deg) translateY(28px)", opacity: 0.75 }}>
            <PhoneFrame src="/ss2_welcome.jpg" alt="Welcome Screen" />
          </div>
          <div className="float relative z-10">
            <div className="absolute -inset-6 rounded-[3.5rem] blur-2xl opacity-60" style={{ background: "linear-gradient(135deg, rgba(201,168,76,0.2), rgba(107,79,187,0.15))" }} />
            <PhoneFrame src="/ss1_splash.jpg" alt="Splash Screen" />
          </div>
          <div className="hidden lg:block float-delay-2" style={{ transform: "rotate(7deg) translateY(28px)", opacity: 0.75 }}>
            <PhoneFrame src="/ss3_explore.jpg" alt="Explore Screen" />
          </div>
        </div>
      </section>

      {/* ════════════════════════════
          STATS
      ════════════════════════════ */}
      <section className="relative py-20 px-6">
        <div className="absolute inset-x-0 h-px top-0" style={{ background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.3), transparent)" }} />
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { value: "2.4M+", label: "Active Questers", icon: "👥" },
            { value: "98%", label: "User Satisfaction", icon: "⭐" },
            { value: "340M", label: "Tasks Completed", icon: "✅" },
            { value: "4.9★", label: "App Store Rating", icon: "🏆" },
          ].map((s) => (
            <div
              key={s.label}
              className="p-6 rounded-2xl flex flex-col gap-2"
              style={{ background: "linear-gradient(135deg, rgba(28,28,46,0.8), rgba(20,20,32,0.9))", border: "1px solid rgba(201,168,76,0.15)" }}
            >
              <div className="text-2xl mb-1">{s.icon}</div>
              <div className="font-display text-3xl font-semibold gold-shimmer" style={{ lineHeight: 1.1 }}>{s.value}</div>
              <div className="text-sm" style={{ color: "var(--text-muted)" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ════════════════════════════
          FEATURES
      ════════════════════════════ */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <SectionLabel>Core Features</SectionLabel>
            <h2 className="font-display font-semibold mb-4" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", lineHeight: 1.1 }}>
              Everything you need to{" "}
              <span className="gold-shimmer">master time</span>
            </h2>
            <p className="text-lg max-w-xl mx-auto" style={{ color: "var(--text-muted)" }}>
              A powerful suite of gamification tools designed to make productivity feel like the adventure it truly is.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f) => (
              <div
                key={f.title}
                className="group relative p-7 rounded-3xl overflow-hidden transition-all duration-400"
                style={{
                  background: "linear-gradient(135deg, rgba(20,20,32,0.95), rgba(15,15,26,0.95))",
                  border: "1px solid rgba(201,168,76,0.10)",
                  cursor: "none",
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.borderColor = `${f.accent}30`; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.borderColor = "rgba(201,168,76,0.10)"; }}
              >
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl mb-5"
                  style={{ background: `linear-gradient(135deg, ${f.accent}28, ${f.accent}10)`, border: `1px solid ${f.accent}30` }}
                >
                  {f.icon}
                </div>
                <h3 className="font-display text-xl font-semibold mb-2" style={{ color: "var(--text-primary)" }}>{f.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════
          SCREENSHOTS
      ════════════════════════════ */}
      <section id="screenshots" className="py-24 px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <SectionLabel>App Previews</SectionLabel>
            <h2 className="font-display font-semibold mb-4" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", lineHeight: 1.1 }}>
              Crafted with{" "}
              <span className="gold-shimmer">obsessive detail</span>
            </h2>
            <p className="text-lg max-w-xl mx-auto" style={{ color: "var(--text-muted)" }}>
              Every screen meticulously designed to inspire action and delight the senses.
            </p>
          </div>

          {/* 5 phones in a row, centered, responsive */}
          <div className="flex items-end justify-center gap-4 flex-wrap md:flex-nowrap">
            {screenshots.map((s, i) => {
              const isCenter = i === 2;
              const sideOffset = Math.abs(i - 2);
              const rotations = [-10, -5, 0, 5, 10];
              const yOffsets = [40, 20, 0, 20, 40];
              const opacities = [0.65, 0.82, 1, 0.82, 0.65];
              return (
                <div
                  key={s.src}
                  className={isCenter ? "float relative z-10" : sideOffset === 1 ? "float-delay" : "float-delay-2 hidden md:block"}
                  style={{
                    transform: `rotate(${rotations[i]}deg) translateY(${yOffsets[i]}px)`,
                    opacity: opacities[i],
                    flexShrink: 0,
                  }}
                >
                  {isCenter && (
                    <div
                      className="absolute -inset-6 rounded-[3.5rem] blur-2xl opacity-50"
                      style={{ background: "linear-gradient(135deg, rgba(201,168,76,0.2), rgba(107,79,187,0.15))" }}
                    />
                  )}
                  <PhoneFrame src={s.src} alt={s.alt} />
                </div>
              );
            })}
          </div>

          {/* Labels below */}
          <div className="flex justify-center gap-4 mt-16 flex-wrap">
            {screenshots.map((s) => (
              <div
                key={s.alt}
                className="px-3 py-1.5 rounded-full text-xs"
                style={{ background: "rgba(201,168,76,0.08)", border: "1px solid rgba(201,168,76,0.15)", color: "var(--gold-light)" }}
              >
                {s.alt}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════
          HOW IT WORKS
      ════════════════════════════ */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <SectionLabel>How It Works</SectionLabel>
            <h2 className="font-display font-semibold" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", lineHeight: 1.1 }}>
              Three steps to{" "}
              <span className="gold-shimmer">legendary productivity</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 relative">
            {/* Connector line */}
            <div
              className="hidden md:block absolute top-10 h-px"
              style={{
                left: "calc(16.67% + 2.5rem)",
                right: "calc(16.67% + 2.5rem)",
                background: "linear-gradient(90deg, var(--gold), var(--accent-purple), var(--accent-teal))",
                opacity: 0.25,
              }}
            />
            {[
              { num: "01", title: "Create Your Hero", desc: "Set up your character, choose your class, and define the habit domains you want to conquer.", color: "var(--gold)", icon: "🧙" },
              { num: "02", title: "Accept Quests", desc: "Add tasks and reminders as quests. Assign difficulty, XP rewards, and deadline enchantments.", color: "var(--accent-purple)", icon: "📜" },
              { num: "03", title: "Conquer & Earn", desc: "Complete quests, earn XP, unlock mini-games and rare skills. Watch your productivity legend grow.", color: "var(--accent-teal)", icon: "⚡" },
            ].map((step) => (
              <div
                key={step.num}
                className="relative p-8 rounded-3xl text-center"
                style={{ background: "linear-gradient(135deg, rgba(20,20,32,0.9), rgba(15,15,26,0.9))", border: `1px solid ${step.color}20` }}
              >
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-5"
                  style={{ background: `linear-gradient(135deg, ${step.color}22, ${step.color}08)`, border: `1px solid ${step.color}30` }}
                >
                  {step.icon}
                </div>
                <div className="font-display text-5xl font-bold mb-3 opacity-15" style={{ color: step.color }}>{step.num}</div>
                <h3 className="font-display text-xl font-semibold mb-3" style={{ color: "var(--text-primary)" }}>{step.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════
          REVIEWS
      ════════════════════════════ */}
      <section id="reviews" className="py-24 overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 text-center mb-16">
          <SectionLabel>Testimonials</SectionLabel>
          <h2 className="font-display font-semibold" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", lineHeight: 1.1 }}>
            Questers <span className="gold-shimmer">worldwide</span> are winning
          </h2>
        </div>

        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none" style={{ background: "linear-gradient(90deg, var(--obsidian), transparent)" }} />
          <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none" style={{ background: "linear-gradient(-90deg, var(--obsidian), transparent)" }} />

          <div className="flex gap-5 scroll-left" style={{ width: "max-content" }}>
            {[...reviews, ...reviews].map((r, i) => (
              <div
                key={i}
                className="shrink-0 p-6 rounded-3xl w-72"
                style={{
                  background: "linear-gradient(135deg, rgba(28,28,46,0.9), rgba(20,20,32,0.9))",
                  border: "1px solid rgba(201,168,76,0.12)",
                }}
              >
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: r.stars }).map((_, j) => (
                    <span key={j} style={{ color: "var(--gold)", fontSize: 14 }}>★</span>
                  ))}
                </div>
                <p className="text-sm leading-relaxed mb-4" style={{ color: "rgba(245,240,232,0.80)" }}>"{r.text}"</p>
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold text-white"
                    style={{ background: "linear-gradient(135deg, var(--gold-dark), var(--accent-purple))" }}
                  >
                    {r.name[0]}
                  </div>
                  <div>
                    <div className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>{r.name}</div>
                    <div className="text-xs" style={{ color: "var(--text-muted)" }}>{r.handle}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════
          DOWNLOAD
      ════════════════════════════ */}
      <section id="download" className="py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(107,79,187,0.14) 0%, rgba(201,168,76,0.06) 40%, transparent 70%)" }} />
        <div className="absolute inset-x-0 h-px top-0" style={{ background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.4), transparent)" }} />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <SectionLabel>Begin Your Quest</SectionLabel>

          <h2
            className="font-display font-semibold mb-6"
            style={{ fontSize: "clamp(2.5rem, 7vw, 5.5rem)", lineHeight: 1.0 }}
          >
            Download{" "}
            <span className="gold-shimmer">TimeQue</span>
            <br />
            <span style={{ color: "rgba(245,240,232,0.40)" }}>for free today</span>
          </h2>

          <p className="text-lg mb-14 max-w-lg mx-auto" style={{ color: "var(--text-muted)" }}>
            Join over 2.4 million questers who have already transformed their daily
            routine into an unforgettable adventure.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
            {[
              { icon: "🍎", sub: "Download on the", platform: "App Store" },
              { icon: "▶", sub: "Get it on", platform: "Google Play" },
            ].map((btn) => (
              <button
                key={btn.platform}
                className="flex items-center gap-4 px-8 py-4 rounded-2xl transition-all duration-300 glow-pulse"
                style={{
                  background: "linear-gradient(135deg, rgba(201,168,76,0.12), rgba(107,79,187,0.08))",
                  border: "1px solid rgba(201,168,76,0.35)",
                  cursor: "none",
                }}
                onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
                onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
              >
                <span className="text-3xl">{btn.icon}</span>
                <div className="text-left">
                  <div className="text-xs" style={{ color: "var(--text-muted)" }}>{btn.sub}</div>
                  <div className="font-display text-lg font-semibold" style={{ color: "var(--gold-light)" }}>{btn.platform}</div>
                </div>
              </button>
            ))}
          </div>

          {/* Mini phone preview under download */}
          <div className="flex justify-center gap-6 mt-4">
            <div className="float opacity-80">
              <PhoneFrame src="/ss1_splash.jpg" alt="Splash" />
            </div>
            <div className="float-delay" style={{ marginTop: 24 }}>
              <PhoneFrame src="/ss3_explore.jpg" alt="Explore" />
            </div>
            <div className="float-delay-2 opacity-80">
              <PhoneFrame src="/ss5_fruit.jpg" alt="Game" />
            </div>
          </div>

          <p className="text-xs mt-10" style={{ color: "rgba(255,255,255,0.18)" }}>
            Free to download · In-app purchases available · iOS 15+ & Android 10+
          </p>
        </div>
      </section>

      {/* ════════════════════════════
          FOOTER
      ════════════════════════════ */}
      <footer className="py-12 px-6 text-center" style={{ borderTop: "1px solid rgba(201,168,76,0.08)" }}>
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-7 h-7 rounded-xl flex items-center justify-center text-sm" style={{ background: "linear-gradient(135deg, var(--gold), var(--accent-purple))" }}>⏱</div>
          <span className="font-display text-lg font-semibold" style={{ color: "var(--text-primary)" }}>TimeQue</span>
        </div>
        <p className="text-xs mb-6" style={{ color: "var(--text-muted)" }}>Making every moment legendary.</p>
        <div className="flex items-center justify-center gap-6 text-xs mb-4" style={{ color: "rgba(255,255,255,0.25)" }}>
          <span style={{ cursor: "none" }}>Privacy Policy</span>
          <span>·</span>
          <span style={{ cursor: "none" }}>Terms of Service</span>
          <span>·</span>
          <span style={{ cursor: "none" }}>Contact</span>
        </div>
        <p className="text-xs" style={{ color: "rgba(255,255,255,0.10)" }}>© 2025 TimeQue. All rights reserved.</p>
      </footer>
    </main>
  );
}
