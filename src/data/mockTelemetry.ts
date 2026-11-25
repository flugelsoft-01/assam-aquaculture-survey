export type WaterBodyType = 'Private Pond' | 'Community Tank' | 'Reclaimed Tank';
export type SizeStratum = '<0.2 ha' | '0.2–1.0 ha' | '>1.0 ha';
export type CultureIntensity = 'Extensive' | 'Semi-Intensive' | 'Intensive';
export type SurveyStatus = 'Verified' | 'Recall-Drift Alert' | 'Weighing Pending';

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
  unitId: string;
  frameCode: string;
  pondName: string;
  waterBodyType: WaterBodyType;
  sizeStratum: SizeStratum;
  areaHa: number;
  cultureIntensity: CultureIntensity;
  district: 'Nagaon' | 'Kamrup' | 'Dima Hasao' | 'Cachar' | 'Barpeta';
  block: string;
  gps: string;
  speciesMix: string;
  partialHarvestsLogged: number;
  diaryYieldKg: number;
  selfConsumptionKg: number;
  sampleWeighingKg: number;
  concordancePct: number;
  designWeight: number;
  status: SurveyStatus;
  panelRotation: 'Panel A (Year 1–2)' | 'Panel B (Fresh 50%)' | 'Panel C (Control)';
  snapshotHash: string;
  events: SurveyEvent[];
}

export interface DistrictEstimate {
  district: string;
  zoneType: string;
  framePonds: number;
  sampledPonds: number;
  estimatedProductionMt: number;
  ciLowerMt: number;
  ciUpperMt: number;
  rsePct: number;
  diaryCompletionPct: number;
  weighingConcordancePct: number;
}

export const SAMPLED_WATER_BODIES: SampledWaterBody[] = [
  {
    unitId: 'ASM-NAG-S2-0142',
    frameCode: 'DOF-NAG-04821',
    pondName: 'Rupahi Beel-Side Carp Cluster #14',
    waterBodyType: 'Private Pond',
    sizeStratum: '0.2–1.0 ha',
    areaHa: 0.68,
    cultureIntensity: 'Intensive',
    district: 'Nagaon',
    block: 'Rupahihat',
    gps: '26.4182° N, 92.7314° E',
    speciesMix: 'Rohu, Catla, Mrigal, Grass Carp',
    partialHarvestsLogged: 7,
    diaryYieldKg: 3420,
    selfConsumptionKg: 145,
    sampleWeighingKg: 492,
    concordancePct: 97.8,
    designWeight: 38.4,
    status: 'Verified',
    panelRotation: 'Panel A (Year 1–2)',
    snapshotHash: '0x8b3e...41f9',
    events: [
      {
        stage: '1. Resource Frame & Stratum Assignment',
        actor: 'District Fishery Statistical Cell (Nagaon)',
        location: 'Rupahihat Block, Nagaon',
        timestamp: '2026-04-02 09:10 IST',
        metric: 'Stratum: 0.2–1.0 ha · Intensive · w_h = 38.4',
        hash: 'a14c9d...02b1',
        status: 'ok',
      },
      {
        stage: '2. Offline Baseline Stocking Schedule',
        actor: 'Fishery Demonstrator (Offline PWA)',
        location: '26.4182° N, 92.7314° E',
        timestamp: '2026-04-18 11:25 IST',
        metric: '0.68 ha · 6,800 fingerlings stocked · Pelleted feed',
        hash: 'c72f1a...89e3',
        status: 'ok',
      },
      {
        stage: '3. Partial-Harvest & Farm-Gate Diary (7 Entries)',
        actor: 'Farmer Diary (Assamese Mobile/SMS)',
        location: 'Rupahihat, Nagaon',
        timestamp: '2026-10-14 06:40 IST',
        metric: '3,275 kg sold + 145 kg household self-consumption',
        hash: 'd90a44...3c71',
        status: 'ok',
      },
      {
        stage: '4. Randomized Sample Weighing (BLE Scale)',
        actor: 'Enumerator Spot-Haul Audit #2',
        location: 'Pond Bank Verification',
        timestamp: '2026-10-14 07:05 IST',
        metric: 'Spot haul 492 kg vs Diary 481 kg (97.8% concordance)',
        hash: 'e55b21...9f04',
        status: 'ok',
      },
      {
        stage: '5. Horvitz–Thompson Stratum Lock',
        actor: 'MatsyaSample Estimation Engine',
        location: 'Guwahati State Node',
        timestamp: '2026-10-30 17:00 IST',
        metric: 'Weighted contribution: 131.33 MT · RSE 2.1%',
        hash: '8b3e77...41f9',
        status: 'ok',
      },
    ],
  },
  {
    unitId: 'ASM-KAM-S1-0089',
    frameCode: 'DOF-KAM-01904',
    pondName: 'Hajo Community Temple Tank #03',
    waterBodyType: 'Community Tank',
    sizeStratum: '>1.0 ha',
    areaHa: 1.45,
    cultureIntensity: 'Semi-Intensive',
    district: 'Kamrup',
    block: 'Hajo',
    gps: '26.2461° N, 91.5289° E',
    speciesMix: 'Catla, Rohu, Silver Carp, Common Carp',
    partialHarvestsLogged: 5,
    diaryYieldKg: 4610,
    selfConsumptionKg: 310,
    sampleWeighingKg: 615,
    concordancePct: 96.4,
    designWeight: 24.2,
    status: 'Verified',
    panelRotation: 'Panel B (Fresh 50%)',
    snapshotHash: '0x4d91...c208',
    events: [
      {
        stage: '1. Resource Frame & Stratum Assignment',
        actor: 'District Fishery Statistical Cell (Kamrup)',
        location: 'Hajo Block, Kamrup',
        timestamp: '2026-04-04 10:00 IST',
        metric: 'Stratum: >1.0 ha · Community Tank · w_h = 24.2',
        hash: 'f03a11...7a22',
        status: 'ok',
      },
      {
        stage: '2. Offline Baseline Stocking Schedule',
        actor: 'Enumerator Team Kamrup-02',
        location: '26.2461° N, 91.5289° E',
        timestamp: '2026-04-21 14:15 IST',
        metric: '1.45 ha · Co-op managed · Primary harvester assigned',
        hash: 'b84d20...5e19',
        status: 'ok',
      },
      {
        stage: '3. Partial-Harvest & Farm-Gate Diary (5 Entries)',
        actor: 'Tank Committee Secretary (Assamese UI)',
        location: 'Hajo, Kamrup',
        timestamp: '2026-10-08 07:30 IST',
        metric: '4,300 kg farm-gate + 310 kg community share',
        hash: '91c6e4...11d8',
        status: 'ok',
      },
      {
        stage: '4. Randomized Sample Weighing (Photo + Scale)',
        actor: 'Enumerator Spot-Haul Audit #1',
        location: 'Hajo Tank Ghat',
        timestamp: '2026-10-08 07:50 IST',
        metric: 'Spot haul 615 kg · 96.4% concordance',
        hash: '7e21b9...60f3',
        status: 'ok',
      },
      {
        stage: '5. Horvitz–Thompson Stratum Lock',
        actor: 'MatsyaSample Estimation Engine',
        location: 'Guwahati State Node',
        timestamp: '2026-10-30 17:00 IST',
        metric: 'Weighted contribution: 111.56 MT · RSE 2.4%',
        hash: '4d91a0...c208',
        status: 'ok',
      },
    ],
  },
  {
    unitId: 'ASM-DMH-S3-0031',
    frameCode: 'DOF-DMH-00412',
    pondName: 'Haflong Terrace Pond Cluster #07',
    waterBodyType: 'Private Pond',
    sizeStratum: '<0.2 ha',
    areaHa: 0.14,
    cultureIntensity: 'Extensive',
    district: 'Dima Hasao',
    block: 'Harangajao',
    gps: '25.1128° N, 92.8615° E',
    speciesMix: 'Common Carp, Grass Carp, Minor Carps',
    partialHarvestsLogged: 3,
    diaryYieldKg: 268,
    selfConsumptionKg: 64,
    sampleWeighingKg: 48,
    concordancePct: 95.1,
    designWeight: 19.5,
    status: 'Verified',
    panelRotation: 'Panel A (Year 1–2)',
    snapshotHash: '0x2a7c...91e5',
    events: [
      {
        stage: '1. Resource Frame & Stratum Assignment',
        actor: 'Hill District Fishery Office (Haflong)',
        location: 'Harangajao, Dima Hasao',
        timestamp: '2026-04-06 09:45 IST',
        metric: 'Stratum: <0.2 ha · Hill Extensive · w_h = 19.5',
        hash: '11d4f2...8a09',
        status: 'ok',
      },
      {
        stage: '2. Offline Baseline Stocking Schedule',
        actor: 'Field Enumerator (100% Offline Sync)',
        location: '25.1128° N, 92.8615° E',
        timestamp: '2026-04-25 13:10 IST',
        metric: '0.14 ha terrace pond · Rainfed · 900 fingerlings',
        hash: '39c0e1...2f44',
        status: 'ok',
      },
      {
        stage: '3. Partial-Harvest & Farm-Gate Diary (SMS Fallback)',
        actor: 'Farmer SMS Shortcode Log',
        location: 'Harangajao, Dima Hasao',
        timestamp: '2026-09-29 16:20 IST',
        metric: '204 kg local sale + 64 kg household consumption',
        hash: '55a8d7...7c12',
        status: 'ok',
      },
      {
        stage: '4. Randomized Sample Weighing',
        actor: 'Enumerator Spot-Haul Audit #1',
        location: 'Terrace Pond Site',
        timestamp: '2026-09-30 08:15 IST',
        metric: 'Spot haul 48 kg · 95.1% concordance',
        hash: '68f2c3...4e90',
        status: 'ok',
      },
      {
        stage: '5. Horvitz–Thompson Stratum Lock',
        actor: 'MatsyaSample Estimation Engine',
        location: 'Guwahati State Node',
        timestamp: '2026-10-30 17:00 IST',
        metric: 'Weighted contribution: 5.23 MT · RSE 3.2%',
        hash: '2a7c19...91e5',
        status: 'ok',
      },
    ],
  },
  {
    unitId: 'ASM-CAC-S2-0218',
    frameCode: 'DOF-CAC-03119',
    pondName: 'Silchar Sonai Reclaimed Tank #19',
    waterBodyType: 'Reclaimed Tank',
    sizeStratum: '0.2–1.0 ha',
    areaHa: 0.82,
    cultureIntensity: 'Semi-Intensive',
    district: 'Cachar',
    block: 'Sonai',
    gps: '24.7340° N, 92.8912° E',
    speciesMix: 'Rohu, Catla, Pangas, Bata',
    partialHarvestsLogged: 2,
    diaryYieldKg: 1410,
    selfConsumptionKg: 55,
    sampleWeighingKg: 410,
    concordancePct: 78.4,
    designWeight: 31.0,
    status: 'Recall-Drift Alert',
    panelRotation: 'Panel B (Fresh 50%)',
    snapshotHash: '0xf19b...62d3',
    events: [
      {
        stage: '1. Resource Frame & Stratum Assignment',
        actor: 'District Fishery Statistical Cell (Cachar)',
        location: 'Sonai Block, Cachar',
        timestamp: '2026-04-05 10:30 IST',
        metric: 'Stratum: 0.2–1.0 ha · Reclaimed Tank · w_h = 31.0',
        hash: '88e1a4...3d10',
        status: 'ok',
      },
      {
        stage: '2. Offline Baseline Stocking Schedule',
        actor: 'Fishery Demonstrator (Sonai)',
        location: '24.7340° N, 92.8912° E',
        timestamp: '2026-04-22 10:50 IST',
        metric: '0.82 ha · 7,200 fingerlings · Expected ~2,950 kg',
        hash: '92b7c1...0e55',
        status: 'ok',
      },
      {
        stage: '3. Partial-Harvest Diary (Gap Detected)',
        actor: 'Farmer Diary (Bengali UI)',
        location: 'Sonai, Cachar',
        timestamp: '2026-10-11 18:00 IST',
        metric: '1,410 kg logged; 6-week gap vs feed purchase',
        hash: 'a40f82...1c93',
        status: 'warn',
      },
      {
        stage: '4. Sample Weighing vs Diary Mismatch',
        actor: 'Enumerator Audit #2',
        location: 'Sonai Tank Bank',
        timestamp: '2026-10-12 07:15 IST',
        metric: '21.6% recall drift flagged — follow-up reconciliation queued',
        hash: 'c13d90...7a81',
        status: 'alert',
      },
    ],
  },
  {
    unitId: 'ASM-BAR-S1-0115',
    frameCode: 'DOF-BAR-02740',
    pondName: 'Mandia Char-Adjacent Pond #05',
    waterBodyType: 'Private Pond',
    sizeStratum: '<0.2 ha',
    areaHa: 0.18,
    cultureIntensity: 'Semi-Intensive',
    district: 'Barpeta',
    block: 'Mandia',
    gps: '26.2591° N, 90.9624° E',
    speciesMix: 'Rohu, Mrigal, Magur, Koi',
    partialHarvestsLogged: 4,
    diaryYieldKg: 590,
    selfConsumptionKg: 72,
    sampleWeighingKg: 0,
    concordancePct: 0,
    designWeight: 42.5,
    status: 'Weighing Pending',
    panelRotation: 'Panel C (Control)',
    snapshotHash: '0x6c42...19a7',
    events: [
      {
        stage: '1. Resource Frame & Stratum Assignment',
        actor: 'District Fishery Statistical Cell (Barpeta)',
        location: 'Mandia Block, Barpeta',
        timestamp: '2026-04-07 09:20 IST',
        metric: 'Stratum: <0.2 ha · Private Pond · w_h = 42.5',
        hash: '22f8a1...9c40',
        status: 'ok',
      },
      {
        stage: '2. Offline Baseline Stocking Schedule',
        actor: 'Enumerator Team Barpeta-01',
        location: '26.2591° N, 90.9624° E',
        timestamp: '2026-04-24 12:05 IST',
        metric: '0.18 ha · 1,600 fingerlings stocked',
        hash: '44d1b7...3a12',
        status: 'ok',
      },
      {
        stage: '3. Partial-Harvest Diary (4 Entries)',
        actor: 'Farmer Diary (Assamese Mobile UI)',
        location: 'Mandia, Barpeta',
        timestamp: '2026-10-16 08:30 IST',
        metric: '518 kg farm-gate + 72 kg self-consumption',
        hash: '66e3c9...8f20',
        status: 'ok',
      },
      {
        stage: '4. Sample Weighing Scheduled',
        actor: 'Enumerator Spot-Haul Queue',
        location: 'Mandia Block',
        timestamp: '2026-10-28 06:30 IST',
        metric: 'Awaiting Q2 spot-haul weighing window',
        hash: '77a0d2...5b11',
        status: 'warn',
      },
    ],
  },
];

export const DISTRICT_ESTIMATES: DistrictEstimate[] = [
  {
    district: 'Nagaon',
    zoneType: 'High-Production Intensive',
    framePonds: 16128,
    sampledPonds: 420,
    estimatedProductionMt: 46820,
    ciLowerMt: 44890,
    ciUpperMt: 48750,
    rsePct: 2.1,
    diaryCompletionPct: 94.8,
    weighingConcordancePct: 97.2,
  },
  {
    district: 'Kamrup',
    zoneType: 'Medium-Intensity Mixed',
    framePonds: 7502,
    sampledPonds: 310,
    estimatedProductionMt: 24310,
    ciLowerMt: 23165,
    ciUpperMt: 25455,
    rsePct: 2.4,
    diaryCompletionPct: 92.6,
    weighingConcordancePct: 96.1,
  },
  {
    district: 'Dima Hasao',
    zoneType: 'Hill District (Terrace Ponds)',
    framePonds: 2340,
    sampledPonds: 120,
    estimatedProductionMt: 3840,
    ciLowerMt: 3599,
    ciUpperMt: 4081,
    rsePct: 3.2,
    diaryCompletionPct: 90.8,
    weighingConcordancePct: 95.3,
  },
  {
    district: 'Cachar',
    zoneType: 'Barak Valley Mixed Tanks',
    framePonds: 9610,
    sampledPonds: 310,
    estimatedProductionMt: 28940,
    ciLowerMt: 27410,
    ciUpperMt: 30470,
    rsePct: 2.7,
    diaryCompletionPct: 89.4,
    weighingConcordancePct: 93.8,
  },
  {
    district: 'Barpeta',
    zoneType: 'Lower Assam Floodplain Ponds',
    framePonds: 11475,
    sampledPonds: 270,
    estimatedProductionMt: 31450,
    ciLowerMt: 29905,
    ciUpperMt: 32995,
    rsePct: 2.5,
    diaryCompletionPct: 91.5,
    weighingConcordancePct: 95.6,
  },
];
