// The PL1 (Post Level 1) educator appraisal instrument, transcribed verbatim from
// ELRC Collective Agreement No. 2 of 2020 — Quality Management System (QMS) for
// School Based Educators: Section B (pp. 23–33) and Annexure A 1 / A 2.
// Wording is quoted, not paraphrased. Do not edit descriptor text.

export const SOURCE_CITATION = "ELRC Collective Agreement 2 of 2020 · QMS for School Based Educators";

export interface Descriptor {
  key: string; // e.g. "1.1.a"
  letter: string;
  text: string;
}

export interface Criterion {
  key: string; // e.g. "1.1"
  number: number;
  title: string;
  desiredOutcome: string; // Table 1, "The desired outcome" — verbatim
  descriptors: Descriptor[];
}

export interface PerformanceStandard {
  key: string; // "PS1"…"PS5"
  number: number;
  title: string;
  shortTitle: string;
  maxScore: number;
  criteria: Criterion[];
}

export interface RatingLevel {
  rating: 1 | 2 | 3 | 4;
  label: string;
  descriptor: string; // verbatim, § 4.1
  scoreBand: string; // out of 152
  percentageBand: string;
}

// § 4.1 Rating Scale, Descriptor, scores and percentages — Post Level 1 Educators
export const RATING_SCALE: RatingLevel[] = [
  {
    rating: 1,
    label: "Unacceptable",
    descriptor:
      "The level of performance does not meet minimum expectations and requires urgent intervention and support",
    scoreBand: "0 – 75",
    percentageBand: "0% - 49%",
  },
  {
    rating: 2,
    label: "Acceptable",
    descriptor:
      "Satisfies minimum expectations. The level of performance is acceptable and is in line with the minimum expectations, but development and support are still required",
    scoreBand: "76 - 105",
    percentageBand: "50% - 69%",
  },
  {
    rating: 3,
    label: "Good",
    descriptor:
      "Performance meets expectations, but some areas are still in need of development and support",
    scoreBand: "106 – 128",
    percentageBand: "70% - 84%",
  },
  {
    rating: 4,
    label: "Outstanding",
    descriptor:
      "Performance exceeds expectations. Although performance is outstanding, continuous self-development and improvement are advised.",
    scoreBand: "129 – 152",
    percentageBand: "85% - 100%",
  },
];

// § 2.8 — factors that influence a rating lower than the desired outcome (verbatim)
export const LOWER_RATING_FACTORS = [
  "There is no or insufficient evidence of a particular desired activity;",
  "The desired activity is infrequent;",
  "The desired activity is frequent but of poorer quality than desired;",
  "The desired activity may be frequent and of reasonable quality but is impacted by a negative attitude",
];

export const INSTRUMENT: PerformanceStandard[] = [
  {
    key: "PS1",
    number: 1,
    title: "Creation of a Positive Learning and Teaching Environment",
    shortTitle: "Positive learning environment",
    maxScore: 28,
    criteria: [
      {
        key: "1.1",
        number: 1,
        title: "Learning and teaching environment",
        desiredOutcome:
          "The use of learning and teaching environment enables all learners to be productively engaged in individual and cooperative learning.",
        descriptors: [
          { key: "1.1.a", letter: "a", text: "Seating arrangement promotes effective teaching and learning" },
          { key: "1.1.b", letter: "b", text: "Classroom is tidy and clean" },
          {
            key: "1.1.c",
            letter: "c",
            text: "Teaching and learning support material (e.g. charts) are displayed and used in the classroom.",
          },
        ],
      },
      {
        key: "1.2",
        number: 2,
        title: "Classroom Management",
        desiredOutcome:
          "Time and available resources are managed to promote optimal learning and teaching for all learners. Activities are efficiently supervised. Learners work together with the educator towards the achievement of relevant learning outcomes.",
        descriptors: [
          { key: "1.2.a", letter: "a", text: "Is punctual and organized in class" },
          { key: "1.2.b", letter: "b", text: "Ensures that learners are punctual and settle down quickly" },
          {
            key: "1.2.c",
            letter: "c",
            text: "Communication between educator and learners reflects the mutual respect, cooperation and understanding",
          },
          { key: "1.2.d", letter: "d", text: "Manages discipline effectively" },
        ],
      },
    ],
  },
  {
    key: "PS2",
    number: 2,
    title: "Curriculum Knowledge, Lesson Planning and Presentation",
    shortTitle: "Curriculum & lesson planning",
    maxScore: 48,
    criteria: [
      {
        key: "2.1",
        number: 1,
        title: "Knowledge of subject",
        desiredOutcome:
          "Uses expert knowledge, in addition to Outcomes and Assessment Standards, to promote learner interest and research in the specific Learning Area/Subject.",
        descriptors: [
          { key: "2.1.a", letter: "a", text: "Has adequate subject knowledge and uses it effectively" },
          { key: "2.1.b", letter: "b", text: "Sets appropriate tasks for learners at the level of the Grade" },
          {
            key: "2.1.c",
            letter: "c",
            text: "Uses a variety of examples, LTSM and other teaching resources to facilitate learning",
          },
        ],
      },
      {
        key: "2.2",
        number: 2,
        title: "Planning and presentation",
        desiredOutcome:
          "Effective use of planning instruments leads towards a higher form of learning/ understanding.",
        descriptors: [
          { key: "2.2.a", letter: "a", text: "The lesson is logical, coherent and meaningful to learners" },
          { key: "2.2.b", letter: "b", text: "The lesson is built on past knowledge and experience of learners" },
          { key: "2.2.c", letter: "c", text: "Time is well-managed during lesson presentation" },
          {
            key: "2.2.d",
            letter: "d",
            text: "Encourages interactive learning including class discussions, learner questions and demonstrations",
          },
          { key: "2.2.e", letter: "e", text: "Responds appropriately to learner questions and inputs" },
        ],
      },
      {
        key: "2.3",
        number: 3,
        title: "Management of work schedule",
        desiredOutcome:
          "Excellent management of content and context within the timeframes stipulated in the Work Schedule accompanied by relevant intervention strategies.",
        descriptors: [
          {
            key: "2.3.a",
            letter: "a",
            text: "The pace of the work is in line with time frames stipulated in the work schedule",
          },
          { key: "2.3.b", letter: "b", text: "Number of tasks and activities are in line with CAPS" },
        ],
      },
      {
        key: "2.4",
        number: 4,
        title: "Record-keeping",
        desiredOutcome:
          "Records are meticulously maintained and analysed to diagnose learner needs and teaching effectiveness. Records are used to adjust teaching strategies and improve learner achievement",
        descriptors: [
          { key: "2.4.a", letter: "a", text: "File/files neatly kept, organized and updated regularly" },
          {
            key: "2.4.b",
            letter: "b",
            text: "Records of learner assessments are neatly kept, organized and updated regularly",
          },
        ],
      },
    ],
  },
  {
    key: "PS3",
    number: 3,
    title: "Learner Assessment and Achievement",
    shortTitle: "Learner assessment & achievement",
    maxScore: 28,
    criteria: [
      {
        key: "3.1",
        number: 1,
        title: "Feedback to learners",
        desiredOutcome:
          "Provides feedback using a variety of strategies. Uses remedial and enrichment measures that instil confidence in learners to achieve intended learning outcomes.",
        descriptors: [
          { key: "3.1.a", letter: "a", text: "Assessment tasks are marked and returned to learners timeously" },
          { key: "3.1.b", letter: "b", text: "Feedback is meaningful and regular" },
          { key: "3.1.c", letter: "c", text: "Feedback is incorporated in future lesson planning" },
        ],
      },
      {
        key: "3.2",
        number: 2,
        title: "Knowledge and application of forms of assessment",
        desiredOutcome:
          "Knows and uses a range of forms of assessment techniques to continuously maximise learner achievement. Methods of assessment are used to raise the standards of teaching and learning.",
        descriptors: [
          {
            key: "3.2.a",
            letter: "a",
            text: "Uses different forms of assessment in line with CAPS to test learner performance",
          },
          {
            key: "3.2.b",
            letter: "b",
            text: "Intervention strategies accommodate learners with various learning abilities",
          },
        ],
      },
      {
        key: "3.3",
        number: 3,
        title: "Learner progress and achievement",
        desiredOutcome:
          "Learners optimally achieve the relevant Learning Area/ Subject outcomes. Assessment results show outstanding levels of competence and achievement.",
        descriptors: [
          {
            key: "3.3.a",
            letter: "a",
            text: "Learner results of various forms of the assessment show that they are attaining the set outcomes",
          },
          { key: "3.3.b", letter: "b", text: "Remedial / Enrichment work supports learner progress" },
        ],
      },
    ],
  },
  {
    key: "PS4",
    number: 4,
    title: "Professional Development",
    shortTitle: "Professional development",
    maxScore: 36,
    criteria: [
      {
        key: "4.1",
        number: 1,
        title: "Participation in continuous professional development",
        desiredOutcome:
          "Participates fully and takes a leading role in initiating and delivering professional development activities.",
        descriptors: [
          {
            key: "4.1.a",
            letter: "a",
            text: "Engages in on-going self-reflection and has set clear targets for the development",
          },
          {
            key: "4.1.b",
            letter: "b",
            text: "Attends and participates in activities aimed at enhancing his/her professional and pedagogical skills",
          },
          {
            key: "4.1.c",
            letter: "c",
            text: "Engages in research, develops educational materials, participates in sessions to train, guide, mentor and develop colleagues",
          },
        ],
      },
      {
        key: "4.2",
        number: 2,
        title: "Educator professionalism",
        desiredOutcome:
          "An educator is exemplary and truly displays the purpose and intent of the educators' code of professional ethics.",
        descriptors: [
          { key: "4.2.a", letter: "a", text: "Comes to school regularly and on time" },
          { key: "4.2.b", letter: "b", text: "Is always neatly dressed and presentable" },
          { key: "4.2.c", letter: "c", text: "Conducts lessons as expected in line with the school time-table" },
          {
            key: "4.2.d",
            letter: "d",
            text: "Adheres to deadlines e.g. marking, learner report cards, schedules, completion of tasks, etc",
          },
          {
            key: "4.2.e",
            letter: "e",
            text: "Contributes positively towards school development and advancement",
          },
          { key: "4.2.f", letter: "f", text: "Maintains good relations with stakeholders" },
        ],
      },
    ],
  },
  {
    key: "PS5",
    number: 5,
    title: "Extra-mural and Co-curricular Participation",
    shortTitle: "Extra-mural & co-curricular",
    maxScore: 12,
    criteria: [
      {
        key: "5.1",
        number: 1,
        title: "Participation in extra-mural and co-curricular activities",
        desiredOutcome:
          "Networks with relevant stakeholders and encourages the development of extra-mural or co-curricular activities.",
        descriptors: [
          {
            key: "5.1.a",
            letter: "a",
            text: "Keeps updated inventory/register of equipment under his/her care",
          },
          { key: "5.1.b", letter: "b", text: "Manages and takes good care of equipment and facilities" },
          { key: "5.1.c", letter: "c", text: "Is involved in extra-mural and co-curricular activities" },
        ],
      },
    ],
  },
];

export const MAX_TOTAL = 152; // FINAL SCORE, Annexure A 2

export const ALL_DESCRIPTORS: { standard: PerformanceStandard; criterion: Criterion; descriptor: Descriptor }[] =
  INSTRUMENT.flatMap((standard) =>
    standard.criteria.flatMap((criterion) =>
      criterion.descriptors.map((descriptor) => ({ standard, criterion, descriptor }))
    )
  );

export function ratingForTotal(total: number): RatingLevel {
  if (total <= 75) return RATING_SCALE[0];
  if (total <= 105) return RATING_SCALE[1];
  if (total <= 128) return RATING_SCALE[2];
  return RATING_SCALE[3];
}

export function percentage(total: number): number {
  return Math.round((total / MAX_TOTAL) * 100);
}
