"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { INSTRUMENT } from "@/lib/instrument";

// The canned worked example: what the reader made of the sample scan in /public/scan-sample.jpg.
// Two cells are genuinely ambiguous on the page; they are surfaced for a person to decide.
const PARSED: Record<string, number> = {
  "1.1.a": 3, "1.1.b": 3, "1.1.c": 2,
  "1.2.a": 4, "1.2.b": 3, "1.2.c": 3, "1.2.d": 2,
  "2.1.a": 3, "2.1.b": 3, "2.1.c": 2,
  "2.2.a": 3, "2.2.b": 2, "2.2.c": 3, "2.2.d": 2, "2.2.e": 3,
  "2.3.a": 2, "2.3.b": 3,
  "2.4.a": 3, "2.4.b": 3,
};

const LOW_CONFIDENCE: Record<string, { readAs: number; alternative: number; why: string }> = {
  "1.2.a": {
    readAs: 4,
    alternative: 3,
    why: "The cross sits on the line between 3 and 4.",
  },
  "2.3.a": {
    readAs: 2,
    alternative: 3,
    why: "Heavy ink — the digit under the cross is hard to make out.",
  },
};

// what the appraiser wrote in the Total boxes on paper
const HANDWRITTEN_TOTALS: Record<string, number> = { PS1: 19, PS2: 32 };

export default function ConfirmClient({ via }: { via: "scan" | "upload" }) {
  const [overrides, setOverrides] = useState<Record<string, number>>({});
  const [resolved, setResolved] = useState<Record<string, boolean>>({});
  const [filed, setFiled] = useState(false);

  const shown = useMemo(() => ({ ...PARSED, ...overrides }), [overrides]);
  const standards = INSTRUMENT.filter((ps) => ps.key === "PS1" || ps.key === "PS2");

  const totals = useMemo(() => {
    const out: Record<string, number> = {};
    for (const ps of standards) {
      out[ps.key] = ps.criteria.reduce(
        (s, c) => s + c.descriptors.reduce((s2, d) => s2 + (shown[d.key] ?? 0), 0),
        0
      );
    }
    return out;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shown]);

  const unresolvedCount = Object.keys(LOW_CONFIDENCE).filter((k) => !resolved[k]).length;

  function resolve(key: string, value: number) {
    setOverrides((o) => ({ ...o, [key]: value }));
    setResolved((r) => ({ ...r, [key]: true }));
    setFiled(false);
  }

  return (
    <div className="mx-auto max-w-6xl">
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-400">
        {via === "scan" ? "Scan a handwritten form" : "Upload a completed form"} · Worked example
      </p>
      <h1 className="mt-2 text-[26px] leading-tight md:text-[30px]">
        Here&apos;s what I read — please check it
      </h1>
      <p className="mt-2 max-w-2xl text-[13.5px] leading-relaxed text-ink-500">
        {via === "scan"
          ? "A phone photo of the paper instrument, next to what the tool made of it."
          : "The uploaded form, next to what the tool made of it."}{" "}
        Nothing goes onto the roster until a person has confirmed the reading. The two shaded cells
        are ones the tool wasn&apos;t sure about — it asks, rather than guesses.
      </p>
      <p className="mt-2 text-[11.5px] italic text-ink-400">
        Demo note: this is a canned worked example of how {via === "scan" ? "a scan" : "an upload"}{" "}
        lands. The live reading pipeline is a later stage — this screen is the safety net it will
        land in.
      </p>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        {/* the source document */}
        <div className="rounded-lg border border-line bg-white p-3">
          <div className="px-2 pb-2 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-ink-400">
            The paper, as photographed
          </div>
          <div className="max-h-[70vh] overflow-auto rounded border border-line">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/scan-sample.jpg"
              alt="Phone photograph of a completed, handwritten PL1 appraisal instrument"
              className="w-full"
            />
          </div>
        </div>

        {/* the reading */}
        <div className="rounded-lg border border-line bg-white p-3">
          <div className="flex items-baseline justify-between px-2 pb-2">
            <div className="text-[10.5px] font-semibold uppercase tracking-[0.14em] text-ink-400">
              What the tool read · Mid-Year
            </div>
            <div className="text-[11.5px] text-ink-400">Educator: C. van Wyk · Grade 2</div>
          </div>
          <div className="max-h-[70vh] space-y-4 overflow-auto pr-1">
            {standards.map((ps) => (
              <div key={ps.key} className="rounded border border-line">
                <div className="flex items-baseline justify-between border-b border-line bg-tint-faint/70 px-3 py-2">
                  <div className="text-[12.5px] font-semibold text-ink-900">
                    PS{ps.number} · {ps.title}
                  </div>
                  <div className="text-[12.5px] tabular-nums text-ink-500">
                    reads <strong className="text-accent">{totals[ps.key]}</strong> / {ps.maxScore}
                  </div>
                </div>
                {ps.criteria.map((c) => (
                  <div key={c.key} className="border-b border-line px-3 py-2 last:border-b-0">
                    <div className="text-[11px] font-semibold uppercase tracking-[0.08em] text-ink-400">
                      Criterion {c.number}: {c.title}
                    </div>
                    <ul className="mt-1.5 space-y-1">
                      {c.descriptors.map((d) => {
                        const lc = LOW_CONFIDENCE[d.key];
                        const value = shown[d.key];
                        const isOpen = lc && !resolved[d.key];
                        return (
                          <li
                            key={d.key}
                            className={`rounded px-2 py-1.5 ${
                              isOpen
                                ? "bg-tint-amber"
                                : lc && resolved[d.key]
                                  ? "bg-tint-green"
                                  : ""
                            }`}
                          >
                            <div className="flex items-center justify-between gap-3">
                              <span className="min-w-0 text-[12.5px] leading-snug text-ink-700">
                                <span className="mr-1 text-ink-400">{d.letter}.</span>
                                {d.text}
                              </span>
                              <span className="shrink-0 text-[13.5px] font-semibold tabular-nums text-ink-900">
                                {value}
                              </span>
                            </div>
                            {isOpen && (
                              <div className="mt-1.5 text-[12px] leading-relaxed text-tag-amber-text">
                                <span className="font-semibold">Not sure:</span> {lc.why} Read as{" "}
                                {lc.readAs}.
                                <span className="ml-2 inline-flex gap-1.5">
                                  <button
                                    onClick={() => resolve(d.key, lc.readAs)}
                                    className="rounded border border-status-amber bg-white px-2 py-0.5 font-medium hover:bg-tint-faint"
                                  >
                                    Keep {lc.readAs}
                                  </button>
                                  <button
                                    onClick={() => resolve(d.key, lc.alternative)}
                                    className="rounded border border-status-amber bg-white px-2 py-0.5 font-medium hover:bg-tint-faint"
                                  >
                                    It&apos;s a {lc.alternative}
                                  </button>
                                </span>
                              </div>
                            )}
                            {lc && resolved[d.key] && (
                              <div className="mt-1 text-[11.5px] text-tag-green-text">
                                Confirmed by you — recorded as {value}.
                              </div>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))}
                {HANDWRITTEN_TOTALS[ps.key] !== totals[ps.key] && (
                  <div className="border-t border-line bg-tint-red/60 px-3 py-2 text-[12px] leading-relaxed text-tag-red-text">
                    <span className="font-semibold">Arithmetic check:</span> the handwritten total
                    says {HANDWRITTEN_TOTALS[ps.key]}, but the crosses add to {totals[ps.key]}. The
                    tool records the sum of the crosses; the appraiser stays the author of the
                    crosses themselves.
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="sticky bottom-0 mt-6 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-line bg-white/95 p-4 backdrop-blur">
        <div className="text-[13px] text-ink-500">
          {unresolvedCount > 0 ? (
            <>
              <span className="font-semibold text-tag-amber-text">{unresolvedCount}</span> cell
              {unresolvedCount > 1 ? "s" : ""} still need your eye — everything else matched
              cleanly.
            </>
          ) : filed ? (
            <span className="font-medium text-tag-green-text">
              Filed. In the full product this lands on the roster as “submitted”, arithmetic done.
            </span>
          ) : (
            "All readings confirmed — ready to file."
          )}
        </div>
        <div className="flex items-center gap-4">
          <Link href="/" className="text-[13px] font-medium text-accent hover:underline">
            ← Ingest doors
          </Link>
          <button
            onClick={() => setFiled(true)}
            disabled={unresolvedCount > 0}
            className="rounded-md bg-accent px-4 py-2 text-[13.5px] font-medium text-white disabled:cursor-not-allowed disabled:opacity-40"
          >
            Confirm and file
          </button>
        </div>
      </div>
    </div>
  );
}
