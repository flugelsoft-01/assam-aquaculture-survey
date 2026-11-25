export interface ProposalSection {
  id: number;
  title: string;
  promptHint: string;
  content: string;
}

export interface BudgetItem {
  head: string;
  scope: string;
  amountLakhs: number;
  sharePct: number;
}

export const BUDGET_ALLOCATION: BudgetItem[] = [
  {
    head: 'Technical Engineering & Statistical Systems Team',
    scope: 'Lead Architect, Survey Statistician, Offline PWA & Backend Engineers (6 months)',
    amountLakhs: 20.0,
    sharePct: 50.0,
  },
  {
    head: 'Field Verification & Sample Weighing Kits',
    scope: 'Rugged field tablets, BLE digital hanging/platform scales & solar power banks (3 pilot districts)',
    amountLakhs: 6.0,
    sharePct: 15.0,
  },
  {
    head: 'Aquaculture Sampling & DES/ICAR-CIFRI Alignment',
    scope: 'Stratification design validation, harvest diary protocols & statistical audit methodology',
    amountLakhs: 4.0,
    sharePct: 10.0,
  },
  {
    head: 'India-Region Cloud, Estimator Engine & Security',
    scope: 'Managed PostgreSQL/PostGIS, reproducible R/Python estimator API, KMS & security audit',
    amountLakhs: 4.0,
    sharePct: 10.0,
  },
  {
    head: '3-District Assam Pilot, Enumerator Training & Travel',
    scope: 'Nagaon, Kamrup & Dima Hasao field onboarding, bilingual training & sample weighing trials',
    amountLakhs: 4.0,
    sharePct: 10.0,
  },
  {
    head: 'Documentation, Open Standards & Contingency',
    scope: 'Auditable methodology handbook, SOPs for Fishery staff & operational buffer',
    amountLakhs: 2.0,
    sharePct: 5.0,
  },
];

export const PROPOSAL_METADATA = {
  challengeId: 'NESFIC-D-32',
  challengeTitle: 'Scientific Sample Survey for Pond and Tank Aquaculture Production Estimation',
  sponsor: 'Fishery Department • Government of Assam / Directorate of Fisheries',
  organization: 'Flugelsoft Labs',
  leadApplicant: 'Kalyanjit Hatibaruah',
  demoVideoUrl: 'https://flugelsoft-matsyasample.pages.dev/demo',
  productUrl: 'https://flugelsoft-matsyasample.pages.dev/',
  githubUrl: 'https://github.com/flugelsoft-01/nesfic-d32-pond-tank-survey',
};

export const PROPOSAL_SECTIONS: ProposalSection[] = [
  {
    id: 1,
    title: '1. Problem understanding & user workflow',
    promptHint:
      'Explain the problem, users/beneficiaries and current workflow. Identify the specific gap(s) addressed and the intended outcome.',
    content: `Assam reported approximately 4.75 lakh MT of fish production in 2023–24, with a major share originating from dispersed private ponds and community tanks where harvesting is partial and spread across the year. Attempting annual complete enumeration across lakhs of water bodies is operationally impractical and statistically fragile.

Key users and stakeholders include fish farmers, Directorate of Fisheries field and statistical staff, Directorate of Economics & Statistics (DES), ICAR-CIFRI technical collaborators, and policy planners. Currently, estimation relies heavily on annual farmer recall and uniform productivity assumptions per hectare.

This creates four critical gaps: (1) Weak farmer recall across multiple partial harvests; (2) Missed harvests or double counting when fish are sold in staggered lots; (3) Unrecorded self-consumption and direct farm-gate sales; and (4) Uniform yield assumptions that fail to capture differences in stocking density, species mix, feeding, and management, with no explicit measure of statistical uncertainty. The intended outcome of MatsyaSample Assam is a scientifically defensible, repeatable rotating sample survey system—not compulsory reporting by every farmer—that produces transparent district and State production estimates with explicit confidence intervals.`,
  },
  {
    id: 2,
    title: '2. Proposed solution & key features',
    promptHint:
      'Describe the solution, main modules/functions, user interaction and what changes versus the current approach.',
    content: `Flugelsoft Labs proposes MatsyaSample Assam, a digitally supported statistical sampling and estimation platform purpose-built for Assam's pond and tank aquaculture ecosystem.

Core modules include:
1. Rotating Fishery-Resource Frame & Stratifier: Ingests the updated fishery-resource frame and stratifies ponds/tanks by water-spread size (Smaller than 0.2 ha, 0.2–1.0 ha, Greater Than 1.0 ha), resource type (private pond, community tank, reclaimed tank), and culture intensity (extensive, semi-intensive, intensive), drawing random rotating panels (e.g., 50% annual rotation) to avoid respondent fatigue.
2. Digital Field Schedules (Offline-First): Replaces paper registers with structured mobile schedules for sampled farms capturing baseline stocking, species, feed, and management practices.
3. Partial-Harvest & Farm-Gate Diaries: Lightweight mobile/SMS harvest diaries for sampled farmers and enumerators to log staggered harvests, household self-consumption, and direct farm-gate sales in near real time.
4. Sample Weighing & Field Verification: Supports spot-haul weighing via Bluetooth digital scales or geo-tagged photo verification for selected observations—acting as an aquaculture equivalent of crop-cutting experiments.
5. Reproducible Confidence-Interval Estimator: Computes district and State totals using stratified Horvitz–Thompson estimators, outputting 95% confidence intervals, Relative Standard Error (RSE%), and locked methodology snapshots for full auditability.`,
  },
  {
    id: 3,
    title: '3. Describe User Journey, Wireframes, Prototype & Proof of Work',
    promptHint:
      'Describe the proposed user journey/workflow and provide supporting artifacts such as wireframes, mock-ups, prototypes, MVPs, simulation/model outputs, test results, or evidence from prior pilots/deployments.',
    content: `The workflow connects four user roles:
- Fishery Statistical Officer: Configures stratification rules over the updated resource frame, draws random rotating samples, and monitors district RSE% and diary compliance.
- Field Enumerator: Conducts baseline schedules on sampled ponds/tanks offline, performs scheduled sample weighings, and reconciles discrepancies.
- Sampled Fish Farmer: Logs partial harvests, self-consumption, and farm-gate sales via simple Assamese/Bengali/Bodo/English harvest diary prompts.
- DES / ICAR-CIFRI Reviewer: Audits locked estimation runs, sampling weights, assumptions, and 95% confidence intervals.

As Proof of Work, Flugelsoft Labs has built an interactive web prototype (MatsyaSample Assam) featuring: (a) a Rotating Sample Frame & Survey Ledger across Nagaon, Kamrup, Dima Hasao, Cachar, and Barpeta showing 5-stage verification timelines; (b) an Interactive Stratified Sampling & CI Simulator that models sample size, partial-harvest frequency, and injects recall-bias or double-counting faults to demonstrate how diaries and sample weighing tighten 95% confidence intervals; and (c) a District & State Estimates Audit dashboard with exportable CSV dossiers. Full architecture diagrams and simulation outputs are included in the Proof of Work PDF.`,
  },
  {
    id: 4,
    title: '4. Technology & solution architecture',
    promptHint:
      'Describe stack and architecture: software/hardware, AI/ML models or algorithms, methods/rules, APIs/integrations, data flow and hosting.',
    content: `MatsyaSample Assam uses an offline-first edge-cloud statistical architecture designed for rural Assam connectivity:
- Edge & Field Layer: Progressive Web App (PWA) and Android client with IndexedDB/SQLite local persistence, GPS polygon/point capture, and optional Bluetooth (BLE) digital hanging-scale integration for sample weighing.
- Core Survey & Frame Layer: TypeScript/Node.js API gateway and PostgreSQL/PostGIS database storing the versioned fishery-resource frame, stratum definitions, rotating panel assignments, and immutable field schedules.
- Statistical Estimation Engine: Python (SciPy/Statsmodels) microservice implementing stratified random sampling, Neyman/proportional allocation, finite population correction (FPC), Horvitz–Thompson weighted totals, and variance/95% CI calculation. Every estimation run stores a SHA-256 hash of input data, weights, and parameters for exact reproducibility.
- Anomaly & Quality Rules: Deterministic checks flag recall-drift (diary vs. stocking/feed plausibility), suspected duplicate harvest entries, and missed partial-harvest intervals for enumerator follow-up.
- Hosting & Security: Containerized deployment on India-region cloud (NIC MeghRaj / AWS Mumbai compatible) with TLS 1.3, role-based access control, and automated encrypted backups.`,
  },
  {
    id: 5,
    title: '5. Development methodology & intermediate steps',
    promptHint:
      'Show the sequence from discovery/requirements through design, prototype, MVP, testing and refinement, with key outputs.',
    content: `We follow an iterative 4-phase delivery methodology co-designed with the Directorate of Fisheries, DES, and ICAR-CIFRI:
- Phase 1 — Frame Audit & Statistical Design (Weeks 1–4): Clean and stratify the updated Assam pond/tank resource frame; calibrate stratum variances using historical production and fish-seed records; finalize rotating panel rules and sample size targets for Smaller than 3% district RSE.
- Phase 2 — Digital Schedules, Diaries & Weighing MVP (Weeks 5–10): Build offline-first enumerator schedules, multilingual farmer harvest diaries, and BLE/photo sample weighing modules; validate usability with Fishery Demonstrators.
- Phase 3 — 3-District Contrasting Pilot (Weeks 11–18): Deploy in Nagaon (high-production), Kamrup (medium-intensity), and Dima Hasao (geographically distinct hill district) covering ~850 sampled water bodies across two harvest quarters.
- Phase 4 — Estimator Calibration & Audit Handover (Weeks 19–24): Compare diary + sample-weighing estimates against recall-only baselines, refine non-response/imputation weights with DES/ICAR-CIFRI, and deliver statewide rollout SOPs.`,
  },
  {
    id: 6,
    title: '6. Innovation & differentiation',
    promptHint:
      'Explain what is new or better than existing alternatives and why it works in North East India.',
    content: `Existing fishery reporting in India relies either on census-style recall forms—which undercount partial harvests and self-consumption—or unverified eye-estimation. MatsyaSample Assam introduces four key innovations tailored to North East India:
1. Estimation Over Compulsory Reporting: Respects the Directorate's principle that farmers should not be burdened with mandatory census reporting; only a scientifically selected rotating sample is surveyed intensively.
2. Aquaculture Crop-Cutting Equivalent: Combines lightweight farmer harvest diaries with randomized enumerator sample weighings to measure and correct recall bias empirically.
3. Explicit Uncertainty Quantification: Every district and State figure is published with a 95% confidence interval and Relative Standard Error (RSE%), replacing single-point guesses with statistical rigor.
4. Reproducible & Auditable Snapshots: Unlike ad-hoc spreadsheets, every annual estimate locks the sampling frame version, stratum weights, and outlier rules in an auditable ledger ready for DES and ICAR-CIFRI review.`,
  },
  {
    id: 7,
    title: '7. Impact, scalability & deployment readiness',
    promptHint:
      'Quantify expected outcomes, beneficiaries, scalability across Assam/NE and alignment with government workflows.',
    content: `MatsyaSample Assam directly serves the Directorate of Fisheries, DES, and policy planners managing Assam's 4.75 lakh MT+ aquaculture sector, while reducing reporting burden on lakhs of fish farmers.

Expected quantifiable outcomes from the pilot:
- Reduce recall-induced under-reporting of partial harvests, self-consumption, and farm-gate sales by Greater Than 20% compared to end-of-year recall forms.
- Achieve district-level production estimates with Relative Standard Error (RSE) ≤ 2.5% in major aquaculture districts and ≤ 3.5% in hill districts.
- Cut annual state estimate compilation and audit turnaround from months to near real-time quarterly/annual releases.

Because the system uses a rotating annual sample (replacing only a fraction of sampled ponds each year), it scales seamlessly from 3 pilot districts to all 35 districts of Assam and other North Eastern states without expanding field enumerator headcount.`,
  },
  {
    id: 8,
    title: '8. Field validation, pilot plan & adoption strategy',
    promptHint:
      'Describe pilot sites, validation criteria, departmental support needed, and stakeholder onboarding.',
    content: `In alignment with the NESFIC-D-32 pilot brief, Flugelsoft Labs proposes a 6-month field pilot across three contrasting districts:
1. Nagaon (High-Production District): 420 sampled ponds/tanks across intensive and semi-intensive strata.
2. Kamrup (Medium-Intensity District): 310 sampled private ponds and community tanks.
3. Dima Hasao (Geographically Distinct Hill District): 120 sampled terrace/hill ponds and tanks.

Departmental inputs required: access to the updated fishery-resource frame, historical production and fish-seed records, scheme beneficiary lists, and nomination of departmental field staff/enumerators in the 3 districts, alongside technical review checkpoints with DES and ICAR-CIFRI.

Validation criteria: ≥90% diary completion among sampled units, ≥95% concordance between sample weighings and diary logs, and full reproducibility of district 95% confidence intervals by independent DES statisticians.`,
  },
  {
    id: 9,
    title: '9. Challenges, risks & mitigation',
    promptHint:
      'Identify operational, technical, adoption or regulatory risks and concrete mitigations.',
    content: `Key risks and mitigations:
1. Farmer Fatigue & Dropouts in Harvest Diaries: Mitigated by rotating sample panels (limiting burden to 1–2 years), ultra-short Assamese/local-language prompts, and enumerator phone/field check-ins.
2. Incomplete or Outdated Resource Frame: Mitigated by incorporating frame-coverage adjustment factors and allowing enumerators to log newly excavated/reclaimed ponds in selected area segments.
3. Low Connectivity in Remote Blocks (e.g., Dima Hasao, riverine chars): Mitigated by 100% offline-first PWA schedules and SMS fallback for partial-harvest logging.
4. Double Counting of Inter-Pond Transfers or Multi-Owner Tanks: Mitigated by unique frame IDs, clear primary-harvester assignment, and automated duplicate-entry alerts when trader receipts overlap.`,
  },
  {
    id: 10,
    title: '10. Timeline, deliverables & milestones (6 months)',
    promptHint:
      'Provide a clear month-by-month or milestone schedule with concrete deliverables.',
    content: `6-Month Execution Roadmap:
- Month 1: Frame ingestion, stratification schema, and rotating sample design approved with Directorate of Fisheries & DES/ICAR-CIFRI.
- Month 2: Offline-first digital field schedules, multilingual harvest diary app, and BLE sample-weighing module completed.
- Month 3: Enumerator training and baseline stocking surveys completed across 850 sampled ponds/tanks in Nagaon, Kamrup, and Dima Hasao.
- Month 4: Continuous partial-harvest diary tracking and mid-season randomized sample weighings across all 3 pilot districts.
- Month 5: Statistical estimator validation, recall-bias comparison report, and 95% confidence-interval audit with DES & ICAR-CIFRI.
- Month 6: Final pilot production report, reproducible open-audit codebase handover, and statewide rotating-survey rollout blueprint.`,
  },
  {
    id: 11,
    title: '11. Team & organizational capability',
    promptHint:
      'Summarize applicant/entity credentials, technical capabilities and relevant experience.',
    content: `Flugelsoft Labs is an Assam-based technology and data-systems engineering entity led by Kalyanjit Hatibaruah (Lead Applicant). Our team combines deep expertise in offline-first field data collection systems, geospatial resource frames, statistical estimation pipelines, and scalable government-grade web platforms.

For NESFIC-D-32, Flugelsoft Labs brings end-to-end capability across survey software engineering, mobile UX for rural field staff, reproducible Python/PostgreSQL statistical pipelines, and on-ground Assam deployment support—working closely with Directorate of Fisheries officers, DES statisticians, and ICAR-CIFRI domain experts.`,
  },
  {
    id: 12,
    title: '12. Budget & grant utilization plan (₹40.00 Lakhs)',
    promptHint:
      'Summarize cost heads, justification and alignment with project milestones.',
    content: `The proposed ₹40.00 Lakhs NESFIC grant is structured for maximum engineering and field-validation impact over 6 months:
- Technical Engineering & Statistical Systems Team (₹20.00L / 50%): Lead Architect, Survey Statistician, Offline PWA & Backend Engineers building the frame stratifier, digital schedules, and CI estimator.
- Field Verification & Sample Weighing Kits (₹6.00L / 15%): Rugged tablets and BLE digital scales for sample weighing in Nagaon, Kamrup, and Dima Hasao.
- Aquaculture Sampling & DES/ICAR-CIFRI Alignment (₹4.00L / 10%): Statistical methodology validation and SOPs.
- India-Region Cloud, Estimator Engine & Security (₹4.00L / 10%): Hosting, PostGIS infrastructure, and security testing.
- 3-District Pilot, Enumerator Training & Travel (₹4.00L / 10%): On-ground onboarding and field verification.
- Documentation & Contingency (₹2.00L / 5%): Audit handbooks and operational buffer.`,
  },
];
