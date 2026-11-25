import React, { useState } from 'react';
import { Check, Copy, Download, ExternalLink, FileCheck2, FileText, Globe } from 'lucide-react';
import { BUDGET_ALLOCATION, PROPOSAL_METADATA, PROPOSAL_SECTIONS } from '../data/proposalContent';

function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

export const Proposal: React.FC = () => {
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const handleCopy = async (id: number, content: string) => {
    await navigator.clipboard.writeText(content);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1800);
  };

  return (
    <div className="space-y-6">
      {/* Header & PDF Downloads */}
      <section className="rounded-2xl border border-cyan-200 bg-white p-6 shadow-2xs">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <span className="inline-flex items-center rounded-full bg-cyan-100 px-3 py-1 text-xs font-semibold text-cyan-900">
              {PROPOSAL_METADATA.challengeId} · {PROPOSAL_METADATA.sponsor}
            </span>
            <h1 className="mt-2 text-2xl font-bold text-slate-900">
              {PROPOSAL_METADATA.challengeTitle}
            </h1>
            <p className="mt-1 text-sm text-slate-600">
              Lead Entity: <strong>{PROPOSAL_METADATA.organization}</strong> · Lead Applicant:{' '}
              <strong>{PROPOSAL_METADATA.leadApplicant}</strong>
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5">
            <a
              href="/docs/Flugelsoft_Labs_NESFIC-D-32_Proposal.pdf"
              download
              className="inline-flex items-center gap-2 rounded-xl bg-cyan-700 px-3.5 py-2 text-xs sm:text-sm font-semibold text-white shadow-xs hover:bg-cyan-800"
            >
              <Download className="h-4 w-4" />
              <span>Download Proposal PDF</span>
            </a>
            <a
              href="/docs/Flugelsoft_Labs_NESFIC-D-32_Proof_of_Work.pdf"
              download
              className="inline-flex items-center gap-2 rounded-xl border border-cyan-700 bg-cyan-50 px-3.5 py-2 text-xs sm:text-sm font-semibold text-cyan-900 hover:bg-cyan-100"
            >
              <FileCheck2 className="h-4 w-4" />
              <span>Download Proof of Work PDF</span>
            </a>
            <a
              href="/docs/Flugelsoft_Labs_NESFIC-D-32_Proposal_CopyPaste.txt"
              download
              className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-xs sm:text-sm font-semibold text-slate-700 hover:bg-slate-50 shadow-2xs"
            >
              <FileText className="h-4 w-4 text-cyan-700" />
              <span>Copy/Paste TXT File</span>
            </a>
          </div>
        </div>

        <div className="mt-5 grid gap-3 border-t border-slate-100 pt-4 text-xs text-slate-600 sm:grid-cols-2">
          <div className="flex items-center gap-2">
            <Globe className="h-4 w-4 text-cyan-700 shrink-0" />
            <span className="truncate">
              Challenge URL:{' '}
              <a
                href={PROPOSAL_METADATA.problemStatementUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-cyan-700 hover:underline inline-flex items-center gap-1"
              >
                <span>{PROPOSAL_METADATA.problemStatementUrl}</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <FileCheck2 className="h-4 w-4 text-teal-700 shrink-0" />
            <span>All 12 NESFIC sections verified &le; 500 words for direct portal submission</span>
          </div>
        </div>
      </section>

      {/* Budget Breakdown */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-2xs">
        <h2 className="text-base font-bold text-slate-900">
          Indicative Grant Utilization Plan (₹40.00 Lakhs · 6 Months)
        </h2>
        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200 text-left text-xs sm:text-sm">
            <thead className="bg-slate-50 text-xs font-semibold uppercase text-slate-600">
              <tr>
                <th className="px-4 py-2.5">Budget Head</th>
                <th className="px-4 py-2.5">Scope</th>
                <th className="px-4 py-2.5 text-right">Amount (₹ Lakhs)</th>
                <th className="px-4 py-2.5 text-right">Share</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {BUDGET_ALLOCATION.map((b) => (
                <tr key={b.head}>
                  <td className="px-4 py-2.5 font-semibold text-slate-900">{b.head}</td>
                  <td className="px-4 py-2.5 text-slate-600">{b.scope}</td>
                  <td className="px-4 py-2.5 text-right font-mono font-semibold text-slate-900">
                    ₹{b.amountLakhs.toFixed(2)}L
                  </td>
                  <td className="px-4 py-2.5 text-right font-mono text-cyan-800">{b.sharePct}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 12 Proposal Sections */}
      <section className="space-y-4">
        {PROPOSAL_SECTIONS.map((sec) => {
          const words = countWords(sec.content);
          const withinLimit = words <= 500;
          return (
            <article
              key={sec.id}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-2xs space-y-3"
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between border-b border-slate-100 pb-3">
                <div>
                  <h2 className="text-base font-bold text-slate-900">{sec.title}</h2>
                  <p className="text-xs text-slate-500 mt-0.5">{sec.promptHint}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-mono font-semibold ${
                      withinLimit
                        ? 'bg-emerald-50 text-emerald-800 ring-1 ring-emerald-600/20'
                        : 'bg-rose-50 text-rose-800 ring-1 ring-rose-600/20'
                    }`}
                  >
                    {words} / 500 words
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCopy(sec.id, sec.content)}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-2.5 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    {copiedId === sec.id ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-emerald-600" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
              <div className="whitespace-pre-line text-sm leading-relaxed text-slate-700">
                {sec.content}
              </div>
            </article>
          );
        })}
      </section>
    </div>
  );
};
