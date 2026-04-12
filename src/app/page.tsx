"use client";

import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { useConvexAuth, useMutation } from "convex/react";
import {
  Check,
  Cloud,
  Grid3X3,
  LayoutTemplate,
  MousePointer2,
  PenSquare,
  Rocket,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Star,
  StickyNote,
  Target,
  UserPlus,
  Users,
  Waves,
  X,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { api } from "../../convex/_generated/api";

export default function Home() {
  const { isAuthenticated } = useConvexAuth();
  const storeUser = useMutation(api.user.store);
  const [scrolled, setScrolled] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    if (isAuthenticated) {
      void storeUser({});
    }
  }, [isAuthenticated, storeUser]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    const revealEls = document.querySelectorAll(".reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );

    revealEls.forEach((el) => observer.observe(el));
    document.querySelectorAll("#hero .reveal").forEach((el) => {
      window.setTimeout(() => el.classList.add("visible"), 100);
    });

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      revealEls.forEach((el) => observer.unobserve(el));
      observer.disconnect();
    };
  }, []);

  return (
    <div className="landing-root">
      <nav className={scrolled ? "scrolled" : ""}>
        <div className="container">
          <div className="nav-inner">
            <a href="#" className="logo">
              <div className="logo-icon">
                <Grid3X3 size={18} />
              </div>
              CollaboBoard
            </a>

            <ul className="nav-links">
              <li>
                <a href="#features">Features</a>
              </li>
              <li>
                <a href="#howitworks">How it works</a>
              </li>
              <li>
                <a href="#pricing">Pricing</a>
              </li>
              <li>
                <a href="#faq">FAQ</a>
              </li>
            </ul>

            <div className="nav-cta">
              <SignedOut>
                <SignInButton mode="modal">
                  <button className="btn btn-outline nav-btn">Sign in</button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <button className="btn btn-primary nav-btn">
                    Get started free
                  </button>
                </SignUpButton>
              </SignedOut>

              <SignedIn>
                <Link href="/dashboard" className="btn btn-primary nav-btn">
                  Open Dashboard
                </Link>
                <UserButton afterSignOutUrl="/" />
              </SignedIn>
            </div>
          </div>
        </div>
      </nav>

      <section id="hero">
        <div className="hero-bg" />
        <div className="hero-grid" />
        <div className="container">
          <div className="hero-content">
            <div
              className="chip reveal"
              style={{ marginBottom: 24, display: "inline-flex" }}
            >
              <Sparkles size={14} />
              Real-time collaboration, reinvented
            </div>
            <h1 className="hero-headline reveal reveal-delay-1">
              Your team&apos;s ideas,
              <br />
              <span className="gradient-text">alive in real-time.</span>
            </h1>
            <p className="hero-sub reveal reveal-delay-2">
              CollaboBoard is a blazing-fast collaborative whiteboard where your
              team can brainstorm, organize, and build together, no matter where
              they are.
            </p>
            <div className="hero-cta reveal reveal-delay-3">
              <SignedOut>
                <SignUpButton mode="modal">
                  <button className="btn btn-primary">
                    <Sparkles size={16} /> Start Collaborating Free
                  </button>
                </SignUpButton>
              </SignedOut>
              <SignedIn>
                <Link href="/dashboard" className="btn btn-primary">
                  <Sparkles size={16} /> Go to Dashboard
                </Link>
              </SignedIn>
              <a href="#preview" className="btn btn-outline">
                See it in action
              </a>
            </div>
            <div className="hero-social reveal reveal-delay-4">
              <div className="avatar-row">
                <div className="avatar a1">S</div>
                <div className="avatar a2">J</div>
                <div className="avatar a3">M</div>
                <div className="avatar a4">R</div>
                <div className="avatar a5">A</div>
              </div>
              <div className="stars" aria-label="5 star rating">
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
              </div>
              <div style={{ marginTop: 6, fontSize: 13 }}>
                Loved by <strong>12,000+</strong> teams worldwide
              </div>
            </div>
          </div>

          <div className="hero-visual reveal reveal-delay-5">
            <div className="board-window">
              <div className="board-toolbar">
                <div className="traffic-lights">
                  <div className="tl red" />
                  <div className="tl yellow" />
                  <div className="tl green" />
                </div>
                <div className="board-title-bar">
                  Sprint Planning - CollaboBoard
                </div>
                <div className="board-collab">
                  <div className="avatar a2 small">J</div>
                  <div className="avatar a3 small">M</div>
                  <div className="avatar a4 small">R</div>
                </div>
              </div>
              <div className="board-canvas">
                <div className="sticky s1">
                  <div className="sticky-tag">To Do</div>
                  Design new onboarding flow for v2 launch
                </div>
                <div className="sticky s2">
                  <div className="sticky-tag">In Progress</div>
                  API rate limit refactor, James working
                </div>
                <div className="sticky s3">
                  <div className="sticky-tag">Done</div>
                  Auth system migration complete
                </div>
                <div className="sticky s4">
                  <div className="sticky-tag">Idea</div>
                  Add AI summarize feature to boards
                </div>
                <div className="sticky s5">
                  <div className="sticky-tag">Next Up</div>
                  Mobile app beta testing phase
                </div>
                <div className="sticky s6">
                  <div className="sticky-tag">Blocker</div>
                  Need design review before dev
                </div>

                <div className="cursor cursor1">
                  <MousePointer2 size={18} className="cursor-icon blue" />
                  <span className="cursor-label blue">James</span>
                </div>
                <div className="cursor cursor2">
                  <MousePointer2 size={18} className="cursor-icon indigo" />
                  <span className="cursor-label indigo">Maya</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="trust">
        <div className="container">
          <div className="trust-label reveal">
            Trusted by teams at world-class companies
          </div>
          <div className="logos-row reveal reveal-delay-1">
            <div className="logo-pill">
              <Zap size={18} /> Vercel
            </div>
            <div className="logo-pill">
              <LayoutTemplate size={18} /> Notion
            </div>
            <div className="logo-pill">
              <Waves size={18} /> Linear
            </div>
            <div className="logo-pill">
              <Cloud size={18} /> Loom
            </div>
            <div className="logo-pill">
              <Target size={18} /> Figma
            </div>
            <div className="logo-pill">
              <Rocket size={18} /> Framer
            </div>
          </div>
        </div>
      </section>

      <section id="features">
        <div className="container">
          <div className="features-header">
            <div className="section-label reveal">Why CollaboBoard</div>
            <div className="section-title reveal reveal-delay-1">
              Everything your team
              <br />
              needs to think better.
            </div>
            <p className="section-sub reveal reveal-delay-2">
              Built for speed, designed for clarity. CollaboBoard keeps your
              team in flow, not in meetings.
            </p>
          </div>

          <div className="features-grid">
            <article className="feature-card reveal">
              <div
                className="feature-icon"
                style={{ background: "rgba(37,99,235,0.1)" }}
              >
                <Zap size={24} />
              </div>
              <h3>Real-Time Sync</h3>
              <p>
                Every note, every move, every change is reflected instantly for
                your whole team.
              </p>
            </article>

            <article className="feature-card reveal reveal-delay-1">
              <div
                className="feature-icon"
                style={{ background: "rgba(16,185,129,0.1)" }}
              >
                <MousePointer2 size={24} />
              </div>
              <h3>Live Cursor Presence</h3>
              <p>
                See exactly where teammates are working in real time with clear
                visual presence.
              </p>
            </article>

            <article className="feature-card reveal reveal-delay-2">
              <div
                className="feature-icon"
                style={{ background: "rgba(249,115,22,0.1)" }}
              >
                <StickyNote size={24} />
              </div>
              <h3>Drag and Drop Notes</h3>
              <p>
                Create, move, and organize sticky notes with smooth, fluid
                interactions.
              </p>
            </article>

            <article className="feature-card reveal reveal-delay-3">
              <div
                className="feature-icon"
                style={{ background: "rgba(79,70,229,0.1)" }}
              >
                <UserPlus size={24} />
              </div>
              <h3>Instant Invites</h3>
              <p>
                Invite members by board ID or email and collaborate without
                friction.
              </p>
            </article>

            <article className="feature-card reveal reveal-delay-4">
              <div
                className="feature-icon"
                style={{ background: "rgba(236,72,153,0.1)" }}
              >
                <Grid3X3 size={24} />
              </div>
              <h3>Infinite Thinking Space</h3>
              <p>
                Use a spacious visual board layout designed for brainstorming at
                team scale.
              </p>
            </article>

            <article className="feature-card reveal reveal-delay-5">
              <div
                className="feature-icon"
                style={{ background: "rgba(245,158,11,0.1)" }}
              >
                <ShieldCheck size={24} />
              </div>
              <h3>Secure by Default</h3>
              <p>
                Authentication and protected routes keep your collaborative
                workspace private.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section id="preview">
        <div className="container">
          <div className="preview-wrapper">
            <div className="preview-text">
              <div className="section-label reveal">Product Experience</div>
              <div className="section-title reveal reveal-delay-1">
                Watch your ideas
                <br />
                come alive.
              </div>
              <p className="section-sub reveal reveal-delay-2">
                No more dead documents. CollaboBoard transforms how your team
                thinks together, visually, spatially, and in real time.
              </p>

              <div className="preview-feature-list reveal reveal-delay-3">
                <article className="pf-item">
                  <div className="pf-icon">
                    <Target size={22} />
                  </div>
                  <div>
                    <h4>Zero-latency collaboration</h4>
                    <p>
                      Sub-100ms sync keeps everyone perfectly in step, even
                      across continents.
                    </p>
                  </div>
                </article>
                <article className="pf-item">
                  <div className="pf-icon">
                    <Sparkles size={22} />
                  </div>
                  <div>
                    <h4>Intuitive by design</h4>
                    <p>
                      First-time users are productive quickly with familiar
                      interactions.
                    </p>
                  </div>
                </article>
                <article className="pf-item">
                  <div className="pf-icon">
                    <Smartphone size={22} />
                  </div>
                  <div>
                    <h4>Works everywhere</h4>
                    <p>
                      Desktop, mobile, tablet with responsive layout and
                      touch-friendly controls.
                    </p>
                  </div>
                </article>
              </div>
            </div>

            <div className="preview-board-wrap reveal reveal-delay-2">
              <div className="preview-board">
                <div className="pb-header">
                  <div className="traffic-lights">
                    <div className="tl red" />
                    <div className="tl yellow" />
                    <div className="tl green" />
                  </div>
                  <div className="pb-title">Product Roadmap Q3</div>
                </div>

                <div className="pb-canvas">
                  <div className="pb-s1">
                    <div className="pb-tag">Launch</div>
                    Ship mobile app beta to 500 users
                  </div>
                  <div className="pb-s2">
                    <div className="pb-tag">Idea</div>
                    AI-powered note clustering feature
                  </div>
                  <div className="pb-s3">
                    <div className="pb-tag">Done</div>
                    Real-time cursor presence shipped
                  </div>
                  <div className="pb-s4">
                    <div className="pb-tag">In Review</div>
                    Design system v2 component library
                  </div>

                  <div className="pb-cursor1">
                    <MousePointer2 size={16} className="cursor-icon blue" />
                    <span className="pb-cursor-label blue">Alex</span>
                  </div>
                  <div className="pb-cursor2">
                    <MousePointer2 size={16} className="cursor-icon green" />
                    <span className="pb-cursor-label green">Sara</span>
                  </div>

                  <div className="pb-presence">
                    <div className="presence-dot" />3 people are online
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="howitworks">
        <div className="container">
          <div style={{ textAlign: "center" }}>
            <div className="section-label reveal">How It Works</div>
            <div className="section-title reveal reveal-delay-1">
              Up and running
              <br />
              in three steps.
            </div>
            <p
              className="section-sub reveal reveal-delay-2"
              style={{ margin: "0 auto" }}
            >
              From zero to collaborating in under a minute.
            </p>
          </div>
          <div className="steps-grid">
            <article className="step-card reveal">
              <div className="step-num">1</div>
              <div className="step-icon">
                <LayoutTemplate size={28} />
              </div>
              <h3>Create Your Board</h3>
              <p>
                Start a board in seconds and prepare a clean workspace for your
                team.
              </p>
            </article>
            <article className="step-card reveal reveal-delay-2">
              <div className="step-num">2</div>
              <div className="step-icon">
                <PenSquare size={28} />
              </div>
              <h3>Add Sticky Notes</h3>
              <p>
                Capture ideas, move cards, and color-code priorities directly on
                the canvas.
              </p>
            </article>
            <article className="step-card reveal reveal-delay-4">
              <div className="step-num">3</div>
              <div className="step-icon">
                <Users size={28} />
              </div>
              <h3>Collaborate Live</h3>
              <p>
                Share access and work simultaneously with live cursor and member
                presence.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section id="testimonials">
        <div className="container">
          <div style={{ textAlign: "center" }}>
            <div className="section-label reveal">Testimonials</div>
            <div className="section-title reveal reveal-delay-1">
              Teams love CollaboBoard.
            </div>
          </div>

          <div className="testimonials-grid">
            {[
              {
                quote:
                  "We replaced heavier tooling with CollaboBoard and sprint planning became dramatically faster.",
                name: "Sarah Chen",
                role: "Head of Product, Flowline",
                cls: "a1",
                initial: "S",
              },
              {
                quote:
                  "Live cursor presence changed how our remote team collaborates. It finally feels like one room.",
                name: "Marcus Rivera",
                role: "Engineering Manager, Orbit Labs",
                cls: "a2",
                initial: "M",
              },
              {
                quote:
                  "This is our shared thinking space for user journeys, brainstorming, and feature planning.",
                name: "Anya Patel",
                role: "Co-founder, Buildspace Cohort",
                cls: "a3",
                initial: "A",
              },
            ].map((t) => (
              <article className="testi-card reveal" key={t.name}>
                <div className="testi-stars" aria-label="5 star rating">
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                </div>
                <p className="testi-quote">&quot;{t.quote}&quot;</p>
                <div className="testi-author">
                  <div className={`testi-avatar ${t.cls}`}>{t.initial}</div>
                  <div>
                    <div className="testi-name">{t.name}</div>
                    <div className="testi-role">{t.role}</div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing">
        <div className="container">
          <div style={{ textAlign: "center" }}>
            <div className="section-label reveal">Pricing</div>
            <div className="section-title reveal reveal-delay-1">
              Simple, honest pricing.
            </div>
            <p
              className="section-sub reveal reveal-delay-2"
              style={{ margin: "0 auto" }}
            >
              Start free and scale when your team grows.
            </p>
          </div>
          <div className="pricing-grid">
            <article className="plan-card reveal">
              <div className="plan-name">Free</div>
              <div className="plan-desc">
                Perfect for individuals and small experiments
              </div>
              <div className="plan-price">
                <span className="amount">$0</span>
                <span className="period">/ forever</span>
              </div>
              <ul className="plan-features">
                <li>
                  <Check className="check" size={16} /> 3 boards
                </li>
                <li>
                  <Check className="check" size={16} /> Up to 5 collaborators
                </li>
                <li>
                  <Check className="check" size={16} /> Unlimited sticky notes
                </li>
                <li>
                  <Check className="check" size={16} /> Real-time collaboration
                </li>
                <li>
                  <X className="cross" size={16} /> Custom board themes
                </li>
                <li>
                  <X className="cross" size={16} /> Export PDF / PNG
                </li>
              </ul>
              <SignedOut>
                <SignUpButton mode="modal">
                  <button className="btn btn-outline full">
                    Get started free
                  </button>
                </SignUpButton>
              </SignedOut>
              <SignedIn>
                <Link href="/dashboard" className="btn btn-outline full">
                  Open dashboard
                </Link>
              </SignedIn>
            </article>

            <article className="plan-card featured reveal reveal-delay-2">
              <div className="plan-badge">Most Popular</div>
              <div className="plan-name">Pro</div>
              <div className="plan-desc">
                For growing teams who need more power
              </div>
              <div className="plan-price">
                <span className="amount gradient-text">$12</span>
                <span className="period">/ user / month</span>
              </div>
              <ul className="plan-features">
                <li>
                  <Check className="check" size={16} /> Unlimited boards
                </li>
                <li>
                  <Check className="check" size={16} /> Unlimited collaborators
                </li>
                <li>
                  <Check className="check" size={16} /> Role permissions
                </li>
                <li>
                  <Check className="check" size={16} /> Export capabilities
                </li>
                <li>
                  <Check className="check" size={16} /> Priority support
                </li>
              </ul>
              <SignedOut>
                <SignUpButton mode="modal">
                  <button className="btn btn-primary full">
                    Start Pro trial
                  </button>
                </SignUpButton>
              </SignedOut>
              <SignedIn>
                <Link href="/dashboard" className="btn btn-primary full">
                  Continue to app
                </Link>
              </SignedIn>
            </article>

            <article className="plan-card reveal reveal-delay-4">
              <div className="plan-name">Enterprise</div>
              <div className="plan-desc">Custom plans for organizations</div>
              <div className="plan-price">
                <span className="amount" style={{ fontSize: 36 }}>
                  Custom
                </span>
              </div>
              <ul className="plan-features">
                <li>
                  <Check className="check" size={16} /> Everything in Pro
                </li>
                <li>
                  <Check className="check" size={16} /> SSO / SAML
                </li>
                <li>
                  <Check className="check" size={16} /> Admin controls
                </li>
                <li>
                  <Check className="check" size={16} /> Audit logs
                </li>
              </ul>
              <a href="#" className="btn btn-outline full">
                Contact sales
              </a>
            </article>
          </div>
        </div>
      </section>

      <section id="faq">
        <div className="container">
          <div style={{ textAlign: "center" }}>
            <div className="section-label reveal">FAQ</div>
            <div className="section-title reveal reveal-delay-1">
              Questions? We have answers.
            </div>
          </div>
          <div className="faq-list">
            {[
              {
                q: "How does real-time collaboration work?",
                a: "CollaboBoard uses Convex realtime queries and mutations so note and presence changes are propagated immediately to connected users.",
              },
              {
                q: "Do collaborators need accounts?",
                a: "Editors authenticate using Clerk. This keeps board access secure and tied to user identity.",
              },
              {
                q: "Is data secure?",
                a: "Route protection is enforced with Clerk middleware and backend functions use authenticated identity checks before sensitive operations.",
              },
            ].map((item, index) => (
              <div
                className={`faq-item reveal ${openFaq === index ? "open" : ""}`}
                key={item.q}
              >
                <button
                  className="faq-q"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                >
                  {item.q}
                  <div className="faq-icon">+</div>
                </button>
                <div className="faq-a">{item.a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="cta">
        <div className="cta-dots" />
        <div className="container cta-content">
          <div
            className="section-label reveal"
            style={{ color: "rgba(255,255,255,0.5)" }}
          >
            Get started today
          </div>
          <h2 className="cta-title reveal reveal-delay-1">
            Stop meeting.
            <br />
            Start building.
          </h2>
          <p className="cta-sub reveal reveal-delay-2">
            Join teams who think better with CollaboBoard. Free forever, no
            credit card needed.
          </p>
          <div className="reveal reveal-delay-3">
            <SignedOut>
              <SignUpButton mode="modal">
                <button className="btn btn-white">
                  Create your free board
                </button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <Link href="/dashboard" className="btn btn-white">
                Go to dashboard
              </Link>
            </SignedIn>
          </div>
        </div>
      </section>

      <footer>
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <a href="#" className="logo">
                <div className="logo-icon">
                  <Grid3X3 size={18} />
                </div>
                CollaboBoard
              </a>
              <p>
                The real-time collaborative whiteboard for teams who value
                clarity, speed, and great ideas.
              </p>
            </div>

            <div className="footer-col">
              <h4>Product</h4>
              <ul>
                <li>
                  <a href="#features">Features</a>
                </li>
                <li>
                  <a href="#pricing">Pricing</a>
                </li>
                <li>
                  <a href="#">Changelog</a>
                </li>
                <li>
                  <a href="#">Roadmap</a>
                </li>
              </ul>
            </div>

            <div className="footer-col">
              <h4>Company</h4>
              <ul>
                <li>
                  <a href="#">About</a>
                </li>
                <li>
                  <a href="#">Blog</a>
                </li>
                <li>
                  <a href="#">Careers</a>
                </li>
                <li>
                  <a href="#">Contact</a>
                </li>
              </ul>
            </div>

            <div className="footer-col">
              <h4>Resources</h4>
              <ul>
                <li>
                  <a href="#">Documentation</a>
                </li>
                <li>
                  <a href="#">API Reference</a>
                </li>
                <li>
                  <a href="#">Community</a>
                </li>
                <li>
                  <a href="#">Support</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <span>© 2026 CollaboBoard, Inc. All rights reserved.</span>
            <div className="footer-bottom-links">
              <a href="#">Privacy</a>
              <a href="#">Terms</a>
              <a href="#">Cookies</a>
            </div>
          </div>
        </div>
      </footer>

      <style>{`
        .landing-root *,
        .landing-root *::before,
        .landing-root *::after {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }
        .landing-root {
          --blue: #2563eb;
          --indigo: #4f46e5;
          --bg: #f9fafb;
          --surface: #f3f4f6;
          --white: #ffffff;
          --slate-900: #0f172a;
          --slate-700: #334155;
          --slate-500: #64748b;
          --slate-300: #cbd5e1;
          --slate-100: #f1f5f9;
          --yellow: #fde68a;
          --pink: #fbd5e5;
          --green: #d1fae5;
          --purple: #ede9fe;
          --radius: 20px;
          --shadow-sm:
            0 1px 3px rgba(0, 0, 0, 0.06), 0 1px 2px rgba(0, 0, 0, 0.04);
          --shadow-md:
            0 4px 16px rgba(0, 0, 0, 0.08), 0 2px 6px rgba(0, 0, 0, 0.04);
          --shadow-lg:
            0 12px 40px rgba(0, 0, 0, 0.1), 0 4px 16px rgba(0, 0, 0, 0.06);
          --shadow-xl:
            0 24px 64px rgba(0, 0, 0, 0.12), 0 8px 24px rgba(0, 0, 0, 0.08);
          font-family: "DM Sans", sans-serif;
          background: var(--bg);
          color: var(--slate-900);
          line-height: 1.6;
          overflow-x: hidden;
        }
        .container {
          max-width: 1180px;
          margin: 0 auto;
          padding: 0 24px;
        }
        .gradient-text {
          background: linear-gradient(135deg, var(--blue), var(--indigo));
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        .btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 14px 28px;
          border-radius: 12px;
          font-size: 15px;
          font-weight: 600;
          border: none;
          cursor: pointer;
          text-decoration: none;
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .btn-primary {
          background: linear-gradient(135deg, var(--blue), var(--indigo));
          color: #fff;
          box-shadow: 0 4px 20px rgba(37, 99, 235, 0.35);
        }
        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 32px rgba(37, 99, 235, 0.45);
        }
        .btn-outline {
          background: transparent;
          border: 1.5px solid var(--slate-300);
          color: var(--slate-700);
        }
        .btn-outline:hover {
          border-color: var(--blue);
          color: var(--blue);
          background: rgba(37, 99, 235, 0.04);
          transform: translateY(-2px);
        }
        .btn.full {
          width: 100%;
        }
        .chip {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(37, 99, 235, 0.08);
          color: var(--blue);
          border: 1px solid rgba(37, 99, 235, 0.2);
          padding: 6px 14px;
          border-radius: 100px;
          font-size: 13px;
          font-weight: 600;
        }
        .reveal {
          opacity: 0;
          transform: translateY(32px);
          transition:
            opacity 0.7s cubic-bezier(0.4, 0, 0.2, 1),
            transform 0.7s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .reveal.visible {
          opacity: 1;
          transform: translateY(0);
        }
        .reveal-delay-1 {
          transition-delay: 0.1s;
        }
        .reveal-delay-2 {
          transition-delay: 0.2s;
        }
        .reveal-delay-3 {
          transition-delay: 0.3s;
        }
        .reveal-delay-4 {
          transition-delay: 0.4s;
        }
        .reveal-delay-5 {
          transition-delay: 0.5s;
        }
        nav {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
          padding: 16px 0;
          transition: all 0.3s;
        }
        nav.scrolled {
          background: rgba(249, 250, 251, 0.85);
          backdrop-filter: blur(20px);
          box-shadow: 0 1px 0 rgba(0, 0, 0, 0.06);
        }
        .nav-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .logo {
          display: flex;
          align-items: center;
          gap: 10px;
          font-weight: 800;
          font-size: 20px;
          color: var(--slate-900);
          text-decoration: none;
        }
        .logo-icon {
          width: 36px;
          height: 36px;
          background: linear-gradient(135deg, var(--blue), var(--indigo));
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }
        .nav-links {
          display: flex;
          align-items: center;
          gap: 32px;
          list-style: none;
        }
        .nav-links a {
          font-size: 14px;
          font-weight: 500;
          color: var(--slate-700);
          text-decoration: none;
          transition: color 0.2s;
        }
        .nav-links a:hover {
          color: var(--blue);
        }
        .nav-cta {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .nav-btn {
          padding: 10px 20px;
          font-size: 14px;
        }
        #hero {
          min-height: 100vh;
          display: flex;
          align-items: center;
          padding: 120px 0 80px;
          position: relative;
          overflow: hidden;
        }
        .hero-bg {
          position: absolute;
          inset: 0;
          z-index: 0;
          background:
            radial-gradient(
              ellipse 80% 60% at 50% 0%,
              rgba(79, 70, 229, 0.08) 0%,
              transparent 70%
            ),
            radial-gradient(
              ellipse 50% 40% at 80% 80%,
              rgba(37, 99, 235, 0.06) 0%,
              transparent 70%
            );
        }
        .hero-grid {
          position: absolute;
          inset: 0;
          z-index: 0;
          background-image:
            linear-gradient(rgba(203, 213, 225, 0.35) 1px, transparent 1px),
            linear-gradient(
              90deg,
              rgba(203, 213, 225, 0.35) 1px,
              transparent 1px
            );
          background-size: 48px 48px;
          mask-image: radial-gradient(
            ellipse 80% 70% at 50% 50%,
            black 30%,
            transparent 100%
          );
        }
        .hero-content {
          position: relative;
          z-index: 1;
          max-width: 780px;
          margin: 0 auto;
          text-align: center;
        }
        .hero-headline {
          font-size: clamp(42px, 7vw, 80px);
          font-weight: 800;
          line-height: 1.08;
          letter-spacing: -0.03em;
          margin-bottom: 24px;
        }
        .hero-sub {
          font-size: clamp(16px, 2vw, 20px);
          color: var(--slate-500);
          max-width: 560px;
          margin: 0 auto 40px;
          line-height: 1.65;
        }
        .hero-cta {
          display: flex;
          align-items: center;
          gap: 12px;
          justify-content: center;
          flex-wrap: wrap;
        }
        .hero-social {
          margin-top: 60px;
          color: var(--slate-500);
          font-size: 13px;
          font-weight: 500;
        }
        .avatar-row {
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: 2.5px solid var(--bg);
          margin-left: -10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 15px;
          font-weight: 700;
          color: #fff;
        }
        .avatar.small {
          width: 26px;
          height: 26px;
          font-size: 12px;
          margin-left: -6px;
        }
        .avatar:first-child {
          margin-left: 0;
        }
        .a1 {
          background: linear-gradient(135deg, #f97316, #fb923c);
        }
        .a2 {
          background: linear-gradient(135deg, #06b6d4, #0ea5e9);
        }
        .a3 {
          background: linear-gradient(135deg, #8b5cf6, #a78bfa);
        }
        .a4 {
          background: linear-gradient(135deg, #10b981, #34d399);
        }
        .a5 {
          background: linear-gradient(135deg, #ec4899, #f472b6);
        }
        .stars {
          display: flex;
          justify-content: center;
          gap: 2px;
          color: #f59e0b;
        }
        .hero-visual {
          position: relative;
          z-index: 1;
          margin-top: 72px;
        }
        .board-window {
          background: var(--white);
          border-radius: 24px;
          box-shadow:
            var(--shadow-xl),
            0 0 0 1px rgba(0, 0, 0, 0.06);
          overflow: hidden;
        }
        .board-toolbar {
          background: var(--slate-100);
          padding: 12px 20px;
          display: flex;
          align-items: center;
          gap: 12px;
          border-bottom: 1px solid var(--slate-300);
        }
        .traffic-lights {
          display: flex;
          gap: 6px;
        }
        .tl {
          width: 12px;
          height: 12px;
          border-radius: 50%;
        }
        .red {
          background: #ff5f56;
        }
        .yellow {
          background: #ffbd2e;
        }
        .green {
          background: #27c93f;
        }
        .board-title-bar {
          flex: 1;
          text-align: center;
          font-size: 13px;
          font-weight: 600;
          color: var(--slate-500);
        }
        .board-canvas {
          height: 360px;
          background: #fafbff;
          background-image: radial-gradient(
            circle,
            rgba(203, 213, 225, 0.6) 1px,
            transparent 1px
          );
          background-size: 28px 28px;
          position: relative;
          overflow: hidden;
        }
        .sticky {
          position: absolute;
          width: 148px;
          padding: 14px 16px;
          border-radius: 14px;
          font-size: 13px;
          font-weight: 500;
          line-height: 1.5;
          color: var(--slate-700);
          box-shadow:
            0 4px 16px rgba(0, 0, 0, 0.1),
            0 1px 4px rgba(0, 0, 0, 0.06);
          transition:
            transform 0.3s,
            box-shadow 0.3s;
        }
        .sticky:hover {
          transform: rotate(0deg) scale(1.04) !important;
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.14);
          z-index: 10;
        }
        .sticky-tag {
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 6px;
          opacity: 0.6;
        }
        .s1 {
          background: var(--yellow);
          top: 40px;
          left: 60px;
          transform: rotate(-2.5deg);
          animation: floatA 5s ease-in-out infinite;
        }
        .s2 {
          background: var(--pink);
          top: 30px;
          left: 260px;
          transform: rotate(1.8deg);
          animation: floatB 6s ease-in-out infinite;
        }
        .s3 {
          background: var(--green);
          top: 150px;
          left: 160px;
          transform: rotate(-1deg);
          animation: floatC 7s ease-in-out infinite;
        }
        .s4 {
          background: var(--purple);
          top: 170px;
          left: 380px;
          transform: rotate(2.2deg);
          animation: floatA 4.5s ease-in-out infinite 0.5s;
        }
        .s5 {
          background: #dbeafe;
          top: 60px;
          left: 520px;
          transform: rotate(-1.5deg);
          animation: floatB 5.5s ease-in-out infinite 1s;
        }
        .s6 {
          background: #fef3c7;
          top: 210px;
          left: 60px;
          transform: rotate(2deg);
          animation: floatC 6.5s ease-in-out infinite 0.3s;
        }
        @keyframes floatA {
          0%,
          100% {
            transform: rotate(-2.5deg) translateY(0);
          }
          50% {
            transform: rotate(-2.5deg) translateY(-8px);
          }
        }
        @keyframes floatB {
          0%,
          100% {
            transform: rotate(1.8deg) translateY(0);
          }
          50% {
            transform: rotate(1.8deg) translateY(-10px);
          }
        }
        @keyframes floatC {
          0%,
          100% {
            transform: rotate(-1deg) translateY(0);
          }
          50% {
            transform: rotate(-1deg) translateY(-6px);
          }
        }
        .cursor {
          position: absolute;
          display: flex;
          align-items: flex-start;
          gap: 6px;
          z-index: 20;
          pointer-events: none;
        }
        .cursor-icon {
          filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
        }
        .cursor-icon.blue {
          color: #2563eb;
        }
        .cursor-icon.indigo {
          color: #7c3aed;
        }
        .cursor-label {
          color: #fff;
          font-size: 11px;
          font-weight: 600;
          padding: 3px 8px;
          border-radius: 6px;
          white-space: nowrap;
          margin-top: 16px;
        }
        .cursor-label.blue {
          background: #2563eb;
        }
        .cursor-label.indigo {
          background: #7c3aed;
        }
        .cursor1 {
          top: 100px;
          left: 300px;
          animation: cursorMove1 9s ease-in-out infinite;
        }
        .cursor2 {
          top: 220px;
          left: 450px;
          animation: cursorMove2 11s ease-in-out infinite;
        }
        @keyframes cursorMove1 {
          0% {
            top: 100px;
            left: 300px;
          }
          25% {
            top: 60px;
            left: 420px;
          }
          50% {
            top: 180px;
            left: 380px;
          }
          75% {
            top: 130px;
            left: 250px;
          }
          100% {
            top: 100px;
            left: 300px;
          }
        }
        @keyframes cursorMove2 {
          0% {
            top: 220px;
            left: 450px;
          }
          30% {
            top: 140px;
            left: 520px;
          }
          60% {
            top: 260px;
            left: 360px;
          }
          100% {
            top: 220px;
            left: 450px;
          }
        }
        #trust {
          padding: 64px 0;
          border-top: 1px solid var(--slate-300);
        }
        .trust-label {
          text-align: center;
          font-size: 13px;
          font-weight: 600;
          color: var(--slate-500);
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin-bottom: 40px;
        }
        .logos-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 48px;
          flex-wrap: wrap;
        }
        .logo-pill {
          display: flex;
          align-items: center;
          gap: 8px;
          font-weight: 700;
          font-size: 16px;
          color: var(--slate-300);
          transition: color 0.3s;
        }
        .logo-pill:hover {
          color: var(--slate-500);
        }
        #features,
        #preview,
        #pricing,
        #howitworks,
        #faq,
        #testimonials {
          padding: 100px 0;
        }
        .section-label {
          font-size: 13px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--blue);
          margin-bottom: 16px;
        }
        .section-title {
          font-size: clamp(32px, 4.5vw, 52px);
          font-weight: 800;
          line-height: 1.1;
          letter-spacing: -0.025em;
          margin-bottom: 20px;
        }
        .section-sub {
          font-size: 18px;
          color: var(--slate-500);
          max-width: 520px;
          line-height: 1.65;
        }
        .features-header {
          margin-bottom: 64px;
        }
        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 24px;
        }
        .feature-card {
          background: var(--white);
          border: 1px solid var(--slate-300);
          border-radius: var(--radius);
          padding: 32px;
          transition: all 0.3s;
          position: relative;
          overflow: hidden;
        }
        .feature-card::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(
            135deg,
            rgba(37, 99, 235, 0.03),
            rgba(79, 70, 229, 0.03)
          );
          opacity: 0;
          transition: opacity 0.3s;
        }
        .feature-card:hover::before {
          opacity: 1;
        }
        .feature-card:hover {
          border-color: rgba(37, 99, 235, 0.3);
          box-shadow:
            var(--shadow-md),
            0 0 0 1px rgba(37, 99, 235, 0.1);
          transform: translateY(-4px);
        }
        .feature-icon {
          width: 52px;
          height: 52px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;
        }
        .feature-card h3 {
          font-size: 20px;
          font-weight: 700;
          margin-bottom: 10px;
        }
        .feature-card p {
          color: var(--slate-500);
          font-size: 15px;
          line-height: 1.65;
        }
        #preview {
          background: linear-gradient(
            180deg,
            var(--bg) 0%,
            #eef2ff 50%,
            var(--bg) 100%
          );
        }
        .preview-wrapper {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: center;
        }
        .preview-feature-list {
          margin-top: 32px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .pf-item {
          display: flex;
          align-items: flex-start;
          gap: 14px;
          padding: 16px 20px;
          background: var(--white);
          border: 1px solid var(--slate-300);
          border-radius: 14px;
          transition: all 0.25s ease;
        }
        .pf-item:hover {
          border-color: var(--blue);
          box-shadow: var(--shadow-sm);
          transform: translateX(4px);
        }
        .pf-icon {
          display: inline-flex;
          color: var(--blue);
          flex-shrink: 0;
          margin-top: 2px;
        }
        .pf-item h4 {
          font-weight: 700;
          font-size: 15px;
          margin-bottom: 3px;
        }
        .pf-item p {
          font-size: 14px;
          color: var(--slate-500);
          line-height: 1.5;
        }
        .preview-board {
          background: var(--white);
          border-radius: 24px;
          box-shadow:
            var(--shadow-xl),
            0 0 0 1px rgba(0, 0, 0, 0.06);
          overflow: hidden;
        }
        .pb-header {
          background: var(--slate-100);
          padding: 14px 20px;
          display: flex;
          align-items: center;
          gap: 10px;
          border-bottom: 1px solid var(--slate-300);
        }
        .pb-title {
          flex: 1;
          text-align: center;
          font-size: 12px;
          font-weight: 600;
          color: var(--slate-500);
        }
        .pb-canvas {
          height: 320px;
          background: #fafbff;
          background-image: radial-gradient(
            circle,
            rgba(203, 213, 225, 0.5) 1px,
            transparent 1px
          );
          background-size: 24px 24px;
          position: relative;
          overflow: hidden;
        }
        .pb-presence {
          position: absolute;
          bottom: 16px;
          right: 16px;
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(10px);
          border: 1px solid var(--slate-300);
          border-radius: 100px;
          padding: 8px 16px;
          font-size: 12px;
          font-weight: 600;
          color: var(--slate-700);
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .presence-dot {
          width: 8px;
          height: 8px;
          background: #10b981;
          border-radius: 50%;
          animation: pulse 2s infinite;
        }
        @keyframes pulse {
          0%,
          100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.5;
            transform: scale(0.85);
          }
        }
        .pb-s1,
        .pb-s2,
        .pb-s3,
        .pb-s4 {
          position: absolute;
          padding: 12px 14px;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          font-size: 12px;
          font-weight: 500;
          color: var(--slate-700);
        }
        .pb-s1 {
          top: 30px;
          left: 30px;
          width: 130px;
          background: var(--yellow);
          transform: rotate(-2deg);
          animation: floatA 5s ease-in-out infinite;
        }
        .pb-s2 {
          top: 20px;
          left: 200px;
          width: 140px;
          background: var(--pink);
          transform: rotate(1.5deg);
          animation: floatB 6s ease-in-out infinite;
        }
        .pb-s3 {
          top: 140px;
          left: 100px;
          width: 120px;
          background: var(--green);
          transform: rotate(-1.2deg);
          animation: floatC 7s ease-in-out infinite;
        }
        .pb-s4 {
          top: 150px;
          left: 270px;
          width: 130px;
          background: var(--purple);
          transform: rotate(2deg);
          animation: floatA 4.5s ease-in-out infinite 0.5s;
        }
        .pb-tag {
          font-size: 10px;
          font-weight: 700;
          opacity: 0.6;
          margin-bottom: 5px;
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }
        .pb-cursor1,
        .pb-cursor2 {
          position: absolute;
          pointer-events: none;
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .pb-cursor1 {
          top: 80px;
          left: 180px;
          animation: cursorMove1 9s ease-in-out infinite;
        }
        .pb-cursor2 {
          top: 200px;
          left: 350px;
          animation: cursorMove2 11s ease-in-out infinite;
        }
        .pb-cursor-label {
          color: white;
          font-size: 10px;
          font-weight: 600;
          padding: 2px 7px;
          border-radius: 5px;
        }
        .pb-cursor-label.blue {
          background: #2563eb;
        }
        .pb-cursor-label.green {
          background: #10b981;
        }
        .cursor-icon.green {
          color: #10b981;
        }
        .steps-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 32px;
          margin-top: 64px;
          position: relative;
        }
        .steps-grid::before {
          content: "";
          position: absolute;
          top: 44px;
          left: calc(16.6% + 20px);
          right: calc(16.6% + 20px);
          height: 2px;
          background: linear-gradient(90deg, var(--blue), var(--indigo));
          opacity: 0.3;
        }
        .step-card {
          text-align: center;
          padding: 40px 24px;
          background: var(--white);
          border-radius: var(--radius);
          border: 1px solid var(--slate-300);
          transition: all 0.3s;
        }
        .step-card:hover {
          transform: translateY(-6px);
          box-shadow: var(--shadow-lg);
          border-color: rgba(37, 99, 235, 0.3);
        }
        .step-num {
          width: 56px;
          height: 56px;
          border-radius: 16px;
          background: linear-gradient(135deg, var(--blue), var(--indigo));
          color: #fff;
          font-weight: 800;
          font-size: 22px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 20px;
          box-shadow: 0 8px 24px rgba(37, 99, 235, 0.3);
        }
        .step-icon {
          display: flex;
          justify-content: center;
          margin-bottom: 8px;
        }
        .step-card h3 {
          font-weight: 700;
          font-size: 20px;
          margin-bottom: 10px;
        }
        .step-card p {
          font-size: 14px;
          color: var(--slate-500);
          line-height: 1.65;
        }
        #testimonials {
          background: var(--white);
        }
        .testimonials-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          margin-top: 64px;
        }
        .testi-card {
          background: var(--bg);
          border: 1px solid var(--slate-300);
          border-radius: var(--radius);
          padding: 32px;
          transition: all 0.3s;
        }
        .testi-card:hover {
          box-shadow: var(--shadow-md);
          border-color: rgba(37, 99, 235, 0.3);
          transform: translateY(-4px);
        }
        .testi-stars {
          color: #f59e0b;
          display: flex;
          gap: 2px;
          margin-bottom: 14px;
        }
        .testi-quote {
          font-size: 15px;
          line-height: 1.7;
          color: var(--slate-700);
          margin-bottom: 20px;
          font-style: italic;
        }
        .testi-author {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .testi-avatar {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          font-weight: 700;
          color: white;
        }
        .testi-name {
          font-weight: 700;
          font-size: 14px;
        }
        .testi-role {
          font-size: 12px;
          color: var(--slate-500);
        }
        .pricing-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          margin-top: 64px;
        }
        .plan-card {
          background: var(--white);
          border: 1.5px solid var(--slate-300);
          border-radius: var(--radius);
          padding: 36px 32px;
          position: relative;
          transition: all 0.3s;
        }
        .plan-card:hover {
          box-shadow: var(--shadow-md);
          transform: translateY(-4px);
        }
        .plan-card.featured {
          background: linear-gradient(160deg, #eef2ff, #e0e7ff);
          border-color: rgba(79, 70, 229, 0.4);
          box-shadow:
            var(--shadow-md),
            0 0 0 1px rgba(79, 70, 229, 0.2);
        }
        .plan-badge {
          position: absolute;
          top: -14px;
          left: 50%;
          transform: translateX(-50%);
          background: linear-gradient(135deg, var(--blue), var(--indigo));
          color: #fff;
          font-size: 12px;
          font-weight: 700;
          padding: 4px 16px;
          border-radius: 100px;
          white-space: nowrap;
        }
        .plan-name {
          font-weight: 700;
          font-size: 20px;
          margin-bottom: 8px;
        }
        .plan-desc {
          font-size: 14px;
          color: var(--slate-500);
          margin-bottom: 24px;
        }
        .plan-price {
          display: flex;
          align-items: baseline;
          gap: 4px;
          margin-bottom: 28px;
        }
        .plan-price .amount {
          font-size: 48px;
          font-weight: 800;
        }
        .plan-price .period {
          font-size: 14px;
          color: var(--slate-500);
        }
        .plan-features {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 32px;
        }
        .plan-features li {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 14px;
        }
        .check {
          color: #10b981;
        }
        .cross {
          color: var(--slate-300);
        }
        #faq {
          background: var(--white);
        }
        .faq-list {
          max-width: 720px;
          margin: 64px auto 0;
          display: flex;
          flex-direction: column;
        }
        .faq-item {
          border-bottom: 1px solid var(--slate-300);
          overflow: hidden;
        }
        .faq-item:first-child {
          border-top: 1px solid var(--slate-300);
        }
        .faq-q {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 22px 4px;
          cursor: pointer;
          font-weight: 700;
          font-size: 17px;
          transition: color 0.2s;
          gap: 16px;
          background: transparent;
          border: 0;
          text-align: left;
          color: inherit;
        }
        .faq-q:hover {
          color: var(--blue);
        }
        .faq-icon {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: var(--surface);
          border: 1px solid var(--slate-300);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          font-size: 18px;
          color: var(--slate-500);
          transition: all 0.3s;
        }
        .faq-item.open .faq-icon {
          background: var(--blue);
          color: #fff;
          border-color: var(--blue);
          transform: rotate(45deg);
        }
        .faq-a {
          max-height: 0;
          overflow: hidden;
          transition:
            max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1),
            padding 0.3s;
          font-size: 15px;
          color: var(--slate-500);
          line-height: 1.7;
          padding: 0 4px;
        }
        .faq-item.open .faq-a {
          max-height: 220px;
          padding: 0 4px 20px;
        }
        #cta {
          padding: 120px 0;
          text-align: center;
          background: linear-gradient(
            160deg,
            #1e3a8a 0%,
            #312e81 50%,
            #1e1b4b 100%
          );
          position: relative;
          overflow: hidden;
        }
        #cta::before {
          content: "";
          position: absolute;
          inset: 0;
          background: radial-gradient(
            ellipse 60% 60% at 50% 50%,
            rgba(99, 102, 241, 0.2) 0%,
            transparent 70%
          );
        }
        .cta-dots {
          position: absolute;
          inset: 0;
          background-image: radial-gradient(
            rgba(255, 255, 255, 0.08) 1px,
            transparent 1px
          );
          background-size: 32px 32px;
        }
        .cta-content {
          position: relative;
          z-index: 1;
        }
        .cta-title {
          font-size: clamp(36px, 5.5vw, 64px);
          font-weight: 800;
          line-height: 1.1;
          letter-spacing: -0.025em;
          color: #fff;
          margin-bottom: 20px;
        }
        .cta-sub {
          font-size: 18px;
          color: rgba(255, 255, 255, 0.65);
          margin-bottom: 48px;
        }
        .btn-white {
          background: #fff;
          color: var(--indigo);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
          font-size: 16px;
          padding: 16px 36px;
        }
        .btn-white:hover {
          transform: translateY(-3px);
          box-shadow: 0 16px 48px rgba(0, 0, 0, 0.25);
        }
        footer {
          background: var(--slate-900);
          color: rgba(255, 255, 255, 0.5);
          padding: 60px 0 32px;
        }
        .footer-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr;
          gap: 48px;
          margin-bottom: 48px;
        }
        .footer-brand .logo {
          color: white;
        }
        .footer-brand p {
          font-size: 14px;
          line-height: 1.7;
          margin-top: 14px;
          max-width: 220px;
        }
        .footer-col h4 {
          font-weight: 700;
          font-size: 14px;
          color: white;
          margin-bottom: 16px;
        }
        .footer-col ul {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .footer-col a {
          color: rgba(255, 255, 255, 0.5);
          text-decoration: none;
          font-size: 14px;
          transition: color 0.2s;
        }
        .footer-col a:hover {
          color: white;
        }
        .footer-bottom {
          padding-top: 24px;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 13px;
        }
        .footer-bottom-links {
          display: flex;
          gap: 20px;
        }
        .footer-bottom-links a {
          color: rgba(255, 255, 255, 0.4);
          text-decoration: none;
          transition: color 0.2s;
        }
        .footer-bottom-links a:hover {
          color: white;
        }
        @media (max-width: 900px) {
          .preview-wrapper {
            grid-template-columns: 1fr;
            gap: 48px;
          }
          .testimonials-grid {
            grid-template-columns: 1fr;
          }
          .pricing-grid {
            grid-template-columns: 1fr;
            max-width: 420px;
            margin-left: auto;
            margin-right: auto;
          }
          .steps-grid {
            grid-template-columns: 1fr;
          }
          .steps-grid::before {
            display: none;
          }
          .footer-grid {
            grid-template-columns: 1fr 1fr;
          }
          .nav-links {
            display: none;
          }
        }
        @media (max-width: 600px) {
          .footer-grid {
            grid-template-columns: 1fr;
          }
          .footer-bottom {
            flex-direction: column;
            gap: 12px;
            text-align: center;
          }
        }
      `}</style>
    </div>
  );
}
