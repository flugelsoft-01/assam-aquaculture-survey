export type WaterBodyType = 'Private Pond' | 'Community Tank' | 'Reclaimed Beel/Tank';
export type SizeStratum = 'Small (<0.2 ha)' | 'Medium (0.2–1.0 ha)' | 'Large (>1.0 ha)';
export type IntensityStratum = 'Extensive' | 'Semi-Intensive' | 'Intensive';
export type SurveyDistrict = 'Nagaon' | 'Kamrup' | 'Dima Hasao' | 'Cachar' | 'Barpeta';
export type SurveyStatus = 'Verified' | 'Recall Drift Alert' | 'Missed Harvest Flag';

export interface SurveyEvent {
  stage: string;
  actor: string;
  location: string;
  timestamp: string;
  metric: string;
  hash: string;
  status: 'ok' | 'warn' | 'alert';
}

export interface SampledWaterBody {
  sampleUnitId: string;
  frameId: string;
  pondName: string;
  waterBodyType: WaterBodyType;
  sizeStratum: SizeStratum;
  intensityStratum: IntensityStratum;
  district: SurveyDistrict;
  gps: string;
  waterSpreadHa: number;
  rotationPanel: 'Panel A (Yr 1–2)' | 'Panel B (Yr 2–3)';
  samplingWeight: number;
  partialHarvestsLogged: number;
  selfConsumptionKg: number;
  farmGateSalesKg: number;
  estimatedAnnualYieldKg: number;
  verifiedWeighingKg: number;
  status: SurveyStatus;
  speciesMix: string;
  auditHash: string;
  events: SurveyEvent[];
}

export interface DistrictEstimate {
  district: SurveyDistrict;
  pilotRole: string;
  totalFrameUnits: number;
  sampledUnits: number;
  estimatedProductionMt: number;
  ci95LowerMt: number;
  ci95UpperMt: number;
  rsePct: number;
  diaryCompliancePct: number;
}

export const SAMPLED_WATER_BODIES: SampledWaterBody[] = [
  {
    sampleUnitId: 'ASM-NGN-S1-0142',
    frameId: 'DoF-FRM-NGN-4821',
    pondName: 'Raha Rupahi Carp Cluster — Pond #14',
    waterBodyType: 'Private Pond',
    sizeStratum: 'Medium (0.2–1.0 ha)',
    intensityStratum: 'Semi-Intensive',
    district: 'Nagaon',
    gps: '26.2284° N, 92.5137° E',
    waterSpreadHa: 0.65,
    rotationPanel: 'Panel A (Yr 1–2)',
    samplingWeight: 42.5,
    partialHarvestsLogged: 6,
    selfConsumptionKg: 145,
    farmGateSalesKg: 2810,
    estimatedAnnualYieldKg: 2955,
    verifiedWeighingKg: 2940,
    status: 'Verified',
    speciesMix: 'Rohu, Catla, Mrigal, Grass Carp',
    auditHash: '0x8e3a...c41d',
    events: [
      {
        stage: '1. Frame Selection & Stratification',
        actor: 'Directorate of Fisheries Sampling Engine',
        location: 'Nagaon Block-II, Assam',
        timestamp: '2026-04-02 09:00 IST',
        metric: 'Stratum M-SI · Weight w = 42.5 · Panel A',
        hash: 'f12c9a...01b4',
        status: 'ok',
      },
      {
        stage: '2. Baseline Stocking & Input Schedule',
        actor: 'Fishery Demonstrator (ID: DoF-NGN-08)',
        location: 'Raha, Nagaon',
        timestamp: '2026-04-18 11:20 IST',
        metric: '8,400 fingerlings · Pellet + Mustard Oil Cake',
        hash: 'd44a71...98e2',
        status: 'ok',
      },
      {
        stage: '3. Digital Partial-Harvest Diary (6 Events)',
        actor: 'Farmer Diary (Offline PWA Sync)',
        location: 'Raha, Nagaon',
        timestamp: '2026-09-25 17:45 IST',
        metric: '2,810 kg farm-gate + 145 kg household intake',
        hash: 'b89e20...44a7',
        status: 'ok',
      },
      {
        stage: '4. Sample Weighing & Field Verification',
        actor: 'Statistical Enumerator (BLE Hanging Scale)',
        location: 'Raha, Nagaon',
        timestamp: '2026-10-12 07:30 IST',
        metric: 'Spot-haul 482 kg verified (Δ 0.5% vs diary)',
        hash: 'c71f03...12d9',
        status: 'ok',
      },
      {
        stage: '5. Stratified Estimator & Audit Lock',
        actor: 'MatsyaSample Estimator v1.0 (DES/CIFRI Spec)',
        location: 'Guwahati State Node',
        timestamp: '2026-11-10 15:10 IST',
        metric: '4,546 kg/ha · 95% CI contribution locked',
        hash: '8e3a91...c41d',
        status: 'ok',
      },
    ],
  },
  {
    sampleUnitId: 'ASM-KMR-S2-0089',
    frameId: 'DoF-FRM-KMR-2190',
    pondName: 'Hajo Sualkuchi Community Tank #03',
    waterBodyType: 'Community Tank',
    sizeStratum: 'Large (>1.0 ha)',
    intensityStratum: 'Semi-Intensive',
    district: 'Kamrup',
    gps: '26.2465° N, 91.5294° E',
    waterSpreadHa: 1.4,
    rotationPanel: 'Panel A (Yr 1–2)',
    samplingWeight: 18.0,
    partialHarvestsLogged: 5,
    selfConsumptionKg: 210,
    farmGateSalesKg: 5180,
    estimatedAnnualYieldKg: 5390,
    verifiedWeighingKg: 5340,
    status: 'Verified',
    speciesMix: 'IMC Polyculture + Silver Carp',
    auditHash: '0x4a7b...90e3',
    events: [
      {
        stage: '1. Frame Selection & Stratification',
        actor: 'Directorate of Fisheries Sampling Engine',
        location: 'Hajo Circle, Kamrup',
        timestamp: '2026-04-02 09:00 IST',
        metric: 'Stratum L-SI · Weight w = 18.0 · Panel A',
        hash: 'a90b12...33c1',
        status: 'ok',
      },
      {
        stage: '2. Baseline Stocking & Input Schedule',
        actor: 'Fishery Extension Officer (ID: DoF-KMR-14)',
        location: 'Hajo, Kamrup',
        timestamp: '2026-04-22 10:15 IST',
        metric: '16,500 yearlings · Fertilized tank',
        hash: 'b32c45...77f8',
        status: 'ok',
      },
      {
        stage: '3. Digital Partial-Harvest Diary (5 Events)',
        actor: 'SHG Tank Secretary (Offline PWA)',
        location: 'Hajo, Kamrup',
        timestamp: '2026-10-04 16:30 IST',
        metric: '5,180 kg local bazaar + 210 kg member share',
        hash: 'c88d19...55a2',
        status: 'ok',
      },
      {
        stage: '4. Sample Weighing & Field Verification',
        actor: 'DES & DoF Joint Verification Team',
        location: 'Hajo, Kamrup',
        timestamp: '2026-10-19 06:50 IST',
        metric: 'Net-haul 1,120 kg weighed (Δ 0.9% vs diary)',
        hash: 'd11e74...29b6',
        status: 'ok',
      },
      {
        stage: '5. Stratified Estimator & Audit Lock',
        actor: 'MatsyaSample Estimator v1.0',
        location: 'Guwahati State Node',
        timestamp: '2026-11-11 12:00 IST',
        metric: '3,850 kg/ha · Auditable variance recorded',
        hash: '4a7b62...90e3',
        status: 'ok',
      },
    ],
  },
  {
    sampleUnitId: 'ASM-DMH-S3-0031',
    frameId: 'DoF-FRM-DMH-0412',
    pondName: 'Haflong Maibang Hill Terrace Pond #07',
    waterBodyType: 'Private Pond',
    sizeStratum: 'Small (<0.2 ha)',
    intensityStratum: 'Extensive',
    district: 'Dima Hasao',
    gps: '25.2591° N, 93.1364° E',
    waterSpreadHa: 0.14,
    rotationPanel: 'Panel B (Yr 2–3)',
    samplingWeight: 31.2,
    partialHarvestsLogged: 3,
    selfConsumptionKg: 68,
    farmGateSalesKg: 212,
    estimatedAnnualYieldKg: 280,
    verifiedWeighingKg: 274,
    status: 'Verified',
    speciesMix: 'Common Carp, Grass Carp, Minor Carps',
    auditHash: '0x2d9c...71f5',
    events: [
      {
        stage: '1. Frame Selection & Stratification',
        actor: 'Directorate of Fisheries Sampling Engine',
        location: 'Maibang Block, Dima Hasao',
        timestamp: '2026-04-03 09:30 IST',
        metric: 'Stratum S-EX · Weight w = 31.2 · Panel B',
        hash: 'e41a22...88d1',
        status: 'ok',
      },
      {
        stage: '2. Baseline Stocking & Input Schedule',
        actor: 'Hill Fisheries Field Assistant (ID: DoF-DMH-03)',
        location: 'Maibang, Dima Hasao',
        timestamp: '2026-05-05 11:40 IST',
        metric: '1,200 fingerlings · Low-input terrace pond',
        hash: 'f52b33...99e2',
        status: 'ok',
      },
      {
        stage: '3. Digital Partial-Harvest Diary (3 Events)',
        actor: 'Farmer Diary (SMS/Offline Sync)',
        location: 'Maibang, Dima Hasao',
        timestamp: '2026-09-30 14:20 IST',
        metric: '212 kg village sale + 68 kg self-consumption',
        hash: 'a63c44...10f3',
        status: 'ok',
      },
      {
        stage: '4. Sample Weighing & Field Verification',
        actor: 'District Statistical Enumerator',
        location: 'Maibang, Dima Hasao',
        timestamp: '2026-10-24 08:15 IST',
        metric: 'Spot-haul 92 kg verified · Geo-tagged photo',
        hash: 'b74d55...21a4',
        status: 'ok',
      },
      {
        stage: '5. Stratified Estimator & Audit Lock',
        actor: 'MatsyaSample Estimator v1.0',
        location: 'Guwahati State Node',
        timestamp: '2026-11-12 10:05 IST',
        metric: '2,000 kg/ha · Hill stratum calibrated',
        hash: '2d9c88...71f5',
        status: 'ok',
      },
    ],
  },
  {
    sampleUnitId: 'ASM-CCH-S2-0118',
    frameId: 'DoF-FRM-CCH-3105',
    pondName: 'Sonai Barak Floodplain Pond #22',
    waterBodyType: 'Private Pond',
    sizeStratum: 'Medium (0.2–1.0 ha)',
    intensityStratum: 'Intensive',
    district: 'Cachar',
    gps: '24.7326° N, 92.8931° E',
    waterSpreadHa: 0.55,
    rotationPanel: 'Panel A (Yr 1–2)',
    samplingWeight: 36.8,
    partialHarvestsLogged: 2,
    selfConsumptionKg: 95,
    farmGateSalesKg: 2150,
    estimatedAnnualYieldKg: 3520,
    verifiedWeighingKg: 3480,
    status: 'Recall Drift Alert',
    speciesMix: 'Pangasius + IMC Polyculture',
    auditHash: '0x6c1e...38b0',
    events: [
      {
        stage: '1. Frame Selection & Stratification',
        actor: 'Directorate of Fisheries Sampling Engine',
        location: 'Sonai Block, Cachar',
        timestamp: '2026-04-02 09:00 IST',
        metric: 'Stratum M-IN · Weight w = 36.8 · Panel A',
        hash: 'c10a11...44f2',
        status: 'ok',
      },
      {
        stage: '2. Baseline Stocking & Input Schedule',
        actor: 'Fishery Demonstrator (ID: DoF-CCH-11)',
        location: 'Sonai, Cachar',
        timestamp: '2026-04-26 12:10 IST',
        metric: '14,000 Pangasius + Carp fingerlings',
        hash: 'd21b22...55a3',
        status: 'ok',
      },
      {
        stage: '3. Digital Partial-Harvest Diary (2 Events)',
        actor: 'Retrospective Recall Entry (Delayed)',
        location: 'Sonai, Cachar',
        timestamp: '2026-10-08 18:00 IST',
        metric: '2,245 kg recalled vs 3,480 kg feed-implied',
        hash: 'e32c33...66b4',
        status: 'warn',
      },
      {
        stage: '4. Sample Weighing & Field Verification',
        actor: 'DoF Enumerator Re-interview & Haul Check',
        location: 'Sonai, Cachar',
        timestamp: '2026-10-28 07:10 IST',
        metric: 'Alert resolved: 1,235 kg farm-gate lot recovered',
        hash: 'f43d44...77c5',
        status: 'warn',
      },
      {
        stage: '5. Stratified Estimator & Audit Lock',
        actor: 'MatsyaSample Estimator v1.0',
        location: 'Guwahati State Node',
        timestamp: '2026-11-14 09:40 IST',
        metric: 'Flagged for Recall-Drift sensitivity note',
        hash: '6c1e55...38b0',
        status: 'warn',
      },
    ],
  },
  {
    sampleUnitId: 'ASM-BRP-S1-0204',
    frameId: 'DoF-FRM-BRP-5540',
    pondName: 'Mandia Reclaimed Community Tank #11',
    waterBodyType: 'Reclaimed Beel/Tank',
    sizeStratum: 'Large (>1.0 ha)',
    intensityStratum: 'Extensive',
    district: 'Barpeta',
    gps: '26.2512° N, 90.9648° E',
    waterSpreadHa: 1.85,
    rotationPanel: 'Panel B (Yr 2–3)',
    samplingWeight: 22.4,
    partialHarvestsLogged: 4,
    selfConsumptionKg: 340,
    farmGateSalesKg: 3110,
    estimatedAnnualYieldKg: 3450,
    verifiedWeighingKg: 2620,
    status: 'Missed Harvest Flag',
    speciesMix: 'IMC + Indigenous Small Fish (SIS)',
    auditHash: '0x9b4d...12a8',
    events: [
      {
        stage: '1. Frame Selection & Stratification',
        actor: 'Directorate of Fisheries Sampling Engine',
        location: 'Mandia Block, Barpeta',
        timestamp: '2026-04-04 09:15 IST',
        metric: 'Stratum L-EX · Weight w = 22.4 · Panel B',
        hash: 'a12b34...90e1',
        status: 'ok',
      },
      {
        stage: '2. Baseline Stocking & Input Schedule',
        actor: 'Fishery Demonstrator (ID: DoF-BRP-19)',
        location: 'Mandia, Barpeta',
        timestamp: '2026-05-02 10:50 IST',
        metric: '12,000 fingerlings · Natural productivity',
        hash: 'b23c45...01f2',
        status: 'ok',
      },
      {
        stage: '3. Digital Partial-Harvest Diary (4 Events)',
        actor: 'Community Tank Committee',
        location: 'Mandia, Barpeta',
        timestamp: '2026-10-15 15:20 IST',
        metric: '24% gap between diary & trader receipt log',
        hash: 'c34d56...12a3',
        status: 'alert',
      },
      {
        stage: '4. Sample Weighing & Field Verification',
        actor: 'DoF Supervisor Audit Pending',
        location: 'Mandia, Barpeta',
        timestamp: '2026-11-02 08:00 IST',
        metric: 'Suspected duplicate entry on 18 Sep haul',
        hash: 'd45e67...23b4',
        status: 'alert',
      },
      {
        stage: '5. Stratified Estimator & Audit Lock',
        actor: 'Quality Gate Hold',
        location: 'Guwahati State Node',
        timestamp: '2026-11-15 14:30 IST',
        metric: 'Excluded from clean mean pending verification',
        hash: '9b4d78...12a8',
        status: 'alert',
      },
    ],
  },
];

export const DISTRICT_ESTIMATES: DistrictEstimate[] = [
  {
    district: 'Nagaon',
    pilotRole: 'Pilot 1 · High-Production',
    totalFrameUnits: 28450,
    sampledUnits: 420,
    estimatedProductionMt: 52480,
    ci95LowerMt: 50690,
    ci95UpperMt: 54270,
    rsePct: 1.74,
    diaryCompliancePct: 96.4,
  },
  {
    district: 'Kamrup',
    pilotRole: 'Pilot 2 · Medium-Intensity',
    totalFrameUnits: 19620,
    sampledUnits: 310,
    estimatedProductionMt: 28940,
    ci95LowerMt: 27720,
    ci95UpperMt: 30160,
    rsePct: 2.15,
    diaryCompliancePct: 94.8,
  },
  {
    district: 'Dima Hasao',
    pilotRole: 'Pilot 3 · Geographically Distinct',
    totalFrameUnits: 3480,
    sampledUnits: 120,
    estimatedProductionMt: 2410,
    ci95LowerMt: 2245,
    ci95UpperMt: 2575,
    rsePct: 3.49,
    diaryCompliancePct: 91.2,
  },
  {
    district: 'Cachar',
    pilotRole: 'Statewide Frame · Barak Valley',
    totalFrameUnits: 21340,
    sampledUnits: 340,
    estimatedProductionMt: 36120,
    ci95LowerMt: 34650,
    ci95UpperMt: 37590,
    rsePct: 2.08,
    diaryCompliancePct: 93.5,
  },
  {
    district: 'Barpeta',
    pilotRole: 'Statewide Frame · Lower Assam',
    totalFrameUnits: 24890,
    sampledUnits: 360,
    estimatedProductionMt: 41850,
    ci95LowerMt: 40210,
    ci95UpperMt: 43490,
    rsePct: 2.0,
    diaryCompliancePct: 95.1,
  },
];
