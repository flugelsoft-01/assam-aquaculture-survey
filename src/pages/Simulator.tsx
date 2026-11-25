import React, { useMemo, useState } from 'react';
import {
  SlidersHorizontal,
  ShieldAlert,
  CheckCircle2,
  RefreshCw,
  Sparkles,
  Lock,
} from 'lucide-react';

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

const DISTRICT_FRAME: Record<string, { N: number; baseYieldKg: number; cv: number }> = {
  Nagaon: { N: 28450, baseYieldKg: 1845, cv: 0.34 },
  Kamrup: { N: 19620, baseYieldKg: 1475, cv: 0.36 },
  'Dima Hasao': { N: 3480, baseYieldKg: 692, cv: 0.38 },
  Cachar: { N: 21340, baseYieldKg: 1692, cv: 0.35 },
  Barpeta: { N: 24890, baseYieldKg: 1681, cv: 0.35 },
};

export const Simulator: React.FC = () => {
  const [district, setDistrict] = useState('Nagaon');
  const [stratum, setStratum] = useState('Medium (0.2–1.0 ha) · Semi-Intensive');
  const [sampleSize, setSampleSize] = useState(420);
  const [partialHarvestsPerYr, setPartialHarvestsPerYr] = useState(5);
  const [diaryVerified, setDiaryVerified] = useState(true);
  const [recallBiasPct, setRecallBiasPct] = useState(0);
  const [doubleCountPct, setDoubleCountPct] = useState(0);

  const frameInfo = DISTRICT_FRAME[district] ?? DISTRICT_FRAME.Nagaon;

  const stats = useMemo(() => {
    const N = frameInfo.N;
    const n = Math.min(sampleSize, N);
    const stratumFactor = stratum.includes('Intensive')
      ? 1.18
      : stratum.includes('Extensive')
        ? 0.72
        : 1.0;

    // True unbiased mean yield per pond (kg)
    const trueMeanKg = frameInfo.baseYieldKg * stratumFactor;
    // Apply recall under-reporting (-) and double-counting (+) bias
    const biasMultiplier = 1 - recallBiasPct / 100 + doubleCountPct / 100;
    const observedMeanKg = trueMeanKg * biasMultiplier;

    const totalMt = (N * observedMeanKg) / 1000;
    const trueTotalMt = (N * trueMeanKg) / 1000;

    // Finite population correction & variance reduction from digital diary + sample weighing
    const fpc = Math.sqrt((N - n) / Math.max(N - 1, 1));
    const diaryPrecisionBoost = diaryVerified ? 0.82 : 1.35;
    const harvestVarianceFactor = 1 + (partialHarvestsPerYr - 3) * (diaryVerified ? 0.02 : 0.09);

    const sdKg = trueMeanKg * frameInfo.cv * diaryPrecisionBoost * harvestVarianceFactor;
    const seMeanKg = (sdKg / Math.sqrt(n)) * fpc;
    const seTotalMt = (N * seMeanKg) / 1000;

    const ci95LowerMt = Math.max(0, totalMt - 1.96 * seTotalMt);
    const ci95UpperMt = totalMt + 1.96 * seTotalMt;
    const rsePct = totalMt > 0 ? (seTotalMt / totalMt) * 100 : 0;

    return {
      N,
      n,
      totalMt,
      trueTotalMt,
      seTotalMt,
      ci95LowerMt,
      ci95UpperMt,
      rsePct,
    };
  }, [frameInfo, stratum, sampleSize, partialHarvestsPerYr, diaryVerified, recallBiasPct, doubleCountPct]);

  const isPrecisionAcceptable = stats.rsePct <= 3.5 && recallBiasPct === 0 && doubleCountPct === 0;
  const auditStatus =
    recallBiasPct > 0
      ? `BIAS ALERT — ${recallBiasPct}% Recall Under-Reporting (Missed Partial Harvests / Self-Consumption)`
      : doubleCountPct > 0
        ? `BIAS ALERT — ${doubleCountPct}% Double-Counting Inflation Detected`
        : !diaryVerified
          ? 'WIDE UNCERTAINTY — Recall-Only Mode (No Sample Weighing)'
          : 'VERIFIED — Defensible Stratified Estimate (95% CI Locked)';

  const auditHash = useMemo(
    () =>
      pseudoSha256(
        `${district}|${stratum}|${sampleSize}|${partialHarvestsPerYr}|${diaryVerified}|${recallBiasPct}|${doubleCountPct}`,
      ),
    [district, stratum, sampleSize, partialHarvestsPerYr, diaryVerified, recallBiasPct, doubleCountPct],
  );

  const injectRecallBias = () => {
    setDiaryVerified(false);
    setRecallBiasPct(18);
    setDoubleCountPct(0);
  };

  const injectDoubleCounting = () => {
    setDiaryVerified(false);
    setRecallBiasPct(0);
    setDoubleCountPct(14);
  };

  const resetOptimal = () => {
    setSampleSize(420);
    setPartialHarvestsPerYr(5);
    setDiaryVerified(true);
    setRecallBiasPct(0);
    setDoubleCountPct(0);
  };

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-teal-100 px-3 py-1 text-xs font-semibold text-teal-900">
              <Sparkles className="h-3.5 w-3.5" />
              Interactive Statistical Sampling &amp; CI Sandbox
            </span>
            <h1 className="mt-2 text-2xl font-bold text-slate-900">
              Stratified Sampling &amp; Confidence Interval Simulator
            </h1>
            <p className="mt-1 text-sm text-slate-600">
              Model rotating sample sizes, partial-harvest frequency, and compare recall-only
              reporting against digital harvest diaries + sample weighing verification.
            </p>
          </div>
          <button
            type="button"
            onClick={resetOptimal}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            <span>Reset Optimal Design</span>
          </button>
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-12">
        {/* Controls */}
        <section className="lg:col-span-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-5">
          <h2 className="text-base font-bold text-slate-900">1. Configure Sampling Design</h2>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-xs font-semibold text-slate-700">
              Pilot / Frame District
              <select
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm font-normal text-slate-900"
              >
                <option value="Nagaon">Nagaon (High-Production · N=28,450)</option>
                <option value="Kamrup">Kamrup (Medium-Intensity · N=19,620)</option>
                <option value="Dima Hasao">Dima Hasao (Hill District · N=3,480)</option>
                <option value="Cachar">Cachar (Barak Valley · N=21,340)</option>
                <option value="Barpeta">Barpeta (Lower Assam · N=24,890)</option>
              </select>
            </label>

            <label className="block text-xs font-semibold text-slate-700">
              Resource Stratum (Size × Intensity)
              <select
                value={stratum}
                onChange={(e) => setStratum(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm font-normal text-slate-900"
              >
                <option value="Small (<0.2 ha) · Extensive">Small (&lt;0.2 ha) · Extensive</option>
                <option value="Medium (0.2–1.0 ha) · Semi-Intensive">
                  Medium (0.2–1.0 ha) · Semi-Intensive
                </option>
                <option value="Large (>1.0 ha) · Intensive">Large (&gt;1.0 ha) · Intensive</option>
              </select>
            </label>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-xs font-semibold text-slate-700">
              Sampled Ponds/Tanks (n = {sampleSize})
              <input
                type="range"
                min={60}
                max={800}
                step={20}
                value={sampleSize}
                onChange={(e) => setSampleSize(Number(e.target.value))}
                className="mt-2 w-full accent-teal-700"
              />
            </label>

            <label className="block text-xs font-semibold text-slate-700">
              Partial Harvests / Year ({partialHarvestsPerYr} events)
              <input
                type="range"
                min={1}
                max={12}
                step={1}
                value={partialHarvestsPerYr}
                onChange={(e) => setPartialHarvestsPerYr(Number(e.target.value))}
                className="mt-2 w-full accent-teal-700"
              />
            </label>
          </div>

          <div className="flex flex-wrap gap-4 pt-1">
            <label className="inline-flex items-center gap-2 text-xs font-medium text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={diaryVerified}
                onChange={(e) => {
                  setDiaryVerified(e.target.checked);
                  if (e.target.checked) {
                    setRecallBiasPct(0);
                    setDoubleCountPct(0);
                  }
                }}
                className="rounded border-slate-300 text-teal-700 focus:ring-teal-600"
              />
              Digital Harvest Diary + Sample Weighing Enabled
            </label>
          </div>

          {/* Fault Injection */}
          <div className="rounded-xl border border-amber-200 bg-amber-50/70 p-4 space-y-2.5">
            <p className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
              <ShieldAlert className="h-4 w-4 text-amber-600" />
              Fault Injection — Test Survey Failure Modes
            </p>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={injectRecallBias}
                className="rounded-lg bg-rose-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-rose-700"
              >
                Simulate Recall-Only Bias (-18%)
              </button>
              <button
                type="button"
                onClick={injectDoubleCounting}
                className="rounded-lg bg-amber-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-amber-700"
              >
                Simulate Double Counting (+14%)
              </button>
            </div>
          </div>
        </section>

        {/* Live Estimator Output */}
        <section className="lg:col-span-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-xs flex flex-col justify-between space-y-5">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              2. Stratified Estimator &amp; 95% Confidence Interval
            </h2>

            <div
              className={`mt-4 rounded-xl p-4 border ${
                isPrecisionAcceptable
                  ? 'border-teal-200 bg-teal-50'
                  : 'border-rose-200 bg-rose-50'
              }`}
            >
              <div className="flex items-start gap-2.5">
                {isPrecisionAcceptable ? (
                  <CheckCircle2 className="h-5 w-5 text-teal-700 shrink-0 mt-0.5" />
                ) : (
                  <ShieldAlert className="h-5 w-5 text-rose-700 shrink-0 mt-0.5" />
                )}
                <div>
                  <p
                    className={`text-xs font-bold ${
                      isPrecisionAcceptable ? 'text-teal-900' : 'text-rose-900'
                    }`}
                  >
                    {auditStatus}
                  </p>
                  <p className="mt-1 text-xs text-slate-700">
                    Estimated District Production:{' '}
                    <strong>{Math.round(stats.totalMt).toLocaleString()} MT</strong> · 95% CI:{' '}
                    <strong>
                      [{Math.round(stats.ci95LowerMt).toLocaleString()} –{' '}
                      {Math.round(stats.ci95UpperMt).toLocaleString()} MT]
                    </strong>{' '}
                    · RSE: <strong>{stats.rsePct.toFixed(2)}%</strong>
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2 items-center">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-2.5">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                  <SlidersHorizontal className="h-4 w-4 text-teal-700" />
                  <span>Confidence Interval Summary</span>
                </div>
                <div className="space-y-1 text-xs text-slate-600">
                  <div className="flex justify-between">
                    <span>Frame Size (N):</span>
                    <span className="font-semibold text-slate-900">
                      {stats.N.toLocaleString()} ponds
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sample Size (n):</span>
                    <span className="font-semibold text-slate-900">{stats.n} ponds</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Standard Error (SE):</span>
                    <span className="font-semibold text-slate-900">
                      ±{Math.round(stats.seTotalMt).toLocaleString()} MT
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>95% CI Half-Width:</span>
                    <span className="font-semibold text-teal-800">
                      ±{Math.round(1.96 * stats.seTotalMt).toLocaleString()} MT
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-2 text-xs">
                <p className="font-bold text-slate-900">Reproducible Methodology Snapshot</p>
                <div className="rounded-lg bg-slate-100 p-2.5 font-mono text-[11px] text-slate-700 break-all">
                  <span className="text-slate-500 block">Audit Hash:</span>
                  {auditHash}
                </div>
                <p className="text-slate-600 leading-relaxed">
                  Unbiased benchmark: <strong>{Math.round(stats.trueTotalMt).toLocaleString()} MT</strong>.
                  Digital harvest diaries + spot sample weighing eliminate recall drift and keep
                  district RSE% within DES &amp; ICAR-CIFRI precision targets.
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between rounded-xl bg-slate-900 px-4 py-3 text-xs text-slate-200">
            <span className="flex items-center gap-1.5">
              <Lock className="h-3.5 w-3.5 text-teal-400" />
              Estimation Only — Zero Compulsory Census Burden on Farmers
            </span>
            <span className="font-mono text-teal-300">Horvitz–Thompson v1.0</span>
          </div>
        </section>
      </div>
    </div>
  );
};
