import React, { useState } from 'react';
import {
  CheckCircle2,
  AlertTriangle,
  Clock,
  MapPin,
  Hash,
  Sliders,
  ArrowRight,
  Layers,
  Scale,
  Fish,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { SAMPLED_WATER_BODIES, SampledWaterBody } from '../data/mockTelemetry';

const statusBadge = (status: SampledWaterBody['status']) => {
  if (status === 'Verified') {
    return 'bg-emerald-50 text-emerald-800 ring-1 ring-emerald-600/20';
  }
  if (status === 'Recall-Drift Alert') {
    return 'bg-rose-50 text-rose-800 ring-1 ring-rose-600/20';
  }
  return 'bg-amber-50 text-amber-800 ring-1 ring-amber-600/20';
};

export const Dashboard: React.FC = () => {
  const [selectedUnit, setSelectedUnit] = useState<SampledWaterBody>(SAMPLED_WATER_BODIES[0]);
  const [districtFilter, setDistrictFilter] = useState<string>('All');
  const [showSnapshotModal, setShowSnapshotModal] = useState(false);

  const districts = ['All', 'Nagaon', 'Kamrup', 'Dima Hasao', 'Cachar', 'Barpeta'];
  const filteredUnits =
    districtFilter === 'All'
      ? SAMPLED_WATER_BODIES
      : SAMPLED_WATER_BODIES.filter((u) => u.district === districtFilter);

  const verifiedCount = SAMPLED_WATER_BODIES.filter((u) => u.status === 'Verified').length;
  const totalDiaryKg = SAMPLED_WATER_BODIES.reduce((acc, u) => acc + u.diaryYieldKg, 0);
  const totalSelfConsKg = SAMPLED_WATER_BODIES.reduce((acc, u) => acc + u.selfConsumptionKg, 0);

  return (
    <div className="space-y-6">
      {/* Hero Banner */}
      <section className="rounded-2xl bg-gradient-to-br from-cyan-950 via-cyan-900 to-teal-900 p-6 sm:p-8 text-white shadow-md">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-cyan-100 backdrop-blur-xs">
              <Fish className="h-3.5 w-3.5 text-teal-300" />
              <span>NESFIC-D-32 · Directorate of Fisheries, Government of Assam</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Rotating Pond &amp; Tank Sample Survey Ledger
            </h1>
            <p className="text-sm text-cyan-100/90 leading-relaxed">
              Scientifically stratified rotating sample survey across Assam&apos;s dispersed ponds
              and community tanks. Track offline baseline schedules, multilingual partial-harvest
              diaries, randomized sample weighings, and Horvitz–Thompson estimation locks.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/sampling-simulator"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-cyan-950 shadow-sm hover:bg-cyan-50 transition-colors"
            >
              <Sliders className="h-4 w-4 text-cyan-700" />
              <span>Launch Sampling &amp; CI Simulator</span>
            </Link>
            <Link
              to="/proposal"
              className="inline-flex items-center gap-2 rounded-xl border border-white/25 bg-white/10 px-4 py-2.5 text-sm font-semibold text-white hover:bg-white/20 transition-colors"
            >
              <span>NESFIC-D-32 Proposal</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* KPI Strip */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-2xs">
          <div className="flex items-center justify-between text-xs font-medium text-slate-500">
            <span>Sampled Units Verified</span>
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
          </div>
          <p className="mt-2 text-2xl font-bold text-slate-900">
            {verifiedCount} / {SAMPLED_WATER_BODIES.length}
          </p>
          <p className="mt-1 text-xs text-slate-500">50% annual rotating panel active</p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-2xs">
          <div className="flex items-center justify-between text-xs font-medium text-slate-500">
            <span>Logged Partial-Harvest Yield</span>
            <Layers className="h-4 w-4 text-cyan-700" />
          </div>
          <p className="mt-2 text-2xl font-bold text-slate-900">
            {totalDiaryKg.toLocaleString('en-IN')} kg
          </p>
          <p className="mt-1 text-xs text-slate-500">Includes {totalSelfConsKg} kg self-consumption</p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-2xs">
          <div className="flex items-center justify-between text-xs font-medium text-slate-500">
            <span>Weighing Concordance</span>
            <Scale className="h-4 w-4 text-teal-600" />
          </div>
          <p className="mt-2 text-2xl font-bold text-slate-900">96.4%</p>
          <p className="mt-1 text-xs text-slate-500">BLE scale spot-haul vs. farmer diary</p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-2xs">
          <div className="flex items-center justify-between text-xs font-medium text-slate-500">
            <span>Pilot District Mean RSE</span>
            <Hash className="h-4 w-4 text-cyan-700" />
          </div>
          <p className="mt-2 text-2xl font-bold text-emerald-700">2.58%</p>
          <p className="mt-1 text-xs text-slate-500">Target &le; 3.0% (95% CI published)</p>
        </div>
      </section>

      {/* Main Ledger Grid */}
      <section className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Left: Sampled Water Bodies List */}
        <div className="lg:col-span-5 space-y-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-2xs">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100">
              <h2 className="text-base font-bold text-slate-900">Sampled Pond &amp; Tank Units</h2>
              <div className="flex flex-wrap gap-1">
                {districts.map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setDistrictFilter(d)}
                    className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-colors ${
                      districtFilter === d
                        ? 'bg-cyan-700 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-3 space-y-2.5">
              {filteredUnits.map((unit) => {
                const isSelected = selectedUnit.unitId === unit.unitId;
                return (
                  <button
                    key={unit.unitId}
                    type="button"
                    onClick={() => setSelectedUnit(unit)}
                    className={`w-full text-left rounded-xl border p-3.5 transition-all ${
                      isSelected
                        ? 'border-cyan-600 bg-cyan-50/60 ring-1 ring-cyan-600/20'
                        : 'border-slate-200 bg-white hover:border-cyan-300 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-xs font-mono font-semibold text-cyan-800">
                          {unit.unitId} · {unit.sizeStratum}
                        </p>
                        <p className="mt-0.5 text-sm font-bold text-slate-900">{unit.pondName}</p>
                      </div>
                      <span
                        className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-semibold ${statusBadge(
                          unit.status,
                        )}`}
                      >
                        {unit.status}
                      </span>
                    </div>

                    <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-600">
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="h-3 w-3 text-cyan-700" />
                        {unit.district} ({unit.block})
                      </span>
                      <span>· {unit.waterBodyType}</span>
                      <span>· {unit.areaHa} ha</span>
                      <span>· w_h = {unit.designWeight}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: 5-Stage Survey & Verification Timeline */}
        <div className="lg:col-span-7">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-2xs space-y-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between border-b border-slate-100 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-semibold text-cyan-800 bg-cyan-50 px-2 py-0.5 rounded">
                    Frame ID: {selectedUnit.frameCode}
                  </span>
                  <span className="text-xs font-medium text-slate-500">
                    {selectedUnit.panelRotation}
                  </span>
                </div>
                <h2 className="mt-1.5 text-lg font-bold text-slate-900">
                  {selectedUnit.pondName}
                </h2>
                <p className="text-xs text-slate-500">
                  Species: {selectedUnit.speciesMix} · GPS: {selectedUnit.gps}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowSnapshotModal(true)}
                className="inline-flex items-center gap-1.5 rounded-xl border border-cyan-700 bg-cyan-50 px-3 py-2 text-xs font-semibold text-cyan-900 hover:bg-cyan-100 transition-colors shrink-0"
              >
                <Hash className="h-3.5 w-3.5" />
                <span>Audit Snapshot ({selectedUnit.snapshotHash})</span>
              </button>
            </div>

            {/* Unit Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="rounded-lg bg-slate-50 p-3">
                <p className="text-[11px] font-medium text-slate-500">Partial Harvests</p>
                <p className="mt-0.5 text-base font-bold text-slate-900">
                  {selectedUnit.partialHarvestsLogged} entries
                </p>
              </div>
              <div className="rounded-lg bg-slate-50 p-3">
                <p className="text-[11px] font-medium text-slate-500">Diary Total</p>
                <p className="mt-0.5 text-base font-bold text-slate-900">
                  {selectedUnit.diaryYieldKg.toLocaleString('en-IN')} kg
                </p>
              </div>
              <div className="rounded-lg bg-slate-50 p-3">
                <p className="text-[11px] font-medium text-slate-500">Self-Consumption</p>
                <p className="mt-0.5 text-base font-bold text-slate-900">
                  {selectedUnit.selfConsumptionKg} kg
                </p>
              </div>
              <div className="rounded-lg bg-slate-50 p-3">
                <p className="text-[11px] font-medium text-slate-500">Design Weight (w_h)</p>
                <p className="mt-0.5 text-base font-bold text-cyan-800">
                  {selectedUnit.designWeight}×
                </p>
              </div>
            </div>

            {/* Timeline */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                5-Stage Survey &amp; Statistical Verification Timeline
              </h3>
              <div className="space-y-3">
                {selectedUnit.events.map((ev, idx) => (
                  <div
                    key={idx}
                    className="flex gap-3 rounded-xl border border-slate-100 bg-slate-50/70 p-3.5"
                  >
                    <div className="mt-0.5 shrink-0">
                      {ev.status === 'ok' && <CheckCircle2 className="h-4 w-4 text-emerald-600" />}
                      {ev.status === 'warn' && <Clock className="h-4 w-4 text-amber-600" />}
                      {ev.status === 'alert' && <AlertTriangle className="h-4 w-4 text-rose-600" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <p className="text-sm font-semibold text-slate-900">{ev.stage}</p>
                        <span className="text-[11px] font-mono text-slate-500">{ev.timestamp}</span>
                      </div>
                      <p className="mt-0.5 text-xs text-slate-600">
                        {ev.actor} · {ev.location}
                      </p>
                      <div className="mt-1.5 flex flex-wrap items-center justify-between gap-2">
                        <span className="text-xs font-medium text-slate-800">{ev.metric}</span>
                        <span className="text-[11px] font-mono text-slate-400">
                          sha256:{ev.hash}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reproducible Snapshot Modal */}
      {showSnapshotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-xs">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900">
                Reproducible Estimation Snapshot
              </h3>
              <button
                type="button"
                onClick={() => setShowSnapshotModal(false)}
                className="rounded-lg px-2 py-1 text-xs font-semibold text-slate-500 hover:bg-slate-100"
              >
                Close
              </button>
            </div>
            <pre className="overflow-x-auto rounded-xl bg-slate-900 p-4 text-xs text-cyan-200">
              {JSON.stringify(
                {
                  unitId: selectedUnit.unitId,
                  frameCode: selectedUnit.frameCode,
                  district: selectedUnit.district,
                  stratum: `${selectedUnit.sizeStratum} | ${selectedUnit.waterBodyType} | ${selectedUnit.cultureIntensity}`,
                  designWeight: selectedUnit.designWeight,
                  diaryYieldKg: selectedUnit.diaryYieldKg,
                  selfConsumptionKg: selectedUnit.selfConsumptionKg,
                  sampleWeighingKg: selectedUnit.sampleWeighingKg,
                  concordancePct: selectedUnit.concordancePct,
                  snapshotHash: selectedUnit.snapshotHash,
                },
                null,
                2,
              )}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};
