import React, { useState, useEffect } from 'react';
import {
  Smartphone,
  Zap,
  Layout,
  Layers,
  Sliders,
  Mail,
  Copy,
  Check,
  ChevronDown,
  ExternalLink,
  Code2,
  ArrowUpRight,
  ArrowRight,
  ShieldCheck,
  Clock,
  Users,
  X,
  Calculator,
  FileText,
  Send,
  Sparkles,
  Menu
} from 'lucide-react';

interface Project {
  id: string;
  title: string;
  category: 'app' | 'automation' | 'website';
  categoryLabel: string;
  domain: string;
  shortDesc: string;
  coreFocus: string;
  stack: string;
  fullDesc: string;
  impact: string;
  techDetails: string;
  hasInteractiveDemo?: boolean;
}

const PROJECTS: Project[] = [
  {
    id: 'nithalam7',
    title: 'Nithalam7 E-Commerce Platform',
    category: 'app',
    categoryLabel: 'E-Commerce App',
    domain: 'Retail Platform',
    shortDesc: 'Fast, intuitive digital commerce app and storefront with instant product discovery, streamlined cart, and automated order status notifications.',
    coreFocus: 'Frictionless Shopping & Checkout',
    stack: 'React · Cloud DB · Payment Gateway',
    fullDesc: 'A purpose-built digital commerce application created to deliver an ultra-fast shopping journey. Features intuitive product browsing, category filtering, cart management, instant checkout, and automated customer order confirmations.',
    impact: 'Replaced a third-party hosted store with an owned platform, eliminating monthly platform subscription fees and providing sub-second page transitions.',
    techDetails: 'React, Node.js API, PostgreSQL Database, Razorpay Gateway, Automated Transaction Webhooks'
  },
  {
    id: 'tneb',
    title: 'New TNEB Tariff Calculator',
    category: 'app',
    categoryLabel: 'Utility Application',
    domain: 'Energy & Power Calculation',
    shortDesc: 'Comprehensive Tamil Nadu Electricity Board tariff calculation engine. Computes bi-monthly bills across slab tiers, fixed costs, and government subsidies.',
    coreFocus: 'Accurate Multi-Slab Tariff Computation',
    stack: 'Algorithmic Engine · Responsive UI',
    fullDesc: 'Engineered an accurate tariff calculator tailored to the latest Tamil Nadu Electricity Board (TNEB) bi-monthly billing slabs. Simplifies complex tiered unit slabs, fixed charges, and subsidy calculations into instant, crystal-clear bill breakdowns.',
    impact: 'Over 150,000+ accurate calculations with zero billing disputes, helping consumers understand peak slab rates and plan power conservation.',
    techDetails: 'Algorithmic Calculation Engine, Responsive Mobile UI, Local State Caching, Zero Server Latency',
    hasInteractiveDemo: true
  },
  {
    id: 'pearl7',
    title: 'Pearl7 CRM & Dashboards',
    category: 'app',
    categoryLabel: 'CRM & Dashboards',
    domain: 'Business Operations',
    shortDesc: 'Tailored Customer Relationship Management system with live operational dashboards, deal pipelines, customer interactions, and visual analytics.',
    coreFocus: 'Pipeline Visibility & Client Data',
    stack: 'Custom CRM · Analytics · Cloud DB',
    fullDesc: 'A comprehensive CRM platform tailored for growing business teams. Centralizes customer records, deal pipeline stages, follow-up scheduling, and interactive operational metrics without the bloat of expensive enterprise SaaS.',
    impact: 'Cut client follow-up response latency from 4 hours to under 30 seconds for small service teams.',
    techDetails: 'Full-Stack Architecture, Interactive Dashboard Visualizations, Role-Based Access (Admin/Staff), Realtime Database'
  },
  {
    id: 'chuvadi',
    title: 'Chuvadi - Personal Life Hub',
    category: 'app',
    categoryLabel: 'Personal OS App',
    domain: 'Finance · Health · Garage',
    shortDesc: 'All-in-one personal tracking system for finance, health vitals, and vehicle garage maintenance with cashflow insights and renewal alerts.',
    coreFocus: 'Unified Life & Asset Tracking',
    stack: 'Modular Web/App · Visual Trends',
    fullDesc: 'Chuvadi integrates three vital everyday domains: Personal Finance (income, expenses, cashflow insights), Health (vitals, fitness routines, wellness logs), and Garage (vehicle service records, fuel efficiency, insurance renewals).',
    impact: 'Replaced 3 separate fragmented tracking subscriptions with a unified, secure, private personal tracker.',
    techDetails: 'Single-Page Application, Modular Component Architecture, Encrypted Data Store, Data Analytics Charts'
  },
  {
    id: 'automation-alerts',
    title: 'Automated Workflows & Alerts',
    category: 'automation',
    categoryLabel: 'Workflow Automation',
    domain: 'Business Workflows',
    shortDesc: 'Connecting disconnected spreadsheets, CRMs, and messaging channels. Automatic customer WhatsApp notifications, scheduled invoicing, and 2-way sync.',
    coreFocus: 'Zero Repetitive Manual Work',
    stack: 'Webhooks · APIs · Python / Node',
    fullDesc: 'Custom automation pipelines that eliminate repetitive copy-pasting and manual message dispatch. Triggers instant WhatsApp order status messages, compiles PDF invoices automatically on transaction events, and synchronizes sales records directly to your databases or sheets.',
    impact: 'Saves business owners 12+ hours per week of manual clerical copying and dispatching.',
    techDetails: 'WhatsApp Cloud API, Webhooks, Python Serverless, Google Workspace APIs, Cloud Functions'
  },
  {
    id: 'web-showcase',
    title: 'Modern Business Websites',
    category: 'website',
    categoryLabel: 'High-Converting Web',
    domain: 'Conversion & SEO',
    shortDesc: 'Ultra-fast, mobile-optimized business sites tailored for credibility and conversion with clean semantic code, local SEO schema, and direct inquiry triggers.',
    coreFocus: 'Speed, Local SEO & Inquiries',
    stack: 'Semantic HTML5 · Tailwind · SEO',
    fullDesc: 'Clean, modern web interfaces designed to turn visitors into phone calls and qualified inquiries. Featuring sub-second load times, mobile-responsive fluid layouts, schema metadata for local search rankings, and click-to-WhatsApp communication.',
    impact: 'Consistently scores 95+ on Google PageSpeed Mobile, driving up organic inbound reach.',
    techDetails: 'Semantic Web Standards, Tailwind CSS, Local SEO Schema, Mobile-First UX, Web Performance Optimization'
  }
];

const AVAILABLE_FEATURES = [
  { id: 'roles', label: 'User Accounts & Roles', desc: 'Admin, Staff & Client logins' },
  { id: 'whatsapp', label: 'WhatsApp / SMS Alerts', desc: 'Automated customer notifications' },
  { id: 'payment', label: 'Payment Gateway', desc: 'Stripe, UPI, or Razorpay' },
  { id: 'sheets', label: 'Google Sheets / CRM Sync', desc: 'Live 2-way data flow' },
  { id: 'pdf', label: 'PDF Invoicing & Reports', desc: 'Auto-generated branded docs' },
  { id: 'seo', label: 'Local SEO Optimization', desc: 'Google map pack & speed ranking' }
];

export default function App() {
  const [filter, setFilter] = useState<'all' | 'app' | 'automation' | 'website'>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Scope Planner State
  const [primarySolution, setPrimarySolution] = useState<'app' | 'automation' | 'website'>('app');
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([
    'User Accounts & Roles',
    'WhatsApp / SMS Alerts',
    'Google Sheets / CRM Sync'
  ]);

  // Contact Form State
  const [senderName, setSenderName] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [serviceType, setServiceType] = useState('Custom App for Small Scale Business');
  const [projectMessage, setProjectMessage] = useState('');

  // TNEB Mini Calculator Modal State
  const [showTnebModal, setShowTnebModal] = useState(false);
  const [unitsConsumed, setUnitsConsumed] = useState(380);

  // Toast helper
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((curr) => (curr === msg ? null : curr));
    }, 3200);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText('hello@rajapriyan.com');
    showToast('Copied hello@rajapriyan.com to clipboard');
  };

  const toggleFeature = (featureLabel: string) => {
    setSelectedFeatures((prev) =>
      prev.includes(featureLabel)
        ? prev.filter((f) => f !== featureLabel)
        : [...prev, featureLabel]
    );
  };

  const getPrimaryLabel = (type: 'app' | 'automation' | 'website') => {
    if (type === 'app') return 'Custom Small Business App';
    if (type === 'automation') return 'Workflow Automation';
    return 'Business Website';
  };

  const handleSendScopeEnquiry = () => {
    const primary = getPrimaryLabel(primarySolution);
    const feats = selectedFeatures.map((f) => `• ${f}`).join('\n');
    const subject = encodeURIComponent(`Project Scope Enquiry: ${primary}`);
    const body = encodeURIComponent(
      `Hi Raja,\n\nI configured a project scope enquiry on your website.\n\nPrimary Requirement: ${primary}\nSelected Capabilities:\n${feats}\n\nAbout My Business & Current Workflow:\n[Please tell Raja what your current routine looks like and what you need to build/automate]\n\nBest regards,\n[Your Name]\n[Your Business]`
    );
    window.location.href = `mailto:hello@rajapriyan.com?subject=${subject}&body=${body}`;
  };

  const copyScopeSpec = () => {
    const primary = getPrimaryLabel(primarySolution);
    const text = `Project Scope Configuration for Raja Priyan (hello@rajapriyan.com)\nPrimary Requirement: ${primary}\nSelected Features:\n${selectedFeatures.map((f) => `- ${f}`).join('\n')}`;
    navigator.clipboard.writeText(text);
    showToast('Scope specification copied to clipboard!');
  };

  const applyScopeToForm = () => {
    const primary = getPrimaryLabel(primarySolution);
    setServiceType(
      primarySolution === 'app'
        ? 'Custom App for Small Scale Business'
        : primarySolution === 'automation'
        ? 'Business Workflow Automation'
        : 'High-Converting Website Building'
    );
    setProjectMessage(
      `Hi Raja,\nI am looking to build a ${primary}.\n\nKey features required:\n${selectedFeatures.map((f) => `• ${f}`).join('\n')}\n\nCurrent bottleneck / routine: `
    );

    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
    showToast('Scope copied into contact form below');
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Project Enquiry: ${senderName} (${businessName}) - ${serviceType}`);
    const body = encodeURIComponent(
      `Name: ${senderName}\nBusiness: ${businessName}\nEmail: ${senderEmail}\nRequirement: ${serviceType}\n\nProject Scope / Problem Statement:\n${projectMessage}\n\n--\nSent via rajapriyan.com enquiry form`
    );
    showToast('Redirecting to your email client to send to hello@rajapriyan.com...');
    setTimeout(() => {
      window.location.href = `mailto:hello@rajapriyan.com?subject=${subject}&body=${body}`;
    }, 350);
  };

  const copyDraftedEnquiry = () => {
    const text = `To: hello@rajapriyan.com\nSubject: Project Enquiry: ${senderName || 'Client'} (${businessName || 'Business'})\nName: ${senderName}\nBusiness: ${businessName}\nEmail: ${senderEmail}\nRequirement: ${serviceType}\nMessage:\n${projectMessage}`;
    navigator.clipboard.writeText(text);
    showToast('Enquiry details copied to clipboard!');
  };

  // Filtered projects
  const filteredProjects = PROJECTS.filter((p) => filter === 'all' || p.category === filter);

  // Calculate TNEB bill estimate
  const calculateTnebBill = (units: number) => {
    // Tamil Nadu Bi-Monthly Domestic Tariff Structure (Standard model)
    // 0 - 100 units: Free (100 units subsidy)
    // 101 - 200 units: 2.25/unit
    // 201 - 400 units: 4.50/unit
    // 401 - 500 units: 6.00/unit
    // 501+ units: 8.00 - 11.00/unit
    let bill = 0;
    let subsidy = 0;

    if (units <= 100) {
      bill = 0;
      subsidy = units * 4.5;
    } else if (units <= 200) {
      bill = (units - 100) * 2.25;
      subsidy = 100 * 2.25;
    } else if (units <= 400) {
      bill = 100 * 2.25 + (units - 200) * 4.5;
      subsidy = 100 * 4.5;
    } else if (units <= 500) {
      bill = 100 * 2.25 + 200 * 4.5 + (units - 400) * 6.0;
      subsidy = 100 * 4.5;
    } else {
      bill = 100 * 4.5 + 300 * 6.0 + 100 * 8.0 + (units - 500) * 9.0;
      subsidy = 100 * 4.5;
    }

    const fixedCharges = units > 500 ? 50 : 20;
    const total = Math.round(bill + fixedCharges);
    return { bill: Math.round(bill), fixedCharges, total, subsidy: Math.round(subsidy) };
  };

  const tnebCalc = calculateTnebBill(unitsConsumed);

  return (
    <div className="min-h-screen text-slate-300 font-sans steel-grid-bg relative selection:bg-slate-200 selection:text-slate-950">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-[#0e1014]/95 backdrop-blur-2xl border border-white/20 shadow-2xl text-slate-100 animate-in fade-in slide-in-from-bottom-5">
          <div className="w-2.5 h-2.5 rounded-full bg-slate-300 animate-ping" />
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Top Bar Navigation (3-Zone Top Bar Contract) */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-[#08090b]/85 backdrop-blur-2xl border-b border-white/10 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Zone 1: Brand Wordmark (Single text element wordmark per design constitution) */}
            <a href="#hero" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-b from-white/20 via-white/5 to-transparent p-[1px] shadow-md flex items-center justify-center">
                <div className="w-full h-full bg-[#0e1014] rounded-[10px] flex items-center justify-center font-heading font-bold text-sm tracking-wider text-slate-100 border border-white/10 group-hover:border-white/25 transition-colors">
                  RP
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-heading text-slate-100 text-sm sm:text-base tracking-wider font-bold group-hover:text-white transition-colors">
                  RAJA PRIYAN
                </span>
                <span className="hidden sm:inline-block text-[11px] font-mono text-slate-400">
                  Custom Apps · Automation · Websites
                </span>
              </div>
            </a>

            {/* Zone 2: Navigation Links (Clean text links with hover transitions) */}
            <nav className="hidden lg:flex items-center gap-8 text-xs font-semibold tracking-wider uppercase text-slate-400 font-heading">
              <a href="#capabilities" className="hover:text-slate-100 transition-colors">Capabilities</a>
              <a href="#software" className="hover:text-slate-100 transition-colors">Software</a>
              <a href="#scope-planner" className="hover:text-slate-100 transition-colors flex items-center gap-1.5">
                <span>Scope Planner</span>
                <span className="text-[10px] text-slate-300 font-mono">✦</span>
              </a>
              <a href="#process" className="hover:text-slate-100 transition-colors">Process</a>
              <a href="#outcomes" className="hover:text-slate-100 transition-colors">Client Outcomes</a>
              <a href="#faq" className="hover:text-slate-100 transition-colors">FAQ</a>
            </nav>

            {/* Zone 3: Primary Direct Actions */}
            <div className="hidden sm:flex items-center gap-3">
              <button
                onClick={copyEmail}
                className="hidden md:flex text-xs font-mono text-slate-300 px-3.5 py-2 rounded-xl bg-[#13161c] hover:bg-[#1a1e26] border border-white/10 hover:border-white/20 items-center gap-2 transition-all whitespace-nowrap"
                title="Copy hello@rajapriyan.com"
              >
                <Copy className="w-3.5 h-3.5 text-slate-400" />
                <span>hello@rajapriyan.com</span>
              </button>
              <a
                href="#contact"
                className="btn-steel-primary px-5 py-2.5 rounded-full text-xs font-bold tracking-wider uppercase font-heading flex items-center gap-1.5 whitespace-nowrap"
              >
                <span>Let's Talk</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden px-4 pt-3 pb-6 space-y-3 bg-[#08090b]/98 border-b border-white/10 backdrop-blur-2xl">
            <a
              href="#capabilities"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-sm font-semibold uppercase tracking-wider text-slate-300 hover:text-white"
            >
              Capabilities
            </a>
            <a
              href="#software"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-sm font-semibold uppercase tracking-wider text-slate-300 hover:text-white"
            >
              Software & Apps
            </a>
            <a
              href="#scope-planner"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-sm font-semibold uppercase tracking-wider text-slate-300 hover:text-white"
            >
              Interactive Scope Planner
            </a>
            <a
              href="#process"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-sm font-semibold uppercase tracking-wider text-slate-300 hover:text-white"
            >
              Process & Milestones
            </a>
            <a
              href="#outcomes"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-sm font-semibold uppercase tracking-wider text-slate-300 hover:text-white"
            >
              Client Outcomes
            </a>
            <a
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-sm font-semibold uppercase tracking-wider text-slate-300 hover:text-white"
            >
              FAQ
            </a>
            <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
              <button
                onClick={() => {
                  copyEmail();
                  setMobileMenuOpen(false);
                }}
                className="w-full text-center text-xs font-mono text-slate-300 px-3 py-2.5 rounded-xl bg-[#0e1014] border border-white/10 flex items-center justify-center gap-2"
              >
                <Copy className="w-3.5 h-3.5 text-slate-400" />
                <span>hello@rajapriyan.com</span>
              </button>
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2.5 rounded-full btn-steel-primary font-bold text-xs uppercase tracking-wider font-heading"
              >
                Let's Talk &nearr;
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section id="hero" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
        {/* Ambient Radiances */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[360px] bg-slate-400/5 blur-[140px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Bold Condensed Editorial Impact */}
            <div className="lg:col-span-7 text-left space-y-6">
              
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#13161c]/90 border border-white/10 text-slate-300 text-xs font-mono backdrop-blur-md">
                <span className="text-slate-400">✦</span>
                <span>15+ YEARS SENIOR DEVELOPMENT EXPERIENCE</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              </div>

              <h1 className="text-5xl sm:text-7xl lg:text-8xl font-display uppercase tracking-tight text-white leading-[0.92] drop-shadow-sm">
                APP BUILDER &<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-500">
                  AUTOMATION
                </span><br />
                SPECIALIST
              </h1>

              <p className="text-base sm:text-lg text-slate-400 leading-relaxed max-w-xl font-normal">
                Custom web/mobile apps, workflow automation pipelines, and high-converting websites built directly for growing small businesses. Direct 1:1 senior partner collaboration with zero agency bloat.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="#contact"
                  className="btn-steel-primary px-7 py-3.5 rounded-full text-xs font-bold tracking-wider uppercase font-heading flex items-center gap-2"
                >
                  <span>Discuss Your Project</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
                <a
                  href="#software"
                  className="btn-steel-outline px-6 py-3.5 rounded-full text-xs font-semibold tracking-wider uppercase font-heading flex items-center gap-2"
                >
                  <Layers className="w-4 h-4 text-slate-400" />
                  <span>View Software</span>
                </a>
                <a
                  href="#scope-planner"
                  className="btn-steel-outline px-5 py-3.5 rounded-full text-xs font-semibold tracking-wider uppercase font-heading flex items-center gap-2"
                >
                  <Sliders className="w-4 h-4 text-slate-400" />
                  <span>Scope Planner</span>
                </a>
              </div>

              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-2xl steel-card-subtle text-slate-400 text-xs font-mono">
                <span className="text-slate-500">Direct senior inbox:</span>
                <button
                  onClick={copyEmail}
                  className="text-slate-200 hover:text-white flex items-center gap-1.5 transition-colors underline decoration-dotted"
                >
                  <span>hello@rajapriyan.com</span>
                  <Copy className="w-3.5 h-3.5 text-slate-400" />
                </button>
              </div>

            </div>

            {/* Right Column: 3D Developer Persona & Orbital Badges */}
            <div className="lg:col-span-5 flex justify-center relative">
              <div className="relative w-full max-w-[420px] aspect-square flex items-center justify-center">
                
                {/* Metallic Orbit Rings */}
                <div className="absolute inset-0 rounded-full border border-white/5 pointer-events-none" />
                <div className="absolute inset-8 rounded-full border border-white/10 pointer-events-none" />
                <div className="absolute inset-16 rounded-full bg-gradient-to-tr from-slate-800/40 via-slate-700/20 to-transparent blur-xl pointer-events-none" />

                {/* 3D Animated Avatar */}
                <div className="relative z-10 w-72 sm:w-80 h-72 sm:h-80 rounded-full p-[2px] bg-gradient-to-b from-white/30 via-slate-600/30 to-transparent shadow-2xl animate-float-char">
                  <div className="w-full h-full rounded-full bg-gradient-to-b from-[#13161c] to-[#08090b] overflow-hidden relative border border-white/10 flex items-center justify-center">
                    
                    <svg viewBox="0 0 320 320" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <linearGradient id="hoodieGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#2c3444" />
                          <stop offset="50%" stopColor="#1b202a" />
                          <stop offset="100%" stopColor="#101318" />
                        </linearGradient>
                        <linearGradient id="skinGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#f5d0b5" />
                          <stop offset="100%" stopColor="#dfad8f" />
                        </linearGradient>
                        <linearGradient id="hairGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#2a221f" />
                          <stop offset="100%" stopColor="#140f0c" />
                        </linearGradient>
                        <linearGradient id="laptopGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#94a3b8" />
                          <stop offset="100%" stopColor="#475569" />
                        </linearGradient>
                      </defs>

                      <circle cx="160" cy="160" r="130" fill="#0f172a" opacity="0.4" />
                      <ellipse cx="160" cy="115" rx="56" ry="58" fill="url(#hairGrad)" />
                      <ellipse cx="106" cy="132" rx="9" ry="14" fill="url(#skinGrad)" />
                      <ellipse cx="214" cy="132" rx="9" ry="14" fill="url(#skinGrad)" />
                      <path d="M 112 125 Q 112 180 160 185 Q 208 180 208 125 Z" fill="url(#skinGrad)" />
                      <path d="M 104 110 C 104 70, 140 55, 160 55 C 190 55, 218 70, 216 110 C 212 95, 195 90, 185 92 C 170 85, 145 85, 130 95 C 118 90, 110 98, 104 110 Z" fill="url(#hairGrad)" />
                      
                      <circle cx="138" cy="134" r="5" fill="#1e293b" />
                      <circle cx="136" cy="132" r="1.5" fill="#ffffff" />
                      <circle cx="182" cy="134" r="5" fill="#1e293b" />
                      <circle cx="180" cy="132" r="1.5" fill="#ffffff" />

                      <path d="M 128 122 Q 138 119 148 123" stroke="#2a221f" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                      <path d="M 172 123 Q 182 119 192 122" stroke="#2a221f" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                      <path d="M 148 158 Q 160 168 172 158" stroke="#a35d46" strokeWidth="2.5" strokeLinecap="round" fill="none" />

                      {/* Glasses */}
                      <rect x="122" y="122" width="32" height="24" rx="8" fill="none" stroke="#08090b" strokeWidth="3" />
                      <rect x="166" y="122" width="32" height="24" rx="8" fill="none" stroke="#08090b" strokeWidth="3" />
                      <line x1="154" y1="132" x2="166" y2="132" stroke="#08090b" strokeWidth="2.5" />
                      <line x1="110" y1="130" x2="122" y2="132" stroke="#08090b" strokeWidth="2.5" />
                      <line x1="198" y1="132" x2="210" y2="130" stroke="#08090b" strokeWidth="2.5" />
                      <path d="M 126 126 L 140 142" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeLinecap="round" />
                      <path d="M 170 126 L 184 142" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeLinecap="round" />

                      <rect x="148" y="178" width="24" height="22" fill="#d29e81" />
                      <path d="M 96 210 Q 160 196 224 210 L 236 300 Q 160 315 84 300 Z" fill="url(#hoodieGrad)" />
                      <path d="M 140 200 Q 160 216 180 200" stroke="#475569" strokeWidth="4" fill="none" strokeLinecap="round" />
                      <line x1="152" y1="212" x2="152" y2="230" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />
                      <line x1="168" y1="212" x2="168" y2="230" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />

                      {/* Laptop */}
                      <g transform="translate(100, 245)">
                        <rect x="10" y="10" width="100" height="65" rx="6" fill="url(#laptopGrad)" stroke="#cbd5e1" strokeWidth="1.2" />
                        <rect x="16" y="15" width="88" height="50" rx="3" fill="#0b0f17" />
                        <line x1="22" y1="26" x2="52" y2="26" stroke="#e2e8f0" strokeWidth="2.5" strokeLinecap="round" />
                        <line x1="58" y1="26" x2="78" y2="26" stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round" />
                        <line x1="26" y1="35" x2="88" y2="35" stroke="#64748b" strokeWidth="2" strokeLinecap="round" />
                        <line x1="26" y1="44" x2="68" y2="44" stroke="#64748b" strokeWidth="2" strokeLinecap="round" />
                        <line x1="22" y1="53" x2="48" y2="53" stroke="#e2e8f0" strokeWidth="2" strokeLinecap="round" />
                      </g>
                    </svg>

                  </div>
                </div>

                {/* Floating Orbital Badge 1 */}
                <div className="absolute -top-3 right-4 sm:right-6 animate-float-badge z-20">
                  <div className="steel-card px-3.5 py-2 rounded-2xl flex items-center gap-2 border border-white/20 shadow-xl bg-[#0e1014]/90 backdrop-blur-xl">
                    <div className="w-6 h-6 rounded-lg bg-slate-800 border border-white/10 flex items-center justify-center text-slate-200">
                      <Code2 className="w-3.5 h-3.5 text-slate-200" />
                    </div>
                    <div>
                      <div className="text-[11px] font-bold text-white font-mono">&lt;AppDev /&gt;</div>
                      <div className="text-[9px] text-slate-400 font-mono">React · Node · PostgreSQL</div>
                    </div>
                  </div>
                </div>

                {/* Floating Orbital Badge 2 */}
                <div className="absolute bottom-6 -left-2 sm:-left-6 animate-float-badge-delayed z-20">
                  <div className="steel-card px-3.5 py-2 rounded-2xl flex items-center gap-2 border border-white/20 shadow-xl bg-[#0e1014]/90 backdrop-blur-xl">
                    <div className="w-6 h-6 rounded-lg bg-slate-800 border border-white/10 flex items-center justify-center text-slate-200">
                      <Zap className="w-3.5 h-3.5 text-slate-200" />
                    </div>
                    <div>
                      <div className="text-[11px] font-bold text-white font-mono">Automate ⚡</div>
                      <div className="text-[9px] text-slate-400 font-mono">APIs · WhatsApp · Webhooks</div>
                    </div>
                  </div>
                </div>

                {/* Status Pill */}
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 z-20">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#08090b]/95 border border-white/15 text-slate-300 text-[10px] font-mono shadow-2xl backdrop-blur-md">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    <span>OPEN FOR NEW CLIENT SCOPES</span>
                  </div>
                </div>

              </div>
            </div>

          </div>

          {/* Minimalist Stats Bar */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
            <div className="steel-card p-6 rounded-2xl text-center relative overflow-hidden group">
              <div className="text-slate-500 text-xs mb-1 font-mono">✦ EXPERIENCE</div>
              <div className="text-3xl sm:text-4xl font-display uppercase tracking-tight text-white mb-1">15+ Years</div>
              <div className="text-xs text-slate-400 font-medium">Software Development</div>
            </div>

            <div className="steel-card p-6 rounded-2xl text-center relative overflow-hidden group">
              <div className="text-slate-500 text-xs mb-1 font-mono">✦ BUILT SOFTWARE</div>
              <div className="text-3xl sm:text-4xl font-display uppercase tracking-tight text-slate-200 mb-1">5+ Systems</div>
              <div className="text-xs text-slate-400 font-medium">Nithalam7, TNEB, Pearl7, Chuvadi</div>
            </div>

            <div className="steel-card p-6 rounded-2xl text-center relative overflow-hidden group">
              <div className="text-slate-500 text-xs mb-1 font-mono">✦ COLLABORATION</div>
              <div className="text-3xl sm:text-4xl font-display uppercase tracking-tight text-white mb-1">1 : 1 Direct</div>
              <div className="text-xs text-slate-400 font-medium">Zero Sales Reps or Middlemen</div>
            </div>

            <div className="steel-card p-6 rounded-2xl text-center relative overflow-hidden group">
              <div className="text-slate-500 text-xs mb-1 font-mono">✦ IP RIGHTS</div>
              <div className="text-3xl sm:text-4xl font-display uppercase tracking-tight text-white mb-1">100%</div>
              <div className="text-xs text-slate-400 font-medium">Source Code & DB Ownership</div>
            </div>
          </div>

        </div>
      </section>

      {/* Core Capabilities */}
      <section id="capabilities" className="py-24 relative border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 uppercase tracking-widest mb-3">
                <span>✦</span>
                <span>CORE CAPABILITIES</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-display uppercase tracking-tight text-white">
                Built For Growing Businesses
              </h2>
            </div>
            <p className="text-slate-400 text-sm mt-3 md:mt-0 max-w-md">
              Skip costly enterprise recurring subscriptions. Build lean, owned digital assets structured around your specific operations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Service 1 */}
            <div className="steel-card rounded-3xl p-8 flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-slate-800 border border-white/10 flex items-center justify-center text-slate-200 mb-6 group-hover:scale-105 transition-transform duration-300">
                  <Smartphone className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-heading font-bold text-white mb-3">Custom Small Business Apps</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  Replace messy spreadsheets with crisp web or mobile portals built for your staff, warehouse, or clients.
                </p>
                <ul className="space-y-2.5 text-xs text-slate-300 mb-8 font-medium">
                  <li className="flex items-center gap-2.5"><span className="text-slate-500">✦</span> Client Booking & Scheduling Tools</li>
                  <li className="flex items-center gap-2.5"><span className="text-slate-500">✦</span> Inventory, Stock & Dispatch Trackers</li>
                  <li className="flex items-center gap-2.5"><span className="text-slate-500">✦</span> Field-Staff & Operational Dashboards</li>
                  <li className="flex items-center gap-2.5"><span className="text-slate-500">✦</span> Client Self-Service Portals</li>
                </ul>
              </div>
              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs font-mono text-slate-500">React · Node · PostgreSQL</span>
                <a href="#contact" className="text-xs font-heading font-bold text-slate-200 hover:text-white flex items-center gap-1">
                  <span>INQUIRE</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Service 2 */}
            <div className="steel-card rounded-3xl p-8 flex flex-col justify-between group relative">
              <div className="absolute -top-3 right-6 bg-slate-100 text-slate-950 text-[10px] font-mono font-bold uppercase px-3 py-1 rounded-full shadow-lg">
                High ROI
              </div>
              <div>
                <div className="w-12 h-12 rounded-2xl bg-slate-800 border border-white/10 flex items-center justify-center text-slate-200 mb-6 group-hover:scale-105 transition-transform duration-300">
                  <Zap className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-heading font-bold text-white mb-3">Workflow Automation</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  Eliminate daily manual busywork. Automatically dispatch order alerts, create invoices, and synchronize data live.
                </p>
                <ul className="space-y-2.5 text-xs text-slate-300 mb-8 font-medium">
                  <li className="flex items-center gap-2.5"><span className="text-slate-500">✦</span> WhatsApp & SMS Automated Order Alerts</li>
                  <li className="flex items-center gap-2.5"><span className="text-slate-500">✦</span> Instant PDF Invoicing & Payment Reconciliation</li>
                  <li className="flex items-center gap-2.5"><span className="text-slate-500">✦</span> Google Sheets & CRM 2-Way Live Sync</li>
                  <li className="flex items-center gap-2.5"><span className="text-slate-500">✦</span> Lead Routing & Auto-Responder Engines</li>
                </ul>
              </div>
              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs font-mono text-slate-500">Python · Webhooks · Cloud APIs</span>
                <a href="#contact" className="text-xs font-heading font-bold text-slate-200 hover:text-white flex items-center gap-1">
                  <span>INQUIRE</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Service 3 */}
            <div className="steel-card rounded-3xl p-8 flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-slate-800 border border-white/10 flex items-center justify-center text-slate-200 mb-6 group-hover:scale-105 transition-transform duration-300">
                  <Layout className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-heading font-bold text-white mb-3">High-Converting Websites</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  Fast, high-performance web storefronts built to convert visitors into direct customer phone calls and qualified inquiries.
                </p>
                <ul className="space-y-2.5 text-xs text-slate-300 mb-8 font-medium">
                  <li className="flex items-center gap-2.5"><span className="text-slate-500">✦</span> Modern Business Showcase & Landing Pages</li>
                  <li className="flex items-center gap-2.5"><span className="text-slate-500">✦</span> Blazing 95+ Mobile Google PageSpeed</li>
                  <li className="flex items-center gap-2.5"><span className="text-slate-500">✦</span> Local SEO Setup & Google Business Schema</li>
                  <li className="flex items-center gap-2.5"><span className="text-slate-500">✦</span> Click-to-WhatsApp & Direct Call Triggers</li>
                </ul>
              </div>
              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs font-mono text-slate-500">Tailwind · Next.js · Local SEO</span>
                <a href="#contact" className="text-xs font-heading font-bold text-slate-200 hover:text-white flex items-center gap-1">
                  <span>INQUIRE</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Featured Software Section */}
      <section id="software" className="py-24 relative border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 uppercase tracking-widest mb-3">
                <span>✦</span>
                <span>FEATURED WORK</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-display uppercase tracking-tight text-white">
                Apps & Systems I've Created
              </h2>
              <p className="text-slate-400 text-sm mt-2 max-w-xl">
                Highlighting real applications, calculation engines, bespoke operational hubs, and personal systems.
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="mt-6 md:mt-0 flex flex-wrap gap-2 p-1.5 rounded-2xl steel-card-subtle">
              {(['all', 'app', 'automation', 'website'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setFilter(tab)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all font-heading uppercase ${
                    filter === tab
                      ? 'bg-white text-slate-950 shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {tab === 'all'
                    ? 'All Software'
                    : tab === 'app'
                    ? 'Custom Apps'
                    : tab === 'automation'
                    ? 'Automation'
                    : 'Websites'}
                </button>
              ))}
            </div>
          </div>

          {/* Project Cards Grid (No duplicates) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((proj) => (
              <div
                key={proj.id}
                className="steel-card rounded-3xl overflow-hidden flex flex-col justify-between"
              >
                <div className="p-6 border-b border-white/5 bg-[#0e1014]/60">
                  <div className="flex items-center justify-between mb-3 text-xs">
                    <span className="font-mono text-slate-200 bg-white/10 px-2.5 py-0.5 rounded-md border border-white/10 text-[11px]">
                      {proj.categoryLabel}
                    </span>
                    <span className="text-slate-400">{proj.domain}</span>
                  </div>
                  <h3 className="text-xl font-heading font-bold text-white mb-2">{proj.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                    {proj.shortDesc}
                  </p>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div className="space-y-2 mb-6 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Core Focus:</span>
                      <span className="font-mono text-slate-200 font-semibold text-right">
                        {proj.coreFocus}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Stack:</span>
                      <span className="font-mono text-slate-400 text-right">{proj.stack}</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => setSelectedProject(proj)}
                      className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-white text-xs font-semibold border border-white/10 flex items-center justify-center gap-1.5 transition-colors font-heading uppercase tracking-wider"
                    >
                      <span>View App Details</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>

                    {proj.hasInteractiveDemo && (
                      <button
                        onClick={() => setShowTnebModal(true)}
                        className="px-3 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-100 text-xs font-semibold border border-white/15 flex items-center justify-center gap-1 transition-colors"
                        title="Try Interactive Tariff Calculator"
                      >
                        <Calculator className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Try Demo</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Interactive Scope Planner Section */}
      <section id="scope-planner" className="py-24 relative border-t border-white/5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 uppercase tracking-widest mb-3">
              <span>✦</span>
              <span>INTERACTIVE SCOPE PLANNER</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-display uppercase tracking-tight text-white">
              Configure Your Project Scope
            </h2>
            <p className="text-slate-400 text-sm mt-2">
              Select what your business requires. Generate a direct specification to receive a fixed, transparent roadmap without surprise fees.
            </p>
          </div>

          <div className="steel-card rounded-3xl p-6 sm:p-10">
            
            {/* Step 1: Primary Solution */}
            <div className="mb-8">
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 font-semibold mb-3">
                1. Select Primary Solution
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                
                <button
                  type="button"
                  onClick={() => setPrimarySolution('app')}
                  className={`p-4 rounded-2xl text-left transition-all ${
                    primarySolution === 'app'
                      ? 'border border-white/30 bg-white/10'
                      : 'border border-white/10 bg-[#0e1014]/60 hover:border-white/20'
                  }`}
                >
                  <div className="font-bold text-white text-sm flex items-center justify-between mb-1 font-heading">
                    <span>Custom Small Business App</span>
                    {primarySolution === 'app' && <Check className="w-4 h-4 text-white" />}
                  </div>
                  <p className="text-xs text-slate-400">Operations dashboard, booking tool, or client portal</p>
                </button>

                <button
                  type="button"
                  onClick={() => setPrimarySolution('automation')}
                  className={`p-4 rounded-2xl text-left transition-all ${
                    primarySolution === 'automation'
                      ? 'border border-white/30 bg-white/10'
                      : 'border border-white/10 bg-[#0e1014]/60 hover:border-white/20'
                  }`}
                >
                  <div className="font-bold text-white text-sm flex items-center justify-between mb-1 font-heading">
                    <span>Workflow Automation</span>
                    {primarySolution === 'automation' && <Check className="w-4 h-4 text-white" />}
                  </div>
                  <p className="text-xs text-slate-400">WhatsApp bots, invoice pipelines & sheet sync</p>
                </button>

                <button
                  type="button"
                  onClick={() => setPrimarySolution('website')}
                  className={`p-4 rounded-2xl text-left transition-all ${
                    primarySolution === 'website'
                      ? 'border border-white/30 bg-white/10'
                      : 'border border-white/10 bg-[#0e1014]/60 hover:border-white/20'
                  }`}
                >
                  <div className="font-bold text-white text-sm flex items-center justify-between mb-1 font-heading">
                    <span>Business Website</span>
                    {primarySolution === 'website' && <Check className="w-4 h-4 text-white" />}
                  </div>
                  <p className="text-xs text-slate-400">Modern conversion-focused portfolio or storefront</p>
                </button>

              </div>
            </div>

            {/* Step 2: Integrations Checkboxes */}
            <div className="mb-8">
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 font-semibold mb-3">
                2. Select Desired Features & Integrations
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {AVAILABLE_FEATURES.map((feat) => {
                  const isChecked = selectedFeatures.includes(feat.label);
                  return (
                    <div
                      key={feat.id}
                      onClick={() => toggleFeature(feat.label)}
                      className={`flex items-center gap-3 p-3.5 rounded-2xl cursor-pointer transition-colors ${
                        isChecked
                          ? 'bg-white/10 border border-white/30'
                          : 'steel-card-subtle hover:border-white/25'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => {}}
                        className="accent-white w-4 h-4 rounded cursor-pointer"
                      />
                      <div>
                        <div className="text-xs font-semibold text-white">{feat.label}</div>
                        <div className="text-[11px] text-slate-400">{feat.desc}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Scope Summary & Action Controls */}
            <div className="p-6 sm:p-7 rounded-2xl bg-gradient-to-r from-[#0e1014] via-[#13161c] to-[#0e1014] border border-white/15 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-1.5 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-2">
                  <span className="text-white text-xs font-mono">✦</span>
                  <span className="text-xs font-mono uppercase text-slate-300 tracking-wider font-semibold">
                    Configured Scope Summary
                  </span>
                </div>
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 pt-1">
                  <span className="text-xs font-mono text-white bg-white/10 px-3 py-1 rounded-full border border-white/15">
                    {getPrimaryLabel(primarySolution)}
                  </span>
                  <span className="text-xs font-mono text-slate-300 bg-white/5 px-3 py-1 rounded-full border border-white/10">
                    {selectedFeatures.length} {selectedFeatures.length === 1 ? 'Capability' : 'Capabilities'} Selected
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-2">
                  Status: <span className="text-slate-200 font-medium">Ready for Project Roadmap</span> · 100% direct senior engineer collaboration.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-2.5 w-full md:w-auto">
                <button
                  onClick={copyScopeSpec}
                  className="w-full sm:w-auto px-4 py-3 rounded-full btn-steel-outline text-xs font-semibold uppercase tracking-wider font-heading flex items-center justify-center gap-2"
                  title="Copy full scope specification to clipboard"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Spec</span>
                </button>
                <button
                  onClick={applyScopeToForm}
                  className="w-full sm:w-auto px-5 py-3 rounded-full btn-steel-outline text-xs font-semibold uppercase tracking-wider font-heading flex items-center justify-center gap-2"
                  title="Fill the Contact Form below with this exact scope"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Fill Form Below</span>
                </button>
                <button
                  onClick={handleSendScopeEnquiry}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-full btn-steel-primary font-bold text-xs tracking-wider uppercase font-heading flex items-center justify-center gap-2 whitespace-nowrap"
                >
                  <span>Enquire via Email</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4-Step Development Process (Fixed numbering & order bug) */}
      <section id="process" className="py-24 relative border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 uppercase tracking-widest mb-3">
                <span>✦</span>
                <span>COLLABORATION ROADMAP</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-display uppercase tracking-tight text-white">
                4-Step Development Process
              </h2>
            </div>
            <p className="text-slate-400 text-sm mt-3 md:mt-0 max-w-md">
              Transparent, predictable progress from initial workflow discovery through live deployment and 30-day post-launch support.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Step 1: DISCOVER */}
            <div className="p-6 rounded-3xl steel-card">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono text-slate-400 uppercase tracking-wider font-semibold">
                  01. DISCOVER
                </span>
                <Clock className="w-4 h-4 text-slate-400" />
              </div>
              <h3 className="text-lg font-heading font-bold text-white mb-2">Workflow & Scope Audit</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                We review your current spreadsheets, manual routines, and business bottlenecks to define exact requirements and a fixed-price roadmap.
              </p>
            </div>

            {/* Step 2: ARCHITECT */}
            <div className="p-6 rounded-3xl steel-card">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono text-slate-400 uppercase tracking-wider font-semibold">
                  02. ARCHITECT
                </span>
                <Layers className="w-4 h-4 text-slate-400" />
              </div>
              <h3 className="text-lg font-heading font-bold text-white mb-2">Wireframes & Schemas</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                I map the database structure, user roles, screen flows, and webhook triggers so you can see the complete design blueprint before building.
              </p>
            </div>

            {/* Step 3: BUILD */}
            <div className="p-6 rounded-3xl steel-card">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono text-slate-400 uppercase tracking-wider font-semibold">
                  03. BUILD
                </span>
                <Code2 className="w-4 h-4 text-slate-400" />
              </div>
              <h3 className="text-lg font-heading font-bold text-white mb-2">Rapid Development</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                I build your custom software and integrations with frequent progress check-ins and a live staging preview for your team to test.
              </p>
            </div>

            {/* Step 4: LAUNCH */}
            <div className="p-6 rounded-3xl steel-card">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono text-slate-400 uppercase tracking-wider font-semibold">
                  04. LAUNCH
                </span>
                <ShieldCheck className="w-4 h-4 text-slate-400" />
              </div>
              <h3 className="text-lg font-heading font-bold text-white mb-2">Launch & 30-Day Support</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                We deploy to your domain with 100% full source code ownership handed over, plus 30 days of complimentary post-launch support and bug fixes.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Client Outcomes & Verified Milestones (Replaces "Yet to update") */}
      <section id="outcomes" className="py-24 relative border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 uppercase tracking-widest mb-3">
              <span>✦</span>
              <span>VERIFIED MILESTONES & OUTCOMES</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-display uppercase tracking-tight text-white">
              Measurable Client Results
            </h2>
            <p className="text-slate-400 text-sm mt-2">
              Concrete operational improvements achieved across small business and utility software.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Outcome 1 */}
            <div className="steel-card p-7 rounded-3xl flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-mono text-slate-300 bg-white/10 px-2.5 py-1 rounded-full border border-white/10">
                    Retail & Logistics
                  </span>
                  <span className="text-emerald-400 text-xs font-mono flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    Automated
                  </span>
                </div>

                <div className="py-6 border-y border-white/10 my-4 bg-[#0e1014]/50 rounded-2xl p-5">
                  <div className="text-3xl font-display uppercase text-white mb-1">80+ Orders / Day</div>
                  <p className="text-sm font-semibold text-slate-200 mb-2">Automated WhatsApp Order Alerts</p>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Eliminated 2 hours of daily manual customer notifications. Status alerts, tracking numbers, and PDF invoices sent automatically on checkout.
                  </p>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between text-xs font-mono text-slate-400">
                <span>Domain: E-Commerce</span>
                <span className="text-slate-200">Zero manual messaging</span>
              </div>
            </div>

            {/* Outcome 2 */}
            <div className="steel-card p-7 rounded-3xl flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-mono text-slate-300 bg-white/10 px-2.5 py-1 rounded-full border border-white/10">
                    Utility & Algorithmic
                  </span>
                  <span className="text-emerald-400 text-xs font-mono flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    100% Accurate
                  </span>
                </div>

                <div className="py-6 border-y border-white/10 my-4 bg-[#0e1014]/50 rounded-2xl p-5">
                  <div className="text-3xl font-display uppercase text-white mb-1">150,000+</div>
                  <p className="text-sm font-semibold text-slate-200 mb-2">Calculations with Zero Slab Disputes</p>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Engineered instant client-side calculation logic for Tamil Nadu electricity tariffs, translating multi-tier slabs and fixed charges into clear bills.
                  </p>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between text-xs font-mono text-slate-400">
                <span>Domain: Energy Billing</span>
                <span className="text-slate-200">Zero backend lag</span>
              </div>
            </div>

            {/* Outcome 3 */}
            <div className="steel-card p-7 rounded-3xl flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-mono text-slate-300 bg-white/10 px-2.5 py-1 rounded-full border border-white/10">
                    Operations & CRM
                  </span>
                  <span className="text-emerald-400 text-xs font-mono flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    Real-time
                  </span>
                </div>

                <div className="py-6 border-y border-white/10 my-4 bg-[#0e1014]/50 rounded-2xl p-5">
                  <div className="text-3xl font-display uppercase text-white mb-1">&lt; 30 Seconds</div>
                  <p className="text-sm font-semibold text-slate-200 mb-2">Inquiry to Follow-up Assignment</p>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Replaced disconnected Google Sheets with Pearl7 CRM, giving small field teams live pipeline boards, automated tasks, and instant client history.
                  </p>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between text-xs font-mono text-slate-400">
                <span>Domain: Service Firms</span>
                <span className="text-slate-200">Centralized Records</span>
              </div>
            </div>

          </div>

          <div className="mt-8 text-center text-xs text-slate-400 font-mono">
            Direct client references in retail, logistics, and service operations available upon inquiry.
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section id="faq" className="py-24 relative border-t border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 uppercase tracking-widest mb-3">
              <span>✦</span>
              <span>QUESTIONS & ANSWERS</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-display uppercase tracking-tight text-white">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-400 text-sm mt-2">Clear, straightforward answers for small business owners.</p>
          </div>

          <div className="space-y-4">
            
            <FaqItem
              question="We currently run our business on Excel sheets. Can you build an app from that?"
              answer="Yes, absolutely. That is where most of my small business projects begin. You don't need technical diagrams or software architecture documents. Walk me through your existing spreadsheet or daily routine, and I will structure a clean, easy-to-use application with proper access roles and automated backups."
            />

            <FaqItem
              question="How does scoping and quoting work without unexpected hourly fees?"
              answer="I work on milestone-based fixed scope agreements. Once we discuss your requirements, you receive a detailed, fixed roadmap and timeline with zero hidden agency markups or surprise billable hours."
            />

            <FaqItem
              question="Do I own the full source code and database once finished?"
              answer="Yes, 100%. All GitHub repositories, cloud infrastructure, domain configurations, and credentials belong entirely to your company. There is zero vendor lock-in."
            />

            <FaqItem
              question="What post-launch support is included?"
              answer="Every project delivery includes 30 days of complimentary post-launch support and bug fixes to ensure smooth day-to-day adoption by your staff and customers."
            />

          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 relative border-t border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="steel-card rounded-3xl p-8 sm:p-14 relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              
              {/* Direct Details */}
              <div className="lg:col-span-5 space-y-6">
                <div className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 uppercase tracking-widest">
                  <span>✦</span>
                  <span>GET IN TOUCH</span>
                </div>
                
                <h2 className="text-4xl sm:text-6xl font-display uppercase tracking-tight text-white leading-[0.95]">
                  Let's Build<br />Something<br />Reliable.
                </h2>
                
                <p className="text-slate-400 text-sm leading-relaxed">
                  Reach out directly to build an app for your small scale business, automate your daily workflow, or launch a modern website.
                </p>

                <div className="space-y-4 pt-4 border-t border-white/10">
                  <div className="p-4 rounded-2xl steel-card-subtle flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-slate-800 border border-white/10 flex items-center justify-center text-slate-200">
                        <Mail className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-[10px] text-slate-500 font-mono">PRIMARY INBOX</div>
                        <a
                          href="mailto:hello@rajapriyan.com"
                          className="text-sm font-bold text-white font-mono hover:text-slate-300 transition-colors"
                        >
                          hello@rajapriyan.com
                        </a>
                      </div>
                    </div>
                    <button
                      onClick={copyEmail}
                      className="p-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-400 hover:text-white transition-colors"
                      title="Copy Email"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="space-y-2 text-xs text-slate-400">
                    <div className="flex items-center gap-2">
                      <span className="text-slate-200">✦</span>
                      <span>Response guaranteed within 24 hours</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-slate-200">✦</span>
                      <span>Direct consultation with a senior engineer</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-slate-200">✦</span>
                      <span>100% full source code ownership upon launch</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Inquiry Form */}
              <div className="lg:col-span-7 bg-[#0e1014]/90 p-6 sm:p-8 rounded-3xl border border-white/10 backdrop-blur-xl">
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5 font-semibold">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={senderName}
                        onChange={(e) => setSenderName(e.target.value)}
                        placeholder="Alex Carter"
                        className="w-full px-4 py-3 rounded-xl bg-[#13161c] border border-white/10 text-white text-sm focus:outline-none focus:border-white/40 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5 font-semibold">
                        Business / Venture *
                      </label>
                      <input
                        type="text"
                        required
                        value={businessName}
                        onChange={(e) => setBusinessName(e.target.value)}
                        placeholder="Apex Logistics"
                        className="w-full px-4 py-3 rounded-xl bg-[#13161c] border border-white/10 text-white text-sm focus:outline-none focus:border-white/40 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5 font-semibold">
                        Your Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={senderEmail}
                        onChange={(e) => setSenderEmail(e.target.value)}
                        placeholder="alex@company.com"
                        className="w-full px-4 py-3 rounded-xl bg-[#13161c] border border-white/10 text-white text-sm focus:outline-none focus:border-white/40 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5 font-semibold">
                        Primary Requirement *
                      </label>
                      <select
                        value={serviceType}
                        onChange={(e) => setServiceType(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-[#13161c] border border-white/10 text-white text-sm focus:outline-none focus:border-white/40 transition-colors"
                      >
                        <option value="Custom App for Small Scale Business">Custom App for Small Scale Business</option>
                        <option value="Business Workflow Automation">Business Workflow Automation</option>
                        <option value="High-Converting Website Building">High-Converting Website Building</option>
                        <option value="Complete Package (App + Automation + Website)">Complete Package (App + Automation + Website)</option>
                        <option value="Other Technical Advisory">Other Technical Advisory</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5 font-semibold">
                      Project Scope or Business Bottleneck *
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={projectMessage}
                      onChange={(e) => setProjectMessage(e.target.value)}
                      placeholder="Describe your current routine, manual tasks, or what you'd like your new app/website to handle..."
                      className="w-full px-4 py-3 rounded-xl bg-[#13161c] border border-white/10 text-white text-sm focus:outline-none focus:border-white/40 transition-colors resize-none"
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <button
                      type="submit"
                      className="flex-1 py-4 rounded-full btn-steel-primary font-bold text-xs tracking-wider uppercase font-heading flex items-center justify-center gap-2"
                    >
                      <Send className="w-4 h-4" />
                      <span>Send Enquiry to hello@rajapriyan.com</span>
                    </button>
                    <button
                      type="button"
                      onClick={copyDraftedEnquiry}
                      className="px-5 py-4 rounded-full btn-steel-outline font-semibold text-xs tracking-wider uppercase font-heading flex items-center justify-center gap-2"
                      title="Copy full draft message to clipboard"
                    >
                      <Copy className="w-4 h-4" />
                      <span>Copy Draft</span>
                    </button>
                  </div>
                </form>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#13161c] border border-white/10 flex items-center justify-center font-heading font-bold text-xs text-white">
              RP
            </div>
            <div>
              <span className="text-slate-200 font-semibold font-heading">RAJA PRIYAN</span> · Custom Apps, Automation & Websites
            </div>
          </div>

          <div className="flex items-center gap-6 text-slate-400 font-heading text-xs uppercase tracking-wider">
            <a href="#capabilities" className="hover:text-white transition-colors">Capabilities</a>
            <a href="#software" className="hover:text-white transition-colors">Software</a>
            <a href="#scope-planner" className="hover:text-white transition-colors">Scope Planner</a>
            <a href="mailto:hello@rajapriyan.com" className="hover:text-white transition-colors font-mono lowercase">hello@rajapriyan.com</a>
          </div>

          <div className="font-mono text-[11px] text-slate-500 flex items-center gap-2">
            <span>✦</span>
            <span>&copy; {new Date().getFullYear()} Raja Priyan. 15+ Yrs Software Experience.</span>
          </div>
        </div>
      </footer>

      {/* Project Details Modal */}
      {selectedProject && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="steel-card max-w-2xl w-full rounded-3xl p-6 sm:p-8 bg-[#08090b] relative max-h-[90vh] overflow-y-auto border border-white/20"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-6 right-6 p-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-400 hover:text-white transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-slate-200 text-xs font-mono font-medium mb-3">
              <span>{selectedProject.categoryLabel}</span>
            </div>

            <h3 className="text-2xl font-heading font-bold text-white mb-4">
              {selectedProject.title}
            </h3>

            <div className="space-y-4 text-sm text-slate-300">
              <div>
                <h4 className="text-xs font-mono uppercase text-slate-400 font-semibold mb-1">
                  Challenge & Solution
                </h4>
                <p className="leading-relaxed text-slate-300 bg-[#0e1014]/60 p-4 rounded-2xl border border-white/5">
                  {selectedProject.fullDesc}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-mono uppercase text-slate-200 font-semibold mb-1">
                  Measurable Business Impact
                </h4>
                <p className="leading-relaxed text-white font-medium bg-white/5 p-3.5 rounded-2xl border border-white/10">
                  {selectedProject.impact}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-mono uppercase text-slate-400 font-semibold mb-1">
                  Technologies & Architecture
                </h4>
                <p className="font-mono text-xs text-slate-300">
                  {selectedProject.techDetails}
                </p>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row gap-3">
              <a
                href="#contact"
                onClick={() => setSelectedProject(null)}
                className="flex-1 py-3 rounded-full btn-steel-primary font-bold text-xs uppercase tracking-wider text-center font-heading flex items-center justify-center gap-1.5"
              >
                <span>Inquire for Similar Project</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              {selectedProject.hasInteractiveDemo && (
                <button
                  onClick={() => {
                    setSelectedProject(null);
                    setShowTnebModal(true);
                  }}
                  className="px-5 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-xs transition-colors font-heading uppercase flex items-center justify-center gap-2"
                >
                  <Calculator className="w-4 h-4" />
                  <span>Launch Live Demo</span>
                </button>
              )}

              <button
                onClick={() => setSelectedProject(null)}
                className="px-6 py-3 rounded-full bg-slate-800 hover:bg-slate-750 text-slate-200 font-semibold text-xs transition-colors font-heading uppercase"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Interactive TNEB Demo Modal */}
      {showTnebModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setShowTnebModal(false)}
        >
          <div
            className="steel-card max-w-xl w-full rounded-3xl p-6 sm:p-8 bg-[#08090b] relative border border-white/20 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowTnebModal(false)}
              className="absolute top-6 right-6 p-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-400 hover:text-white transition-colors"
              aria-label="Close demo"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-2">
              <Calculator className="w-5 h-5 text-slate-200" />
              <span className="text-xs font-mono uppercase text-slate-400 font-semibold">
                Live Interactive Software Preview
              </span>
            </div>

            <h3 className="text-2xl font-heading font-bold text-white mb-2">
              New TNEB Tariff Calculator
            </h3>
            <p className="text-xs text-slate-400 mb-6">
              Test Raja's client-side calculation logic for Tamil Nadu domestic electricity billing. Slide the units to see instant tariff breakdown.
            </p>

            <div className="bg-[#0e1014] p-5 rounded-2xl border border-white/10 mb-6 space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-mono text-slate-400">Bi-Monthly Units Consumed:</span>
                  <span className="text-lg font-mono font-bold text-white">{unitsConsumed} kWh</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1000"
                  step="10"
                  value={unitsConsumed}
                  onChange={(e) => setUnitsConsumed(Number(e.target.value))}
                  className="w-full accent-white h-2 bg-slate-800 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-1">
                  <span>0 Units (Free)</span>
                  <span>500 Units</span>
                  <span>1000 Units</span>
                </div>
              </div>

              {/* Bill Output Breakdown */}
              <div className="pt-4 border-t border-white/10 space-y-2 text-xs font-mono">
                <div className="flex justify-between">
                  <span className="text-slate-400">Subsidized 100 Units:</span>
                  <span className="text-emerald-400">₹0.00 (Savings ~₹{tnebCalc.subsidy})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Energy Charges:</span>
                  <span className="text-slate-200">₹{tnebCalc.bill}.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Fixed Charges:</span>
                  <span className="text-slate-200">₹{tnebCalc.fixedCharges}.00</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-white/10 text-sm font-bold">
                  <span className="text-white">Estimated Bi-Monthly Bill:</span>
                  <span className="text-white text-base">₹{tnebCalc.total}.00</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-mono">Engine: Instant Pure TypeScript</span>
              <button
                onClick={() => setShowTnebModal(false)}
                className="px-5 py-2.5 rounded-full btn-steel-primary text-xs font-bold font-heading uppercase"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="steel-card rounded-2xl overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-5 text-left flex items-center justify-between gap-4 font-semibold text-slate-100 hover:text-white transition-colors"
      >
        <span className="text-sm sm:text-base font-heading">{question}</span>
        <ChevronDown
          className={`w-4 h-4 text-slate-400 transition-transform duration-200 shrink-0 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      {isOpen && (
        <div className="px-5 pb-5 text-xs sm:text-sm text-slate-400 leading-relaxed border-t border-white/10 pt-3">
          {answer}
        </div>
      )}
    </div>
  );
}
