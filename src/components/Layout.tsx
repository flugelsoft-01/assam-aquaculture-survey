import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import {
  Fish,
  Layers,
  Sliders,
  ShieldCheck,
  FileText,
  MapPin,
  HelpCircle,
  ExternalLink,
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const navItems = [
  {
    to: '/',
    label: 'Sample Frame Ledger',
    icon: Layers,
    title: 'MatsyaSample Assam — Rotating Pond & Tank Sample Frame Ledger',
    ariaLabel: 'Navigate to Rotating Sample Frame and Survey Ledger',
  },
  {
    to: '/sampling-simulator',
    label: 'Sampling & CI Simulator',
    icon: Sliders,
    title: 'Stratified Sampling & Horvitz-Thompson Confidence Interval Simulator',
    ariaLabel: 'Navigate to Stratified Sampling and Confidence Interval Simulator',
  },
  {
    to: '/estimates-audit',
    label: 'District Estimates Audit',
    icon: ShieldCheck,
    title: 'District & State Production Estimates Audit (95% CI & RSE%)',
    ariaLabel: 'Navigate to District and State Estimates Audit',
  },
  {
    to: '/proposal',
    label: 'NESFIC-D-32 Proposal & PDFs',
    icon: FileText,
    title: 'NESFIC-D-32 Complete 12-Section Proposal & Proof of Work by Flugelsoft Labs',
    ariaLabel: 'Navigate to NESFIC-D-32 Proposal and Official PDF Downloads',
  },
  {
    to: '/tutorial',
    label: 'Methodology & Guide',
    icon: HelpCircle,
    title: 'MatsyaSample Assam Methodology & Interactive User Guide',
    ariaLabel: 'Navigate to Methodology and Interactive User Guide',
  },
];

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <header className="sticky top-0 z-30 border-b border-cyan-900/10 bg-white/95 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-3 py-3 lg:flex-row lg:items-center lg:justify-between">
            <Link
              to="/"
              title="Flugelsoft Labs MatsyaSample Assam — Scientific Pond & Tank Aquaculture Survey (NESFIC-D-32)"
              aria-label="Flugelsoft Labs MatsyaSample Assam Home"
              className="flex items-center gap-3 group"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-800 to-teal-600 text-white shadow-sm group-hover:scale-105 transition-transform">
                <Fish className="h-5 w-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold tracking-tight text-slate-900 group-hover:text-cyan-900 transition-colors">
                    Flugelsoft Labs
                  </span>
                  <span className="inline-flex items-center rounded-full bg-cyan-50 px-2.5 py-0.5 text-xs font-semibold text-cyan-800 ring-1 ring-cyan-600/20">
                    NESFIC-D-32
                  </span>
                </div>
                <p className="text-xs text-slate-500">
                  MatsyaSample Assam · Pond &amp; Tank Aquaculture Production Survey · Directorate of Fisheries
                </p>
              </div>
            </Link>

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
                        ? 'bg-cyan-700 text-white shadow-sm'
                        : 'text-slate-600 hover:bg-cyan-50 hover:text-cyan-900'
                    }`
                  }
                >
                  <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  <span>{label}</span>
                </NavLink>
              ))}
            </nav>
          </div>
        </div>
      </header>

      <main className="flex-1 mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {children}
      </main>

      <footer className="border-t border-slate-200 bg-white mt-12">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-12">
            <div className="lg:col-span-4 space-y-3">
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                <Fish className="h-4 w-4 text-cyan-700" />
                <span>Flugelsoft Labs — MatsyaSample Assam</span>
              </div>
              <p className="text-xs leading-relaxed text-slate-600">
                Scientifically defensible rotating sample survey, offline-first harvest diaries,
                sample weighing verification, and Horvitz–Thompson confidence-interval estimation
                for the North East Seva First Innovation Challenge (NESFIC-D-32), Directorate of
                Fisheries, Government of Assam.
              </p>
              <div className="pt-1 text-xs text-slate-700 space-y-1">
                <p>
                  <strong>Lead Applicant:</strong> Kalyanjit Hatibaruah
                </p>
                <p>
                  <strong>Lead Entity:</strong> Flugelsoft Labs
                </p>
                <p className="flex items-center gap-1 text-cyan-800 font-medium">
                  <MapPin className="h-3.5 w-3.5 text-cyan-700" />
                  <span>Assam, India (Nagaon, Kamrup, Dima Hasao, Cachar, Barpeta)</span>
                </p>
              </div>
            </div>

            <div className="lg:col-span-4 space-y-3">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-900">
                  Survey Modules &amp; Documentation
                </p>
                <ul className="mt-2 space-y-1.5 text-xs text-slate-600">
                  <li>
                    <NavLink to="/" className="hover:text-cyan-800 hover:underline">
                      Rotating Sample Frame &amp; Survey Ledger
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/sampling-simulator" className="hover:text-cyan-800 hover:underline">
                      Stratified Sampling &amp; 95% CI Simulator
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/estimates-audit" className="hover:text-cyan-800 hover:underline">
                      District &amp; State Estimates Audit (CSV Export)
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/proposal" className="hover:text-cyan-800 hover:underline">
                      NESFIC-D-32 Full 12-Section Proposal &amp; PDFs
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/tutorial"
                      className="hover:text-cyan-800 hover:underline flex items-center gap-1 font-semibold text-cyan-700"
                    >
                      <HelpCircle className="h-3.5 w-3.5" />
                      <span>Methodology &amp; Interactive User Guide</span>
                    </NavLink>
                  </li>
                </ul>
              </div>

              <div className="pt-2 border-t border-slate-100">
                <p className="text-[11px] font-bold text-slate-900 uppercase tracking-wider">
                  Contrasting Pilot &amp; Benchmark Districts
                </p>
                <div className="flex flex-wrap gap-1.5 mt-1.5 text-[11px]">
                  {['Nagaon (High)', 'Kamrup (Medium)', 'Dima Hasao (Hill)', 'Cachar', 'Barpeta'].map(
                    (d) => (
                      <NavLink
                        key={d}
                        to="/estimates-audit"
                        className="rounded-md bg-cyan-50 px-2 py-0.5 text-cyan-900 hover:bg-cyan-100 font-medium"
                      >
                        {d}
                      </NavLink>
                    ),
                  )}
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 rounded-xl border border-amber-200/90 bg-amber-50/70 p-4 shadow-2xs">
              <div className="flex items-center gap-1.5 text-amber-900 font-semibold text-xs uppercase tracking-wider">
                <ShieldCheck className="h-4 w-4 text-amber-700" />
                <span>Prototype &amp; Statistical Notice</span>
              </div>
              <p className="mt-1.5 text-xs leading-relaxed text-amber-950/85">
                This application is a functional prototype and Proof of Work developed by{' '}
                <strong>Flugelsoft Labs</strong> (Lead Applicant: <strong>Kalyanjit Hatibaruah</strong>)
                for <strong>NESFIC-D-32</strong>. Sampled pond records, harvest diaries, and
                Horvitz–Thompson confidence-interval estimates use calibrated Assam aquaculture
                benchmarks for demonstration. Official deployment requires integration with the
                Directorate of Fisheries updated resource frame and joint validation with DES and
                ICAR-CIFRI.
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-col items-start justify-between gap-3 border-t border-slate-100 pt-4 text-xs text-slate-500 sm:flex-row sm:items-center">
            <p className="font-medium text-slate-700">
              &copy; {new Date().getFullYear()} Flugelsoft Labs. All rights reserved.
            </p>
            <p>
              Lead Applicant: <strong className="text-slate-800">Kalyanjit Hatibaruah</strong> ·
              Region: <span className="font-semibold text-cyan-800">Assam, India (IN-AS)</span>
            </p>
            <a
              href="https://startup.assam.gov.in/nesfic26/problem-statements/nesfic-d-32"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-cyan-700 hover:text-cyan-900 hover:underline"
            >
              <span>NESFIC-D-32 Problem Statement</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};
