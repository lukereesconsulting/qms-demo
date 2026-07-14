// Seeded demo school. Entirely fictional — no real educators, no real Persal numbers.
// Scores are generated deterministically (fixed seed) with planted patterns so the
// intelligence views have something true to say:
//   • PS3 (Learner assessment & achievement) is the weakest standard school-wide,
//     and weakest of all in FET Mathematics & Sciences.
//   • PS5 (Extra-mural) is the second-weakest.
//   • One appraiser rates almost everything an identical 3 (credibility flag).
//   • PS4 has near-zero variance school-wide (credibility flag).
//   • The overall distribution is pinned at 3–4 (credibility flag).

import { ALL_DESCRIPTORS, INSTRUMENT } from "./instrument";

export const SCHOOL = {
  name: "Aloekrans Combined School",
  emis: "200400739",
  district: "Amathole East",
  circuit: "Circuit 09",
  province: "Eastern Cape",
  cycle: "Mid-Year 2026",
  cycleWindow: "June 2026",
};

export type CycleStatus = "not-started" | "in-progress" | "submitted" | "signed";

export interface Educator {
  id: string;
  surname: string;
  initials: string;
  fullName: string;
  persal: string;
  post: "PL1";
  department: string;
  subjects: string;
  appraiser: string; // Departmental Head
  status: CycleStatus;
  /** descriptor key -> rating; only present for in-progress/submitted/signed */
  scores: Record<string, 1 | 2 | 3 | 4>;
}

export const DEPARTMENTS = [
  "Foundation Phase",
  "Intermediate Phase",
  "Senior Phase",
  "FET Languages & Humanities",
  "FET Mathematics & Sciences",
] as const;

export type Department = (typeof DEPARTMENTS)[number];

export const APPRAISERS: Record<Department, string> = {
  "Foundation Phase": "Mrs N. Mabece (DH)",
  "Intermediate Phase": "Mr T. Nkosi (DH)",
  "Senior Phase": "Mrs A. van Rooyen (DH)",
  "FET Languages & Humanities": "Ms L. Jafta (DH)",
  "FET Mathematics & Sciences": "Mr S. Petersen (DH)",
};

// Target mean rating per department × standard (the planted signal).
const DEPT_STANDARD_MEANS: Record<Department, Record<string, number>> = {
  "Foundation Phase": { PS1: 3.45, PS2: 3.15, PS3: 2.75, PS4: 3.1, PS5: 2.85 },
  "Intermediate Phase": { PS1: 3.0, PS2: 3.0, PS3: 3.0, PS4: 3.0, PS5: 3.0 }, // pinned appraiser
  "Senior Phase": { PS1: 3.15, PS2: 2.9, PS3: 2.45, PS4: 3.05, PS5: 2.7 },
  "FET Languages & Humanities": { PS1: 3.05, PS2: 2.85, PS3: 2.4, PS4: 3.05, PS5: 2.85 },
  "FET Mathematics & Sciences": { PS1: 2.75, PS2: 2.65, PS3: 1.95, PS4: 3.0, PS5: 2.6 },
};

interface Roster {
  surname: string;
  initials: string;
  first: string;
  department: Department;
  subjects: string;
  status: CycleStatus;
}

const ROSTER: Roster[] = [
  // Foundation Phase (7)
  { surname: "Mtimkulu", initials: "Z.", first: "Zukiswa", department: "Foundation Phase", subjects: "Grade 1", status: "signed" },
  { surname: "Botha", initials: "E.", first: "Elmarie", department: "Foundation Phase", subjects: "Grade R", status: "signed" },
  { surname: "Ndlela", initials: "P.", first: "Pumla", department: "Foundation Phase", subjects: "Grade 2", status: "submitted" },
  { surname: "Sauls", initials: "M.", first: "Megan", department: "Foundation Phase", subjects: "Grade 3", status: "signed" },
  { surname: "Gxowa", initials: "T.", first: "Thandeka", department: "Foundation Phase", subjects: "Grade 1", status: "submitted" },
  { surname: "van Wyk", initials: "C.", first: "Carla", department: "Foundation Phase", subjects: "Grade 2", status: "in-progress" },
  { surname: "Mnyanda", initials: "B.", first: "Bulelwa", department: "Foundation Phase", subjects: "Grade 3", status: "not-started" },
  // Intermediate Phase (6)
  { surname: "Dlamini", initials: "S.", first: "Sipho", department: "Intermediate Phase", subjects: "Mathematics, NS", status: "signed" },
  { surname: "Oosthuizen", initials: "R.", first: "Riaan", department: "Intermediate Phase", subjects: "English HL, SS", status: "signed" },
  { surname: "Kwatsha", initials: "N.", first: "Nolubabalo", department: "Intermediate Phase", subjects: "isiXhosa HL", status: "signed" },
  { surname: "Peters", initials: "D.", first: "Deidre", department: "Intermediate Phase", subjects: "Life Skills, EMS", status: "submitted" },
  { surname: "Mahlangu", initials: "K.", first: "Kagiso", department: "Intermediate Phase", subjects: "Mathematics", status: "submitted" },
  { surname: "Stuurman", initials: "J.", first: "Jolene", department: "Intermediate Phase", subjects: "NS & Tech", status: "signed" },
  // Senior Phase (5)
  { surname: "Qeqe", initials: "L.", first: "Luyanda", department: "Senior Phase", subjects: "Mathematics Gr 7–9", status: "signed" },
  { surname: "Fourie", initials: "H.", first: "Hannes", department: "Senior Phase", subjects: "EMS, Technology", status: "submitted" },
  { surname: "Madikizela", initials: "V.", first: "Vuyokazi", department: "Senior Phase", subjects: "isiXhosa, LO", status: "submitted" },
  { surname: "Adams", initials: "F.", first: "Faizel", department: "Senior Phase", subjects: "English FAL, SS", status: "in-progress" },
  { surname: "Ngesi", initials: "W.", first: "Wandile", department: "Senior Phase", subjects: "Natural Sciences", status: "signed" },
  // FET Languages & Humanities (4)
  { surname: "Jantjies", initials: "A.", first: "Anelisa", department: "FET Languages & Humanities", subjects: "English HL Gr 10–12", status: "signed" },
  { surname: "du Plessis", initials: "S.", first: "Suzanne", department: "FET Languages & Humanities", subjects: "History, Geography", status: "submitted" },
  { surname: "Mkhabile", initials: "O.", first: "Onke", department: "FET Languages & Humanities", subjects: "isiXhosa HL Gr 10–12", status: "signed" },
  { surname: "Booysen", initials: "G.", first: "Gavin", department: "FET Languages & Humanities", subjects: "Life Orientation, Tourism", status: "in-progress" },
  // FET Mathematics & Sciences (4)
  { surname: "Nkohla", initials: "X.", first: "Xolani", department: "FET Mathematics & Sciences", subjects: "Mathematics Gr 10–12", status: "signed" },
  { surname: "Pillay", initials: "R.", first: "Rani", department: "FET Mathematics & Sciences", subjects: "Physical Sciences", status: "submitted" },
  { surname: "Swanepoel", initials: "M.", first: "Marius", department: "FET Mathematics & Sciences", subjects: "Life Sciences, Maths Lit", status: "submitted" },
  { surname: "Hlathi", initials: "Y.", first: "Yonela", department: "FET Mathematics & Sciences", subjects: "Accounting, Maths Lit", status: "not-started" },
];

// mulberry32 — deterministic PRNG so the demo is stable across reloads
function mulberry32(seed: number) {
  let a = seed;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const rand = mulberry32(20260614);

function clampRating(x: number): 1 | 2 | 3 | 4 {
  return Math.max(1, Math.min(4, Math.round(x))) as 1 | 2 | 3 | 4;
}

function generateScores(r: Roster, index: number): Record<string, 1 | 2 | 3 | 4> {
  const scores: Record<string, 1 | 2 | 3 | 4> = {};
  if (r.status === "not-started") return scores;
  const means = DEPT_STANDARD_MEANS[r.department];
  const pinned = r.department === "Intermediate Phase";
  // educator-level offset so individuals differ believably
  const personal = (rand() - 0.5) * 0.7;
  // in-progress forms are partially captured
  const captureLimit = r.status === "in-progress" ? 18 : ALL_DESCRIPTORS.length;

  ALL_DESCRIPTORS.forEach(({ standard, descriptor }, di) => {
    if (di >= captureLimit) return;
    if (pinned) {
      // Mr Nkosi: an identical 3 for nearly everything, the odd 4
      scores[descriptor.key] = rand() < 0.06 ? 4 : 3;
      return;
    }
    if (standard.key === "PS4") {
      // near-zero variance school-wide on PS4
      scores[descriptor.key] = rand() < 0.12 ? 4 : 3;
      return;
    }
    const noise = (rand() - 0.5) * 1.3;
    scores[descriptor.key] = clampRating(means[standard.key] + personal + noise);
  });
  // plant a handful of 1s in FET M&S PS3 so the cold cell has depth
  if (r.department === "FET Mathematics & Sciences" && r.status !== "in-progress" && index % 2 === 0) {
    scores["3.3.a"] = 1;
    scores["3.1.a"] = 2;
  }
  return scores;
}

export const EDUCATORS: Educator[] = ROSTER.map((r, i) => ({
  id: `${r.surname.toLowerCase().replace(/[^a-z]/g, "")}-${r.initials.charAt(0).toLowerCase()}`,
  surname: r.surname,
  initials: r.initials,
  fullName: `${r.first} ${r.surname}`,
  persal: String(51230000 + i * 617 + 41),
  post: "PL1",
  department: r.department,
  subjects: r.subjects,
  appraiser: APPRAISERS[r.department],
  status: r.status,
  scores: generateScores(r, i),
}));

// ---------- derived helpers ----------

export function standardTotal(e: Educator, psKey: string): number | null {
  const ps = INSTRUMENT.find((s) => s.key === psKey)!;
  let total = 0;
  let counted = 0;
  for (const c of ps.criteria)
    for (const d of c.descriptors) {
      const v = e.scores[d.key];
      if (v) {
        total += v;
        counted++;
      }
    }
  const expected = ps.criteria.reduce((n, c) => n + c.descriptors.length, 0);
  return counted === expected ? total : null;
}

export function educatorTotal(e: Educator): number | null {
  let sum = 0;
  for (const ps of INSTRUMENT) {
    const t = standardTotal(e, ps.key);
    if (t === null) return null;
    sum += t;
  }
  return sum;
}

/** Mean rating (1–4) across all captured descriptors of a standard, for a set of educators. */
export function meanRating(educators: Educator[], psKey: string): number | null {
  const ps = INSTRUMENT.find((s) => s.key === psKey)!;
  let sum = 0;
  let n = 0;
  for (const e of educators)
    for (const c of ps.criteria)
      for (const d of c.descriptors) {
        const v = e.scores[d.key];
        if (v) {
          sum += v;
          n++;
        }
      }
  return n ? sum / n : null;
}

export const SCORED_EDUCATORS = EDUCATORS.filter(
  (e) => e.status === "submitted" || e.status === "signed"
);

export function schoolStandardMeans(): { psKey: string; mean: number }[] {
  return INSTRUMENT.map((ps) => ({
    psKey: ps.key,
    mean: meanRating(SCORED_EDUCATORS, ps.key) ?? 0,
  }));
}

export function bottomTwoStandards(): { psKey: string; mean: number }[] {
  return [...schoolStandardMeans()].sort((a, b) => a.mean - b.mean).slice(0, 2);
}

export function ratingDistribution(): Record<1 | 2 | 3 | 4, number> {
  const dist: Record<1 | 2 | 3 | 4, number> = { 1: 0, 2: 0, 3: 0, 4: 0 };
  for (const e of SCORED_EDUCATORS)
    for (const v of Object.values(e.scores)) dist[v]++;
  return dist;
}

export function statusCounts(): Record<CycleStatus, number> {
  const counts: Record<CycleStatus, number> = {
    "not-started": 0,
    "in-progress": 0,
    submitted: 0,
    signed: 0,
  };
  for (const e of EDUCATORS) counts[e.status]++;
  return counts;
}
