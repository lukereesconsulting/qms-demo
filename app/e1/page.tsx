import { INSTRUMENT, MAX_TOTAL, percentage } from "@/lib/instrument";
import { EDUCATORS, SCHOOL, standardTotal, educatorTotal, bottomTwoStandards } from "@/lib/school";
import { StatusTag } from "@/components/Tag";

export default function E1Page() {
  const bottom = bottomTwoStandards();
  const weakest = INSTRUMENT.find((ps) => ps.key === bottom[0].psKey)!;

  return (
    <div className="mx-auto max-w-5xl">
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-400">
        Annexure E 1 · Summative scores for school
      </p>
      <h1 className="mt-2 text-[26px] leading-tight md:text-[30px]">
        Quality Management System for Educators — Summative Scores for School
      </h1>
      <p className="mt-2 max-w-2xl text-[13.5px] leading-relaxed text-ink-500">
        The sheet the district asks for, built automatically from the appraisals as they come in.
        No re-typing, no re-adding. Educators still mid-cycle appear with their status instead of a
        premature number.
      </p>

      <div className="mt-6 grid gap-3 rounded-lg border border-line bg-white p-5 text-[13px] sm:grid-cols-4">
        <div>
          <div className="text-[11px] font-medium uppercase tracking-[0.1em] text-ink-400">School Name</div>
          <div className="mt-0.5 font-medium text-ink-900">{SCHOOL.name}</div>
        </div>
        <div>
          <div className="text-[11px] font-medium uppercase tracking-[0.1em] text-ink-400">EMIS Number</div>
          <div className="mt-0.5 tabular-nums text-ink-900">{SCHOOL.emis}</div>
        </div>
        <div>
          <div className="text-[11px] font-medium uppercase tracking-[0.1em] text-ink-400">Circuit</div>
          <div className="mt-0.5 text-ink-900">{SCHOOL.circuit}</div>
        </div>
        <div>
          <div className="text-[11px] font-medium uppercase tracking-[0.1em] text-ink-400">District</div>
          <div className="mt-0.5 text-ink-900">{SCHOOL.district}</div>
        </div>
      </div>

      <div className="mt-4 overflow-hidden rounded-lg border border-line bg-white">
        <div className="border-b border-line bg-tint-faint/70 px-4 py-2.5 text-[13px] font-medium text-ink-900">
          Teachers (Post Level 1) · {SCHOOL.cycle}
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[820px] text-[12.5px]">
            <thead>
              <tr className="border-b border-line text-left text-[10px] uppercase tracking-[0.08em] text-ink-400">
                <th className="px-3 py-2 font-semibold">Surname &amp; initials</th>
                <th className="px-3 py-2 font-semibold">Persal No.</th>
                <th className="px-3 py-2 font-semibold">Post Level</th>
                {INSTRUMENT.map((ps) => (
                  <th key={ps.key} className="px-2 py-2 text-center font-semibold">
                    PS {ps.number}
                    <span className="block font-normal normal-case text-ink-400">({ps.maxScore})</span>
                  </th>
                ))}
                <th className="px-2 py-2 text-center font-semibold">
                  Total
                  <span className="block font-normal normal-case text-ink-400">({MAX_TOTAL})</span>
                </th>
                <th className="px-2 py-2 text-center font-semibold">%</th>
                <th className="px-3 py-2 font-semibold">Identified development need</th>
              </tr>
            </thead>
            <tbody>
              {EDUCATORS.map((e) => {
                const total = educatorTotal(e);
                // the educator's own weakest standard, as their development-need suggestion
                let need: string | null = null;
                if (total !== null) {
                  let worst: { title: string; frac: number } | null = null;
                  for (const ps of INSTRUMENT) {
                    const t = standardTotal(e, ps.key);
                    if (t !== null) {
                      const frac = t / ps.maxScore;
                      if (!worst || frac < worst.frac) worst = { title: ps.shortTitle, frac };
                    }
                  }
                  need = worst?.title ?? null;
                }
                return (
                  <tr key={e.id} className="border-b border-line last:border-b-0">
                    <td className="px-3 py-2 font-medium text-ink-900">
                      {e.surname}, {e.initials}
                    </td>
                    <td className="px-3 py-2 tabular-nums text-ink-500">{e.persal}</td>
                    <td className="px-3 py-2 text-ink-500">PL1</td>
                    {INSTRUMENT.map((ps) => {
                      const t = standardTotal(e, ps.key);
                      return (
                        <td key={ps.key} className="px-2 py-2 text-center tabular-nums text-ink-700">
                          {t ?? "·"}
                        </td>
                      );
                    })}
                    <td className="px-2 py-2 text-center font-semibold tabular-nums text-ink-900">
                      {total ?? "·"}
                    </td>
                    <td className="px-2 py-2 text-center tabular-nums text-ink-700">
                      {total !== null ? `${percentage(total)}%` : "·"}
                    </td>
                    <td className="px-3 py-2">
                      {total !== null ? (
                        <span className="text-ink-500">{need}</span>
                      ) : (
                        <StatusTag status={e.status} />
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <div className="rounded-lg border border-line bg-white p-5">
          <div className="text-[10.5px] font-semibold uppercase tracking-[0.14em] text-ink-400">
            What this sheet suggests
          </div>
          <p className="serif-quote mt-2 border-l-2 border-brand pl-3 text-[14px] leading-relaxed text-ink-700">
            The development needs identified most often point at {weakest.title.toLowerCase()} —
            the same standard the school-wide view puts at the bottom.
          </p>
          <p className="mt-2 text-[12px] leading-relaxed text-ink-500">
            The “identified development need” column is suggested from each educator&apos;s own
            weakest standard — the appraiser can accept it, change it, or write their own before
            anything is submitted.
          </p>
        </div>
        <div className="rounded-lg border border-dashed border-ink-400/50 bg-tint-faint/60 p-5">
          <div className="text-[10.5px] font-semibold uppercase tracking-[0.14em] text-ink-400">
            Export · stub
          </div>
          <p className="mt-2 text-[13.5px] leading-relaxed text-ink-700">
            Your district&apos;s Excel sheet plugs in here — we&apos;ll match it to your exact
            format.
          </p>
          <p className="mt-2 text-[12px] leading-relaxed text-ink-500">
            Districts differ in the layout they want E1 data in. Bring one example of what{" "}
            {SCHOOL.district} asks for, and the export will produce it exactly — signatures page,
            stamps block and all.
          </p>
          <button
            disabled
            className="mt-3 cursor-not-allowed rounded-md border border-line bg-white px-4 py-2 text-[13px] font-medium text-ink-400"
          >
            Export for district (coming with your format)
          </button>
        </div>
      </div>

      <p className="mt-6 pb-8 text-[11.5px] leading-relaxed text-ink-400">
        Layout mirrors Annexure E 1 of Collective Agreement 2 of 2020 (Summative Scores for School).
        Departmental Heads, Deputy Principal and Principal sections join as those instruments come
        into the tool.
      </p>
    </div>
  );
}
