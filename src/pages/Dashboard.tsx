import React, { useState } from 'react';
import {
  CheckCircle2,
  AlertTriangle,
  ShieldAlert,
  MapPin,
  Hash,
  SlidersHorizontal,
  ArrowRight,
  Layers,
  Scale,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { SAMPLED_WATER_BODIES, SampledWaterBody } from '../data/mockTelemetry';

const statusBadge = (status: SampledWaterBody['status']) => {
  if (status === 'Verified') {
    return 'bg-teal-50 text-teal-800 ring-1 ring-teal-600/20';
  }
  if (status === 'Missed Harvest Flag') {
    return 'bg-rose-50 text-rose-800 ring-1 ring-rose-600/20';
  }
  return 'bg-amber-50 text-amber-800 ring-1 ring-amber-600/20';
};

export const Dashboard: React.FC = () => {
  const [selectedUnit, setSelectedUnit] = useState<SampledWaterBody>(SAMPLED_WATER_BODIES[0]);
  const [districtFilter, setDistrictFilter] = useState<string>('All');

  const districts = ['All', 'Nagaon', 'Kamrup', 'Dima Hasao', 'Cachar', 'Barpeta'];
  const filteredUnits =
    districtFilter === 'All'
      ? SAMPLED_WATER_BODIES
      : SAMPLED_WATER_BODIES.filter((u) => u.district === districtFilter);

  const verifiedCount = SAMPLED_WATER_BODIES.filter((u) => u.status === 'Verified').length;
  const totalEstimatedKg = SAMPLED_WATER_BODIES.reduce(
    (acc, u) => acc + u.estimatedAnnualYieldKg,
    0,
  );
  const totalWeightedMt = SAMPLED_WATER_BODIES.reduce(
    (acc, u) => acc + (u.estimatedAnnualYieldKg * u.samplingWeight) / 1000,
    0,
  );

  return (
    <div className="space-y-6">
      {/* Hero Banner */}
      <section className="rounded-2xl bg-gradient-to-r from-teal-950 via-teal-900 to-sky-900 p-6 text-white shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-teal-100">
              <span>NESFIC-D-32 · Fishery Department, Govt. of Assam</span>
              <span>·</span>
              <span>Rotating Stratified Sample Survey</span>
            </div>
            <h1 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
              MatsyaSample Assam — Pond &amp; Tank Sample Survey Ledger
            </h1>
            <p className="mt-2 text-sm text-teal-100/90">
              Scientifically defensible estimation over Assam&apos;s updated fishery-resource frame
              (4.75 lakh MT baseline) using stratified random sampling, digital partial-harvest
              diaries, sample weighing verification, and reproducible 95% confidence intervals.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/survey-simulator"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-teal-950 shadow-xs hover:bg-teal-50 transition-colors"
            >
              <SlidersHorizontal className="h-4 w-4 text-teal-700" />
              <span>Open CI &amp; Sampling Simulator</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/proposal"
              className="inline-flex items-center gap-2 rounded-xl border border-white/25 bg-white/10 px-4 py-2.5 text-sm font-semibold text-white hover:bg-white/20 transition-colors"
            >
              <span>View NESFIC-D-32 Proposal</span>
            </Link>
          </div>
        </div>
      </section>

      {/* KPI Strip */}
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-2xs">
          <p className="text-xs font-medium text-slate-500">Assam Baseline Production (2023–24)</p>
          <p className="mt-1 text-2xl font-bold text-slate-900">4.75 Lakh MT</p>
          <p className="mt-1 text-xs text-teal-700 font-medium">
            Estimated via rotating sample (no census burden)
          </p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-2xs">
          <p className="text-xs font-medium text-slate-500">Showcase Sampled Units</p>
          <p className="mt-1 text-2xl font-bold text-slate-900">
            {verifiedCount} / {SAMPLED_WATER_BODIES.length} Verified
          </p>
          <p className="mt-1 text-xs text-slate-500">
            2 units flagged for recall drift / duplicate check
          </p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-2xs">
          <p className="text-xs font-medium text-slate-500">Sampled Harvest Logged</p>
          <p className="mt-1 text-2xl font-bold text-slate-900">
            {totalEstimatedKg.toLocaleString()} kg
          </p>
          <p className="mt-1 text-xs text-slate-500">
            Includes partial harvests, self-consumption &amp; farm-gate sales
          </p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-2xs">
          <p className="text-xs font-medium text-slate-500">Weighted Frame Contribution</p>
          <p className="mt-1 text-2xl font-bold text-teal-700">{totalWeightedMt.toFixed(1)} MT</p>
          <p className="mt-1 text-xs text-slate-500">
            Horvitz–Thompson expansion (Σ yᵢ · wᵢ)
          </p>
        </div>
      </section>

      {/* Main Split View: Sampled Unit List & 5-Stage Survey Timeline */}
      <div className="grid gap-6 lg:grid-cols-12">
        {/* Left: Sampled Ponds & Tanks */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Layers className="h-4 w-4 text-teal-700" />
              Sampled Ponds &amp; Tanks
            </h2>
            <div className="flex flex-wrap gap-1">
              {districts.map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => setDistrictFilter(d)}
                  className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-colors ${
                    districtFilter === d
                      ? 'bg-teal-700 text-white'
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            {filteredUnits.map((unit) => {
              const active = selectedUnit.sampleUnitId === unit.sampleUnitId;
              return (
                <button
                  key={unit.sampleUnitId}
                  type="button"
                  onClick={() => setSelectedUnit(unit)}
                  className={`w-full text-left rounded-xl border p-4 transition-all ${
                    active
                      ? 'border-teal-600 bg-teal-50/40 ring-2 ring-teal-600/20 shadow-xs'
                      : 'border-slate-200 bg-white hover:border-teal-300'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-xs font-mono font-semibold text-teal-800">
                        {unit.sampleUnitId}
                      </span>
                      <h3 className="text-sm font-bold text-slate-900 mt-0.5">{unit.pondName}</h3>
                    </div>
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${statusBadge(
                        unit.status,
                      )}`}
                    >
                      {unit.status}
                    </span>
                  </div>

                  <div className="mt-3 grid grid-cols-3 gap-2 text-xs text-slate-600">
                    <div>
                      <span className="text-slate-400 block">District</span>
                      <span className="font-medium text-slate-800">{unit.district}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Stratum</span>
                      <span className="font-medium text-slate-800">{unit.intensityStratum}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Annual Yield</span>
                      <span className="font-semibold text-slate-900">
                        {unit.estimatedAnnualYieldKg.toLocaleString()} kg
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Selected Sample Unit Audit & Harvest Diary Timeline */}
        <div className="lg:col-span-7">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between border-b border-slate-100 pb-4">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-md bg-slate-100 px-2 py-0.5 font-mono text-xs font-semibold text-slate-700">
                    Frame ID: {selectedUnit.frameId}
                  </span>
                  <span className="rounded-md bg-sky-50 px-2 py-0.5 text-xs font-semibold text-sky-800 ring-1 ring-sky-600/20">
                    {selectedUnit.rotationPanel}
                  </span>
                </div>
                <h2 className="mt-2 text-xl font-bold text-slate-900">{selectedUnit.pondName}</h2>
                <p className="mt-1 text-xs text-slate-500 flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 text-teal-700" />
                  <span>
                    {selectedUnit.district}, Assam ({selectedUnit.gps}) ·{' '}
                    {selectedUnit.waterBodyType} · {selectedUnit.waterSpreadHa} ha
                  </span>
                </p>
              </div>
              <span
                className={`self-start inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${statusBadge(
                  selectedUnit.status,
                )}`}
              >
                {selectedUnit.status}
              </span>
            </div>

            {/* Stratum & Harvest Breakdown Metrics */}
            <div className="grid gap-3 sm:grid-cols-4">
              <div className="rounded-xl bg-slate-50 p-3 border border-slate-100">
                <p className="text-[11px] font-medium text-slate-500">Size &amp; Intensity</p>
                <p className="mt-1 text-sm font-bold text-slate-900">{selectedUnit.sizeStratum}</p>
                <p className="text-[11px] text-slate-500">{selectedUnit.intensityStratum}</p>
              </div>
              <div className="rounded-xl bg-slate-50 p-3 border border-slate-100">
                <p className="text-[11px] font-medium text-slate-500">Sampling Weight (wᵢ)</p>
                <p className="mt-1 text-lg font-bold text-teal-700">
                  {selectedUnit.samplingWeight.toFixed(1)}×
                </p>
              </div>
              <div className="rounded-xl bg-slate-50 p-3 border border-slate-100">
                <p className="text-[11px] font-medium text-slate-500">Farm-Gate / Home</p>
                <p className="mt-1 text-sm font-bold text-slate-900">
                  {selectedUnit.farmGateSalesKg.toLocaleString()} /{' '}
                  {selectedUnit.selfConsumptionKg} kg
                </p>
                <p className="text-[11px] text-slate-500">
                  {selectedUnit.partialHarvestsLogged} partial harvests
                </p>
              </div>
              <div className="rounded-xl bg-slate-50 p-3 border border-slate-100">
                <p className="text-[11px] font-medium text-slate-500">Verified Weighing</p>
                <p className="mt-1 text-lg font-bold text-slate-900">
                  {selectedUnit.verifiedWeighingKg.toLocaleString()} kg
                </p>
              </div>
            </div>

            {/* 5-Stage Survey & Verification Timeline */}
            <div>
              <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                <Scale className="h-4 w-4 text-teal-700" />
                5-Stage Survey, Diary &amp; Sample Weighing Audit Trail
              </h3>
              <ol className="space-y-3">
                {selectedUnit.events.map((ev, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 rounded-xl border border-slate-100 bg-slate-50/70 p-3"
                  >
                    <div className="mt-0.5 shrink-0">
                      {ev.status === 'ok' && <CheckCircle2 className="h-4 w-4 text-teal-600" />}
                      {ev.status === 'warn' && <AlertTriangle className="h-4 w-4 text-amber-500" />}
                      {ev.status === 'alert' && <ShieldAlert className="h-4 w-4 text-rose-600" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <p className="text-xs font-bold text-slate-900">{ev.stage}</p>
                        <span className="text-[11px] text-slate-500">{ev.timestamp}</span>
                      </div>
                      <p className="text-xs text-slate-600 mt-0.5">
                        {ev.actor} · {ev.location}
                      </p>
                      <div className="mt-1.5 flex flex-wrap items-center justify-between gap-2 text-[11px]">
                        <span className="font-medium text-slate-800">{ev.metric}</span>
                        <span className="inline-flex items-center gap-1 font-mono text-slate-500">
                          <Hash className="h-3 w-3" />
                          {ev.hash}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-teal-950 p-4 text-white">
              <div>
                <p className="text-xs text-teal-300 font-medium">
                  Reproducible Audit Snapshot · Species: {selectedUnit.speciesMix}
                </p>
                <p className="font-mono text-xs mt-0.5 text-teal-100">
                  Audit Digest: {selectedUnit.auditHash}
                </p>
              </div>
              <Link
                to="/district-estimates"
                className="inline-flex items-center gap-1.5 rounded-lg bg-teal-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-teal-500"
              >
                <Scale className="h-3.5 w-3.5" />
                <span>View District 95% CIs</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
