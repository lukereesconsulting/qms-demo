"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  INSTRUMENT,
  RATING_SCALE,
  MAX_TOTAL,
  SOURCE_CITATION,
  ratingForTotal,
  percentage,
} from "@/lib/instrument";
import { EDUCATORS, SCHOOL } from "@/lib/school";

type Scores = Record<string, 1 | 2 | 3 | 4 | undefined>;

const RATING_TINT: Record<number, string> = {
  1: "data-[on=true]:bg-tint-red data-[on=true]:text-tag-red-text data-[on=true]:border-status-red",
  2: "data-[on=true]:bg-tint-amber data-[on=true]:text-tag-amber-text data-[on=true]:border-status-amber",
  3: "data-[on=true]:bg-tint-green data-[on=true]:text-tag-green-text data-[on=true]:border-status-green",
  4: "data-[on=true]:bg-tint-green-done data-[on=true]:text-tag-done-text data-[on=true]:border-status-green-done",
};

export default function CapturePage() {
  const candidates = EDUCATORS.filter((e) => e.status === "not-started" || e.status === "in-progress");
  const [educatorId, setEducatorId] = useState(candidates[0]?.id ?? "");
  const educator = EDUCATORS.find((e) => e.id === educatorId);
  const [scores, setScores] = useState<Scores>({});
  const [remarks, setRemarks] = useState<Record<string, string>>({});
  const [openRemark, setOpenRemark] = useState<Record<string, boolean>>({});
  const [showScale, setShowScale] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const totals = useMemo(() => {
    const perStandard = INSTRUMENT.map((ps) => {
      let total = 0;
      let answered = 0;
      let count = 0;
      for (const c of ps.criteria)
        for (const d of c.descriptors) {
          count++;
          const v = scores[d.key];
          if (v) {
            total += v;
            answered++;
          }
        }
      return { ps, total, answered, count };
    });
    const overall = perStandard.reduce((s, x) => s + x.total, 0);
    const answered = perStandard.reduce((s, x) => s + x.answered, 0);
    const count = perStandard.reduce((s, x) => s + x.count, 0);
    return { perStandard, overall, answered, count };
  }, [scores]);

  const complete = totals.answered === totals.count;

  function setScore(key: string, v: 1 | 2 | 3 | 4) {
    setSubmitted(false);
    setScores((s) => ({ ...s, [key]: s[key] === v ? undefined : v }));
  }

  return (
    <div className="mx-auto max-w-3xl pb-28">
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-400">
        Appraisal instrument · Educator: Post Level 1 · {SCHOOL.cycle}
      </p>
      <h1 className="mt-2 text-[26px] leading-tight md:text-[30px]">
        Quality Management System (QMS) — Appraisal Instrument
      </h1>
      <p className="mt-2 text-[13px] leading-relaxed text-ink-500">
        Rendered verbatim from {SOURCE_CITATION}, Annexure A 1. Educator to be rated for each
        descriptor. The totals below add themselves up as you go.
      </p>

      {/* Section A */}
      <div className="mt-6 rounded-lg border border-line bg-white p-5">
        <div className="text-[10.5px] font-semibold uppercase tracking-[0.14em] text-ink-400">
          Section A · Educator and school information
        </div>
        <div className="mt-3 grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="text-[12px] font-medium text-ink-500">Appraisee</span>
            <select
              value={educatorId}
              onChange={(e) => {
                setEducatorId(e.target.value);
                setScores({});
                setRemarks({});
                setSubmitted(false);
              }}
              className="mt-1 w-full rounded-md border border-line bg-white px-3 py-2 text-[14px] text-ink-900"
            >
              {candidates.map((e) => (
                <option key={e.id} value={e.id}>
                  {e.fullName} — {e.subjects}
                </option>
              ))}
            </select>
          </label>
          <div className="grid grid-cols-2 gap-4 text-[13px]">
            <div>
              <div className="text-[12px] font-medium text-ink-500">Persal number</div>
              <div className="mt-1.5 text-ink-900">{educator?.persal}</div>
            </div>
            <div>
              <div className="text-[12px] font-medium text-ink-500">Appraiser</div>
              <div className="mt-1.5 text-ink-900">{educator?.appraiser}</div>
            </div>
            <div className="col-span-2">
              <div className="text-[12px] font-medium text-ink-500">School</div>
              <div className="mt-1.5 text-ink-900">
                {SCHOOL.name} · {SCHOOL.circuit}, {SCHOOL.district}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* rating scale */}
      <div className="mt-4 rounded-lg border border-line bg-white">
        <button
          onClick={() => setShowScale((v) => !v)}
          className="flex w-full items-center justify-between px-5 py-3 text-left"
        >
          <span className="text-[13px] font-medium text-ink-900">
            The 4-point rating scale — what each score means
          </span>
          <span className="text-ink-400">{showScale ? "−" : "+"}</span>
        </button>
        {showScale && (
          <div className="border-t border-line px-5 py-4">
            <ul className="space-y-3">
              {RATING_SCALE.map((r) => (
                <li key={r.rating} className="flex gap-3">
                  <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-line text-[12.5px] font-semibold text-ink-900">
                    {r.rating}
                  </span>
                  <p className="serif-quote text-[14px] leading-relaxed text-ink-700">
                    <strong className="not-italic font-sans text-[13px] font-semibold text-ink-900">
                      {r.label}:
                    </strong>{" "}
                    {r.descriptor}
                  </p>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-[11px] text-ink-400">{SOURCE_CITATION} · § 4.1</p>
          </div>
        )}
      </div>

      {/* Section B */}
      <div className="mt-6 space-y-8">
        {INSTRUMENT.map((ps) => {
          const t = totals.perStandard.find((x) => x.ps.key === ps.key)!;
          return (
            <section key={ps.key} className="rounded-lg border border-line bg-white">
              <div className="flex items-baseline justify-between gap-3 border-b border-line px-5 py-4">
                <div>
                  <div className="text-[10.5px] font-semibold uppercase tracking-[0.14em] text-ink-400">
                    Performance Standard {ps.number}
                  </div>
                  <h2 className="mt-1 text-[19px] leading-snug">{ps.title}</h2>
                </div>
                <div className="shrink-0 text-right">
                  <div className="text-[19px] font-medium text-accent tabular-nums">
                    {t.total}
                    <span className="text-[13px] text-ink-400"> / {ps.maxScore}</span>
                  </div>
                  <div className="text-[11px] text-ink-400 tabular-nums">
                    {t.answered}/{t.count} rated
                  </div>
                </div>
              </div>

              {ps.criteria.map((c) => (
                <div key={c.key} className="border-b border-line px-5 py-4 last:border-b-0">
                  <div className="text-[13.5px] font-semibold text-ink-900">
                    Criterion {c.number}: {c.title}
                  </div>
                  <p className="serif-quote mt-2 border-l-2 border-brand pl-3 text-[13.5px] leading-relaxed text-ink-700">
                    “{c.desiredOutcome}”
                  </p>
                  <p className="mt-1 pl-3 text-[10.5px] text-ink-400">
                    The desired outcome · {SOURCE_CITATION}, Table 1
                  </p>

                  <ul className="mt-4 space-y-3">
                    {c.descriptors.map((d) => {
                      const v = scores[d.key];
                      const level = v ? RATING_SCALE[v - 1] : null;
                      return (
                        <li key={d.key} className="rounded-md bg-tint-faint/60 p-3">
                          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                            <div className="text-[13.5px] leading-snug text-ink-900">
                              <span className="mr-1.5 text-ink-400">{d.letter}.</span>
                              {d.text}
                            </div>
                            <div className="flex shrink-0 gap-1.5">
                              {[1, 2, 3, 4].map((n) => (
                                <button
                                  key={n}
                                  data-on={v === n}
                                  onClick={() => setScore(d.key, n as 1 | 2 | 3 | 4)}
                                  className={`h-9 w-9 rounded-md border border-line bg-white text-[14px] font-medium text-ink-500 transition-colors hover:border-ink-400 ${RATING_TINT[n]}`}
                                  aria-label={`Rate ${n}`}
                                >
                                  {n}
                                </button>
                              ))}
                            </div>
                          </div>
                          {level && (
                            <p className="mt-2 text-[11.5px] leading-relaxed text-ink-500">
                              <span className="font-semibold">
                                {level.rating} — {level.label}:
                              </span>{" "}
                              <span className="serif-quote">{level.descriptor}</span>
                            </p>
                          )}
                        </li>
                      );
                    })}
                  </ul>

                  <div className="mt-3">
                    {openRemark[c.key] ? (
                      <textarea
                        value={remarks[c.key] ?? ""}
                        onChange={(e) => setRemarks((r) => ({ ...r, [c.key]: e.target.value }))}
                        placeholder="Remark (optional) — in the appraiser's words"
                        rows={2}
                        className="w-full rounded-md border border-line bg-white px-3 py-2 text-[13px] text-ink-900 placeholder:text-ink-400"
                      />
                    ) : (
                      <button
                        onClick={() => setOpenRemark((o) => ({ ...o, [c.key]: true }))}
                        className="text-[12px] font-medium text-accent hover:underline"
                      >
                        + Add a remark for this criterion
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </section>
          );
        })}
      </div>

      {/* composite result */}
      {submitted && complete && (
        <div className="mt-8 rounded-lg border border-brand/40 bg-white p-6">
          <div className="text-[10.5px] font-semibold uppercase tracking-[0.14em] text-ink-400">
            Composite score sheet · Annexure A 2
          </div>
          <h2 className="mt-1 text-[21px]">{educator?.fullName}</h2>
          <table className="mt-4 w-full text-[13.5px]">
            <tbody>
              {totals.perStandard.map(({ ps, total }) => (
                <tr key={ps.key} className="border-b border-line">
                  <td className="py-2 pr-3 text-ink-700">
                    {ps.number}. {ps.title}
                  </td>
                  <td className="py-2 text-right tabular-nums text-ink-400">/{ps.maxScore}</td>
                  <td className="w-16 py-2 text-right font-medium tabular-nums text-ink-900">
                    {total}
                  </td>
                </tr>
              ))}
              <tr>
                <td className="py-2.5 font-semibold text-ink-900">Final score</td>
                <td className="py-2.5 text-right tabular-nums text-ink-400">/{MAX_TOTAL}</td>
                <td className="py-2.5 text-right text-[17px] font-semibold tabular-nums text-accent">
                  {totals.overall}
                </td>
              </tr>
            </tbody>
          </table>
          <p className="mt-2 text-[13.5px] text-ink-700">
            Percentage: <strong>{percentage(totals.overall)}%</strong> · Overall rating band:{" "}
            <strong>
              {ratingForTotal(totals.overall).rating} — {ratingForTotal(totals.overall).label}
            </strong>
          </p>
          <p className="serif-quote mt-3 border-l-2 border-brand pl-3 text-[13.5px] leading-relaxed text-ink-700">
            “{ratingForTotal(totals.overall).descriptor}”
          </p>
          <p className="mt-4 text-[12px] leading-relaxed text-ink-500">
            In the full product this now goes to the educator to agree or disagree, then to the
            principal to validate — the same signatures the paper form carries. The scores stay the
            appraiser&apos;s own.
          </p>
          <div className="mt-4 flex gap-4">
            <Link href="/roster" className="text-[13px] font-medium text-accent hover:underline">
              Back to the roster →
            </Link>
            <Link href="/insights" className="text-[13px] font-medium text-accent hover:underline">
              See what the school&apos;s scores say →
            </Link>
          </div>
        </div>
      )}

      {/* sticky running total */}
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-white/95 backdrop-blur md:left-60">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-4 px-4 py-3 md:px-0">
          <div className="min-w-0">
            <div className="text-[11px] uppercase tracking-[0.12em] text-ink-400">Running total</div>
            <div className="text-[19px] font-medium tabular-nums text-accent">
              {totals.overall}
              <span className="text-[13px] text-ink-400"> / {MAX_TOTAL}</span>
              <span className="ml-3 text-[13px] text-ink-500">
                {percentage(totals.overall)}% · {totals.answered}/{totals.count} descriptors rated
              </span>
            </div>
          </div>
          <button
            onClick={() => setSubmitted(true)}
            disabled={!complete}
            className="shrink-0 rounded-md bg-accent px-4 py-2 text-[13.5px] font-medium text-white disabled:cursor-not-allowed disabled:opacity-40"
          >
            {complete ? "Build the score sheet" : "Rate every descriptor to finish"}
          </button>
        </div>
      </div>
    </div>
  );
}
