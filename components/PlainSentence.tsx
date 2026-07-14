// The plain-language sentence that sits above every intelligence view —
// one sentence a busy principal can read without touching the chart.
export default function PlainSentence({ children }: { children: React.ReactNode }) {
  return (
    <p className="serif-quote border-l-2 border-brand pl-4 text-[17px] leading-relaxed text-ink-900 md:text-[19px]">
      {children}
    </p>
  );
}
