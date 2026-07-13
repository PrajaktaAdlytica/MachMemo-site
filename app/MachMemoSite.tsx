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
  Brain,
  BriefcaseBusiness,
  Building2,
  Check,
  ChevronDown,
  ClipboardCheck,
  Cpu,
  ExternalLink,
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
  Search,
  ShieldCheck,
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

type IconType = React.ElementType;

type Product = {
  title: string;
  href: string;
  label: string;
  description: string;
  icon: IconType;
  metric: string;
  signal: string;
};

type Solution = {
  title: string;
  href: string;
  description: string;
  icon: IconType;
  proof: string;
};

type MenuItem = {
  title: string;
  href: string;
  description: string;
  icon: IconType;
};

const products: Product[] = [
  {
    title: "MachMemo Docs",
    href: "/products/docs",
    label: "Documents",
    description:
      "Controlled machine documents, SOPs, OEM manuals, service notes, photos, and expert walkthroughs mapped to every asset.",
    icon: FileText,
    metric: "18h",
    signal: "less document hunting each month",
  },
  {
    title: "MachMemo Fix",
    href: "/products/fix",
    label: "Verified fixes",
    description:
      "AI-guided troubleshooting that cites prior repairs, safety notes, parts context, and the sources behind every answer.",
    icon: Wrench,
    metric: "42%",
    signal: "faster repeat fault recovery",
  },
  {
    title: "MachMemo Health",
    href: "/products/health",
    label: "Asset health",
    description:
      "A practical risk layer for recurring faults, sensor trends, inspection history, and maintenance actions across key machines.",
    icon: Activity,
    metric: "31%",
    signal: "fewer recurring alarms",
  },
];

const solutions: Solution[] = [
  {
    title: "Machine Shops",
    href: "/solutions/machine-shops",
    description:
      "Preserve CNC alarms, setup quirks, spindle issues, coolant checks, and proven fixes for every critical machine.",
    icon: Factory,
    proof: "Built for spindle time, repeat faults, and faster shift handover.",
  },
  {
    title: "Maintenance Teams",
    href: "/solutions/maintenance-teams",
    description:
      "Give every shift the same verified memory from manuals, work orders, technician notes, and machine history.",
    icon: Users,
    proof: "Built around MTTR, first-time fix rate, and knowledge reuse.",
  },
  {
    title: "Industrial Suppliers",
    href: "/solutions/industrial-suppliers",
    description:
      "Turn installed-base service history, field notes, and customer issues into a reusable support intelligence layer.",
    icon: BriefcaseBusiness,
    proof: "Built for service scale, support quality, and product feedback.",
  },
];

const resources: MenuItem[] = [
  {
    title: "Case Studies",
    href: "/resources/case-studies",
    description: "Maintenance scenarios, pilot outcomes, and field-style proof.",
    icon: BarChart3,
  },
  {
    title: "FAQ",
    href: "/resources/faq",
    description: "Practical answers about AI, data, onboarding, and pricing.",
    icon: MessageSquareQuote,
  },
  {
    title: "ROI Calculator",
    href: "/resources/roi-calculator",
    description: "Estimate downtime waste, repeat-fault cost, and saved hours.",
    icon: Gauge,
  },
];

const companyLinks: MenuItem[] = [
  {
    title: "About",
    href: "/about",
    description: "A Polish product company building machine memory for EU plants.",
    icon: Building2,
  },
  {
    title: "AI & Data",
    href: "/security",
    description: "Source-backed answers, EU hosting posture, audit trail, and roles.",
    icon: ShieldCheck,
  },
  {
    title: "Contact",
    href: "/contact",
    description: "Warsaw office, demo requests, partnerships, and support.",
    icon: Mail,
  },
];

const caseStudies = [
  {
    label: "CNC shop pilot, Legnica",
    industry: "CNC machining",
    metric: "57%",
    title: "faster repeat alarm triage",
    detail:
      "Mapped spindle alarms, setup notes, and prior bearing repairs to each CNC asset so technicians could reuse the proven diagnostic path.",
    tone: "mint",
  },
  {
    label: "Packaging line pilot, Wroclaw",
    industry: "Packaging",
    metric: "-320h",
    title: "downtime risk avoided annually",
    detail:
      "Unified shift notes, fault codes, and PM history for recurring conveyor stops, giving the next shift a verified starting point.",
    tone: "amber",
  },
  {
    label: "Supplier service desk, Katowice",
    industry: "Industrial supplier",
    metric: "92%",
    title: "source-backed support answers",
    detail:
      "Connected installation manuals, field reports, and service fixes so support engineers could answer with citations instead of tribal recall.",
    tone: "burgundy",
  },
  {
    label: "Plastics plant rollout, Poznan",
    industry: "Manufacturing SME",
    metric: "24/7",
    title: "access to machine know-how",
    detail:
      "Captured technician procedures and machine quirks before senior knowledge walked out the door, then reused them in fix cards.",
    tone: "steel",
  },
];

const testimonials = [
  {
    quote:
      "MachMemo gave newer technicians a source-backed path instead of a folder hunt and three phone calls.",
    role: "Maintenance Manager",
    company: "Packaging manufacturer, Lower Silesia",
  },
  {
    quote:
      "The value was the memory. Once a machine issue was solved, it became easier for the whole team to solve again.",
    role: "Owner",
    company: "Precision machine shop, Wielkopolska",
  },
  {
    quote:
      "We needed practical AI that respected our documentation and our technicians. That is the part MachMemo got right.",
    role: "Service Lead",
    company: "Industrial supplier, Mazovia",
  },
];

const faqItems = [
  {
    q: "Is MachMemo a CMMS replacement?",
    a: "No. MachMemo is a maintenance intelligence layer that can sit beside a CMMS, spreadsheets, shared drives, and work-order exports. It is focused on machine memory, verified fixes, and reusable know-how.",
  },
  {
    q: "Do we need sensors to start?",
    a: "No. Teams can start with documents, SOPs, photos, fault history, and expert interviews. Health becomes stronger when PLC, SCADA, CMMS, or sensor data is connected later.",
  },
  {
    q: "How does it avoid unreliable AI answers?",
    a: "MachMemo is designed around source-backed answers. Fix paths show citations, machine context, prior repairs, and confidence signals. When context is missing, the product should show what is missing instead of guessing.",
  },
  {
    q: "Can technicians use it on the shop floor?",
    a: "Yes. The workflows are built around short fix cards, mobile-friendly answers, checklists, source snippets, and technician feedback after the job.",
  },
  {
    q: "Is this suitable for Polish and EU manufacturing SMEs?",
    a: "That is the core audience. MachMemo is positioned for practical pilots, EU data expectations, and teams that want AI value without a long enterprise transformation program.",
  },
  {
    q: "How long does a pilot take?",
    a: "A focused pilot usually starts in 3 to 6 weeks. The first phase covers top machines, high-value documents, known recurring faults, and the experts holding the most critical knowledge.",
  },
];

const pricingPlans = [
  {
    name: "Memo Start",
    price: "From EUR 690",
    period: "per site / month",
    description: "For teams that need clean machine docs and a reusable fix library.",
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
      "For maintenance teams standardizing verified troubleshooting across shifts.",
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
  Exclude<
    PageKey,
    | "home"
    | "pricing"
    | "contact"
    | "request-demo"
    | "signin"
    | "security"
    | "case-studies"
    | "faq"
    | "roi-calculator"
  >,
  {
    eyebrow: string;
    title: string;
    copy: string;
    icon: IconType;
    bullets: string[];
    workflow: string[];
    stat: string;
    panel: string;
  }
> = {
  docs: {
    eyebrow: "MachMemo Docs",
    title: "Controlled machine knowledge for every asset.",
    copy: "Turn manuals, SOPs, drawings, photos, supplier notes, and expert walkthroughs into a searchable machine memory your team can trust during real maintenance work.",
    icon: FileText,
    bullets: [
      "Map PDFs, SOPs, photos, and notes to specific machines.",
      "Create controlled machine pages for top assets.",
      "Turn senior technician walkthroughs into reusable procedures.",
      "Keep search results tied to sources and asset context.",
    ],
    workflow: [
      "Import documents",
      "Map to assets",
      "Capture expert notes",
      "Search by fault or part",
    ],
    stat: "18h saved monthly on document search",
    panel: "Document memory",
  },
  fix: {
    eyebrow: "MachMemo Fix",
    title: "Verified repair paths from alarm to action.",
    copy: "Give technicians a guided troubleshooting layer that combines machine history, source documents, prior fixes, safety notes, and parts context before every recommendation.",
    icon: Wrench,
    bullets: [
      "Ask about faults, alarms, symptoms, or parts in plain language.",
      "See likely causes ranked by machine context.",
      "Follow steps with safety notes and citations.",
      "Save confirmed repairs back into the machine memory.",
    ],
    workflow: ["Enter fault", "Review likely causes", "Follow checks", "Save repair"],
    stat: "42% faster repeat fault recovery",
    panel: "Fix recommendation",
  },
  health: {
    eyebrow: "MachMemo Health",
    title: "Asset health that explains what to do next.",
    copy: "Track health scores, warning patterns, recurring faults, and preventive actions across important machines without forcing a long reliability transformation program.",
    icon: Activity,
    bullets: [
      "Prioritize assets by risk, fault frequency, and context.",
      "Connect PLC, SCADA, sensor, CMMS, or spreadsheet data when ready.",
      "Spot stale preventive tasks and repeat failure modes.",
      "Turn health signals into practical maintenance actions.",
    ],
    workflow: [
      "Connect signals",
      "Score health",
      "Explain risk",
      "Recommend action",
    ],
    stat: "31% fewer repeat alarms",
    panel: "Health intelligence",
  },
  "machine-shops": {
    eyebrow: "Solution for machine shops",
    title: "Keep spindle time high and repeated CNC faults low.",
    copy: "MachMemo preserves setup knowledge, alarm history, maintenance procedures, offsets, parts context, and the practical machine quirks that usually stay in one expert's head.",
    icon: Factory,
    bullets: [
      "Capture spindle, coolant, axis, and tool-change issues.",
      "Build machine-specific procedure libraries for CNC assets.",
      "Help newer technicians follow proven recovery paths.",
      "Reduce repeated downtime from solved problems.",
    ],
    workflow: ["Map CNC assets", "Capture top faults", "Build fix cards", "Track repeats"],
    stat: "Designed for 5 to 200 person shops",
    panel: "CNC memory",
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
      "Capture know-how",
      "Deploy fix cards",
      "Review adoption",
    ],
    stat: "Built around MTTR and first-time fix rate",
    panel: "Shift memory",
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
    stat: "Useful for OEMs, distributors, and service partners",
    panel: "Service memory",
  },
  about: {
    eyebrow: "Company",
    title: "Built in Poland for factories that keep Europe moving.",
    copy: "MachMemo is a Warsaw-based product startup focused on practical AI for manufacturing SMEs. Every machine has memory. Our job is to make that memory structured, searchable, safe, and useful during maintenance work.",
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
      "EU data posture",
      "Practical onboarding",
    ],
    stat: "Machine memory for maintenance intelligence",
    panel: "Polish product company",
  },
};

export default function MachMemoSite({ page = "home" }: { page?: PageKey }) {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".reveal").forEach((item) => {
        gsap.fromTo(
          item,
          { autoAlpha: 0, y: 22 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.72,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 88%",
              once: true,
            },
          },
        );
      });

      const storyCards = gsap.utils.toArray<HTMLElement>(".story-card-motion");
      if (storyCards.length) {
        gsap.set(storyCards, {
          autoAlpha: 0,
          y: 64,
          scale: 0.96,
        });

        const storyTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: ".story-section",
            start: "top 68%",
            end: "bottom 38%",
            scrub: 0.85,
          },
        });

        storyTimeline.to(storyCards, {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.85,
          ease: "power3.out",
          stagger: 0.42,
        });
      }

      gsap.to(".scan-line", {
        xPercent: 115,
        duration: 3.4,
        repeat: -1,
        ease: "none",
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
    <div className={`site-shell ${page === "home" ? "home-shell" : ""}`}>
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
        <span className="brand-mark" />
        <span className="brand-word">MachMemo</span>
      </Link>

      <nav
        className="desktop-nav"
        aria-label="Main navigation"
        onMouseLeave={() => setActiveMenu(null)}
      >
        {[
          ["Products", "Products"],
          ["Solutions", "Solutions"],
          ["Resources", "Resources"],
          ["Company", "Company"],
        ].map(([item, label]) => (
          <button
            className={`nav-link ${activeMenu === item ? "active" : ""}`}
            key={item}
            onMouseEnter={() => setActiveMenu(item)}
            onFocus={() => setActiveMenu(item)}
            type="button"
          >
            {label}
            <ChevronDown size={15} />
          </button>
        ))}
        <Link className="nav-link direct" href="/pricing">
          Pricing
        </Link>
        {activeMenu && <MegaMenu activeMenu={activeMenu} />}
      </nav>

      <div className="header-actions">
        <span className="locale-pill">
          <Globe2 size={15} /> EN
        </span>
        <Link href="/signin" className="signin">
          Sign in
        </Link>
        <Link href="/request-demo" className="btn btn-primary header-demo">
          Book a demo <ArrowRight size={16} />
        </Link>
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
          <Link href="/pricing">Pricing</Link>
          <Link href="/about">Company</Link>
          <Link href="/security">AI & Data</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/request-demo" className="btn btn-primary">
            Book a demo
          </Link>
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
        <Link key={item.href} href={item.href}>
          {item.title}
        </Link>
      ))}
    </div>
  );
}

function MegaMenu({ activeMenu }: { activeMenu: string }) {
  const menuItems: MenuItem[] =
    activeMenu === "Products"
      ? products
      : activeMenu === "Solutions"
        ? solutions
        : activeMenu === "Resources"
          ? resources
          : companyLinks;

  return (
    <div className="mega-menu">
      <div className="mega-layout">
        <div className="mega-list">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link className="mega-item" href={item.href} key={item.href}>
                <span className="mega-icon">
                  <Icon size={21} />
                </span>
                <span>
                  <strong>{item.title}</strong>
                  <small>{item.description}</small>
                </span>
              </Link>
            );
          })}
        </div>
        <Link className="mega-feature" href="/resources/roi-calculator">
          <span className="feature-kicker">Featured workflow</span>
          <strong>Fault to verified fix in one memory graph</strong>
          <p>
            Connect documents, prior repairs, signals, and expert notes before
            the next downtime event reaches production.
          </p>
          <span className="feature-link">
            Estimate impact <ArrowRight size={16} />
          </span>
        </Link>
      </div>
    </div>
  );
}

function HomePage() {
  return (
    <>
      <Hero />
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
    <section className="hero" aria-label="MachMemo hero">
      <div className="hero-copy">
        <span className="badge-line">
          <PlugZap size={16} />
          Verified AI for maintenance and reliability teams
        </span>
        <h1>
          Turn machine issues into <span>memory that works.</span>
        </h1>
        <p className="hero-subcopy">
          MachMemo connects documents, repairs, signals, and expert know-how
          into one verified machine memory layer, so teams solve faster and
          keep learning.
        </p>
        <div className="hero-actions">
          <Link href="/request-demo" className="btn btn-primary">
            Book a demo <ArrowRight size={18} />
          </Link>
          <Link href="/products/fix" className="btn btn-secondary">
            See how it works
          </Link>
        </div>
        <div className="hero-proof">
          {["GDPR-ready", "EU hosting option", "Source-backed answers", "3-6 week pilot"].map((item) => (
            <span key={item}>
              <Check size={15} />
              {item}
            </span>
          ))}
        </div>
      </div>

      <div className="hero-visual-stage" aria-label="Robotic arm activating machine memory">
        <div className="robotic-hero-image" />
        <div className="scan-line" />
      </div>
    </section>
  );
}

function ProductArchitecture() {
  return (
    <section className="section-pad product-section">
      <SectionIntro
        eyebrow="Product architecture"
        title="Docs, Fix, and Health work as one verified memory layer."
        copy="Start with the sharpest operational pain, then expand. Each product strengthens the same asset memory instead of creating another silo."
      />
      <div className="product-grid">
        {products.map((product, index) => {
          const Icon = product.icon;
          return (
            <Link
              className="product-card reveal"
              href={product.href}
              key={product.title}
            >
              <div className="product-card-head">
                <span className="icon-badge">
                  <Icon size={23} />
                </span>
                <span>{product.label}</span>
              </div>
              <h3>{product.title}</h3>
              <p>{product.description}</p>
              <MiniProductPanel index={index} />
              <div className="product-footer">
                <strong>{product.metric}</strong>
                <span>{product.signal}</span>
              </div>
              <span className="product-card-link">
                Explore product
                <ArrowRight size={17} />
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

function MiniProductPanel({ index }: { index: number }) {
  const panels = [
    ["Manuals", "SOPs", "Expert notes"],
    ["Likely cause", "Safety step", "Prior repair"],
    ["Health score", "Risk trend", "Next action"],
  ];

  return (
    <div className="mini-product-panel">
      {panels[index].map((item, itemIndex) => (
        <span key={item}>
          <i />
          {item}
          <strong>{itemIndex === 0 ? "Live" : "Linked"}</strong>
        </span>
      ))}
    </div>
  );
}

function ScrollStory() {
  const steps = [
    {
      title: "A fault appears",
      copy: "Line 3 reports vibration after a bearing replacement. The previous shift only left a short note.",
      icon: AlertTriangle,
    },
    {
      title: "Context is assembled",
      copy: "MachMemo gathers manuals, prior work orders, SCADA trends, part numbers, and technician notes.",
      icon: Search,
    },
    {
      title: "A verified answer is built",
      copy: "The technician sees likely causes, safety checks, and source citations before taking action.",
      icon: ShieldCheck,
    },
    {
      title: "The fix becomes memory",
      copy: "The confirmed repair is saved back to the asset, ready for the next shift and the next similar fault.",
      icon: ClipboardCheck,
    },
  ];

  return (
    <section className="section-pad story-section">
      <div className="story-copy reveal">
        <span className="eyebrow">From fault to memory</span>
        <h2>A breakdown should make every future repair smarter.</h2>
        <p>
          MachMemo treats downtime as a learning loop. The answer is useful in
          the moment, but the real value is the reusable memory left behind.
        </p>
      </div>
      <div className="story-rail">
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <article className={`story-card story-card-motion story-card-${index}`} key={step.title}>
              <span className="step-index">{index + 1}</span>
              <Icon size={25} />
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
    <section className="section-pad memory-layer">
      <SectionIntro
        eyebrow="Machine memory layer"
        title="One verified memory for every machine, not another folder."
        copy="Documents, issues, signals, and experience become one asset-level system your team can search, trust, and improve."
      />
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
        <Layers3 size={27} />
        <strong>Unified into MachMemo machine memory</strong>
      </div>
    </section>
  );
}

function CaseStudyCarousel() {
  const scroller = useRef<HTMLDivElement | null>(null);
  const move = (dir: number) => {
    scroller.current?.scrollBy({ left: dir * 390, behavior: "smooth" });
  };

  return (
    <section className="section-pad cases-section">
      <div className="split-heading reveal">
        <div>
          <span className="eyebrow">Pilot proof</span>
          <h2>Where machine memory starts paying back.</h2>
          <p>
            Representative Polish and EU maintenance scenarios for repeat
            faults, shift handovers, service support, and knowledge capture.
          </p>
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
            <div className="case-media">
              <span />
              <span />
              <span />
              <span />
            </div>
            <div className="case-content">
              <span>{item.industry}</span>
              <h3>{item.label}</h3>
              <strong>{item.metric}</strong>
              <p>{item.title}</p>
              <small>{item.detail}</small>
            </div>
            <ArrowRight className="case-arrow" size={24} />
          </article>
        ))}
      </div>
    </section>
  );
}

function IntegrationsSection() {
  const tools = ["Excel", "CMMS", "SAP PM", "PLC", "SCADA", "Sensors"];

  return (
    <section className="section-pad integrations-section">
      <div className="integration-copy reveal">
        <span className="eyebrow">No rip-and-replace</span>
        <h2>Start with the tools and records your plant already uses.</h2>
        <p>
          MachMemo can begin with files and exports, then connect live systems
          when the pilot has earned trust.
        </p>
        <ul className="check-list">
          {[
            "Import documents, spreadsheets, photos, and work-order exports.",
            "Connect CMMS, PLC, SCADA, or sensor data when ready.",
            "Keep AI answers grounded in your own machine context.",
            "Deploy with a practical EU data and access-control posture.",
          ].map((item) => (
            <li key={item}>
              <Check size={17} />
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div className="integration-board reveal">
        <div className="integration-core">
          <PlugZap size={30} />
          <strong>MachMemo</strong>
        </div>
        {tools.map((item, index) => (
          <span className={`integration-pill pill-${index}`} key={item}>
            {item}
          </span>
        ))}
      </div>
    </section>
  );
}

function StatsSection() {
  return (
    <section className="section-pad stats-section">
      <div className="stats-copy reveal">
        <span className="eyebrow">Operating impact</span>
        <h2>Measurable maintenance outcomes, not vague AI theatre.</h2>
        <p>
          Track the numbers buyers care about: repeat fault rate, time to
          repair, source-backed answer coverage, and knowledge reuse.
        </p>
      </div>
      <div className="stats-grid">
        {[
          ["98%", "source-backed answers in scoped pilot data"],
          ["-27%", "unplanned downtime in repeated fault workflows"],
          ["+18%", "technician throughput on common issues"],
          ["2.4M", "signals reviewed daily when connected"],
        ].map(([value, label]) => (
          <article className="stat-card reveal" key={label}>
            <strong>{value}</strong>
            <span>{label}</span>
          </article>
        ))}
      </div>
      <div className="spotlight-video reveal">
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
      <SectionIntro
        eyebrow="Field notes"
        title="The product should feel useful to the technician and credible to the plant manager."
        copy="MachMemo is designed for the everyday friction between machine knowledge, documentation, and downtime."
      />
      <div className="testimonial-grid">
        {testimonials.map((item) => (
          <article className="testimonial-card reveal" key={item.quote}>
            <MessageSquareQuote size={25} />
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
        <Link className="btn btn-secondary" href="/pricing">
          View pricing <ArrowRight size={16} />
        </Link>
      </div>
      <PricingCards compact />
    </section>
  );
}

function FAQSection() {
  return (
    <section className="section-pad faq-section">
      <SectionIntro
        eyebrow="FAQ"
        title="The practical questions maintenance buyers ask first."
        copy="Clear answers for teams evaluating whether AI can fit real plant work."
      />
      <FAQList limit={4} />
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="final-cta">
      <span className="eyebrow">Ready when the next fault appears</span>
      <h2>Build your factory&apos;s machine memory.</h2>
      <p>
        Start with your top five knowledge-critical machines and turn recurring
        downtime into reusable maintenance intelligence.
      </p>
      <Link className="btn btn-primary" href="/request-demo">
        Request Demo <ArrowRight size={18} />
      </Link>
    </section>
  );
}

function SectionIntro({
  eyebrow,
  title,
  copy,
}: {
  eyebrow: string;
  title: string;
  copy: string;
}) {
  return (
    <div className="section-heading reveal">
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      <p>{copy}</p>
    </div>
  );
}

function DetailPage({ page }: { page: keyof typeof pageContent }) {
  const data = pageContent[page];
  const Icon = data.icon;
  const related =
    page === "docs" || page === "fix" || page === "health" ? products : solutions;

  return (
    <>
      <section className="inner-hero">
        <div className="inner-copy reveal">
          <span className="eyebrow">{data.eyebrow}</span>
          <h1>{data.title}</h1>
          <p>{data.copy}</p>
          <div className="hero-actions">
            <Link className="btn btn-primary" href="/request-demo">
              Request Demo <ArrowRight size={18} />
            </Link>
            <Link className="btn btn-secondary" href="/security">
              AI & Data
            </Link>
          </div>
        </div>
        <div className="detail-panel reveal">
          <div className="detail-panel-top">
            <span className="icon-badge">
              <Icon size={26} />
            </span>
            <strong>{data.panel}</strong>
          </div>
          <div className="detail-health">
            <span>{data.stat}</span>
            <strong>Live pilot view</strong>
          </div>
          <div className="detail-flow">
            {data.workflow.map((step, index) => (
              <span key={step}>
                <i>{index + 1}</i>
                {step}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad split-feature">
        <div className="feature-copy reveal">
          <span className="eyebrow">Workflow</span>
          <h2>Made for the moment when a machine is down and the team needs context.</h2>
          <p>
            MachMemo keeps the interface focused: what happened, what sources
            matter, what has worked before, and what should happen next.
          </p>
        </div>
        <div className="feature-grid">
          {data.bullets.map((item) => (
            <article className="feature-card reveal" key={item}>
              <Check size={18} />
              <p>{item}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-pad related-section">
        <SectionIntro
          eyebrow="Connected platform"
          title="Every page connects back to the same machine memory."
          copy="Products and solutions strengthen one another, so knowledge captured in one workflow improves the next."
        />
        <div className="related-grid">
          {related.map((item) => {
            const ItemIcon = item.icon;
            return (
              <Link className="related-card reveal" href={item.href} key={item.title}>
                <ItemIcon size={24} />
                <strong>{item.title}</strong>
                <p>{item.description}</p>
                <span>
                  Explore <ArrowRight size={15} />
                </span>
              </Link>
            );
          })}
        </div>
      </section>
      <FinalCTA />
    </>
  );
}

function PricingPage() {
  return (
    <>
      <section className="inner-hero centered">
        <div className="inner-copy reveal">
          <span className="eyebrow">Pricing</span>
          <h1>Pricing built around practical pilots and plant expansion.</h1>
          <p>
            Start with a focused machine memory pilot. Expand into verified
            troubleshooting and health intelligence once value is visible.
          </p>
        </div>
      </section>
      <section className="section-pad pricing-page">
        <PricingCards />
      </section>
      <FAQSection />
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
          {plan.featured && <span className="plan-badge">Most requested</span>}
          <h3>{plan.name}</h3>
          <strong className="plan-price">{plan.price}</strong>
          <span className="plan-period">{plan.period}</span>
          <p>{plan.description}</p>
          <ul>
            {plan.features.map((feature) => (
              <li key={feature}>
                <Check size={16} />
                {feature}
              </li>
            ))}
          </ul>
          <Link className="btn btn-primary" href="/request-demo">
            Request quote
          </Link>
        </article>
      ))}
    </div>
  );
}

function ContactPage() {
  return (
    <section className="section-pad contact-section">
      <div className="contact-details reveal">
        <span className="eyebrow">Contact</span>
        <h1>Talk with the MachMemo team in Poland.</h1>
        <p>
          For demos, pilots, supplier partnerships, and industrial AI questions,
          contact our Warsaw office.
        </p>
        <ContactDetails />
      </div>
      <LeadForm title="Send a message" />
    </section>
  );
}

function DemoPage() {
  return (
    <section className="section-pad demo-section">
      <div className="demo-copy reveal">
        <span className="eyebrow">Request demo</span>
        <h1>Show us the machines where knowledge gets lost.</h1>
        <p>
          We will map a pilot around your top assets, recurring faults,
          documents, and team knowledge. No generic deck first.
        </p>
        <div className="demo-checks">
          {[
            "30-minute discovery call",
            "Pilot scope for 5-15 critical machines",
            "EU data and access review",
          ].map((item) => (
            <span key={item}>
              <Check size={15} />
              {item}
            </span>
          ))}
        </div>
      </div>
      <LeadForm title="Book a MachMemo demo" demo />
    </section>
  );
}

function LeadForm({ title, demo = false }: { title: string; demo?: boolean }) {
  const [submitted, setSubmitted] = useState(false);

  return (
    <form
      className="lead-form reveal"
      onSubmit={(event) => {
        event.preventDefault();
        setSubmitted(true);
      }}
    >
      <h2>{title}</h2>
      <label>
        Name
        <input required placeholder="Anna Kowalska" />
      </label>
      <label>
        Work email
        <input required type="email" placeholder="anna@fabryka.pl" />
      </label>
      <label>
        Company
        <input required placeholder="Zaklady Produkcyjne Nowa Sp. z o.o." />
      </label>
      {demo && (
        <label>
          Main maintenance challenge
          <select defaultValue="Recurring faults">
            <option>Recurring faults</option>
            <option>Scattered documentation</option>
            <option>Retiring expert knowledge</option>
            <option>Asset health visibility</option>
          </select>
        </label>
      )}
      <label>
        Message
        <textarea placeholder="Tell us about your machines, team, and downtime problem." />
      </label>
      <button className="btn btn-primary" type="submit">
        {demo ? "Request demo" : "Send message"} <ArrowRight size={16} />
      </button>
      {submitted && (
        <p className="form-success">
          Thanks. The MachMemo team will follow up from Warszawa.
        </p>
      )}
    </form>
  );
}

function ContactDetails() {
  return (
    <div className="contact-list">
      <span>
        <Building2 size={18} /> MachMemo Sp. z o.o.
      </span>
      <span>
        <MapPin size={18} /> ul. Prosta 20, 00-850 Warszawa, Polska
      </span>
      <a href="mailto:kontakt@machmemo.com">
        <Mail size={18} /> kontakt@machmemo.com
      </a>
      <a href="tel:+48221048317">
        <Phone size={18} /> +48 22 104 83 17
      </a>
    </div>
  );
}

function SignInPage() {
  return (
    <section className="signin-page">
      <div className="signin-panel reveal">
        <Link className="brand" href="/" aria-label="MachMemo home">
          <span className="brand-mark" />
          <span className="brand-word">MachMemo</span>
        </Link>
        <h1>Sign in to machine memory.</h1>
        <p>Access docs, fix paths, health signals, and source-backed answers.</p>
        <form>
          <label>
            Email
            <input type="email" placeholder="technik@zaklad.pl" />
          </label>
          <label>
            Password
            <input type="password" placeholder="••••••••" />
          </label>
          <button className="btn btn-primary" type="button">
            Sign In
          </button>
        </form>
      </div>
      <aside className="signin-aside reveal">
        <span className="eyebrow">Plant context</span>
        <h2>Line 3 has three open memory updates.</h2>
        <div className="signin-update">
          <strong>Verified fix saved</strong>
          <span>Pompa P-101 vibration after service window</span>
        </div>
        <div className="signin-update">
          <strong>Health score changed</strong>
          <span>Extruder-310 moved from 82 to 74</span>
        </div>
        <div className="signin-update">
          <strong>Document linked</strong>
          <span>SOP-PMP-07 attached to recurring failure mode</span>
        </div>
      </aside>
    </section>
  );
}

function SecurityPage() {
  return (
    <>
      <section className="inner-hero centered">
        <div className="inner-copy reveal">
          <span className="eyebrow">AI & Data</span>
          <h1>Verified answers, cited sources, and EU-ready controls.</h1>
          <p>
            MachMemo is designed for practical industrial AI: answers tied to
            sources, access controls, audit trails, and deployment options that
            fit European manufacturing expectations.
          </p>
        </div>
      </section>
      <section className="section-pad security-grid">
        {[
          ["Source attribution", "Every fix path shows the documents, repairs, signals, and notes used to form the answer.", FileText],
          ["Role-based access", "Separate technician, maintenance lead, supplier, and admin permissions.", LockKeyhole],
          ["EU data posture", "Designed for GDPR expectations, EU hosting options, and controlled onboarding.", Globe2],
          ["Refuse to guess", "If context is missing, MachMemo should surface the missing evidence instead of inventing confidence.", ShieldCheck],
        ].map(([title, copy, Icon]) => (
          <article className="feature-card reveal" key={title as string}>
            <Icon size={24} />
            <h3>{title as string}</h3>
            <p>{copy as string}</p>
          </article>
        ))}
      </section>
    </>
  );
}

function CaseStudiesPage() {
  return (
    <>
      <section className="inner-hero centered">
        <div className="inner-copy reveal">
          <span className="eyebrow">Case studies</span>
          <h1>Maintenance scenarios built around measurable outcomes.</h1>
          <p>
            These example scenarios show how MachMemo can be scoped for
            machine shops, maintenance teams, and industrial suppliers.
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
    <section className="section-pad faq-page">
      <SectionIntro
        eyebrow="FAQ"
        title="Everything a plant team asks before the first pilot."
        copy="Straight answers about setup, integrations, AI confidence, shop-floor usage, and pricing."
      />
      <FAQList />
    </section>
  );
}

function FAQList({ limit }: { limit?: number }) {
  return (
    <div className="faq-list">
      {faqItems.slice(0, limit ?? faqItems.length).map((item) => (
        <details className="faq-item reveal" key={item.q}>
          <summary>{item.q}</summary>
          <p>{item.a}</p>
        </details>
      ))}
    </div>
  );
}

function ROICalculatorPage() {
  const [hours, setHours] = useState(28);
  const [rate, setRate] = useState(950);
  const [repeat, setRepeat] = useState(34);
  const monthlyWaste = hours * rate;
  const annualOpportunity = Math.round(monthlyWaste * 12 * (repeat / 100));

  return (
    <section className="section-pad roi-section">
      <div className="roi-copy reveal">
        <span className="eyebrow">ROI calculator</span>
        <h1>Estimate the cost of forgotten machine knowledge.</h1>
        <p>
          Use simple assumptions to understand where reusable fixes and faster
          context can create value.
        </p>
      </div>
      <div className="roi-card reveal">
        <label>
          Downtime hours per month
          <input
            type="number"
            value={hours}
            onChange={(event) => setHours(Number(event.target.value))}
          />
        </label>
        <label>
          Cost per downtime hour in EUR
          <input
            type="number"
            value={rate}
            onChange={(event) => setRate(Number(event.target.value))}
          />
        </label>
        <label>
          Repeat-fault share in percent
          <input
            type="number"
            value={repeat}
            onChange={(event) => setRepeat(Number(event.target.value))}
          />
        </label>
        <div className="roi-result">
          <span>Annual repeat-fault opportunity</span>
          <strong>EUR {annualOpportunity.toLocaleString("en-US")}</strong>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const socialLinks = [
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/company/machmemo",
      mark: "in",
    },
    { label: "X", href: "https://x.com/machmemo", mark: "x" },
    {
      label: "YouTube",
      href: "https://www.youtube.com/@machmemo",
      mark: "yt",
    },
  ];

  return (
    <footer className="site-footer">
      <div className="footer-brand">
        <Link className="brand" href="/" aria-label="MachMemo home">
          <span className="brand-mark" />
          <span className="brand-word">MachMemo</span>
        </Link>
        <p>
          Machine memory for maintenance intelligence. Built in Poland for
          manufacturing SMEs, machine shops, maintenance teams, and industrial
          suppliers across Europe.
        </p>
        <ContactDetails />
        <div className="footer-social" aria-label="MachMemo social links">
          {socialLinks.map((item) => (
            <a
              href={item.href}
              key={item.label}
              target="_blank"
              rel="noreferrer"
              aria-label={item.label}
            >
              <span>{item.mark}</span>
              <ExternalLink size={14} />
            </a>
          ))}
        </div>
      </div>
      <FooterColumn title="Products" items={products} />
      <FooterColumn title="Solutions" items={solutions} />
      <FooterColumn title="Resources" items={resources} />
      <FooterColumn
        title="Company"
        items={[
          ...companyLinks,
          { title: "Pricing", href: "/pricing", description: "", icon: Gauge },
          {
            title: "Request Demo",
            href: "/request-demo",
            description: "",
            icon: Mail,
          },
          {
            title: "Sign In",
            href: "/signin",
            description: "",
            icon: LockKeyhole,
          },
        ]}
      />
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
        <Link key={item.href} href={item.href}>
          {item.title}
        </Link>
      ))}
    </div>
  );
}
