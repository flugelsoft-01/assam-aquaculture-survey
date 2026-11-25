import React from 'react';
import { BarChart3, Download, ShieldCheck, AlertCircle } from 'lucide-react';
import { DISTRICT_ESTIMATES, SAMPLED_WATER_BODIES } from '../data/mockTelemetry';

export const Analytics: React.FC = () => {
  const handleExportCsv = () => {
    const header =
      'District,PilotRole,TotalFrameUnits,SampledUnits,EstimatedProductionMT,CI95LowerMT,CI95UpperMT,RSEPct,DiaryCompliancePct\n';
    const rows = DISTRICT_ESTIMATES.map(
      (d) =>
        `"${d.district}","${d.pilotRole}",${d.totalFrameUnits},${d.sampledUnits},${d.estimatedProductionMt},${d.ci95LowerMt},${d.ci95UpperMt},${d.rsePct},${d.diaryCompliancePct}`,
    ).join('\n');
    const blob = new Blob([header + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Flugelsoft_MatsyaSample_NESFIC_D32_Estimates.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const totalFrame = DISTRICT_ESTIMATES.reduce((a, b) => a + b.totalFrameUnits, 0);
  const totalSampled = DISTRICT_ESTIMATES.reduce((a, b) => a + b.sampledUnits, 0);
  const totalEstimatedMt = DISTRICT_ESTIMATES.reduce((a, b) => a + b.estimatedProductionMt, 0);

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-teal-100 px-3 py-1 text-xs font-semibold text-teal-900">
              <ShieldCheck className="h-3.5 w-3.5" />
              Reproducible &amp; Auditable Production Estimates
            </span>
            <h1 className="mt-2 text-2xl font-bold text-slate-900">
              District &amp; State Aquaculture Estimates (95% CI)
            </h1>
            <p className="mt-1 text-sm text-slate-600">
              Explicit measurement of statistical uncertainty across Assam&apos;s contrasting pilot
              districts and statewide rotating frame—aligned with Directorate of Fisheries, DES, and
              ICAR-CIFRI review standards.
            </p>
          </div>
          <button
            type="button"
            onClick={handleExportCsv}
            className="inline-flex items-center gap-2 rounded-xl bg-teal-700 px-4 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-teal-800"
          >
            <Download className="h-4 w-4" />
            <span>Export Audit CSV</span>
          </button>
        </div>
      </section>

      {/* Summary KPI Row */}
      <section className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-2xs">
          <p className="text-xs font-medium text-slate-500">5-District Frame Coverage</p>
          <p className="mt-1 text-2xl font-bold text-slate-900">
            {totalFrame.toLocaleString()} Ponds/Tanks
          </p>
          <p className="mt-1 text-xs text-slate-500">
            Updated fishery-resource frame across 5 districts
          </p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-2xs">
          <p className="text-xs font-medium text-slate-500">Active Rotating Sample (n)</p>
          <p className="mt-1 text-2xl font-bold text-teal-700">
            {totalSampled.toLocaleString()} Units
          </p>
          <p className="mt-1 text-xs text-slate-500">
            ~1.59% rotating sample fraction (no full census required)
          </p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-2xs">
          <p className="text-xs font-medium text-slate-500">5-District Estimated Production</p>
          <p className="mt-1 text-2xl font-bold text-slate-900">
            {totalEstimatedMt.toLocaleString()} MT
          </p>
          <p className="mt-1 text-xs text-teal-700 font-medium">
            Mean District RSE: 2.29% (95% CI locked)
          </p>
        </div>
      </section>

      {/* District Table */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
        <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <BarChart3 className="h-4 w-4 text-teal-700" />
          District-Wise Stratified Estimates &amp; Confidence Intervals
        </h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500">
                <th className="pb-2 font-semibold">District</th>
                <th className="pb-2 font-semibold">Pilot / Frame Role</th>
                <th className="pb-2 font-semibold">Frame (N)</th>
                <th className="pb-2 font-semibold">Sample (n)</th>
                <th className="pb-2 font-semibold">Estimate (MT)</th>
                <th className="pb-2 font-semibold">95% Confidence Interval</th>
                <th className="pb-2 font-semibold">RSE (%)</th>
                <th className="pb-2 font-semibold">Diary &amp; Weighing %</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {DISTRICT_ESTIMATES.map((d) => (
                <tr key={d.district} className="hover:bg-slate-50">
                  <td className="py-3 font-bold text-slate-900">{d.district}</td>
                  <td className="py-3 text-slate-600">{d.pilotRole}</td>
                  <td className="py-3">{d.totalFrameUnits.toLocaleString()}</td>
                  <td className="py-3 font-medium">{d.sampledUnits}</td>
                  <td className="py-3 font-bold text-slate-900">
                    {d.estimatedProductionMt.toLocaleString()}
                  </td>
                  <td className="py-3 font-mono text-teal-800">
                    [{d.ci95LowerMt.toLocaleString()} – {d.ci95UpperMt.toLocaleString()}]
                  </td>
                  <td className="py-3">
                    <span className="inline-flex items-center rounded-full bg-teal-50 px-2 py-0.5 font-semibold text-teal-800">
                      {d.rsePct.toFixed(2)}%
                    </span>
                  </td>
                  <td className="py-3">{d.diaryCompliancePct}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Flagged Units / Quality Gates */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
        <h2 className="text-base font-bold text-slate-900">
          Automated Quality Gates &amp; Recall-Bias Alerts
        </h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {SAMPLED_WATER_BODIES.filter((u) => u.status !== 'Verified').map((u) => (
            <div
              key={u.sampleUnitId}
              className="rounded-xl border border-amber-200 bg-amber-50/50 p-4 flex items-start gap-3"
            >
              <AlertCircle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-slate-900">
                    {u.sampleUnitId}
                  </span>
                  <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[11px] font-semibold text-amber-900">
                    {u.status}
                  </span>
                </div>
                <p className="mt-1 text-xs font-semibold text-slate-800">{u.pondName}</p>
                <p className="mt-1 text-xs text-slate-600">
                  District: {u.district} · Stratum: {u.sizeStratum} · Diary:{' '}
                  {u.estimatedAnnualYieldKg.toLocaleString()} kg vs Verified:{' '}
                  {u.verifiedWeighingKg.toLocaleString()} kg
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
