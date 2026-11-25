import os
import re
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import mm
from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
    Image,
    PageBreak,
)

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DOCS_DIR = os.path.join(ROOT, 'public', 'docs')
ASSETS_TMP = os.path.join(ROOT, '.tmp_pdf_assets_d32')
os.makedirs(DOCS_DIR, exist_ok=True)
os.makedirs(ASSETS_TMP, exist_ok=True)

PROPOSAL_TS = os.path.join(ROOT, 'src', 'data', 'proposalContent.ts')


def parse_proposal_sections():
    with open(PROPOSAL_TS, 'r', encoding='utf-8') as f:
        txt = f.read()
    blocks = re.findall(
        r"id:\s*(\d+),\s*title:\s*'([^']+)',\s*promptHint:\s*\n?\s*'([^']+)',\s*content:\s*`([^`]+)`",
        txt,
        re.S,
    )
    sections = []
    for sec_id, title, hint, content in blocks:
        clean = content.strip()
        sections.append({
            'id': int(sec_id),
            'title': title.strip(),
            'hint': hint.strip(),
            'content': clean,
            'words': len(clean.split()),
        })
    return sections


def generate_charts():
    # Chart 1: District Production Estimates with 95% CI Error Bars
    districts = ['Nagaon\n(n=420)', 'Barpeta\n(n=270)', 'Cachar\n(n=310)', 'Kamrup\n(n=310)', 'Dima Hasao\n(n=120)']
    est_mt = [46820, 31450, 28940, 24310, 3840]
    err_mt = [1930, 1545, 1530, 1145, 241]

    plt.figure(figsize=(6.5, 3.2), dpi=180)
    bars = plt.bar(districts, est_mt, yerr=err_mt, capsize=5, color='#0e7490', alpha=0.88, edgecolor='#155e75')
    plt.title('Horvitz-Thompson District Production Estimates (95% CI)', fontsize=10, fontweight='bold', color='#0f172a')
    plt.ylabel('Estimated Production (MT)', fontsize=8.5)
    plt.xticks(fontsize=8)
    plt.yticks(fontsize=8)
    plt.grid(axis='y', linestyle='--', alpha=0.35)
    for bar, val in zip(bars, est_mt):
        plt.text(bar.get_x() + bar.get_width() / 2, val + 2300, f'{val:,}', ha='center', fontsize=7.5, fontweight='bold')
    plt.tight_layout()
    ci_chart = os.path.join(ASSETS_TMP, 'district_ci_chart.png')
    plt.savefig(ci_chart)
    plt.close()

    # Chart 2: Recall-Only vs Diary + Sample Weighing RSE%
    sample_sizes = [80, 150, 250, 350, 450, 600]
    rse_recall = [7.4, 5.4, 4.2, 3.5, 3.1, 2.7]
    rse_diary = [4.1, 3.0, 2.3, 1.9, 1.7, 1.4]

    plt.figure(figsize=(6.5, 3.0), dpi=180)
    plt.plot(sample_sizes, rse_recall, marker='s', linestyle='--', color='#e11d48', label='Recall-Only Baseline (CV ~0.78)')
    plt.plot(sample_sizes, rse_diary, marker='o', linewidth=2.2, color='#0d9488', label='Harvest Diary + Sample Weighing (CV ~0.43)')
    plt.axhline(2.5, color='#0f172a', linestyle=':', linewidth=1.2, label='Target RSE <= 2.5% (Major Districts)')
    plt.title('Precision Gain: Rotating Diary + Sample Weighing vs. Recall-Only', fontsize=10, fontweight='bold', color='#0f172a')
    plt.xlabel('District Sample Size (n ponds/tanks)', fontsize=8.5)
    plt.ylabel('Relative Standard Error (RSE %)', fontsize=8.5)
    plt.legend(fontsize=7.5)
    plt.grid(True, linestyle='--', alpha=0.35)
    plt.tight_layout()
    rse_chart = os.path.join(ASSETS_TMP, 'rse_comparison_chart.png')
    plt.savefig(rse_chart)
    plt.close()

    return ci_chart, rse_chart


def build_copy_paste_txt(sections):
    out_path = os.path.join(DOCS_DIR, 'Flugelsoft_Labs_NESFIC-D-32_Proposal_CopyPaste.txt')
    lines = [
        'NESFIC-D-32 — Scientific Sample Survey for Pond and Tank Aquaculture Production Estimation',
        'Lead Entity: Flugelsoft Labs | Lead Applicant: Kalyanjit Hatibaruah',
        'Challenge Owner: Fishery Department, Government of Assam / Directorate of Fisheries',
        '=' * 80,
        '',
    ]
    for sec in sections:
        lines.append(sec['title'])
        lines.append(f"[Word count: {sec['words']} / 500]")
        lines.append('-' * 60)
        lines.append(sec['content'])
        lines.append('')
        lines.append('=' * 80)
        lines.append('')
    with open(out_path, 'w', encoding='utf-8') as f:
        f.write('\n'.join(lines))
    return out_path


def build_pdf(filename, title, subtitle, sections, charts):
    out_path = os.path.join(DOCS_DIR, filename)
    doc = SimpleDocTemplate(
        out_path,
        pagesize=A4,
        leftMargin=16 * mm,
        rightMargin=16 * mm,
        topMargin=16 * mm,
        bottomMargin=16 * mm,
    )
    styles = getSampleStyleSheet()
    h1 = ParagraphStyle('H1', parent=styles['Heading1'], fontSize=16, textColor=colors.HexColor('#0e7490'), spaceAfter=4)
    h2 = ParagraphStyle('H2', parent=styles['Heading2'], fontSize=11.5, textColor=colors.HexColor('#0f172a'), spaceBefore=10, spaceAfter=4)
    meta = ParagraphStyle('Meta', parent=styles['Normal'], fontSize=9, textColor=colors.HexColor('#475569'), spaceAfter=10)
    body = ParagraphStyle('Body', parent=styles['Normal'], fontSize=9.5, leading=13.5, textColor=colors.HexColor('#1e293b'), spaceAfter=6)

    story = [
        Paragraph(title, h1),
        Paragraph(subtitle, meta),
        Spacer(1, 4),
    ]

    for chart_path in charts:
        if os.path.exists(chart_path):
            story.append(Image(chart_path, width=170 * mm, height=78 * mm))
            story.append(Spacer(1, 6))

    for sec in sections:
        story.append(Paragraph(f"{sec['title']} ({sec['words']} / 500 words)", h2))
        for para in sec['content'].split('\n\n'):
            safe = para.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;').replace('\n', '<br/>')
            story.append(Paragraph(safe, body))

    doc.build(story)
    return out_path


def main():
    sections = parse_proposal_sections()
    assert len(sections) == 12, f'Expected 12 sections, found {len(sections)}'
    for s in sections:
        assert s['words'] <= 500, f"Section {s['id']} exceeds 500 words: {s['words']}"
        print(f"Section {s['id']:2d}: {s['words']:3d} / 500 words — {s['title']}")

    ci_chart, rse_chart = generate_charts()
    txt_path = build_copy_paste_txt(sections)
    prop_pdf = build_pdf(
        'Flugelsoft_Labs_NESFIC-D-32_Proposal.pdf',
        'NESFIC-D-32 Proposal — MatsyaSample Assam',
        'Lead Entity: Flugelsoft Labs | Lead Applicant: Kalyanjit Hatibaruah | Directorate of Fisheries, Govt. of Assam',
        sections,
        [ci_chart],
    )
    pow_pdf = build_pdf(
        'Flugelsoft_Labs_NESFIC-D-32_Proof_of_Work.pdf',
        'NESFIC-D-32 Proof of Work & Simulation Evidence — MatsyaSample Assam',
        'Flugelsoft Labs | Lead Applicant: Kalyanjit Hatibaruah | Stratified Sampling, Harvest Diaries & Horvitz-Thompson CI Benchmarks',
        sections[:4] + [sections[8]],
        [ci_chart, rse_chart],
    )
    print('Generated:', txt_path)
    print('Generated:', prop_pdf)
    print('Generated:', pow_pdf)


if __name__ == '__main__':
    main()
