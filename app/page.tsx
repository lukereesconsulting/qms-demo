import Link from "next/link";
import { SCHOOL, statusCounts, EDUCATORS } from "@/lib/school";
import { SOURCE_CITATION } from "@/lib/instrument";

const DOORS = [
  {
    href: "/capture",
    title: "Complete in the tool",
    body: "Work through the PL1 instrument together on screen. Every descriptor is quoted verbatim; the arithmetic does itself.",
    hint: "Fully working",
    accent: true,
  },
  {
    href: "/confirm?via=upload",
    title: "Upload a completed form",
    body: "A PDF or Word version of the instrument, already filled in. The tool reads it and shows you what it read before anything counts.",
    hint: "Worked example",
    accent: false,
  },
  {
    href: "/confirm?via=scan",
    title: "Scan a handwritten form",
    body: "Photograph the paper instrument with a phone. The tool reads the crosses and shows its reading next to the original for you to confirm.",
    hint: "Worked example",
    accent: false,
  },
];

export default function Home() {
  const counts = statusCounts();
  const done = counts.submitted + counts.signed;
  return (
    <div className="mx-auto max-w-3xl">
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-400">
        {SCHOOL.name} · {SCHOOL.cycle}
      </p>
      <h1 className="mt-2 text-[30px] leading-tight md:text-[36px]">
        How would you like to bring an appraisal in?
      </h1>
      <p className="mt-3 max-w-xl text-[14.5px] leading-relaxed text-ink-500">
        However the form arrives — on screen, as a file, or on paper — it lands in the same place:
        checked, added up, and on the school summary. Nothing counts until a person has confirmed it.
      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {DOORS.map((d) => (
          <Link
            key={d.href}
            href={d.href}
            className={`group flex flex-col rounded-lg border bg-white p-5 transition-shadow hover:shadow-[0_2px_12px_rgba(31,42,58,0.08)] ${
              d.accent ? "border-brand/40" : "border-line"
            }`}
          >
            <span
              className={`text-[10px] font-semibold uppercase tracking-[0.12em] ${
                d.accent ? "text-brand" : "text-ink-400"
              }`}
            >
              {d.hint}
            </span>
            <h2 className="mt-2 text-[19px] leading-snug group-hover:underline decoration-line underline-offset-4">
              {d.title}
            </h2>
            <p className="mt-2 flex-1 text-[13px] leading-relaxed text-ink-500">{d.body}</p>
            <span className="mt-4 text-[13px] font-medium text-accent">Open →</span>
          </Link>
        ))}
      </div>

      <div className="mt-10 rounded-lg border border-line bg-tint-faint/70 p-5">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <div className="text-[13.5px] text-ink-500">
            This cycle: <span className="font-semibold text-ink-900">{done}</span> of{" "}
            <span className="font-semibold text-ink-900">{EDUCATORS.length}</span> educators
            submitted or signed · {counts["in-progress"]} in progress · {counts["not-started"]} not
            started
          </div>
          <Link href="/roster" className="text-[13px] font-medium text-accent hover:underline">
            Open the roster →
          </Link>
        </div>
      </div>

      <p className="mt-8 text-[11.5px] leading-relaxed text-ink-400">
        The instrument, criteria and rating descriptors are rendered verbatim from {SOURCE_CITATION}.
        This demonstration runs on a seeded, fictional school.
      </p>
    </div>
  );
}
