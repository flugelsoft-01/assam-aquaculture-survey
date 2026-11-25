import React, { useMemo, useState } from 'react';
import { Sliders, ShieldAlert, CheckCircle2, RefreshCw, Lock, BarChart3 } from 'lucide-react';

function pseudoSha256(input: string): string {
  let h1 = 0xdeadbeef ^ input.length;
  let h2 = 0x41c6ce57 ^ input.length;
  for (let i = 0; i < input.length; i++) {
    const ch = input.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  const hex =
    (h2 >>> 0).toString(16).padStart(8, '0') + (h1 >>> 0).toString(16).padStart(8, '0');
  return `0x${hex}`;
}

export const Simulator: React.FC = () => {
  const [district, setDistrict] = useState<'Nagaon' | 'Kamrup' | 'Dima Hasao'>('Nagaon');
  const [framePonds, setFramePonds] = useState(16128);
  const [sampleSize, setSampleSize] = useState(420);
  const [meanYieldKg, setMeanYieldKg] = useState(2903);
  const [recallOnlyMode, setRecallOnlyMode] = useState(false);
  const [doubleCountingFault, setDoubleCountingFault] = useState(false);
  const [offlineMode, setOfflineMode] = useState(false);

  const handleDistrictPreset = (d: 'Nagaon' | 'Kamrup' | 'Dima Hasao') => {
    setDistrict(d);
    if (d === 'Nagaon') {
      setFramePonds(16128);
      setSampleSize(420);
      setMeanYieldKg(2903);
    } else if (d === 'Kamrup') {
      setFramePonds(7502);
      setSampleSize(310);
      setMeanYieldKg(3240);
    } else {
      setFramePonds(2340);
      setSampleSize(120);
      setMeanYieldKg(1641);
    }
  };

  const sim = useMemo(() => {
    const safeN = Math.max(sampleSize, 30);
    const safeFrame = Math.max(framePonds, safeN);

    // Apply recall under-reporting bias (-22%) if Recall-Only mode is enabled
    const biasFactor = recallOnlyMode ? 0.78 : 1.0;
    // Apply double counting inflation (+11%) if inter-pond transfer fault is injected
    const dupFactor = doubleCountingFault ? 1.11 : 1.0;

    const adjustedMeanKg = meanYieldKg * biasFactor * dupFactor;
    const totalMt = (safeFrame * adjustedMeanKg) / 1000;

    // Finite population correction & stratified CV (~0.43 with diaries, ~0.78 recall-only)
    const cv = recallOnlyMode ? 0.78 : 0.43;
    const fpc = Math.sqrt(Math.max(0, (safeFrame - safeN) / safeFrame));
    const seMt = (totalMt * cv * fpc) / Math.sqrt(safeN);
    const rsePct = totalMt > 0 ? (seMt / totalMt) * 100 : 0;
    const ciHalf = 1.96 * seMt;

    return {
      totalMt,
      ciLower: Math.max(0, totalMt - ciHalf),
      ciUpper: totalMt + ciHalf,
      rsePct,
      designWeight: safeFrame / safeN,
    };
  }, [framePonds, sampleSize, meanYieldKg, recallOnlyMode, doubleCountingFault]);

  const isTargetRseMet = sim.rsePct <= (district === 'Dima Hasao' ? 3.5 : 2.5);
  const snapshotHash = useMemo(
    () =>
      pseudoSha256(
        `${district}|${framePonds}|${sampleSize}|${meanYieldKg}|${recallOnlyMode}|${doubleCountingFault}`,
      ),
    [district, framePonds, sampleSize, meanYieldKg, recallOnlyMode, doubleCountingFault],
  );

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-2xs">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-cyan-100 px-3 py-1 text-xs font-semibold text-cyan-900">
              <Sliders className="h-3.5 w-3.5" />
              Horvitz–Thompson Stratified Estimator Sandbox
            </span>
            <h1 className="mt-2 text-2xl font-bold text-slate-900">
              Stratified Sampling &amp; 95% Confidence Interval Simulator
            </h1>
            <p className="mt-1 text-sm text-slate-600">
              Model rotating sample sizes, finite population correction (FPC), and fault injection
              (recall-only bias vs. partial-harvest diaries + sample weighing) across contrasting
              Assam pilot districts.
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              setRecallOnlyMode(false);
              setDoubleCountingFault(false);
              handleDistrictPreset('Nagaon');
            }}
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 shrink-0"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            <span>Reset Benchmark</span>
          </button>
        </div>
      </section>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Controls */}
        <section className="lg:col-span-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-2xs space-y-5">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
              1. Contrasting Pilot District Stratum
            </label>
            <div className="mt-2 grid grid-cols-3 gap-2">
              {(['Nagaon', 'Kamrup', 'Dima Hasao'] as const).map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => handleDistrictPreset(d)}
                  className={`rounded-xl border px-3 py-2 text-xs font-semibold transition-colors ${
                    district === d
                      ? 'border-cyan-700 bg-cyan-700 text-white'
                      : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-700">
              <span>District Resource Frame (N ponds/tanks)</span>
              <span className="font-mono text-cyan-800">{framePonds.toLocaleString('en-IN')}</span>
            </div>
            <input
              type="range"
              min={500}
              max={25000}
              step={100}
              value={framePonds}
              onChange={(e) => setFramePonds(Number(e.target.value))}
              className="mt-2 w-full accent-cyan-700"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-700">
              <span>Rotating Sample Size (n sampled units)</span>
              <span className="font-mono text-cyan-800">{sampleSize}</span>
            </div>
            <input
              type="range"
              min={40}
              max={900}
              step={10}
              value={sampleSize}
              onChange={(e) => setSampleSize(Number(e.target.value))}
              className="mt-2 w-full accent-cyan-700"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-700">
              <span>Observed Mean Annual Pond Yield (kg/unit)</span>
              <span className="font-mono text-cyan-800">{meanYieldKg.toLocaleString('en-IN')} kg</span>
            </div>
            <input
              type="range"
              min={800}
              max={6000}
              step={50}
              value={meanYieldKg}
              onChange={(e) => setMeanYieldKg(Number(e.target.value))}
              className="mt-2 w-full accent-cyan-700"
            />
          </div>

          {/* Fault Injection & Offline Toggles */}
          <div className="border-t border-slate-100 pt-4 space-y-2.5">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
              2. Fault-Injection &amp; Field Mode Toggles
            </p>
            <label className="flex items-center justify-between rounded-xl border border-slate-200 p-3 cursor-pointer hover:bg-slate-50">
              <div>
                <p className="text-xs font-semibold text-slate-900">
                  Simulate Recall-Only Mode (No Harvest Diaries)
                </p>
                <p className="text-[11px] text-slate-500">
                  Injects ~22% under-reporting bias &amp; higher variance from missed partial harvests
                </p>
              </div>
              <input
                type="checkbox"
                checked={recallOnlyMode}
                onChange={(e) => setRecallOnlyMode(e.target.checked)}
                className="h-4 w-4 accent-rose-600"
              />
            </label>

            <label className="flex items-center justify-between rounded-xl border border-slate-200 p-3 cursor-pointer hover:bg-slate-50">
              <div>
                <p className="text-xs font-semibold text-slate-900">
                  Inject Inter-Pond Transfer Double Counting
                </p>
                <p className="text-[11px] text-slate-500">
                  Simulates +11% inflation when trader receipts overlap without unique frame IDs
                </p>
              </div>
              <input
                type="checkbox"
                checked={doubleCountingFault}
                onChange={(e) => setDoubleCountingFault(e.target.checked)}
                className="h-4 w-4 accent-amber-600"
              />
            </label>

            <label className="flex items-center justify-between rounded-xl border border-slate-200 p-3 cursor-pointer hover:bg-slate-50">
              <div>
                <p className="text-xs font-semibold text-slate-900">
                  Offline-First PWA Queue (Low-Connectivity Block)
                </p>
                <p className="text-[11px] text-slate-500">
                  Caches schedules in IndexedDB/SQLite until cellular sync resumes
                </p>
              </div>
              <input
                type="checkbox"
                checked={offlineMode}
                onChange={(e) => setOfflineMode(e.target.checked)}
                className="h-4 w-4 accent-cyan-700"
              />
            </label>
          </div>
        </section>

        {/* Live Outputs */}
        <section className="lg:col-span-6 space-y-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-cyan-700" />
                <span>Horvitz–Thompson Estimation Output</span>
              </h2>
              <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-mono text-slate-700">
                <Lock className="h-3 w-3" />
                {snapshotHash}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-xl bg-cyan-50/70 border border-cyan-200 p-4">
                <p className="text-xs font-medium text-cyan-900">Estimated District Total</p>
                <p className="mt-1 text-2xl font-extrabold text-cyan-950">
                  {Math.round(sim.totalMt).toLocaleString('en-IN')} MT
                </p>
                <p className="mt-1 text-[11px] text-cyan-800">
                  Design weight w_h = {sim.designWeight.toFixed(1)}×
                </p>
              </div>

              <div
                className={`rounded-xl border p-4 ${
                  isTargetRseMet && !recallOnlyMode && !doubleCountingFault
                    ? 'bg-emerald-50/70 border-emerald-200'
                    : 'bg-rose-50/70 border-rose-200'
                }`}
              >
                <p className="text-xs font-medium text-slate-700">Relative Standard Error (RSE)</p>
                <p
                  className={`mt-1 text-2xl font-extrabold ${
                    isTargetRseMet && !recallOnlyMode ? 'text-emerald-800' : 'text-rose-800'
                  }`}
                >
                  {sim.rsePct.toFixed(2)}%
                </p>
                <p className="mt-1 text-[11px] text-slate-600">
                  Target &le; {district === 'Dima Hasao' ? '3.5%' : '2.5%'}
                </p>
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-semibold text-slate-700">95% Confidence Interval (MT)</p>
              <p className="mt-1 text-lg font-bold font-mono text-slate-900">
                [{Math.round(sim.ciLower).toLocaleString('en-IN')} MT —{' '}
                {Math.round(sim.ciUpper).toLocaleString('en-IN')} MT]
              </p>
              <p className="mt-1 text-xs text-slate-500">
                Margin of error: &plusmn;
                {Math.round((sim.ciUpper - sim.ciLower) / 2).toLocaleString('en-IN')} MT
              </p>
            </div>

            <div
              className={`flex items-start gap-2.5 rounded-xl p-4 text-xs ${
                recallOnlyMode || doubleCountingFault || !isTargetRseMet
                  ? 'bg-rose-50 text-rose-900 border border-rose-200'
                  : 'bg-emerald-50 text-emerald-900 border border-emerald-200'
              }`}
            >
              {recallOnlyMode || doubleCountingFault || !isTargetRseMet ? (
                <ShieldAlert className="h-4 w-4 text-rose-600 shrink-0 mt-0.5" />
              ) : (
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
              )}
              <div className="space-y-1">
                <p className="font-bold">
                  {recallOnlyMode
                    ? 'ALERT: Recall-Only Under-Reporting & High Variance'
                    : doubleCountingFault
                      ? 'ALERT: Inter-Pond Transfer Double-Counting Detected'
                      : !isTargetRseMet
                        ? 'NOTICE: Increase Sample Size (n) to Meet District RSE Target'
                        : 'VALIDATED: Diary + Sample Weighing Meets DES / ICAR-CIFRI Precision'}
                </p>
                <p className="opacity-90">
                  {offlineMode
                    ? 'Offline PWA mode active: schedule queued in local IndexedDB for sync.'
                    : 'Online sync active: estimation parameters locked for reproducible audit.'}
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
