import React from 'react';
import { Award, Download, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { DISTRICT_ESTIMATES } from '../data/mockTelemetry';

export const Analytics: React.FC = () => {
  const totalEstimatedMt = DISTRICT_ESTIMATES.reduce(
    (sum, d) => sum + d.estimatedProductionMt,
    0,
  );
  const totalSampled = DISTRICT_ESTIMATES.reduce((sum, d) => sum + d.sampledPonds, 0);
  const totalFrame = DISTRICT_ESTIMATES.reduce((sum, d) => sum + d.framePonds, 0);

  const handleExportCsv = () => {
    const header =
      'District,ZoneType,FramePonds,SampledPonds,EstimatedProductionMT,CI_95_Lower_MT,CI_95_Upper_MT,RSE_Pct,DiaryCompletionPct,WeighingConcordancePct\n';
    const rows = DISTRICT_ESTIMATES.map(
      (d) =>
        `"${d.district}","${d.zoneType}",${d.framePonds},${d.sampledPonds},${d.estimatedProductionMt},${d.ciLowerMt},${d.ciUpperMt},${d.rsePct},${d.diaryCompletionPct},${d.weighingConcordancePct}`,
    ).join('\n');
    const blob = new Blob([header + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Flugelsoft_MatsyaSample_Assam_Estimates_Audit.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-2xs">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-cyan-100 px-3 py-1 text-xs font-semibold text-cyan-900">
              <ShieldCheck className="h-3.5 w-3.5" />
              DES &amp; ICAR-CIFRI Statistical Audit
            </span>
            <h1 className="mt-2 text-2xl font-bold text-slate-900">
              District &amp; State Aquaculture Production Estimates
            </h1>
            <p className="mt-1 text-sm text-slate-600">
              Audit-ready Horvitz–Thompson estimates with explicit 95% confidence intervals,
              Relative Standard Error (RSE%), diary completion, and sample-weighing concordance.
            </p>
          </div>
          <button
            type="button"
            onClick={handleExportCsv}
            className="inline-flex items-center gap-2 rounded-xl bg-cyan-700 px-4 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-cyan-800 shrink-0"
          >
            <Download className="h-4 w-4" />
            <span>Export Audit CSV</span>
          </button>
        </div>
      </section>

      {/* Summary Cards */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-2xs">
          <p className="text-xs font-medium text-slate-500">5-District Benchmark Total</p>
          <p className="mt-1 text-2xl font-bold text-slate-900">
            {totalEstimatedMt.toLocaleString('en-IN')} MT
          </p>
          <p className="mt-1 text-xs text-slate-500">Pond &amp; tank aquaculture output</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-2xs">
          <p className="text-xs font-medium text-slate-500">Sampling Fraction</p>
          <p className="mt-1 text-2xl font-bold text-cyan-800">
            {totalSampled.toLocaleString('en-IN')} / {totalFrame.toLocaleString('en-IN')}
          </p>
          <p className="mt-1 text-xs text-slate-500">
            {((totalSampled / totalFrame) * 100).toFixed(2)}% rotating frame coverage
          </p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-2xs">
          <p className="text-xs font-medium text-slate-500">3-District Pilot Scope</p>
          <p className="mt-1 text-2xl font-bold text-emerald-700">850 Units</p>
          <p className="mt-1 text-xs text-slate-500">Nagaon (420), Kamrup (310), Dima Hasao (120)</p>
        </div>
      </section>

      {/* Table */}
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xs">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200 text-left text-xs sm:text-sm">
            <thead className="bg-slate-50 text-xs font-semibold uppercase tracking-wider text-slate-600">
              <tr>
                <th className="px-4 py-3.5">District &amp; Zone</th>
                <th className="px-4 py-3.5 text-right">Frame (N)</th>
                <th className="px-4 py-3.5 text-right">Sample (n)</th>
                <th className="px-4 py-3.5 text-right">Est. Production (MT)</th>
                <th className="px-4 py-3.5 text-right">95% Confidence Interval</th>
                <th className="px-4 py-3.5 text-right">RSE %</th>
                <th className="px-4 py-3.5 text-right">Diary %</th>
                <th className="px-4 py-3.5 text-right">Weighing Concordance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {DISTRICT_ESTIMATES.map((row) => (
                <tr key={row.district} className="hover:bg-cyan-50/40 transition-colors">
                  <td className="px-4 py-3.5">
                    <p className="font-bold text-slate-900">{row.district}</p>
                    <p className="text-xs text-slate-500">{row.zoneType}</p>
                  </td>
                  <td className="px-4 py-3.5 text-right font-mono text-slate-700">
                    {row.framePonds.toLocaleString('en-IN')}
                  </td>
                  <td className="px-4 py-3.5 text-right font-mono text-cyan-800 font-semibold">
                    {row.sampledPonds}
                  </td>
                  <td className="px-4 py-3.5 text-right font-bold text-slate-900">
                    {row.estimatedProductionMt.toLocaleString('en-IN')}
                  </td>
                  <td className="px-4 py-3.5 text-right font-mono text-xs text-slate-600">
                    [{row.ciLowerMt.toLocaleString('en-IN')} – {row.ciUpperMt.toLocaleString('en-IN')}]
                  </td>
                  <td className="px-4 py-3.5 text-right">
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-800">
                      <CheckCircle2 className="h-3 w-3" />
                      {row.rsePct.toFixed(1)}%
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-right font-mono text-slate-700">
                    {row.diaryCompletionPct.toFixed(1)}%
                  </td>
                  <td className="px-4 py-3.5 text-right font-mono text-slate-700">
                    {row.weighingConcordancePct.toFixed(1)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="border-t border-slate-100 bg-slate-50 px-4 py-3 text-xs text-slate-600 flex items-center gap-2">
          <Award className="h-4 w-4 text-cyan-700 shrink-0" />
          <span>
            All district estimates satisfy the pilot precision target (RSE &le; 2.5% in major
            aquaculture districts; &le; 3.5% in hill districts).
          </span>
        </div>
      </section>
    </div>
  );
};
