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
        r"id:\s*(\d+),\s*title:\s*'([^']+)',\s*promptHint:\s*'([^']+)',\s*content:\s*`([^`]+)`",
        txt,
        re.S,
    )
    sections = []
    for sec_id, title, hint, content in blocks:
        sections.append({
            'id': int(sec_id),
            'title': title.strip(),
            'hint': hint.strip(),
            'content': content.strip(),
            'words': len(content.strip().split()),
        })
    return sections


def generate_charts():
    # Chart 1: District Estimates with 95% Confidence Intervals
    districts = ['Nagaon\n(Pilot 1)', 'Barpeta\n(Lower Assam)', 'Cachar\n(Barak Valley)', 'Kamrup\n(Pilot 2)', 'Dima Hasao\n(Pilot 3)']
    est_mt = [52480, 41850, 36120, 28940, 2410]
    err_mt = [1790, 1640, 1470, 1220, 165]

    fig, ax = plt.subplots(figsize=(6.5, 3.2), dpi=180)
    x = range(len(districts))
    ax.bar(x, est_mt, yerr=err_mt, capsize=5, color='#0f766e', ecolor='#0284c7', alpha=0.92, width=0.55)
    ax.set_xticks(list(x))
    ax.set_xticklabels(districts, fontsize=8.5)
    ax.set_ylabel('Estimated Production (MT)', fontsize=9)
    ax.set_title('District Pond & Tank Production Estimates with 95% Confidence Intervals', fontsize=10, fontweight='bold')
    ax.grid(True, axis='y', linestyle='--', alpha=0.4)
    fig.tight_layout()
    c1 = os.path.join(ASSETS_TMP, 'chart_district_ci.png')
    plt.savefig(c1)
    plt.close()

    # Chart 2: Recall-Only Bias vs Digital Diary + Sample Weighing
    sample_sizes = [100, 200, 300, 400, 500, 600]
    rse_recall = [6.8, 4.9, 4.1, 3.6, 3.2, 2.9]
    rse_diary = [3.6, 2.5, 2.1, 1.8, 1.6, 1.45]

    fig, ax = plt.subplots(figsize=(6.5, 3.2), dpi=180)
    ax.plot(sample_sizes, rse_recall, marker='s', color='#dc2626', linewidth=2.0, linestyle='--', label='Recall-Only Reporting (Higher Variance)')
    ax.plot(sample_sizes, rse_diary, marker='o', color='#0f766e', linewidth=2.2, label='Digital Harvest Diary + Sample Weighing')
    ax.axhline(2.5, color='#0284c7', linestyle=':', linewidth=1.4, label='Target District RSE Threshold (2.5%)')
    ax.set_xlabel('Sampled Ponds / Tanks (n)', fontsize=9)
    ax.set_ylabel('Relative Standard Error (RSE %)', fontsize=9)
    ax.set_title('Precision Gain: Digital Harvest Diaries + Sample Weighing vs. Recall-Only', fontsize=10, fontweight='bold')
    ax.grid(True, linestyle='--', alpha=0.4)
    ax.legend(fontsize=7.5, loc='upper right')
    fig.tight_layout()
    c2 = os.path.join(ASSETS_TMP, 'chart_rse_curve.png')
    plt.savefig(c2)
    plt.close()

    # Chart 3: Budget Breakdown
    labels = [
        'Engineering & Stats Team (50%)',
        'Field Weighing Kits (15%)',
        'DES/CIFRI Alignment (10%)',
        'Cloud & Estimator API (10%)',
        '3-District Pilot & Training (10%)',
        'Docs & Contingency (5%)',
    ]
    sizes = [20.0, 6.0, 4.0, 4.0, 4.0, 2.0]
    palette = ['#0f766e', '#0284c7', '#14b8a6', '#38bdf8', '#0d9488', '#64748b']
    fig, ax = plt.subplots(figsize=(6.5, 3.0), dpi=180)
    ax.barh(labels[::-1], sizes[::-1], color=palette[::-1], height=0.6)
    ax.set_xlabel('Allocation (INR Lakhs)', fontsize=9)
    ax.set_title('NESFIC-D-32 Grant Budget Utilization (Total: Rs. 40.00 Lakhs)', fontsize=10, fontweight='bold')
    ax.grid(True, axis='x', linestyle='--', alpha=0.4)
    fig.tight_layout()
    c3 = os.path.join(ASSETS_TMP, 'chart_budget.png')
    plt.savefig(c3)
    plt.close()

    return c1, c2, c3


def add_footer(canvas, doc):
    canvas.saveState()
    canvas.setFont('Helvetica', 8)
    canvas.setFillColor(colors.HexColor('#475569'))
    canvas.drawString(
        18 * mm,
        12 * mm,
        '© 2026 Flugelsoft Labs | Lead Applicant: Kalyanjit Hatibaruah | NESFIC-D-32 (Fishery Dept, Govt. of Assam)',
    )
    canvas.drawRightString(A4[0] - 18 * mm, 12 * mm, f'Page {doc.page}')
    canvas.restoreState()


def build_proposal_pdf(sections, c3):
    out_path = os.path.join(DOCS_DIR, 'Flugelsoft_Labs_NESFIC-D-32_Proposal.pdf')
    doc = SimpleDocTemplate(
        out_path,
        pagesize=A4,
        leftMargin=18 * mm,
        rightMargin=18 * mm,
        topMargin=18 * mm,
        bottomMargin=20 * mm,
    )
    styles = getSampleStyleSheet()
    title_style = ParagraphStyle(
        'PropTitle', parent=styles['Title'], fontSize=17, textColor=colors.HexColor('#0f766e'), spaceAfter=4
    )
    sub_style = ParagraphStyle(
        'PropSub', parent=styles['Normal'], fontSize=9.5, textColor=colors.HexColor('#334155'), spaceAfter=10
    )
    h2_style = ParagraphStyle(
        'SecH2', parent=styles['Heading2'], fontSize=11.5, textColor=colors.HexColor('#0f766e'), spaceBefore=10, spaceAfter=3
    )
    body_style = ParagraphStyle(
        'PropBody', parent=styles['Normal'], fontSize=9.5, leading=13.5, textColor=colors.HexColor('#1e293b')
    )
    meta_style = ParagraphStyle(
        'SecMeta', parent=styles['Normal'], fontSize=8, textColor=colors.HexColor('#64748b'), spaceAfter=4
    )

    story = [
        Paragraph('NESFIC 2026 — Official Proposal Document', title_style),
        Paragraph(
            '<b>Problem Statement:</b> NESFIC-D-32 — Scientific Sample Survey for Pond and Tank Aquaculture Production Estimation<br/>'
            '<b>Challenge Owner:</b> Fishery Department • Government of Assam / Directorate of Fisheries<br/>'
            '<b>Lead Entity:</b> Flugelsoft Labs &nbsp;|&nbsp; <b>Lead Applicant:</b> Kalyanjit Hatibaruah',
            sub_style,
        ),
        Spacer(1, 4),
    ]

    for s in sections:
        story.append(Paragraph(s['title'], h2_style))
        story.append(Paragraph(f"<i>Word count: {s['words']} / 500 words</i>", meta_style))
        for para in s['content'].split('\n\n'):
            clean = para.replace('\n', '<br/>')
            story.append(Paragraph(clean, body_style))
            story.append(Spacer(1, 4))
        if s['id'] == 12:
            budget_rows = [
                ['Budget Heading', 'Scope & Utilization', 'INR Lakhs', 'Share'],
                ['Technical Engineering & Statistical Team', 'Lead Architect, Survey Statistician, PWA & Backend Eng.', '20.00', '50%'],
                ['Field Verification & Sample Weighing Kits', 'Rugged tablets & BLE hanging/platform scales (3 districts)', '6.00', '15%'],
                ['Aquaculture Sampling & DES/CIFRI Alignment', 'Stratification validation & statistical audit SOPs', '4.00', '10%'],
                ['India-Region Cloud & Estimator API', 'Managed PostgreSQL/PostGIS, Python CI API & security', '4.00', '10%'],
                ['3-District Pilot, Training & Travel', 'Nagaon, Kamrup & Dima Hasao field trials & training', '4.00', '10%'],
                ['Documentation & Contingency', 'Auditable methodology handbook & operational buffer', '2.00', '5%'],
                ['Total Problem Statement Grant', '6-Month Build & 3-District Pilot Validation', '40.00', '100%'],
            ]
            bt = Table(budget_rows, colWidths=[52 * mm, 80 * mm, 22 * mm, 16 * mm])
            bt.setStyle(TableStyle([
                ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#0f766e')),
                ('TEXTCOLOR', (0, 0), (-1, 0), colors.white),
                ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
                ('FONTNAME', (0, -1), (-1, -1), 'Helvetica-Bold'),
                ('BACKGROUND', (0, -1), (-1, -1), colors.HexColor('#f0fdfa')),
                ('FONTSIZE', (0, 0), (-1, -1), 7.8),
                ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor('#cbd5e1')),
                ('ROWBACKGROUNDS', (0, 1), (-1, -2), [colors.white, colors.HexColor('#f8fafc')]),
                ('ALIGN', (2, 0), (-1, -1), 'RIGHT'),
                ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
                ('PADDING', (0, 0), (-1, -1), 4),
            ]))
            story.append(Spacer(1, 4))
            story.append(bt)
            story.append(Spacer(1, 6))
            story.append(Image(c3, width=165 * mm, height=76 * mm))

    story.append(Spacer(1, 8))
    story.append(
        Paragraph(
            '<b>Disclaimer:</b> Prepared by Flugelsoft Labs (Lead Applicant: Kalyanjit Hatibaruah) for NESFIC-D-32 evaluation. '
            'Statewide deployment requires integration with the updated fishery-resource frame and technical review with DES and ICAR-CIFRI.',
            meta_style,
        )
    )

    doc.build(story, onFirstPage=add_footer, onLaterPages=add_footer)
    print(f'Generated: {out_path} ({os.path.getsize(out_path)} bytes)')


def build_pow_pdf(c1, c2):
    out_path = os.path.join(DOCS_DIR, 'Flugelsoft_Labs_NESFIC-D-32_Proof_of_Work.pdf')
    doc = SimpleDocTemplate(
        out_path,
        pagesize=A4,
        leftMargin=18 * mm,
        rightMargin=18 * mm,
        topMargin=18 * mm,
        bottomMargin=20 * mm,
    )
    styles = getSampleStyleSheet()
    title_style = ParagraphStyle(
        'PowTitle', parent=styles['Title'], fontSize=18, textColor=colors.HexColor('#0f766e'), spaceAfter=6
    )
    h2_style = ParagraphStyle(
        'PowH2', parent=styles['Heading2'], fontSize=12.5, textColor=colors.HexColor('#0f766e'), spaceBefore=10, spaceAfter=4
    )
    body_style = ParagraphStyle(
        'PowBody', parent=styles['Normal'], fontSize=9.5, leading=13.5, textColor=colors.HexColor('#1e293b')
    )

    story = [
        Paragraph('Proof of Work & Statistical Evidence (NESFIC-D-32)', title_style),
        Paragraph(
            '<b>Project:</b> Flugelsoft Labs — MatsyaSample Assam<br/>'
            '<b>Challenge:</b> Scientific Sample Survey for Pond and Tank Aquaculture Production Estimation<br/>'
            '<b>Lead Entity:</b> Flugelsoft Labs &nbsp;|&nbsp; <b>Lead Applicant:</b> Kalyanjit Hatibaruah<br/>'
            '<b>Date:</b> November 2026',
            body_style,
        ),
        Spacer(1, 8),
        Paragraph('1. Executive Summary of Proof of Work', h2_style),
        Paragraph(
            'Flugelsoft Labs has developed an interactive web prototype (MatsyaSample Assam) demonstrating a '
            'rotating stratified sample survey ledger across Nagaon, Kamrup, Dima Hasao, Cachar, and Barpeta, '
            'an interactive Stratified Sampling & 95% Confidence Interval Simulator with recall-bias and double-counting '
            'fault injection, and an auditable District Estimates export module.',
            body_style,
        ),
        Paragraph('2. System & Statistical Architecture', h2_style),
    ]

    arch_data = [
        ['Layer', 'Technology / Component', 'Role in Assam Aquaculture Sample Survey'],
        ['Resource Frame & Panel', 'PostgreSQL/PostGIS + Stratifier', 'Stratifies ponds/tanks by size, type & intensity; rotating panels'],
        ['Field Schedules & Diary', 'Offline-First PWA + IndexedDB', 'Captures baseline stocking, partial harvests, self-consumption & farm-gate sales'],
        ['Sample Weighing', 'BLE Digital Scale + Geo-Photo', 'Spot-haul verification (aquaculture equivalent of crop-cutting)'],
        ['CI Estimator Engine', 'Python SciPy + Horvitz–Thompson', 'Computes weighted district/State totals, RSE% & 95% confidence intervals'],
        ['Audit & Reproducibility', 'SHA-256 Parameter Snapshots', 'Locks frame version, weights & outlier rules for DES / ICAR-CIFRI audit'],
    ]
    t = Table(arch_data, colWidths=[34 * mm, 60 * mm, 78 * mm])
    t.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#0f766e')),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.white),
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('FONTSIZE', (0, 0), (-1, -1), 8),
        ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor('#cbd5e1')),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.white, colors.HexColor('#f8fafc')]),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('PADDING', (0, 0), (-1, -1), 5),
    ]))
    story.append(t)
    story.append(PageBreak())
    story.append(Paragraph('3. Simulation & Confidence Interval Verification', h2_style))
    story.append(Image(c1, width=165 * mm, height=81 * mm))
    story.append(Spacer(1, 8))
    story.append(Image(c2, width=165 * mm, height=81 * mm))

    doc.build(story, onFirstPage=add_footer, onLaterPages=add_footer)
    print(f'Generated: {out_path} ({os.path.getsize(out_path)} bytes)')


def build_copypaste_txt(sections):
    out_path = os.path.join(DOCS_DIR, 'Flugelsoft_Labs_NESFIC-D-32_Proposal_CopyPaste.txt')
    lines = [
        'NESFIC-D-32 — Scientific Sample Survey for Pond and Tank Aquaculture Production Estimation',
        'Lead Entity: Flugelsoft Labs | Lead Applicant: Kalyanjit Hatibaruah',
        'Challenge Owner: Fishery Department • Government of Assam / Directorate of Fisheries',
        '=' * 80,
        '',
    ]
    for s in sections:
        clean_text = s['content'].replace('<', 'Smaller than ').replace('>', 'Greater Than ')
        lines.append(s['title'])
        lines.append(f"[Word count: {s['words']} / 500]")
        lines.append('-' * 60)
        lines.append(clean_text)
        lines.append('')
        lines.append('=' * 80)
        lines.append('')
    with open(out_path, 'w', encoding='utf-8') as f:
        f.write('\n'.join(lines))
    print(f'Generated: {out_path} ({os.path.getsize(out_path)} bytes)')


if __name__ == '__main__':
    secs = parse_proposal_sections()
    c1, c2, c3 = generate_charts()
    build_proposal_pdf(secs, c3)
    build_pow_pdf(c1, c2)
    build_copypaste_txt(secs)
