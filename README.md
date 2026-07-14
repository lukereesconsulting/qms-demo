# QMS demo

A thin, credible demo of a Quality Management System (QMS) tool for South African
school-based educators — the statutory teacher-appraisal system under **ELRC Collective
Agreement 2 of 2020**. Built to walk into one school and show the incoming QMS
administrator what capture-without-arithmetic and "here's where the school needs to
improve" could look like. Presented as a starting point, not a product.

**Live:** https://qms-demo-nine.vercel.app

## What's in the demo

- **Three ingest doors** (`/`): *Complete in tool* (fully working), *Upload a completed
  form* and *Scan handwritten* (both land on a canned confirm-what-I-read worked example).
- **PL1 instrument capture** (`/capture`): the full Post Level 1 instrument — 5
  performance standards, 12 criteria, 38 descriptors rendered **verbatim** from the
  agreement — with 1–4 selectors, live per-standard and overall totals, the rating-scale
  wording quoted at the point of judgement, and an Annexure A2-style composite sheet.
- **Confirm what I read** (`/confirm`): a manufactured phone-photo of the real paper
  form side-by-side with the parsed reading; two genuinely ambiguous cells surfaced as
  questions, plus an arithmetic check against the handwritten total.
- **Roster & cycle** (`/roster`): every educator × status for the cycle.
- **Intelligence** (`/insights`): bottom-two standards, department × standard heat grid
  with named-educator drill-down, and a credibility view — each headed by a
  plain-language sentence.
- **E1 summative sheet** (`/e1`): Annexure E1 auto-built from the scores, with the
  district export stubbed.

All school data is seeded and fictional. Educator data only; no children's data.

## Running it

```bash
npm install
npm run dev   # http://localhost:3000
```

Deploy: `vercel deploy --prod` (own Vercel project `qms-demo` — isolated from any other
product; see AGENTS.md for the isolation and verbatim rules).

## Source of truth

Instrument wording: ELRC Collective Agreement No. 2 of 2020, *Quality Management System
(QMS) for School Based Educators* — Section B (PL1, pp. 23–33), Annexures A1/A2 and E1.
Do not paraphrase instrument text; see [AGENTS.md](AGENTS.md).
