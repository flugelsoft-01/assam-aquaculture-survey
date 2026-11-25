# Flugelsoft Labs — MatsyaSample Assam (NESFIC-D-32)

[![Live Web App](https://img.shields.io/badge/Live%20App-flugelsoft--matsyasample.pages.dev-0f766e?style=for-the-badge&logo=cloudflarepages&logoColor=white)](https://flugelsoft-matsyasample.pages.dev/)
[![GitHub Repo](https://img.shields.io/badge/GitHub-nesfic--d32--pond--tank--survey-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/flugelsoft-01/nesfic-d32-pond-tank-survey)
[![Challenge](https://img.shields.io/badge/NESFIC--2026-NESFIC--D--32-0284c7?style=for-the-badge)](https://flugelsoft-matsyasample.pages.dev/proposal)
[![Region](https://img.shields.io/badge/Region-Assam%2C%20India%20(IN--AS)-0f766e?style=for-the-badge)](https://flugelsoft-matsyasample.pages.dev/)

> **Scientific Sample Survey for Pond and Tank Aquaculture Production Estimation**  
> Developed for the **North East Seva First Innovation Challenge (NESFIC 2026)** — Problem Statement **NESFIC-D-32**  
> **Challenge Owner:** Fishery Department • Government of Assam / Directorate of Fisheries  
> **Lead Entity:** Flugelsoft Labs  
> **Lead Applicant:** Kalyanjit Hatibaruah  

---

## 🌐 Quick Links & Access

- **Live Web Application:** [https://flugelsoft-matsyasample.pages.dev/](https://flugelsoft-matsyasample.pages.dev/)
- **Tutorial & Interactive Guide:** [https://flugelsoft-matsyasample.pages.dev/tutorial](https://flugelsoft-matsyasample.pages.dev/tutorial)
- **GitHub Repository:** [https://github.com/flugelsoft-01/nesfic-d32-pond-tank-survey](https://github.com/flugelsoft-01/nesfic-d32-pond-tank-survey)
- **Full Proposal & PDF Downloads:** [https://flugelsoft-matsyasample.pages.dev/proposal](https://flugelsoft-matsyasample.pages.dev/proposal)

---

## 🐟 Executive Overview

Assam reported approximately **4.75 lakh MT** of fish production in 2023–24, with a major share coming from a vast number of dispersed private ponds and tanks where harvesting is partial and spread across the year. Annual complete enumeration suffers from weak farmer recall, missed or double-counted partial harvests, unrecorded self-consumption and direct farm-gate sales, and uniform productivity assumptions that ignore differences in stocking, species, feeding, and management.

**Flugelsoft Labs — MatsyaSample Assam** delivers a scientifically defensible, repeatable, and digitally supported **rotating stratified sample survey** that estimates district and State pond/tank production with explicit **95% confidence intervals**—without attempting to force compulsory reporting on every farmer.

### 📍 Indicative Pilot & Statewide District Coverage (Assam, India)
- **High-Production Pilot:** Nagaon
- **Medium-Intensity Pilot:** Kamrup
- **Geographically Distinct Pilot:** Dima Hasao
- **Broader Rotating Frame Preview:** Cachar, Barpeta

---

## 🚀 Key Modules in the Live Platform

### 1. Rotating Sample Frame & Survey Ledger (`/`)
- Stratified sample tracking across Assam's pilot and statewide districts (stratified by resource size, water-body type, and culture intensity).
- 5-stage survey & verification timeline: Frame Selection → Stocking Baseline → Partial Harvest Diary → Sample Weighing Verification → Estimator & Audit Lock.
- Tracks self-consumption, farm-gate sales, sampling weights, and audit hashes.

### 2. Stratified Sampling & CI Simulator (`/survey-simulator`)
- Interactive statistical sandbox modeling stratum sample size (`n`), partial-harvest frequency, and design effect.
- Real-time computation of **Estimated Production (MT)**, **Relative Standard Error (RSE %)**, and **95% Confidence Intervals**.
- **Bias & Fault-Injection Engine:** Simulate recall-only reporting bias and double-counting anomalies to observe how digital harvest diaries and sample weighing restore unbiased precision.

### 3. District & State Production Estimates Audit (`/district-estimates`)
- District-level production table with Frame Size (`N`), Sampled Units (`n`), Estimated MT, 95% CI bounds, RSE %, and Verification Rate.
- Audit-ready CSV export for Directorate of Fisheries, Directorate of Economics & Statistics (DES), and ICAR-CIFRI technical review.

### 4. NESFIC-D-32 Proposal & Deliverables (`/proposal`)
- Complete 12-section NESFIC-D-32 application (all sections compliant with <500 word limit).
- ₹40.00 Lakhs grant budget breakdown (50% allocated to Technical Engineering & Statistical Systems Team).
- Direct download links for:
  - `Flugelsoft_Labs_NESFIC-D-32_Proposal.pdf`
  - `Flugelsoft_Labs_NESFIC-D-32_Proof_of_Work.pdf`
  - `Flugelsoft_Labs_NESFIC-D-32_Proposal_CopyPaste.txt`

---

## 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| **Frontend Framework** | React 18, TypeScript, Vite 6, Tailwind CSS v4 |
| **Icons & Design** | Lucide React, Custom SVG Aquaculture & CI Motif |
| **Edge & Field Layer** | Offline-First PWA, IndexedDB schedules & harvest diaries, BLE digital scale / GPS capture |
| **Statistical Engine** | Stratified Horvitz–Thompson Estimator, Rotating Panel Weights, 95% CI & RSE% Computation |
| **Audit & Governance** | Reproducible Parameter Snapshots, SHA-256 Audit Digests, DES / ICAR-CIFRI CSV/JSON Exports |
| **Hosting & CI/CD** | Cloudflare Pages, GitHub |

---

## 💻 Local Development Setup

```bash
# Install dependencies
npm install

# Start Vite local development server
npm run dev

# Build for production
npm run build
```

---

## ⚠️ Disclaimer

This web application is a functional prototype and Proof of Work developed by **Flugelsoft Labs** for the **North East Seva First Innovation Challenge (NESFIC-D-32)**, owned by the **Fishery Department, Government of Assam / Directorate of Fisheries**. Sample frames, harvest diary logs, sample weighing records, and confidence-interval calculations use calibrated demonstration benchmarks aligned with Assam's 4.75 lakh MT baseline. Statewide deployment requires formal integration with the Directorate's updated fishery-resource frame, field enumerator onboarding, and technical validation with the Directorate of Economics & Statistics (DES) and ICAR-CIFRI.

---

## 📄 Copyright & Attribution

© 2026 **Flugelsoft Labs**. All rights reserved.  
**Lead Applicant:** Kalyanjit Hatibaruah  
**Lead Entity:** Flugelsoft Labs  
**Region:** Assam, India (`IN-AS`)
