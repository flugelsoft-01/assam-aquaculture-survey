import React, { useState } from 'react';
import {
  Check,
  Copy,
  Download,
  ExternalLink,
  FileCheck2,
  FileText,
  Github,
  Globe,
} from 'lucide-react';
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
      <section className="rounded-2xl border border-teal-200 bg-white p-6 shadow-xs">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <span className="inline-flex items-center rounded-full bg-teal-100 px-3 py-1 text-xs font-semibold text-teal-900">
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
              className="inline-flex items-center gap-2 rounded-xl bg-teal-700 px-3.5 py-2 text-xs sm:text-sm font-semibold text-white shadow-xs hover:bg-teal-800"
            >
              <Download className="h-4 w-4" />
              <span>Download Proposal PDF</span>
            </a>
            <a
              href="/docs/Flugelsoft_Labs_NESFIC-D-32_Proof_of_Work.pdf"
              download
              className="inline-flex items-center gap-2 rounded-xl border border-teal-700 bg-teal-50 px-3.5 py-2 text-xs sm:text-sm font-semibold text-teal-900 hover:bg-teal-100"
            >
              <FileCheck2 className="h-4 w-4" />
              <span>Download Proof of Work PDF</span>
            </a>
            <a
              href="/docs/Flugelsoft_Labs_NESFIC-D-32_Proposal_CopyPaste.txt"
              download
              className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-xs sm:text-sm font-semibold text-slate-700 hover:bg-slate-50 shadow-2xs"
            >
              <FileText className="h-4 w-4 text-teal-700" />
              <span>Copy/Paste TXT File</span>
            </a>
          </div>
        </div>

        <div className="mt-5 grid gap-3 border-t border-slate-100 pt-4 text-xs text-slate-600 sm:grid-cols-3">
          <div className="flex items-center gap-2">
            <Globe className="h-4 w-4 text-teal-700 shrink-0" />
            <span className="truncate">
              Live Web App:{' '}
              <a
                href={PROPOSAL_METADATA.productUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-teal-700 hover:underline"
              >
                {PROPOSAL_METADATA.productUrl}
              </a>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Github className="h-4 w-4 text-slate-800 shrink-0" />
            <span className="truncate">
              GitHub:{' '}
              <a
                href={PROPOSAL_METADATA.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-teal-700 hover:underline"
              >
                flugelsoft-01/nesfic-d32-pond-tank-survey
              </a>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <ExternalLink className="h-4 w-4 text-teal-700 shrink-0" />
            <span className="truncate">
              Problem Statement:{' '}
              <a
                href="https://startup.assam.gov.in/nesfic26/problem-statements/nesfic-d-32"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-teal-700 hover:underline"
              >
                startup.assam.gov.in/.../nesfic-d-32
              </a>
            </span>
          </div>
        </div>
      </section>

      {/* Budget Breakdown Table */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <h2 className="text-base font-bold text-slate-900">
            Grant Budget Allocation (₹40.00 Lakhs · 50% Technical Engineering &amp; Statistical Team)
          </h2>
          <span className="text-xs font-semibold text-teal-800 bg-teal-50 px-2.5 py-1 rounded-full">
            Total: ₹40.00 Lakhs (100%)
          </span>
        </div>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500">
                <th className="pb-2 font-semibold">Cost Head</th>
                <th className="pb-2 font-semibold">Scope &amp; Deliverables</th>
                <th className="pb-2 font-semibold text-right">Amount (₹ Lakhs)</th>
                <th className="pb-2 font-semibold text-right">Share</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {BUDGET_ALLOCATION.map((item) => (
                <tr key={item.head} className="hover:bg-slate-50">
                  <td className="py-2.5 font-semibold text-slate-900">{item.head}</td>
                  <td className="py-2.5 text-slate-600">{item.scope}</td>
                  <td className="py-2.5 text-right font-semibold text-slate-900">
                    ₹{item.amountLakhs.toFixed(2)} L
                  </td>
                  <td className="py-2.5 text-right font-semibold text-teal-700">
                    {item.sharePct.toFixed(0)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 12 Proposal Sections */}
      <div className="space-y-4">
        {PROPOSAL_SECTIONS.map((sec) => {
          const words = countWords(sec.content);
          const isCopied = copiedId === sec.id;
          return (
            <section
              key={sec.id}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs"
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between border-b border-slate-100 pb-3">
                <div>
                  <h3 className="text-base font-bold text-slate-900">{sec.title}</h3>
                  <p className="text-xs text-slate-500 mt-0.5">{sec.promptHint}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${
                      words <= 500
                        ? 'bg-teal-50 text-teal-800 ring-1 ring-teal-600/20'
                        : 'bg-rose-50 text-rose-800 ring-1 ring-rose-600/20'
                    }`}
                  >
                    {words} / 500 words
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCopy(sec.id, sec.content)}
                    className="inline-flex items-center gap-1 rounded-lg border border-slate-300 bg-white px-2.5 py-1 text-xs font-medium text-slate-700 hover:bg-slate-50"
                  >
                    {isCopied ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-teal-600" />
                        <span className="text-teal-700">Copied</span>
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
              <div className="mt-4 whitespace-pre-line text-sm leading-relaxed text-slate-700">
                {sec.content}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
};
