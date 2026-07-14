"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import PlainSentence from "@/components/PlainSentence";
import { INSTRUMENT, SOURCE_CITATION } from "@/lib/instrument";
import {
  DEPARTMENTS,
  SCORED_EDUCATORS,
  SCHOOL,
  APPRAISERS,
  meanRating,
  schoolStandardMeans,
  bottomTwoStandards,
  ratingDistribution,
  standardTotal,
  type Department,
} from "@/lib/school";

function heatClass(mean: number | null): string {
  if (mean === null) return "bg-tint-neutral text-tag-neutral-text";
  if (mean >= 3.2) return "bg-tint-green-done text-tag-done-text";
  if (mean >= 3.0) return "bg-tint-green text-tag-green-text";
  if (mean >= 2.6) return "bg-tint-amber text-tag-amber-text";
  return "bg-tint-red text-tag-red-text";
}

export default function InsightsPage() {
  const [openCell, setOpenCell] = useState<{ dept: Department; psKey: string } | null>(null);

  const means = useMemo(() => schoolStandardMeans(), []);
  const bottom = useMemo(() => bottomTwoStandards(), []);
  const dist = useMemo(() => ratingDistribution(), []);

  const grid = useMemo(
    () =>
      DEPARTMENTS.map((dept) => ({
        dept,
        cells: INSTRUMENT.map((ps) => ({
          psKey: ps.key,
          mean: meanRating(
            SCORED_EDUCATORS.filter((e) => e.department === dept),
            ps.key
          ),
        })),
      })),
    []
  );

  // weakest standard + the department where it is coldest
  const weakest = INSTRUMENT.find((ps) => ps.key === bottom[0].psKey)!;
  const second = INSTRUMENT.find((ps) => ps.key === bottom[1].psKey)!;
  const weakestDept = useMemo(() => {
    let min: { dept: Department; mean: number } | null = null;
    for (const row of grid) {
      const cell = row.cells.find((c) => c.psKey === weakest.key);
      if (cell?.mean != null && (!min || cell.mean < min.mean))
        min = { dept: row.dept, mean: cell.mean };
    }
    return min!;
  }, [grid, weakest.key]);

  // credibility numbers
  const totalRatings = dist[1] + dist[2] + dist[3] + dist[4];
  const pinnedPct = Math.round(((dist[3] + dist[4]) / totalRatings) * 100);

  const appraiserSameness = useMemo(() => {
    return DEPARTMENTS.map((dept) => {
      const educators = SCORED_EDUCATORS.filter((e) => e.department === dept);
      const values = educators.flatMap((e) => Object.values(e.scores));
      if (!values.length) return { dept, pct: 0, mode: 0, n: 0 };
      const freq: Record<number, number> = {};
      for (const v of values) freq[v] = (freq[v] ?? 0) + 1;
      const mode = Number(Object.entries(freq).sort((a, b) => b[1] - a[1])[0][0]);
      return {
        dept,
        mode,
        n: educators.length,
        pct: Math.round((freq[mode] / values.length) * 100),
      };
    }).sort((a, b) => b.pct - a.pct)[0];
  }, []);

  const ps4Variance = useMemo(() => {
    const values: number[] = [];
    const ps4 = INSTRUMENT.find((p) => p.key === "PS4")!;
    for (const e of SCORED_EDUCATORS)
      for (const c of ps4.criteria)
        for (const d of c.descriptors) {
          const v = e.scores[d.key];
          if (v) values.push(v);
        }
    const mean = values.reduce((a, b) => a + b, 0) / values.length;
    const sd = Math.sqrt(values.reduce((a, b) => a + (b - mean) ** 2, 0) / values.length);
    return { mean, sd };
  }, []);

  const openCellEducators = useMemo(() => {
    if (!openCell) return [];
    return SCORED_EDUCATORS.filter((e) => e.department === openCell.dept)
      .map((e) => {
        const ps = INSTRUMENT.find((p) => p.key === openCell.psKey)!;
        return { e, total: standardTotal(e, openCell.psKey), max: ps.maxScore };
      })
      .sort((a, b) => (a.total ?? 0) - (b.total ?? 0));
  }, [openCell]);

  const fmt = (m: number | null) => (m === null ? "—" : m.toFixed(2));

  return (
    <div className="mx-auto max-w-5xl">
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-400">
        {SCHOOL.name} · {SCHOOL.cycle} · {SCORED_EDUCATORS.length} appraisals submitted or signed
      </p>
      <h1 className="mt-2 text-[26px] leading-tight md:text-[30px]">Where the school needs to improve</h1>
      <p className="mt-2 max-w-2xl text-[13.5px] leading-relaxed text-ink-500">
        Everything below is built from the ratings the school&apos;s own appraisers recorded. The
        tool adds them up and lays them out — the judgements stay yours.
      </p>

      {/* ---- View 1: bottom two standards ---- */}
      <section className="mt-10">
        <h2 className="text-[20px]">The two standards to work on</h2>
        <div className="mt-3">
          <PlainSentence>
            {weakest.shortTitle} is your lowest standard, and it&apos;s weakest in{" "}
            {weakestDept.dept}. {second.shortTitle} is the next one down.
          </PlainSentence>
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {[weakest, second].map((ps, i) => {
            const mean = means.find((m) => m.psKey === ps.key)!.mean;
            // the coldest criterion inside the standard, for the quote
            const criterion = ps.criteria[0];
            return (
              <div key={ps.key} className="rounded-lg border border-line bg-white p-5">
                <div className="flex items-baseline justify-between gap-3">
                  <div className="text-[10.5px] font-semibold uppercase tracking-[0.14em] text-ink-400">
                    {i === 0 ? "Lowest standard" : "Second lowest"} · PS{ps.number}
                  </div>
                  <div className={`rounded-full px-2.5 py-0.5 text-[12px] font-semibold tabular-nums ${heatClass(mean)}`}>
                    mean {mean.toFixed(2)} / 4
                  </div>
                </div>
                <h3 className="mt-2 text-[18px] leading-snug">{ps.title}</h3>
                <p className="serif-quote mt-3 border-l-2 border-brand pl-3 text-[13.5px] leading-relaxed text-ink-700">
                  “{criterion.desiredOutcome}”
                </p>
                <p className="mt-1 pl-3 text-[10.5px] text-ink-400">
                  What the agreement asks for — {SOURCE_CITATION}, Table 1
                </p>
                <p className="mt-3 text-[13px] leading-relaxed text-ink-500">
                  The recorded ratings sit furthest from that outcome here. A question for the SMT:
                  what would it take for this to be the school&apos;s development priority next
                  term?
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ---- View 2: heat grid ---- */}
      <section className="mt-12">
        <h2 className="text-[20px]">Department × standard</h2>
        <div className="mt-3">
          <PlainSentence>
            The cold cells are where scores run lowest — click one to see the educators behind it.
          </PlainSentence>
        </div>
        <div className="mt-5 overflow-x-auto rounded-lg border border-line bg-white p-4">
          <table className="w-full min-w-[640px] border-separate border-spacing-1.5 text-[12.5px]">
            <thead>
              <tr>
                <th className="w-52 px-2 text-left text-[10.5px] font-semibold uppercase tracking-[0.1em] text-ink-400">
                  Department
                </th>
                {INSTRUMENT.map((ps) => (
                  <th key={ps.key} className="px-2 pb-1 text-center text-[10.5px] font-semibold uppercase tracking-[0.06em] text-ink-400">
                    PS{ps.number}
                    <div className="mt-0.5 max-w-28 text-[9.5px] font-normal normal-case tracking-normal text-ink-400">
                      {ps.shortTitle}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {grid.map((row) => (
                <tr key={row.dept}>
                  <td className="px-2 py-1 text-[12.5px] font-medium text-ink-900">{row.dept}</td>
                  {row.cells.map((cell) => {
                    const active = openCell?.dept === row.dept && openCell?.psKey === cell.psKey;
                    return (
                      <td key={cell.psKey}>
                        <button
                          onClick={() =>
                            setOpenCell(active ? null : { dept: row.dept, psKey: cell.psKey })
                          }
                          className={`w-full rounded-md px-2 py-2.5 text-center font-semibold tabular-nums transition-transform ${heatClass(cell.mean)} ${active ? "ring-2 ring-accent" : "hover:scale-[1.04]"}`}
                        >
                          {fmt(cell.mean)}
                        </button>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-3 flex flex-wrap items-center gap-3 px-2 text-[10.5px] text-ink-400">
            <span>Mean recorded rating (1–4):</span>
            <span className="rounded bg-tint-red px-1.5 py-0.5 text-tag-red-text">below 2.6</span>
            <span className="rounded bg-tint-amber px-1.5 py-0.5 text-tag-amber-text">2.6 – 3.0</span>
            <span className="rounded bg-tint-green px-1.5 py-0.5 text-tag-green-text">3.0 – 3.2</span>
            <span className="rounded bg-tint-green-done px-1.5 py-0.5 text-tag-done-text">3.2+</span>
          </div>
        </div>

        {openCell && (
          <div className="mt-3 rounded-lg border border-line bg-white p-5">
            <div className="flex items-baseline justify-between gap-3">
              <h3 className="text-[16px]">
                {openCell.dept} ·{" "}
                {INSTRUMENT.find((p) => p.key === openCell.psKey)!.title}
              </h3>
              <button onClick={() => setOpenCell(null)} className="text-[12px] text-ink-400 hover:text-ink-900">
                Close ×
              </button>
            </div>
            <ul className="mt-3 divide-y divide-line">
              {openCellEducators.map(({ e, total, max }) => (
                <li key={e.id} className="flex items-baseline justify-between py-2 text-[13px]">
                  <span className="font-medium text-ink-900">
                    {e.initials} {e.surname}
                    <span className="ml-2 font-normal text-ink-400">{e.subjects}</span>
                  </span>
                  <span className="tabular-nums text-ink-700">
                    {total ?? "—"} <span className="text-ink-400">/ {max}</span>
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-[12px] leading-relaxed text-ink-500">
              Appraiser for this department: {APPRAISERS[openCell.dept]}. These are the recorded
              scores, educator by educator — the conversation about what they mean belongs to you
              and the SMT.
            </p>
          </div>
        )}
      </section>

      {/* ---- View 3: credibility ---- */}
      <section className="mt-12 pb-10">
        <h2 className="text-[20px]">Can you trust these numbers yet?</h2>
        <div className="mt-3">
          <PlainSentence>
            These are the ratings recorded — they may not be telling you much yet. Three patterns
            worth a conversation, offered as questions, not verdicts.
          </PlainSentence>
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          <div className="rounded-lg border border-line bg-white p-5">
            <div className="text-[10.5px] font-semibold uppercase tracking-[0.14em] text-ink-400">
              Distribution
            </div>
            <div className="mt-2 text-[26px] font-medium tabular-nums text-accent">{pinnedPct}%</div>
            <p className="mt-1 text-[13px] leading-relaxed text-ink-700">
              of all recorded ratings are a 3 or a 4.
            </p>
            <div className="mt-3 flex h-3 overflow-hidden rounded-full">
              {([1, 2, 3, 4] as const).map((r) => (
                <div
                  key={r}
                  style={{ width: `${(dist[r] / totalRatings) * 100}%` }}
                  className={
                    r === 1
                      ? "bg-status-red"
                      : r === 2
                        ? "bg-status-amber"
                        : r === 3
                          ? "bg-status-green"
                          : "bg-status-green-done"
                  }
                  title={`${r}: ${dist[r]}`}
                />
              ))}
            </div>
            <p className="mt-3 text-[12px] leading-relaxed text-ink-500">
              If nearly everything is “Good” or “Outstanding”, does the scale still have room to
              show where help is needed?
            </p>
          </div>

          <div className="rounded-lg border border-line bg-white p-5">
            <div className="text-[10.5px] font-semibold uppercase tracking-[0.14em] text-ink-400">
              Rating spread by appraiser
            </div>
            <div className="mt-2 text-[26px] font-medium tabular-nums text-accent">
              {appraiserSameness.pct}%
            </div>
            <p className="mt-1 text-[13px] leading-relaxed text-ink-700">
              of the ratings recorded in {appraiserSameness.dept} are an identical{" "}
              {appraiserSameness.mode} — across {appraiserSameness.n} educators and every standard.
            </p>
            <p className="mt-3 text-[12px] leading-relaxed text-ink-500">
              That may be a fair reflection of the department — or a sign the instrument was filled
              rather than used. Worth asking, not assuming.
            </p>
          </div>

          <div className="rounded-lg border border-line bg-white p-5">
            <div className="text-[10.5px] font-semibold uppercase tracking-[0.14em] text-ink-400">
              A standard with no spread
            </div>
            <div className="mt-2 text-[26px] font-medium tabular-nums text-accent">
              σ {ps4Variance.sd.toFixed(2)}
            </div>
            <p className="mt-1 text-[13px] leading-relaxed text-ink-700">
              Professional development (PS4) ratings barely vary — nearly every educator, in every
              department, gets the same score.
            </p>
            <p className="mt-3 text-[12px] leading-relaxed text-ink-500">
              A standard that never distinguishes anyone can&apos;t point development anywhere. Is
              PS4 being appraised, or waved through?
            </p>
          </div>
        </div>
        <p className="mt-6 text-[11.5px] leading-relaxed text-ink-400">
          Ratings quoted as recorded by the school&apos;s appraisers under {SOURCE_CITATION}. The
          tool never asserts what a score should have been.
        </p>
        <div className="mt-4">
          <Link href="/e1" className="text-[13.5px] font-medium text-accent hover:underline">
            Build the E1 summative sheet from these scores →
          </Link>
        </div>
      </section>
    </div>
  );
}
