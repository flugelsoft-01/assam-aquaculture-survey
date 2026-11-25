import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Waves,
  SlidersHorizontal,
  BarChart3,
  FileText,
  Fish,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Scale,
  Smartphone,
  Layers,
  Database,
  ChevronRight,
  Sparkles,
  FileCheck2,
} from 'lucide-react';

export const Tutorial: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'what' | 'how' | 'personas' | 'tech'>('what');

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Hero Banner */}
      <section className="relative overflow-hidden rounded-3xl border border-teal-200/80 bg-gradient-to-br from-teal-900 via-teal-800 to-sky-900 p-6 sm:p-10 text-white shadow-md">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-teal-500/20 border border-teal-400/30 px-3.5 py-1 text-xs font-semibold text-teal-200 backdrop-blur-xs">
            <Sparkles className="h-3.5 w-3.5 text-teal-300" />
            <span>Application Tutorial &amp; Interactive User Guide</span>
          </div>

          <h1 className="mt-4 text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
            How MatsyaSample Assam Works
          </h1>

          <p className="mt-3 text-sm sm:text-base text-teal-100/90 leading-relaxed">
            Welcome to <strong>Flugelsoft Labs MatsyaSample Assam</strong> (NESFIC-D-32, Fishery
            Department, Government of Assam). This guide explains{' '}
            <strong>why rotating stratified sampling replaces recall-only enumeration</strong> and{' '}
            <strong>how to use every tool</strong> in this platform.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to="/survey-simulator"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-teal-950 shadow-xs hover:bg-teal-50 transition-colors"
            >
              <SlidersHorizontal className="h-4 w-4 text-teal-700" />
              <span>Try Sampling &amp; CI Simulator</span>
              <ArrowRight className="h-4 w-4 text-teal-700" />
            </Link>
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-xl border border-teal-300/40 bg-teal-800/40 px-4 py-2.5 text-sm font-semibold text-teal-100 hover:bg-teal-700/50 backdrop-blur-xs transition-colors"
            >
              <Waves className="h-4 w-4" />
              <span>Explore Sample Survey Ledger</span>
            </Link>
          </div>
        </div>

        <div className="absolute -right-12 -bottom-12 opacity-10 pointer-events-none">
          <Fish className="h-72 w-72 text-white" />
        </div>
      </section>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-3">
        {[
          { id: 'what', label: '1. Why Sample Survey?', icon: Fish },
          { id: 'how', label: '2. How to Use Each Module', icon: Layers },
          { id: 'personas', label: '3. User Roles & Workflow', icon: Smartphone },
          { id: 'tech', label: '4. Statistical Architecture', icon: Database },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-semibold transition-all ${
                isActive
                  ? 'bg-teal-700 text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-teal-50 hover:text-teal-900'
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1 */}
      {activeTab === 'what' && (
        <div className="space-y-6">
          <section className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-rose-200 bg-rose-50/40 p-6 space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full bg-rose-100 px-3 py-1 text-xs font-bold text-rose-800">
                <AlertTriangle className="h-3.5 w-3.5" />
                <span>The Problem: Limitations of Annual Complete Enumeration</span>
              </div>
              <h2 className="text-lg font-bold text-slate-900">
                Why Recall-Only Census Fails for Pond &amp; Tank Aquaculture
              </h2>
              <p className="text-sm text-slate-700 leading-relaxed">
                Assam produced ~4.75 lakh MT of fish in 2023–24, largely from dispersed private
                ponds and tanks with staggered, partial harvests across the year:
              </p>
              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700">
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-rose-500 shrink-0" />
                  <span>
                    <strong>Weak Farmer Recall:</strong> Year-end interviews miss small partial
                    hauls, household self-consumption, and direct farm-gate sales.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-rose-500 shrink-0" />
                  <span>
                    <strong>Double Counting &amp; Missed Harvests:</strong> Multi-owner community
                    tanks and staggered trader pickups cause overlapping or omitted logs.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-rose-500 shrink-0" />
                  <span>
                    <strong>Zero Uncertainty Metrics:</strong> Single-point productivity
                    assumptions cannot report statistical confidence intervals.
                  </span>
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-teal-200 bg-teal-50/40 p-6 space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full bg-teal-100 px-3 py-1 text-xs font-bold text-teal-800">
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span>The Solution: Rotating Stratified Sample Survey</span>
              </div>
              <h2 className="text-lg font-bold text-slate-900">
                Estimation Over Compulsory Reporting
              </h2>
              <p className="text-sm text-slate-700 leading-relaxed">
                <strong>MatsyaSample Assam</strong> surveys a scientifically drawn rotating sample
                instead of burdening every farmer:
              </p>
              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-teal-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Stratified Resource Frame:</strong> Stratifies by water-spread size,
                    pond/tank type, and intensity (extensive, semi-intensive, intensive).
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-teal-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Digital Diaries + Sample Weighing:</strong> Captures partial harvests
                    in real time and verifies spot hauls with BLE/photo weighing.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-teal-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>95% Confidence Intervals &amp; Audit Lock:</strong> Publishes district
                    and State totals with explicit RSE% and reproducible parameter hashes.
                  </span>
                </li>
              </ul>
            </div>
          </section>
        </div>
      )}

      {/* TAB 2 */}
      {activeTab === 'how' && (
        <div className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-teal-100 text-teal-700">
                  <Waves className="h-5 w-5" />
                </span>
                <span className="text-xs font-mono font-semibold text-slate-400">MODULE 01</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900">1. Sample Survey Ledger (`/`)</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Inspect sampled ponds and tanks across Nagaon, Kamrup, Dima Hasao, Cachar, and
                Barpeta with full 5-stage survey and weighing timelines.
              </p>
              <Link
                to="/"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-700 hover:text-teal-800"
              >
                <span>Go to Sample Survey Ledger</span>
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-sky-100 text-sky-700">
                  <SlidersHorizontal className="h-5 w-5" />
                </span>
                <span className="text-xs font-mono font-semibold text-slate-400">MODULE 02</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                2. Sampling &amp; CI Simulator (`/survey-simulator`)
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Adjust sample size (n), partial-harvest frequency, and inject recall-only bias or
                double counting to see how 95% confidence intervals and RSE% respond.
              </p>
              <Link
                to="/survey-simulator"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-700 hover:text-teal-800"
              >
                <span>Open CI Simulator</span>
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-teal-100 text-teal-700">
                  <BarChart3 className="h-5 w-5" />
                </span>
                <span className="text-xs font-mono font-semibold text-slate-400">MODULE 03</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                3. District Estimates &amp; Audit (`/district-estimates`)
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Review district-level frame counts, sample sizes, 95% CI bounds, RSE%, and export
                audit-ready CSV reports for DES and ICAR-CIFRI.
              </p>
              <Link
                to="/district-estimates"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-700 hover:text-teal-800"
              >
                <span>Open District Estimates</span>
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
                  <FileText className="h-5 w-5" />
                </span>
                <span className="text-xs font-mono font-semibold text-slate-400">MODULE 04</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                4. NESFIC-D-32 Proposal &amp; PDFs (`/proposal`)
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Read all 12 NESFIC-D-32 proposal sections, inspect the ₹40.00L budget breakdown,
                and download the official Proposal PDF, Proof of Work PDF, and TXT file.
              </p>
              <Link
                to="/proposal"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-700 hover:text-teal-800"
              >
                <span>View Proposal &amp; PDFs</span>
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3 */}
      {activeTab === 'personas' && (
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-6">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              End-to-End Field &amp; Statistical Workflow Across 4 Roles
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Designed for realistic Assam field operations with minimal farmer burden.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                step: 'Step 1',
                role: 'Fishery Statistical Officer',
                title: 'Stratify & Draw Rotating Sample',
                desc: 'Stratifies the updated fishery-resource frame by size, type, and intensity, and assigns rotating annual panels.',
              },
              {
                step: 'Step 2',
                role: 'Sampled Fish Farmer',
                title: 'Log Partial Harvest Diary',
                desc: 'Records staggered harvests, household self-consumption, and farm-gate sales via simple local-language prompts.',
              },
              {
                step: 'Step 3',
                role: 'Field Enumerator',
                title: 'Conduct Sample Weighing',
                desc: 'Captures offline baseline schedules and performs randomized spot-haul weighing via BLE/photo verification.',
              },
              {
                step: 'Step 4',
                role: 'DES / ICAR-CIFRI Auditor',
                title: 'Verify 95% CIs & Lock Audit',
                desc: 'Reviews Horvitz–Thompson district/State estimates, RSE%, and locked methodology hashes for publication.',
              },
            ].map((item) => (
              <div
                key={item.step}
                className="rounded-xl border border-slate-200 bg-slate-50/60 p-4 space-y-2.5"
              >
                <span className="inline-block rounded-md bg-teal-100 px-2 py-0.5 text-[11px] font-bold text-teal-800">
                  {item.step} · {item.role}
                </span>
                <h3 className="text-sm font-bold text-slate-900">{item.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* TAB 4 */}
      {activeTab === 'tech' && (
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-3">
            <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-teal-100 text-teal-700">
              <Smartphone className="h-5 w-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">Offline-First Field Schedules</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              IndexedDB/SQLite local storage lets enumerators and sampled farmers log schedules and
              partial-harvest diaries in low-connectivity blocks like Dima Hasao and char areas.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-3">
            <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-sky-100 text-sky-700">
              <Scale className="h-5 w-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">Horvitz–Thompson CI Engine</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Stratified weighted estimation with finite population correction produces unbiased
              district and State totals alongside exact 95% confidence intervals and RSE%.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-3">
            <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-700">
              <FileCheck2 className="h-5 w-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">Reproducible Audit Snapshots</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Every estimation run stores a SHA-256 hash of the frame version, sampling weights, and
              outlier rules for independent reproduction by DES and ICAR-CIFRI.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
