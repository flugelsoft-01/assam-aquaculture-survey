# Flugelsoft Labs — MatsyaSample Assam (NESFIC-D-32)

> **Scientific Sample Survey for Pond and Tank Aquaculture Production Estimation**  
> Developed for the **North East Seva First Innovation Challenge (NESFIC 2026)** — Problem Statement **NESFIC-D-32**  
> **Challenge Owner:** Fishery Department / Directorate of Fisheries, Government of Assam  
> **Lead Entity:** Flugelsoft Labs  
> **Lead Applicant:** Kalyanjit Hatibaruah  

---

## Executive Overview

Assam reported approximately **4.75 lakh MT** of fish production in 2023–24, with a major share coming from dispersed private ponds and community tanks where harvesting is partial and spread across the year. Complete annual enumeration across lakhs of water bodies is operationally impractical, while year-end farmer recall and uniform per-hectare yield assumptions introduce severe under-reporting and provide no confidence intervals.

**MatsyaSample Assam** by **Flugelsoft Labs** implements a scientifically defensible, rotating stratified sample survey system—combining an offline-first digital field schedule, multilingual partial-harvest and farm-gate diaries, randomized sample weighing (aquaculture crop-cutting equivalent), and a reproducible **Horvitz–Thompson** confidence-interval estimator.

### Pilot District Coverage (Assam, India)
- **High-Production Intensive Zone:** Nagaon
- **Medium-Intensity Mixed Zone:** Kamrup
- **Geographically Distinct Hill Zone:** Dima Hasao
- **Additional Benchmark Strata:** Cachar, Barpeta

---

## Key Modules in the Application

1. **Sample Frame & Survey Ledger (`/`)**: Stratified rotating pond/tank register across 5 Assam districts with 5-stage survey verification timelines, diary completion tracking, and SHA-256 estimation snapshot hashes.
2. **Stratified Sampling & CI Simulator (`/sampling-simulator`)**: Interactive statistical sandbox modeling stratum sample size ($n$), frame size ($N$), partial-harvest frequency, and fault-injection (recall bias, double counting, missed self-consumption) with live Horvitz–Thompson totals, 95% confidence intervals, and RSE%.
3. **District & State Estimates Audit (`/estimates-audit`)**: District-wise production totals, 95% CI bounds, RSE%, diary compliance, sample-weighing concordance, and audit-ready CSV export for DES & ICAR-CIFRI review.
4. **NESFIC-D-32 Proposal & Deliverables (`/proposal`)**: Complete 12-section NESFIC application (each section strictly $\le 500$ words) with copy-paste support and downloadable Proposal PDF, Proof of Work PDF, and TXT deliverables.
5. **Tutorial & Methodology Guide (`/tutorial`)**: Interactive walkthrough of the statistical framework, user personas, and offline-first edge-cloud architecture.

---

## Local Development Setup

```bash
npm install
npm run dev
npm run build
```

---

## Attribution

© 2026 **Flugelsoft Labs**. All rights reserved.  
**Lead Applicant:** Kalyanjit Hatibaruah  
**Lead Entity:** Flugelsoft Labs  
**Region:** Assam, India (`IN-AS`)
