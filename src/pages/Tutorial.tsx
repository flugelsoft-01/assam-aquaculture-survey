import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Fish,
  Layers,
  Sliders,
  FileText,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Scale,
  Smartphone,
  Database,
  Sparkles,
} from 'lucide-react';

export const Tutorial: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'what' | 'how' | 'personas' | 'tech'>('what');

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Hero Banner */}
      <section className="relative overflow-hidden rounded-3xl border border-cyan-200/80 bg-gradient-to-br from-cyan-950 via-cyan-900 to-teal-900 p-6 sm:p-10 text-white shadow-md">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-cyan-500/20 border border-cyan-400/30 px-3.5 py-1 text-xs font-semibold text-cyan-200 backdrop-blur-xs">
            <Sparkles className="h-3.5 w-3.5 text-teal-300" />
            <span>Methodology &amp; Interactive User Guide</span>
          </div>

          <h1 className="mt-4 text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
            How MatsyaSample Assam Works
          </h1>

          <p className="mt-3 text-sm sm:text-base text-cyan-100/90 leading-relaxed">
            Welcome to <strong>Flugelsoft Labs MatsyaSample Assam</strong> (NESFIC-D-32, Directorate
            of Fisheries, Government of Assam). This guide explains how stratified rotating sampling,
            partial-harvest diaries, and sample weighing produce auditable fish production estimates
            with 95% confidence intervals.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-cyan-950 shadow-xs hover:bg-cyan-50 transition-colors"
            >
              <Layers className="h-4 w-4 text-cyan-700" />
              <span>Explore Sample Frame Ledger</span>
            </Link>
            <Link
              to="/sampling-simulator"
              className="inline-flex items-center gap-2 rounded-xl border border-cyan-400/40 bg-cyan-800/40 px-4 py-2.5 text-sm font-semibold text-white hover:bg-cyan-800/60 transition-colors"
            >
              <Sliders className="h-4 w-4" />
              <span>Try Sampling &amp; CI Simulator</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-3">
        {[
          { id: 'what', label: '1. The Problem & Goal' },
          { id: 'how', label: '2. Sampling & Weighing Workflow' },
          { id: 'personas', label: '3. User Roles' },
          { id: 'tech', label: '4. Statistical & Tech Stack' },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={`rounded-xl px-4 py-2 text-xs sm:text-sm font-semibold transition-colors ${
              activeTab === tab.id
                ? 'bg-cyan-700 text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'what' && (
        <section className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-rose-200 bg-rose-50/50 p-6 space-y-3">
            <div className="flex items-center gap-2 text-rose-900 font-bold">
              <AlertTriangle className="h-5 w-5 text-rose-600" />
              <h2>Current Bottlenecks</h2>
            </div>
            <ul className="space-y-2 text-sm text-slate-700">
              <li>• Complete annual enumeration across lakhs of dispersed ponds is impractical.</li>
              <li>• Year-end farmer recall misses staggered partial harvests &amp; self-consumption.</li>
              <li>• Flat per-hectare yield multipliers ignore stocking &amp; management diversity.</li>
              <li>• No explicit confidence intervals or Relative Standard Error (RSE%).</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-6 space-y-3">
            <div className="flex items-center gap-2 text-emerald-900 font-bold">
              <CheckCircle2 className="h-5 w-5 text-emerald-600" />
              <h2>MatsyaSample Assam Solution</h2>
            </div>
            <ul className="space-y-2 text-sm text-slate-700">
              <li>• Rotating stratified random sample (no compulsory census burden on farmers).</li>
              <li>• Multilingual offline-first harvest diaries (Assamese, Bengali, Bodo, English).</li>
              <li>• Randomized BLE/photo sample weighings to measure &amp; correct recall bias.</li>
              <li>• Reproducible Horvitz–Thompson totals with 95% CI &amp; SHA-256 audit locks.</li>
            </ul>
          </div>
        </section>
      )}

      {activeTab === 'how' && (
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              step: 'Stage 1',
              title: 'Stratified Frame',
              desc: 'Stratify by water-spread area (<0.2, 0.2–1.0, >1.0 ha), pond/tank type, and culture intensity.',
              icon: Layers,
            },
            {
              step: 'Stage 2',
              title: 'Offline Schedules',
              desc: 'Enumerators record baseline stocking, species mix, and feed inputs offline.',
              icon: Smartphone,
            },
            {
              step: 'Stage 3',
              title: 'Harvest Diaries',
              desc: 'Sampled farmers log partial harvests, self-consumption, and farm-gate sales.',
              icon: Fish,
            },
            {
              step: 'Stage 4',
              title: 'Sample Weighing & CI',
              desc: 'Spot-haul weighings verify diaries; Horvitz–Thompson engine locks 95% CI.',
              icon: Scale,
            },
          ].map(({ step, title, desc, icon: Icon }) => (
            <div key={step} className="rounded-2xl border border-slate-200 bg-white p-5 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase text-cyan-700">{step}</span>
                <Icon className="h-4 w-4 text-cyan-700" />
              </div>
              <h3 className="text-base font-bold text-slate-900">{title}</h3>
              <p className="text-xs leading-relaxed text-slate-600">{desc}</p>
            </div>
          ))}
        </section>
      )}

      {activeTab === 'personas' && (
        <section className="grid gap-4 sm:grid-cols-2">
          {[
            {
              role: 'Fishery Statistical Officer',
              tasks: 'Configures stratification, draws 50% rotating panels, monitors district RSE%.',
            },
            {
              role: 'Field Enumerator (Fishery Demonstrator)',
              tasks: 'Completes offline baseline schedules, conducts BLE spot-haul sample weighings.',
            },
            {
              role: 'Sampled Fish Farmer',
              tasks: 'Logs partial harvests & self-consumption in 3 taps via Assamese/local UI or SMS.',
            },
            {
              role: 'DES / ICAR-CIFRI Reviewer',
              tasks: 'Audits locked SHA-256 estimation snapshots, weights, and 95% confidence intervals.',
            },
          ].map((p) => (
            <div key={p.role} className="rounded-2xl border border-slate-200 bg-white p-5 space-y-1.5">
              <h3 className="text-sm font-bold text-slate-900">{p.role}</h3>
              <p className="text-xs leading-relaxed text-slate-600">{p.tasks}</p>
            </div>
          ))}
        </section>
      )}

      {activeTab === 'tech' && (
        <section className="rounded-2xl border border-slate-200 bg-white p-6 space-y-4">
          <div className="flex items-center gap-2 font-bold text-slate-900">
            <Database className="h-5 w-5 text-cyan-700" />
            <h2>Offline-First Edge-Cloud &amp; Statistical Stack</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-3 text-xs text-slate-600">
            <div className="rounded-xl bg-slate-50 p-4 space-y-1">
              <p className="font-bold text-slate-900">Edge &amp; Field Client</p>
              <p>React/TypeScript PWA + Android, IndexedDB/SQLite offline sync, BLE scale &amp; SMS fallback.</p>
            </div>
            <div className="rounded-xl bg-slate-50 p-4 space-y-1">
              <p className="font-bold text-slate-900">Frame &amp; Survey API</p>
              <p>Node.js/TypeScript API + PostgreSQL/PostGIS storing versioned frames and immutable schedules.</p>
            </div>
            <div className="rounded-xl bg-slate-50 p-4 space-y-1">
              <p className="font-bold text-slate-900">Statistical Engine</p>
              <p>Python SciPy/Statsmodels Horvitz–Thompson + FPC variance engine with SHA-256 locks.</p>
            </div>
          </div>
          <div className="pt-2">
            <Link
              to="/proposal"
              className="inline-flex items-center gap-2 text-xs font-semibold text-cyan-700 hover:underline"
            >
              <FileText className="h-4 w-4" />
              <span>Read the full 12-section NESFIC-D-32 Proposal &amp; download PDFs</span>
            </Link>
          </div>
        </section>
      )}
    </div>
  );
};
