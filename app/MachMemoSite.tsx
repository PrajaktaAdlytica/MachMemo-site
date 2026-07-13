"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  BarChart3,
  BookOpen,
  Brain,
  BriefcaseBusiness,
  Building2,
  Check,
  ChevronDown,
  CircleDot,
  ClipboardCheck,
  Cpu,
  Database,
  Factory,
  FileText,
  Gauge,
  Globe2,
  Layers3,
  LockKeyhole,
  Mail,
  MapPin,
  Menu,
  MessageSquareQuote,
  Phone,
  PlugZap,
  Radio,
  Search,
  ShieldCheck,
  Sparkles,
  UserRound,
  Users,
  Wrench,
  X,
} from "lucide-react";

export type PageKey =
  | "home"
  | "docs"
  | "fix"
  | "health"
  | "machine-shops"
  | "maintenance-teams"
  | "industrial-suppliers"
  | "pricing"
  | "about"
  | "contact"
  | "request-demo"
  | "signin"
  | "security"
  | "case-studies"
  | "faq"
  | "roi-calculator";

type Product = {
  title: string;
  href: string;
  label: string;
  description: string;
  icon: React.ElementType;
  metric: string;
};

type Solution = {
  title: string;
  href: string;
  description: string;
  icon: React.ElementType;
  proof: string;
};

const products: Product[] = [
  {
    title: "MachMemo Docs",
    href: "/products/docs",
    label: "Knowledge capture",
    description:
      "Convert manuals, SOPs, service notes, and expert walkthroughs into searchable machine knowledge.",
    icon: FileText,
    metric: "18 hrs/month reclaimed",
  },
  {
    title: "MachMemo Fix",
    href: "/products/fix",
    label: "Verified troubleshooting",
    description:
      "Guide technicians from alarm to fix path with source-backed steps, parts, safety notes, and prior repairs.",
    icon: Wrench,
    metric: "42% faster recovery",
  },
  {
    title: "MachMemo Health",
    href: "/products/health",
    label: "Machine risk intelligence",
    description:
      "Track asset health, recurring faults, warning patterns, and preventive recommendations without a large IT project.",
    icon: Activity,
    metric: "31% fewer repeat alarms",
  },
];

const solutions: Solution[] = [
  {
    title: "Machine Shops",
    href: "/solutions/machine-shops",
    description:
      "Keep spindle time high by preserving setup fixes, machine quirks, offsets, alarms, and recurring CNC fault patterns.",
    icon: Factory,
    proof: "Reduce repeat troubleshooting on critical CNC assets.",
  },
  {
    title: "Maintenance Teams",
    href: "/solutions/maintenance-teams",
    description:
      "Give every shift the same verified maintenance memory, from senior technician notes to work-order history.",
    icon: Users,
    proof: "Improve MTTR, handover quality, and first-time fix rate.",
  },
  {
    title: "Industrial Suppliers",
    href: "/solutions/industrial-suppliers",
    description:
      "Turn field service knowledge, installed-base history, and customer issues into a reusable support layer.",
    icon: BriefcaseBusiness,
    proof: "Scale expertise across customer sites and service teams.",
  },
];

const faqItems = [
  {
    q: "Is MachMemo a CMMS replacement?",
    a: "MachMemo can work beside your CMMS, spreadsheets, shared drives, and maintenance logs. The first job is to turn machine knowledge and recurring fixes into reusable intelligence. Teams can later connect work orders, alerts, and asset data where it makes sense.",
  },
  {
    q: "Do we need sensors to start?",
    a: "No. Docs and Fix can start from manuals, SOPs, photos, work-order history, and technician notes. Health becomes richer when PLC, sensor, or CMMS data is connected, but the first pilot does not require a new hardware project.",
  },
  {
    q: "How does MachMemo avoid unreliable AI answers?",
    a: "MachMemo is designed around source-backed answers. Fix paths show the documents, prior repairs, technician notes, and machine context used to create the answer. If there is not enough context, the product should surface what is missing instead of pretending.",
  },
  {
    q: "Can technicians use it on the shop floor?",
    a: "Yes. The interface is built around quick search, mobile-friendly fix cards, short checklists, source snippets, and feedback after the job. The goal is less typing, less document hunting, and a cleaner record for the next shift.",
  },
  {
    q: "Is MachMemo suitable for EU manufacturing SMEs?",
    a: "That is the core audience. The site, product story, onboarding model, and trust language are built for Polish and European SMEs that need practical AI without enterprise implementation overhead.",
  },
  {
    q: "How long does implementation take?",
    a: "A focused pilot can start in three to six weeks. The first phase usually covers top assets, high-value documents, known recurring faults, and the people who hold the most critical tacit knowledge.",
  },
];

const testimonials = [
  {
    quote:
      "MachMemo gave our junior technicians the same fix path our senior engineer used from memory.",
    role: "Maintenance Manager",
    company: "EU packaging manufacturer",
  },
  {
    quote:
      "We stopped solving the same CNC fault from scratch every month. The fix became part of the machine record.",
    role: "Owner",
    company: "Precision machine shop",
  },
  {
    quote:
      "The value was not just AI search. It was turning service history into something our whole team could reuse.",
    role: "Service Lead",
    company: "Industrial supplier",
  },
];

const caseStudies = [
  {
    metric: "42%",
    title: "faster fault recovery",
    tag: "CNC machine shop",
    detail:
      "Recurring spindle vibration faults were converted into verified fix cards with parts, checks, and source notes.",
    tone: "green",
  },
  {
    metric: "31%",
    title: "fewer repeat alarms",
    tag: "Packaging line",
    detail:
      "Shift teams stopped re-diagnosing the same line stoppages by reusing issue history and technician feedback.",
    tone: "amber",
  },
  {
    metric: "18h",
    title: "saved each month",
    tag: "Maintenance team",
    detail:
      "Manuals, SOPs, and photos moved from folders into a searchable machine memory for common repair work.",
    tone: "oxide",
  },
  {
    metric: "40",
    title: "critical assets mapped",
    tag: "Industrial supplier",
    detail:
      "Installed-base service history was structured into machine profiles for faster customer support.",
    tone: "dark",
  },
];

const pricingPlans = [
  {
    name: "Memo Start",
    price: "From EUR 690",
    period: "per site / month",
    description:
      "For small teams that need clean machine docs and reusable fix history.",
    features: [
      "MachMemo Docs",
      "Machine profiles",
      "Manual and SOP ingestion",
      "Fix card library",
      "Email support",
    ],
  },
  {
    name: "Memo Pro",
    price: "From EUR 1,450",
    period: "per site / month",
    description:
      "For maintenance teams standardizing troubleshooting across shifts.",
    features: [
      "Everything in Start",
      "MachMemo Fix",
      "Source-backed AI answers",
      "Technician feedback loop",
      "CMMS and spreadsheet imports",
    ],
    featured: true,
  },
  {
    name: "Memo Plant",
    price: "Custom",
    period: "multi-site and health",
    description:
      "For plants that need health scoring, integrations, and guided rollout.",
    features: [
      "Everything in Pro",
      "MachMemo Health",
      "PLC, sensor, and CMMS integrations",
      "Security review",
      "Pilot success workshop",
    ],
  },
];

const pageContent: Record<
  Exclude<PageKey, "home" | "pricing" | "contact" | "request-demo" | "signin" | "security" | "case-studies" | "faq" | "roi-calculator">,
  {
    eyebrow: string;
    title: string;
    copy: string;
    icon: React.ElementType;
    bullets: string[];
    workflow: string[];
    stat: string;
  }
> = {
  docs: {
    eyebrow: "MachMemo Docs",
    title: "Know-how that never walks out the door.",
    copy: "Turn manuals, SOPs, machine notes, photos, supplier instructions, and senior technician knowledge into a living machine memory that teams can search and trust.",
    icon: FileText,
    bullets: [
      "Import PDFs, SOPs, work instructions, and service notes.",
      "Create asset-specific knowledge pages for every critical machine.",
      "Convert technician notes into reusable procedures and fix cards.",
      "Support multilingual shop-floor teams with concise answer snippets.",
    ],
    workflow: [
      "Upload manuals and procedures",
      "Map documents to machines",
      "Capture expert walkthroughs",
      "Search by fault, part, symptom, or asset",
    ],
    stat: "18 hours saved monthly on document search",
  },
  fix: {
    eyebrow: "MachMemo Fix",
    title: "The fastest path from alarm to verified fix.",
    copy: "Give technicians an AI-guided troubleshooting flow that pulls from real machine history, source documents, prior fixes, safety notes, and parts context.",
    icon: Wrench,
    bullets: [
      "Ask questions in plain language during a breakdown.",
      "See likely causes ranked by machine history and documentation.",
      "Follow step-by-step checks with cited sources and safety notes.",
      "Save the final repair as a reusable fix for the next incident.",
    ],
    workflow: [
      "Enter fault or alarm",
      "Review likely causes",
      "Follow verified checks",
      "Save resolution to memory",
    ],
    stat: "42% faster repeat fault recovery",
  },
  health: {
    eyebrow: "MachMemo Health",
    title: "See machine risk before it becomes downtime.",
    copy: "Track health scores, warning patterns, repeat faults, and preventive actions across critical equipment without forcing a full enterprise reliability project.",
    icon: Activity,
    bullets: [
      "Prioritize assets by risk, fault frequency, and maintenance context.",
      "Connect sensor, PLC, CMMS, or spreadsheet data when ready.",
      "Spot recurring failure modes and stale preventive tasks.",
      "Turn health insights into practical actions for maintenance teams.",
    ],
    workflow: [
      "Connect machine signals",
      "Track health score",
      "Spot repeat patterns",
      "Recommend next action",
    ],
    stat: "31% fewer repeat alarms in pilot workflows",
  },
  "machine-shops": {
    eyebrow: "Solution for machine shops",
    title: "Keep spindle time high and recurring CNC faults low.",
    copy: "MachMemo helps machine shops preserve setup knowledge, alarm history, maintenance procedures, offsets, parts context, and the practical machine quirks that usually stay in one expert's head.",
    icon: Factory,
    bullets: [
      "Capture recurring spindle, coolant, axis, and tool-change issues.",
      "Build machine-specific procedure libraries for CNC assets.",
      "Help newer technicians follow proven recovery paths.",
      "Reduce repeated downtime from issues already solved once.",
    ],
    workflow: [
      "Map CNC assets",
      "Capture top faults",
      "Build fix memory",
      "Track repeat downtime",
    ],
    stat: "Designed for 5 to 200 person shops",
  },
  "maintenance-teams": {
    eyebrow: "Solution for maintenance teams",
    title: "Give every shift the same maintenance memory.",
    copy: "MachMemo connects documents, work-order history, expert notes, and machine context so teams can diagnose faster, hand over cleaner, and stop depending on a few senior technicians.",
    icon: Users,
    bullets: [
      "Standardize troubleshooting across day, night, and weekend shifts.",
      "Preserve knowledge before retirement or turnover creates risk.",
      "Use concise fix cards during real breakdowns.",
      "Measure MTTR, repeat faults, and knowledge reuse over time.",
    ],
    workflow: [
      "Identify critical assets",
      "Capture senior know-how",
      "Deploy fix cards",
      "Review team adoption",
    ],
    stat: "Built around MTTR, first-time fix, and repeat-fault reduction",
  },
  "industrial-suppliers": {
    eyebrow: "Solution for industrial suppliers",
    title: "Turn service history into installed-base intelligence.",
    copy: "MachMemo helps suppliers and service teams transform customer issues, field notes, manuals, and support tickets into a reusable knowledge layer for faster support and better product feedback.",
    icon: BriefcaseBusiness,
    bullets: [
      "Structure service notes by customer, machine, symptom, and part.",
      "Give field teams source-backed procedures during support calls.",
      "Identify repeat customer issues across the installed base.",
      "Create a premium digital layer around industrial equipment.",
    ],
    workflow: [
      "Import service records",
      "Map installed assets",
      "Create support playbooks",
      "Surface product insights",
    ],
    stat: "Useful for OEMs, distributors, and maintenance service partners",
  },
  about: {
    eyebrow: "Company",
    title: "Built in Poland for the factories that keep Europe moving.",
    copy: "MachMemo is a Warsaw-based product startup focused on practical AI for manufacturing SMEs. We believe every machine has a memory. Our job is to make that memory structured, searchable, safe, and useful during real maintenance work.",
    icon: Building2,
    bullets: [
      "Focused on European manufacturing SMEs and industrial suppliers.",
      "Designed for practical pilots, not six-month transformation programs.",
      "Built around source-backed AI and operator trust.",
      "Created for maintenance, reliability, and shop-floor teams.",
    ],
    workflow: [
      "Industrial context",
      "AI product craft",
      "EU data standards",
      "Practical onboarding",
    ],
    stat: "Machine memory for maintenance intelligence",
  },
};

function iconForTitle(title: string) {
  const found =
    [...products, ...solutions].find((item) => item.title === title)?.icon ||
    CircleDot;
  return found;
}

export default function MachMemoSite({ page = "home" }: { page?: PageKey }) {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".reveal").forEach((item) => {
        gsap.fromTo(
          item,
          { autoAlpha: 0, y: 28 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.75,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 86%",
              once: true,
            },
          },
        );
      });

      gsap.to(".hero-orbit", {
        rotation: 360,
        duration: 28,
        repeat: -1,
        ease: "none",
        transformOrigin: "50% 50%",
      });

      gsap.to(".machine-pulse", {
        scale: 1.08,
        opacity: 0.42,
        duration: 1.4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    });
    return () => ctx.revert();
  }, [page]);

  const body = useMemo(() => {
    if (page === "home") return <HomePage />;
    if (page === "pricing") return <PricingPage />;
    if (page === "contact") return <ContactPage />;
    if (page === "request-demo") return <DemoPage />;
    if (page === "signin") return <SignInPage />;
    if (page === "security") return <SecurityPage />;
    if (page === "case-studies") return <CaseStudiesPage />;
    if (page === "faq") return <FAQPage />;
    if (page === "roi-calculator") return <ROICalculatorPage />;
    return <DetailPage page={page} />;
  }, [page]);

  return (
    <div className="site-shell">
      <Header
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />
      <main>{body}</main>
      <Footer />
    </div>
  );
}

function Header({
  activeMenu,
  setActiveMenu,
  mobileOpen,
  setMobileOpen,
}: {
  activeMenu: string | null;
  setActiveMenu: (value: string | null) => void;
  mobileOpen: boolean;
  setMobileOpen: (value: boolean) => void;
}) {
  return (
    <header className="site-header">
      <Link className="brand" href="/" aria-label="MachMemo home">
        <span className="brand-mark">
          <span />
        </span>
        <span className="brand-word">MachMemo</span>
      </Link>

      <nav
        className="desktop-nav"
        aria-label="Main navigation"
        onMouseLeave={() => setActiveMenu(null)}
      >
        {["Products", "Solutions", "Resources", "Company"].map((item) => (
          <button
            className={`nav-link ${activeMenu === item ? "active" : ""}`}
            key={item}
            onMouseEnter={() => setActiveMenu(item)}
            onFocus={() => setActiveMenu(item)}
            type="button"
          >
            {item}
            <ChevronDown size={15} />
          </button>
        ))}
        <a className="nav-link direct" href="/pricing">
          Pricing
        </a>
        {activeMenu && <MegaMenu activeMenu={activeMenu} />}
      </nav>

      <div className="header-actions">
        <a href="/signin" className="signin">
          Sign In
        </a>
        <a href="/request-demo" className="btn btn-primary">
          Request Demo
        </a>
      </div>

      <button
        className="mobile-menu-button"
        type="button"
        aria-label="Toggle menu"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        {mobileOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {mobileOpen && (
        <div className="mobile-menu">
          <MobileGroup title="Products" items={products} />
          <MobileGroup title="Solutions" items={solutions} />
          <a href="/pricing">Pricing</a>
          <a href="/about">About</a>
          <a href="/security">AI & Data</a>
          <a href="/contact">Contact</a>
          <a href="/request-demo" className="btn btn-primary">
            Request Demo
          </a>
        </div>
      )}
    </header>
  );
}

function MobileGroup({
  title,
  items,
}: {
  title: string;
  items: Array<{ title: string; href: string }>;
}) {
  return (
    <div className="mobile-group">
      <strong>{title}</strong>
      {items.map((item) => (
        <a key={item.href} href={item.href}>
          {item.title}
        </a>
      ))}
    </div>
  );
}

function MegaMenu({ activeMenu }: { activeMenu: string }) {
  const menuItems =
    activeMenu === "Products"
      ? products
      : activeMenu === "Solutions"
        ? solutions
        : activeMenu === "Resources"
          ? [
              {
                title: "Case Studies",
                href: "/resources/case-studies",
                description: "Pilot-style outcome stories and field notes.",
                icon: BarChart3,
              },
              {
                title: "FAQ",
                href: "/resources/faq",
                description: "Buyer questions about AI, setup, data, and pricing.",
                icon: MessageSquareQuote,
              },
              {
                title: "ROI Calculator",
                href: "/resources/roi-calculator",
                description: "Estimate downtime, search waste, and repeat-fault savings.",
                icon: Gauge,
              },
            ]
          : [
              {
                title: "About MachMemo",
                href: "/about",
                description: "Why we are building machine memory for Europe.",
                icon: Building2,
              },
              {
                title: "AI & Data",
                href: "/security",
                description: "Source-backed answers, EU data posture, and security.",
                icon: ShieldCheck,
              },
              {
                title: "Contact",
                href: "/contact",
                description: "Sales, support, partnerships, and company details.",
                icon: Mail,
              },
            ];

  return (
    <div className="mega-menu">
      <div className="mega-grid">
        <div className="mega-items">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <a className="mega-item" href={item.href} key={item.href}>
                <span className="mega-icon">
                  <Icon size={22} />
                </span>
                <span>
                  <strong>{item.title}</strong>
                  <small>{item.description}</small>
                </span>
              </a>
            );
          })}
        </div>
        <a className="mega-feature" href="/resources/roi-calculator">
          <span className="feature-kicker">Featured guide</span>
          <strong>European SME Maintenance Intelligence Playbook</strong>
          <p>
            A practical 6-week path for capturing docs, recurring faults, and
            expert know-how before the next breakdown.
          </p>
          <span>
            Read the playbook <ArrowRight size={16} />
          </span>
        </a>
      </div>
    </div>
  );
}

function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <ProblemSection />
      <ProductArchitecture />
      <ScrollStory />
      <MemoryLayer />
      <CaseStudyCarousel />
      <IntegrationsSection />
      <StatsSection />
      <Testimonials />
      <PricingPreview />
      <FAQSection />
      <FinalCTA />
    </>
  );
}

function Hero() {
  return (
    <section className="hero section-pad">
      <div className="hero-copy reveal">
        <div className="eyebrow">
          <Sparkles size={16} />
          AI maintenance intelligence for European manufacturing teams
        </div>
        <h1>Turn machine issues into maintenance intelligence.</h1>
        <p className="hero-subcopy">
          MachMemo captures manuals, SOPs, recurring faults, technician notes,
          and machine health signals in one AI-powered memory layer, so teams
          solve downtime faster and stop losing know-how.
        </p>
        <div className="hero-actions">
          <a className="btn btn-primary" href="/request-demo">
            Request Demo <ArrowRight size={18} />
          </a>
          <a className="btn btn-secondary" href="/products/docs">
            Explore Products
          </a>
        </div>
        <div className="hero-proof">
          <span>Built for manufacturing SMEs</span>
          <span>3-6 week pilot rollout</span>
          <span>EU-ready data posture</span>
        </div>
      </div>

      <div className="hero-visual reveal" aria-label="MachMemo product animation">
        <div className="machine-bay">
          <div className="machine-pulse" />
          <div className="hero-orbit">
            <span />
            <span />
            <span />
          </div>
          <div className="machine-core">
            <span className="machine-label">CNC-14</span>
            <Gauge size={54} />
            <strong>Health 84</strong>
          </div>
        </div>
        <div className="ui-card fault-card">
          <span className="status-dot alert" />
          <div>
            <small>Fault detected</small>
            <strong>Spindle vibration above threshold</strong>
          </div>
        </div>
        <div className="ui-card answer-card">
          <span className="status-dot good" />
          <div>
            <small>Verified fix path</small>
            <strong>Check bearing preload, coolant residue, and axis log</strong>
          </div>
        </div>
        <div className="ui-panel">
          <div className="panel-head">
            <span>Machine Memory</span>
            <strong>Live</strong>
          </div>
          <div className="memory-row">
            <FileText size={16} /> Manual page 42 cited
          </div>
          <div className="memory-row">
            <Wrench size={16} /> Prior fix reused
          </div>
          <div className="memory-row">
            <Activity size={16} /> Health score updated
          </div>
        </div>
      </div>
    </section>
  );
}

function TrustStrip() {
  return (
    <section className="trust-strip">
      <span>Built for</span>
      {[
        "CNC machining",
        "Packaging",
        "Metal fabrication",
        "Food production",
        "Plastics",
        "Automotive suppliers",
      ].map((item) => (
        <strong key={item}>{item}</strong>
      ))}
    </section>
  );
}

function ProblemSection() {
  return (
    <section className="section-pad problem-section">
      <div className="section-heading reveal">
        <span className="eyebrow">The real maintenance gap</span>
        <h2>Every breakdown teaches the factory something. Most teams lose that lesson.</h2>
      </div>
      <div className="problem-grid">
        {[
          {
            title: "Docs are scattered",
            copy: "Manuals, PDFs, SOPs, and supplier notes live in disconnected folders.",
            icon: BookOpen,
          },
          {
            title: "Fixes stay tribal",
            copy: "Senior technicians know the shortcut, but the next shift starts from zero.",
            icon: Brain,
          },
          {
            title: "Health data is underused",
            copy: "Alarms, readings, and maintenance history rarely become early warnings.",
            icon: Radio,
          },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <article className="problem-card reveal" key={item.title}>
              <Icon size={26} />
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function ProductArchitecture() {
  return (
    <section className="section-pad product-section">
      <div className="split-heading reveal">
        <div>
          <span className="eyebrow">Product architecture</span>
          <h2>Docs, Fix, and Health work as one machine memory layer.</h2>
        </div>
        <p>
          Start with the sharpest pain - scattered knowledge or recurring
          downtime - then extend into health intelligence when your team is
          ready.
        </p>
      </div>
      <div className="product-grid">
        {products.map((product) => {
          const Icon = product.icon;
          return (
            <a className="product-card reveal" href={product.href} key={product.title}>
              <div className="product-top">
                <span className="icon-badge">
                  <Icon size={24} />
                </span>
                <span>{product.label}</span>
              </div>
              <h3>{product.title}</h3>
              <p>{product.description}</p>
              <div className="product-metric">{product.metric}</div>
              <span className="card-link">
                Explore product <ArrowRight size={16} />
              </span>
            </a>
          );
        })}
      </div>
    </section>
  );
}

function ScrollStory() {
  const steps = [
    {
      title: "A fault appears",
      copy: "Line 3 reports abnormal vibration after a bearing replacement.",
      icon: AlertTriangle,
    },
    {
      title: "MachMemo gathers context",
      copy: "Manuals, service history, parts, expert notes, and prior fixes are pulled into view.",
      icon: Search,
    },
    {
      title: "A verified path is built",
      copy: "Likely causes, inspection steps, safety notes, and source references appear for the technician.",
      icon: ShieldCheck,
    },
    {
      title: "The fix is captured",
      copy: "Technician feedback becomes a reusable fix card for the next shift.",
      icon: ClipboardCheck,
    },
  ];

  return (
    <section className="dark-section scroll-story">
      <div className="section-heading reveal">
        <span className="eyebrow">From alarm to memory</span>
        <h2>A downtime event should make every future repair smarter.</h2>
      </div>
      <div className="story-grid">
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <article className="story-card reveal" key={step.title}>
              <span className="step-number">Step {index + 1}</span>
              <Icon size={28} />
              <h3>{step.title}</h3>
              <p>{step.copy}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function MemoryLayer() {
  const inputs = [
    ["Plant documents", "SOPs, OEM manuals, specs", FileText],
    ["Work orders", "History, notes, repairs", ClipboardCheck],
    ["Tacit knowledge", "Expert habits and machine quirks", Brain],
    ["Machine signals", "PLC, sensor, SCADA, logs", Cpu],
  ] as const;

  return (
    <section className="memory-layer">
      <div className="section-heading reveal">
        <span className="eyebrow">Machine Memory Layer</span>
        <h2>One memory layer for every machine.</h2>
        <p>
          MachMemo unifies the records that maintenance teams already create
          into a trusted operating memory for docs, fixes, and health.
        </p>
      </div>
      <div className="memory-inputs">
        {inputs.map(([title, copy, Icon]) => (
          <article className="memory-input reveal" key={title}>
            <Icon size={24} />
            <strong>{title}</strong>
            <span>{copy}</span>
          </article>
        ))}
      </div>
      <div className="memory-output reveal">
        <Layers3 size={28} />
        <strong>Unified into MachMemo machine memory</strong>
      </div>
    </section>
  );
}

function CaseStudyCarousel() {
  const scroller = useRef<HTMLDivElement | null>(null);
  const move = (dir: number) => {
    scroller.current?.scrollBy({ left: dir * 380, behavior: "smooth" });
  };

  return (
    <section className="section-pad cases-section">
      <div className="carousel-heading reveal">
        <div>
          <span className="eyebrow">Field proof</span>
          <h2>Pilot-style outcomes built around real maintenance metrics.</h2>
        </div>
        <div className="carousel-buttons">
          <button type="button" onClick={() => move(-1)} aria-label="Previous case">
            <ArrowRight size={22} className="flip" />
          </button>
          <button type="button" onClick={() => move(1)} aria-label="Next case">
            <ArrowRight size={22} />
          </button>
        </div>
      </div>
      <div className="case-scroller" ref={scroller}>
        {caseStudies.map((item) => (
          <article className={`case-card tone-${item.tone}`} key={item.title}>
            <div className="case-factory">
              <span />
              <span />
              <span />
            </div>
            <div className="case-content">
              <span>{item.tag}</span>
              <strong>{item.metric}</strong>
              <h3>{item.title}</h3>
              <p>{item.detail}</p>
            </div>
            <ArrowRight className="case-arrow" size={26} />
          </article>
        ))}
      </div>
    </section>
  );
}

function IntegrationsSection() {
  return (
    <section className="section-pad integrations-section">
      <div className="integration-visual reveal">
        <div className="connector-ring">
          <PlugZap size={34} />
          <span className="ring ring-one" />
          <span className="ring ring-two" />
        </div>
        {["Excel", "CMMS", "SAP", "PLC", "SCADA", "Sensors"].map((item) => (
          <span className={`integration-pill pill-${item.toLowerCase()}`} key={item}>
            {item}
          </span>
        ))}
      </div>
      <div className="integration-copy reveal">
        <span className="eyebrow">No rip-and-replace</span>
        <h2>Start with the tools and records your team already uses.</h2>
        <ul className="check-list">
          {[
            "Import documents, spreadsheets, and work-order exports.",
            "Connect CMMS, PLC, SCADA, or sensor data when the pilot is ready.",
            "Keep AI answers grounded in your own machine context.",
            "Deploy without a heavy enterprise reliability program.",
          ].map((item) => (
            <li key={item}>
              <Check size={18} />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function StatsSection() {
  return (
    <section className="stats-section">
      <div className="stats-copy reveal">
        <span className="eyebrow">Operating impact</span>
        <h2>
          Built for measurable maintenance work, not vague AI theatre.
        </h2>
        <p>
          Track the outcomes buyers care about: time to repair, repeat faults,
          procedure reuse, technician adoption, and asset health risk.
        </p>
        <div className="stats-grid">
          {[
            ["42%", "faster repeat fault recovery"],
            ["31%", "fewer recurring alarms"],
            ["3-6", "week pilot rollout"],
            ["24/7", "machine memory access"],
          ].map(([value, label]) => (
            <div className="stat-item" key={label}>
              <strong>{value}</strong>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="masked-video reveal">
        <video autoPlay muted loop playsInline>
          <source src="/machmemo-spotlight.mp4" type="video/mp4" />
        </video>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="section-pad testimonial-section">
      <div className="section-heading reveal">
        <span className="eyebrow">Field notes</span>
        <h2>Credible proof without pretending every pilot is a logo wall.</h2>
      </div>
      <div className="testimonial-grid">
        {testimonials.map((item) => (
          <article className="testimonial-card reveal" key={item.quote}>
            <MessageSquareQuote size={26} />
            <p>&quot;{item.quote}&quot;</p>
            <div>
              <strong>{item.role}</strong>
              <span>{item.company}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function PricingPreview() {
  return (
    <section className="section-pad pricing-preview">
      <div className="split-heading reveal">
        <div>
          <span className="eyebrow">Pricing</span>
          <h2>Start small, prove value, expand machine by machine.</h2>
        </div>
        <a className="btn btn-secondary" href="/pricing">
          View pricing <ArrowRight size={16} />
        </a>
      </div>
      <PricingCards compact />
    </section>
  );
}

function FAQSection() {
  return (
    <section className="section-pad faq-section">
      <div className="section-heading reveal">
        <span className="eyebrow">FAQ</span>
        <h2>The practical questions maintenance buyers ask first.</h2>
      </div>
      <div className="faq-list">
        {faqItems.map((item) => (
          <details className="faq-item reveal" key={item.q}>
            <summary>{item.q}</summary>
            <p>{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="final-cta">
      <span className="eyebrow">Ready when your next fault appears</span>
      <h2>Build your factory&apos;s machine memory.</h2>
      <p>
        Start with your top five knowledge-critical machines and turn recurring
        downtime into reusable maintenance intelligence.
      </p>
      <a className="btn btn-primary" href="/request-demo">
        Request Demo <ArrowRight size={18} />
      </a>
    </section>
  );
}

function DetailPage({ page }: { page: keyof typeof pageContent }) {
  const data = pageContent[page];
  const Icon = data.icon;
  const related = page === "docs" || page === "fix" || page === "health" ? products : solutions;

  return (
    <>
      <section className="page-hero">
        <div className="page-hero-copy reveal">
          <span className="eyebrow">{data.eyebrow}</span>
          <h1>{data.title}</h1>
          <p>{data.copy}</p>
          <div className="hero-actions">
            <a className="btn btn-primary" href="/request-demo">
              Request Demo <ArrowRight size={18} />
            </a>
            <a className="btn btn-secondary" href="/security">
              AI & Data
            </a>
          </div>
        </div>
        <div className="detail-visual reveal">
          <Icon size={42} />
          <strong>{data.stat}</strong>
          <div className="mini-dashboard">
            {data.workflow.map((step, index) => (
              <span key={step}>
                <small>0{index + 1}</small>
                {step}
              </span>
            ))}
          </div>
        </div>
      </section>
      <section className="section-pad">
        <div className="feature-grid">
          {data.bullets.map((item) => (
            <article className="feature-card reveal" key={item}>
              <Check size={20} />
              <p>{item}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="dark-section product-workflow">
        <div className="section-heading reveal">
          <span className="eyebrow">Workflow</span>
          <h2>How teams use this in daily maintenance work.</h2>
        </div>
        <div className="workflow-line">
          {data.workflow.map((step, index) => (
            <article className="workflow-step reveal" key={step}>
              <span>{index + 1}</span>
              <strong>{step}</strong>
            </article>
          ))}
        </div>
      </section>
      <RelatedLinks items={related} />
      <FAQSection />
      <FinalCTA />
    </>
  );
}

function RelatedLinks({
  items,
}: {
  items: Array<{ title: string; href: string; description: string }>;
}) {
  return (
    <section className="section-pad related-section">
      <div className="split-heading reveal">
        <div>
          <span className="eyebrow">Related</span>
          <h2>Explore the rest of the MachMemo platform.</h2>
        </div>
      </div>
      <div className="related-grid">
        {items.map((item) => {
          const Icon = iconForTitle(item.title);
          return (
            <a className="related-card reveal" href={item.href} key={item.href}>
              <Icon size={22} />
              <strong>{item.title}</strong>
              <p>{item.description}</p>
            </a>
          );
        })}
      </div>
    </section>
  );
}

function PricingPage() {
  return (
    <>
      <section className="page-hero centered">
        <div className="page-hero-copy reveal">
          <span className="eyebrow">Pricing</span>
          <h1>Transparent enough for SMEs. Flexible enough for real factories.</h1>
          <p>
            Start with Docs and Fix, then expand into Health when your machines
            and data sources are ready. Pricing scales by site, machine scope,
            and integrations.
          </p>
        </div>
      </section>
      <section className="section-pad">
        <PricingCards />
      </section>
      <FAQSection />
      <FinalCTA />
    </>
  );
}

function PricingCards({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`pricing-grid ${compact ? "compact" : ""}`}>
      {pricingPlans.map((plan) => (
        <article
          className={`pricing-card reveal ${plan.featured ? "featured" : ""}`}
          key={plan.name}
        >
          {plan.featured && <span className="plan-badge">Most popular</span>}
          <h3>{plan.name}</h3>
          <p>{plan.description}</p>
          <div className="plan-price">
            <strong>{plan.price}</strong>
            <span>{plan.period}</span>
          </div>
          <ul>
            {plan.features.map((feature) => (
              <li key={feature}>
                <Check size={16} />
                {feature}
              </li>
            ))}
          </ul>
          <a className="btn btn-secondary" href="/request-demo">
            Discuss this plan
          </a>
        </article>
      ))}
    </div>
  );
}

function ContactPage() {
  return (
    <>
      <section className="page-hero">
        <div className="page-hero-copy reveal">
          <span className="eyebrow">Contact</span>
          <h1>Talk to MachMemo about your maintenance memory.</h1>
          <p>
            Tell us about your machines, recurring faults, documents, and
            current maintenance systems. We will help shape a focused pilot.
          </p>
        </div>
        <CompanyCard />
      </section>
      <section className="section-pad contact-grid-section">
        <ContactForm title="Send a message" cta="Send message" />
        <ContactDetails />
      </section>
    </>
  );
}

function DemoPage() {
  return (
    <section className="demo-page">
      <div className="demo-copy reveal">
        <span className="eyebrow">Request demo</span>
        <h1>Map your first five knowledge-critical machines.</h1>
        <p>
          A MachMemo demo is practical: we talk through your recurring downtime,
          scattered docs, expert know-how, and which workflow should go first.
        </p>
        <ul className="check-list">
          <li>
            <Check size={18} /> 30-minute discovery call
          </li>
          <li>
            <Check size={18} /> Pilot scope and data-readiness checklist
          </li>
          <li>
            <Check size={18} /> Pricing guidance for your site
          </li>
        </ul>
      </div>
      <ContactForm title="Request your demo" cta="Request demo" demo />
    </section>
  );
}

function ContactForm({
  title,
  cta,
  demo = false,
}: {
  title: string;
  cta: string;
  demo?: boolean;
}) {
  return (
    <form className="contact-form reveal">
      <h2>{title}</h2>
      <label>
        Full name
        <input type="text" placeholder="Anna Kowalska" />
      </label>
      <label>
        Work email
        <input type="email" placeholder="anna@factory.pl" />
      </label>
      <label>
        Company
        <input type="text" placeholder="Your manufacturing company" />
      </label>
      {demo && (
        <div className="form-row">
          <label>
            Company type
            <select>
              <option>Machine shop</option>
              <option>Maintenance team</option>
              <option>Industrial supplier</option>
              <option>Manufacturing SME</option>
            </select>
          </label>
          <label>
            Machines in scope
            <select>
              <option>1-10</option>
              <option>11-40</option>
              <option>41-100</option>
              <option>100+</option>
            </select>
          </label>
        </div>
      )}
      <label>
        Message
        <textarea placeholder="Tell us about your recurring downtime, machine docs, or maintenance workflow." />
      </label>
      <button className="btn btn-primary" type="button">
        {cta} <ArrowRight size={18} />
      </button>
    </form>
  );
}

function ContactDetails() {
  return (
    <div className="contact-details reveal">
      <h2>Company details</h2>
      <p>
        MachMemo Sp. z o.o. is a Poland-based product startup building AI
        maintenance intelligence for European manufacturing SMEs.
      </p>
      <ul>
        <li>
          <MapPin size={18} /> Rondo Daszynskiego 2B, 00-843 Warsaw, Poland
        </li>
        <li>
          <Mail size={18} /> hello@machmemo.com
        </li>
        <li>
          <Mail size={18} /> sales@machmemo.com
        </li>
        <li>
          <Phone size={18} /> +48 22 263 74 18
        </li>
      </ul>
      <div className="contact-mini">
        <strong>Support</strong>
        <span>support@machmemo.com</span>
      </div>
      <div className="contact-mini">
        <strong>Partnerships</strong>
        <span>partners@machmemo.com</span>
      </div>
    </div>
  );
}

function CompanyCard() {
  return (
    <aside className="company-card reveal">
      <Globe2 size={28} />
      <strong>Poland / EU</strong>
      <p>
        Built for manufacturers that need practical AI, GDPR-aware data
        posture, and fast maintenance value without enterprise overhead.
      </p>
    </aside>
  );
}

function SignInPage() {
  return (
    <section className="signin-page">
      <div className="signin-panel reveal">
        <Link className="brand" href="/" aria-label="MachMemo home">
          <span className="brand-mark">
            <span />
          </span>
          <span className="brand-word">MachMemo</span>
        </Link>
        <h1>Sign in to your machine memory.</h1>
        <label>
          Email
          <input type="email" placeholder="you@company.com" />
        </label>
        <label>
          Password
          <input type="password" placeholder="Password" />
        </label>
        <button type="button" className="btn btn-primary">
          Sign In
        </button>
        <a href="/contact">Forgot password?</a>
      </div>
      <div className="signin-aside reveal">
        <span className="eyebrow">Live asset context</span>
        <h2>Critical assets</h2>
        {["CNC-14", "PACK-03", "PRESS-08"].map((asset, index) => (
          <div className="asset-row" key={asset}>
            <span>{asset}</span>
            <strong>{[84, 67, 91][index]} health</strong>
          </div>
        ))}
      </div>
    </section>
  );
}

function SecurityPage() {
  return (
    <>
      <section className="page-hero">
        <div className="page-hero-copy reveal">
          <span className="eyebrow">AI & Data</span>
          <h1>Source-backed AI for real maintenance decisions.</h1>
          <p>
            MachMemo is designed for industrial teams that need trust. Answers
            should be grounded in your own documents, asset history, technician
            notes, and machine context.
          </p>
        </div>
        <div className="detail-visual reveal">
          <LockKeyhole size={42} />
          <strong>EU-ready security and data posture</strong>
          <div className="mini-dashboard">
            <span>
              <small>01</small> Source attribution
            </span>
            <span>
              <small>02</small> Access controls
            </span>
            <span>
              <small>03</small> Data residency options
            </span>
          </div>
        </div>
      </section>
      <section className="dark-section">
        <div className="story-grid">
          {[
            ["Verified answers", "Every fix path should show the source material behind it.", ShieldCheck],
            ["Human feedback", "Technicians confirm what worked so the memory improves.", UserRound],
            ["Data control", "Teams can separate documents, machine records, and user permissions.", Database],
          ].map(([title, copy, Icon]) => (
            <article className="story-card reveal" key={title as string}>
              {React.createElement(Icon as React.ElementType, { size: 28 })}
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </section>
      <FAQSection />
    </>
  );
}

function CaseStudiesPage() {
  return (
    <>
      <section className="page-hero centered">
        <div className="page-hero-copy reveal">
          <span className="eyebrow">Case studies</span>
          <h1>Outcome stories for maintenance intelligence pilots.</h1>
          <p>
            These cards show the kind of operational proof MachMemo is designed
            to create: faster fixes, fewer repeat faults, and less time hunting
            for documents.
          </p>
        </div>
      </section>
      <CaseStudyCarousel />
      <FinalCTA />
    </>
  );
}

function FAQPage() {
  return (
    <>
      <section className="page-hero centered">
        <div className="page-hero-copy reveal">
          <span className="eyebrow">FAQ</span>
          <h1>Practical answers for factory teams evaluating MachMemo.</h1>
        </div>
      </section>
      <FAQSection />
      <FinalCTA />
    </>
  );
}

function ROICalculatorPage() {
  return (
    <>
      <section className="page-hero centered">
        <div className="page-hero-copy reveal">
          <span className="eyebrow">ROI Calculator</span>
          <h1>Estimate the value of capturing your machine memory.</h1>
          <p>
            The first version is a guided worksheet for downtime, repeated
            faults, manual search time, and onboarding drag.
          </p>
        </div>
      </section>
      <section className="section-pad roi-section">
        {[
          ["Monthly downtime hours", "36"],
          ["Average downtime cost", "EUR 1,200 / hour"],
          ["Repeat-fault share", "28%"],
          ["Document search time", "18 hours / month"],
        ].map(([label, value]) => (
          <div className="roi-card reveal" key={label}>
            <span>{label}</span>
            <strong>{value}</strong>
          </div>
        ))}
      </section>
      <FinalCTA />
    </>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-brand">
        <Link className="brand" href="/">
          <span className="brand-mark">
            <span />
          </span>
          <span className="brand-word">MachMemo</span>
        </Link>
        <p>Machine memory for maintenance intelligence.</p>
        <small>MachMemo Sp. z o.o. - Warsaw, Poland</small>
      </div>
      <FooterColumn title="Products" items={products} />
      <FooterColumn title="Solutions" items={solutions} />
      <FooterColumn
        title="Company"
        items={[
          { title: "About", href: "/about" },
          { title: "Contact", href: "/contact" },
          { title: "Security", href: "/security" },
          { title: "Sign In", href: "/signin" },
        ]}
      />
      <FooterColumn
        title="Legal"
        items={[
          { title: "Privacy", href: "/security" },
          { title: "Terms", href: "/security" },
          { title: "GDPR", href: "/security" },
          { title: "AI & Data", href: "/security" },
        ]}
      />
      <div className="footer-contact">
        <strong>Contact</strong>
        <a href="mailto:hello@machmemo.com">hello@machmemo.com</a>
        <a href="mailto:sales@machmemo.com">sales@machmemo.com</a>
        <span>+48 22 263 74 18</span>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  items,
}: {
  title: string;
  items: Array<{ title: string; href: string }>;
}) {
  return (
    <div className="footer-column">
      <strong>{title}</strong>
      {items.map((item) => (
        <a href={item.href} key={item.href}>
          {item.title}
        </a>
      ))}
    </div>
  );
}
