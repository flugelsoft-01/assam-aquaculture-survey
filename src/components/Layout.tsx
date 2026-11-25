import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import {
  Waves,
  SlidersHorizontal,
  BarChart3,
  FileText,
  Fish,
  Github,
  Globe,
  ExternalLink,
  MapPin,
  HelpCircle,
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const navItems = [
  {
    to: '/',
    label: 'Sample Survey Ledger',
    icon: Waves,
    title: 'Rotating Sample Frame & Pond/Tank Survey Ledger (Nagaon, Kamrup, Dima Hasao)',
    ariaLabel: 'Navigate to Rotating Sample Frame and Pond/Tank Survey Ledger',
  },
  {
    to: '/survey-simulator',
    label: 'Sampling & CI Simulator',
    icon: SlidersHorizontal,
    title: 'Stratified Sampling & 95% Confidence Interval Simulator — Bias & Variance Engine',
    ariaLabel: 'Navigate to Stratified Sampling and Confidence Interval Simulator',
  },
  {
    to: '/district-estimates',
    label: 'District Estimates & Audit',
    icon: BarChart3,
    title: 'District & State Production Estimates with 95% Confidence Intervals & RSE%',
    ariaLabel: 'Navigate to District and State Aquaculture Production Estimates Audit',
  },
  {
    to: '/proposal',
    label: 'NESFIC-D-32 Proposal & PDFs',
    icon: FileText,
    title: 'NESFIC-D-32 Complete Proposal & Proof of Work by Flugelsoft Labs (Lead Applicant: Kalyanjit Hatibaruah)',
    ariaLabel: 'Navigate to NESFIC-D-32 Proposal, Budget Allocation, and Official PDF Downloads',
  },
  {
    to: '/tutorial',
    label: 'Tutorial & Guide',
    icon: HelpCircle,
    title: 'MatsyaSample Assam Application Tutorial — How Rotating Stratified Sampling Works',
    ariaLabel: 'Navigate to Application Tutorial and User Guide',
  },
];

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <header className="sticky top-0 z-30 border-b border-teal-900/10 bg-white/95 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-3 py-3 lg:flex-row lg:items-center lg:justify-between">
            <Link
              to="/"
              title="Flugelsoft Labs MatsyaSample Assam — Scientific Sample Survey for Pond & Tank Aquaculture (NESFIC-D-32)"
              aria-label="Flugelsoft Labs MatsyaSample Assam Home"
              className="flex items-center gap-3 group"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-teal-800 to-sky-600 text-white shadow-sm group-hover:scale-105 transition-transform">
                <Fish className="h-5 w-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold tracking-tight text-slate-900 group-hover:text-teal-900 transition-colors">
                    Flugelsoft Labs
                  </span>
                  <span className="inline-flex items-center rounded-full bg-teal-50 px-2.5 py-0.5 text-xs font-semibold text-teal-800 ring-1 ring-teal-600/20">
                    NESFIC-D-32
                  </span>
                </div>
                <p className="text-xs text-slate-500">
                  MatsyaSample Assam · Pond &amp; Tank Aquaculture Sample Survey · Fishery Dept, Govt. of Assam
                </p>
              </div>
            </Link>

            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <nav aria-label="Primary Navigation" className="flex flex-wrap gap-1">
                {navItems.map(({ to, label, icon: Icon, title, ariaLabel }) => (
                  <NavLink
                    key={to}
                    to={to}
                    end={to === '/'}
                    title={title}
                    aria-label={ariaLabel}
                    className={({ isActive }) =>
                      `inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs sm:text-sm font-medium transition-colors ${
                        isActive
                          ? 'bg-teal-700 text-white shadow-sm'
                          : 'text-slate-600 hover:bg-teal-50 hover:text-teal-900'
                      }`
                    }
                  >
                    <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    <span>{label}</span>
                  </NavLink>
                ))}
              </nav>

              <div className="flex items-center gap-1.5 border-l border-slate-200 pl-2">
                <a
                  href="https://startup.assam.gov.in/nesfic26/problem-statements/nesfic-d-32"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="View Official NESFIC-D-32 Problem Statement on Assam Startup Portal"
                  aria-label="Open NESFIC-D-32 Problem Statement"
                  className="inline-flex items-center gap-1 rounded-lg border border-teal-300 bg-teal-50 px-2 py-1.5 text-xs font-semibold text-teal-800 hover:bg-teal-100 transition-colors"
                >
                  <Globe className="h-3.5 w-3.5 text-teal-600" />
                  <span className="hidden sm:inline">NESFIC-D-32</span>
                </a>
                <a
                  href="https://github.com/flugelsoft-01/nesfic-d32-pond-tank-survey"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="View Flugelsoft Labs MatsyaSample Assam Source Code on GitHub (Kalyanjit Hatibaruah)"
                  aria-label="Open GitHub Repository flugelsoft-01/nesfic-d32-pond-tank-survey"
                  className="inline-flex items-center gap-1 rounded-lg border border-slate-300 bg-slate-50 px-2 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
                >
                  <Github className="h-3.5 w-3.5 text-slate-800" />
                  <span className="hidden sm:inline">GitHub</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {children}
      </main>

      <footer className="border-t border-slate-200 bg-white mt-12">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-12">
            {/* Entity & Project Overview */}
            <div className="lg:col-span-4 space-y-3">
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                <Fish className="h-4 w-4 text-teal-700" />
                <span>Flugelsoft Labs — MatsyaSample Assam</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Scientifically defensible rotating sample survey, digital harvest diaries, sample
                weighing verification, and 95% confidence-interval estimation for Assam&apos;s pond
                and tank aquaculture. Built for <strong>NESFIC-D-32</strong> (Fishery Department •
                Government of Assam / Directorate of Fisheries).
              </p>
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                <span>
                  Lead Applicant: <strong className="text-slate-700">Kalyanjit Hatibaruah</strong>
                </span>
                <span>·</span>
                <span>
                  Lead Entity: <strong className="text-slate-700">Flugelsoft Labs</strong>
                </span>
              </div>
            </div>

            {/* Pilot & Statewide Districts */}
            <div className="lg:col-span-4 space-y-2.5">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-teal-700" />
                Pilot &amp; Statewide Districts (Assam, IN-AS)
              </h2>
              <div className="flex flex-wrap gap-1.5 text-[11px]">
                <span className="rounded-md bg-teal-50 px-2 py-1 font-medium text-teal-800 border border-teal-200">
                  Nagaon (High-Production Pilot)
                </span>
                <span className="rounded-md bg-teal-50 px-2 py-1 font-medium text-teal-800 border border-teal-200">
                  Kamrup (Medium-Intensity Pilot)
                </span>
                <span className="rounded-md bg-teal-50 px-2 py-1 font-medium text-teal-800 border border-teal-200">
                  Dima Hasao (Hill-District Pilot)
                </span>
                <span className="rounded-md bg-slate-100 px-2 py-1 font-medium text-slate-700 border border-slate-200">
                  Cachar (Barak Valley)
                </span>
                <span className="rounded-md bg-slate-100 px-2 py-1 font-medium text-slate-700 border border-slate-200">
                  Barpeta (Lower Assam)
                </span>
              </div>
            </div>

            {/* Official Links & Resources */}
            <div className="lg:col-span-4 space-y-2.5">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Official Resources &amp; Deliverables
              </h2>
              <ul className="space-y-1.5 text-xs text-slate-600">
                <li>
                  <a
                    href="https://startup.assam.gov.in/nesfic26/problem-statements/nesfic-d-32"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-teal-700 hover:underline font-medium"
                  >
                    <ExternalLink className="h-3 w-3" />
                    Official NESFIC-D-32 Problem Statement (Assam Startup)
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/flugelsoft-01/nesfic-d32-pond-tank-survey"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-slate-700 hover:underline font-medium"
                  >
                    <Github className="h-3 w-3" />
                    GitHub: flugelsoft-01/nesfic-d32-pond-tank-survey
                  </a>
                </li>
                <li>
                  <Link
                    to="/proposal"
                    className="inline-flex items-center gap-1.5 text-slate-700 hover:text-teal-700 hover:underline"
                  >
                    <FileText className="h-3 w-3" />
                    NESFIC-D-32 Proposal, Budget &amp; Proof of Work PDFs
                  </Link>
                </li>
                <li>
                  <Link
                    to="/tutorial"
                    className="inline-flex items-center gap-1.5 text-slate-700 hover:text-teal-700 hover:underline"
                  >
                    <HelpCircle className="h-3 w-3" />
                    Application Tutorial &amp; Statistical Guide
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 border-t border-slate-100 pt-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-[11px] text-slate-500">
            <p>
              © {new Date().getFullYear()} <strong>Flugelsoft Labs</strong>. All rights reserved.
              Prototype &amp; Proof of Work for NESFIC 2026 (NESFIC-D-32).
            </p>
            <p>
              Collaborating Context: Directorate of Fisheries · DES · ICAR-CIFRI · Assam, India
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
