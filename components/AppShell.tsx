"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SCHOOL } from "@/lib/school";

const NAV = [
  {
    group: "Capture",
    items: [
      { href: "/", label: "New appraisal" },
      { href: "/confirm", label: "Check a scan" },
    ],
  },
  {
    group: "School",
    items: [
      { href: "/roster", label: "Roster & cycle" },
      { href: "/insights", label: "Where to improve" },
    ],
  },
  {
    group: "Deliver",
    items: [{ href: "/e1", label: "E1 · Summative scores" }],
  },
];

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <div className="flex min-h-screen">
      {/* sidebar (desktop) */}
      <aside className="hidden md:flex w-60 shrink-0 flex-col border-r border-line bg-tint-faint/60 px-5 py-6">
        <Link href="/" className="block">
          <div className="font-serif text-[26px] leading-none text-accent tracking-tight">QMS</div>
          <div className="mt-1 text-[11px] uppercase tracking-[0.14em] text-ink-400">
            School-based educators
          </div>
        </Link>
        <nav className="mt-8 flex-1 space-y-6">
          {NAV.map((g) => (
            <div key={g.group}>
              <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-400">
                {g.group}
              </div>
              <ul className="mt-2 space-y-0.5">
                {g.items.map((item) => {
                  const active = pathname === item.href;
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={`block rounded-md px-2.5 py-1.5 text-[13.5px] ${
                          active
                            ? "bg-white text-accent shadow-[0_1px_0_rgba(31,42,58,0.06)] border border-line font-medium"
                            : "text-ink-500 hover:text-ink-900 hover:bg-white/60"
                        }`}
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>
        <div className="mt-6 border-t border-line pt-4 text-[11.5px] leading-relaxed text-ink-400">
          <div className="font-medium text-ink-500">{SCHOOL.name}</div>
          <div>
            {SCHOOL.district} · {SCHOOL.province}
          </div>
          <div className="mt-2 italic">Demo — seeded data, a starting point.</div>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        {/* top bar (mobile) */}
        <header className="md:hidden sticky top-0 z-20 border-b border-line bg-canvas/95 backdrop-blur px-4 py-3">
          <div className="flex items-center justify-between">
            <Link href="/" className="font-serif text-xl text-accent">
              QMS
            </Link>
            <nav className="flex gap-3 text-[12.5px] text-ink-500">
              <Link href="/roster" className={pathname === "/roster" ? "text-accent font-medium" : ""}>
                Roster
              </Link>
              <Link href="/insights" className={pathname === "/insights" ? "text-accent font-medium" : ""}>
                Insights
              </Link>
              <Link href="/e1" className={pathname === "/e1" ? "text-accent font-medium" : ""}>
                E1
              </Link>
            </nav>
          </div>
        </header>
        <main className="flex-1 px-4 py-6 md:px-10 md:py-8">{children}</main>
      </div>
    </div>
  );
}
