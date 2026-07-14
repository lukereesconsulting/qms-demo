import type { CycleStatus } from "@/lib/school";

const STATUS_STYLES: Record<CycleStatus, { bg: string; text: string; label: string }> = {
  "not-started": { bg: "bg-tint-neutral", text: "text-tag-neutral-text", label: "Not started" },
  "in-progress": { bg: "bg-tint-amber", text: "text-tag-amber-text", label: "In progress" },
  submitted: { bg: "bg-tint-green", text: "text-tag-green-text", label: "Submitted" },
  signed: { bg: "bg-tint-green-done", text: "text-tag-done-text", label: "Signed" },
};

export function StatusTag({ status }: { status: CycleStatus }) {
  const s = STATUS_STYLES[status];
  return (
    <span
      className={`inline-block rounded-full px-2.5 py-0.5 text-[10.5px] font-semibold uppercase tracking-[0.08em] ${s.bg} ${s.text}`}
    >
      {s.label}
    </span>
  );
}

export function SourceTag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block rounded-full bg-tag-source-bg px-2.5 py-0.5 text-[10.5px] font-semibold uppercase tracking-[0.08em] text-tag-source-text">
      {children}
    </span>
  );
}
