import Link from "next/link";
import { DEPARTMENTS, EDUCATORS, SCHOOL, APPRAISERS, statusCounts, educatorTotal } from "@/lib/school";
import { MAX_TOTAL, percentage } from "@/lib/instrument";
import { StatusTag } from "@/components/Tag";

export default function RosterPage() {
  const counts = statusCounts();
  return (
    <div className="mx-auto max-w-5xl">
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-400">
        {SCHOOL.name} · {SCHOOL.cycle}
      </p>
      <h1 className="mt-2 text-[26px] leading-tight md:text-[30px]">Roster &amp; cycle</h1>
      <p className="mt-2 max-w-2xl text-[13.5px] leading-relaxed text-ink-500">
        Every PL1 educator, and where their appraisal stands. This is the page the coordinator lives
        on in June and November.
      </p>

      <div className="mt-5 flex flex-wrap gap-2 text-[12.5px]">
        <span className="rounded-full bg-tint-green-done px-3 py-1 font-medium text-tag-done-text">
          {counts.signed} signed
        </span>
        <span className="rounded-full bg-tint-green px-3 py-1 font-medium text-tag-green-text">
          {counts.submitted} submitted
        </span>
        <span className="rounded-full bg-tint-amber px-3 py-1 font-medium text-tag-amber-text">
          {counts["in-progress"]} in progress
        </span>
        <span className="rounded-full bg-tint-neutral px-3 py-1 font-medium text-tag-neutral-text">
          {counts["not-started"]} not started
        </span>
      </div>

      <div className="mt-6 space-y-6">
        {DEPARTMENTS.map((dept) => {
          const rows = EDUCATORS.filter((e) => e.department === dept);
          return (
            <section key={dept} className="overflow-hidden rounded-lg border border-line bg-white">
              <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-line bg-tint-faint/70 px-4 py-2.5">
                <h2 className="text-[15px] font-medium">{dept}</h2>
                <span className="text-[11.5px] text-ink-400">Appraiser: {APPRAISERS[dept]}</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[560px] text-[13px]">
                  <thead>
                    <tr className="border-b border-line text-left text-[10.5px] uppercase tracking-[0.1em] text-ink-400">
                      <th className="px-4 py-2 font-semibold">Educator</th>
                      <th className="px-4 py-2 font-semibold">Subjects / grade</th>
                      <th className="px-4 py-2 font-semibold">Persal</th>
                      <th className="px-4 py-2 font-semibold">Status</th>
                      <th className="px-4 py-2 text-right font-semibold">Mid-year score</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((e) => {
                      const total = educatorTotal(e);
                      return (
                        <tr key={e.id} className="border-b border-line last:border-b-0">
                          <td className="px-4 py-2.5 font-medium text-ink-900">
                            {e.initials} {e.surname}
                          </td>
                          <td className="px-4 py-2.5 text-ink-500">{e.subjects}</td>
                          <td className="px-4 py-2.5 tabular-nums text-ink-500">{e.persal}</td>
                          <td className="px-4 py-2.5">
                            <StatusTag status={e.status} />
                          </td>
                          <td className="px-4 py-2.5 text-right tabular-nums">
                            {total !== null ? (
                              <span className="font-medium text-ink-900">
                                {total}
                                <span className="text-ink-400"> / {MAX_TOTAL}</span>
                                <span className="ml-2 text-ink-500">{percentage(total)}%</span>
                              </span>
                            ) : (
                              <span className="text-ink-400">—</span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </section>
          );
        })}
      </div>

      <div className="mt-8 flex gap-5">
        <Link href="/insights" className="text-[13.5px] font-medium text-accent hover:underline">
          What do these scores say about the school? →
        </Link>
        <Link href="/e1" className="text-[13.5px] font-medium text-accent hover:underline">
          Build the E1 summary →
        </Link>
      </div>
    </div>
  );
}
