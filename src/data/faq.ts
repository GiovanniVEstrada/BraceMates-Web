import { site } from './site';

export interface FaqItem {
  q: string;
  a: string;
  /** Open by default (first item in each group). */
  open?: boolean;
}

export interface FaqGroup {
  id: string;
  title: string;
  items: FaqItem[];
}

export const faqGroups: FaqGroup[] = [
  {
    id: 'methods',
    title: 'Training methods',
    items: [
      {
        q: 'What training methods do you use?',
        // Held back on purpose: the mockup copy claimed "reward-based ... no prong, choke or shock collars", which
        // may not be true for gun dog work. Replace with Lance's own description (questionnaire Q25).
        a: '[Awaiting Lance’s description of his training approach and the tools he uses.]',
        open: true,
      },
      {
        q: 'Will my dog only listen when I have treats?',
        a: 'No. Treats help early on, while we’re teaching something new. Then we fade them out and swap in real-life rewards your dog already loves — sniffing, walks, play and your attention.',
      },
    ],
  },
  {
    id: 'length',
    title: 'Session length',
    items: [
      {
        q: 'How long is a session?',
        a: `Most sessions run about ${site.offer.sessionLength}. Puppy sessions are often shorter, around ${site.offer.puppySessionLength} — little brains get tired fast.`,
        open: true,
      },
      {
        q: 'How many sessions will we need?',
        a: `It depends on your dog and your goals. Basic obedience can often be done in about ${site.offer.mannersEstimate}, though more are always helpful. Broke gun dog training has no set time limit, because every dog is different. After the free call I’ll tell you what to expect.`,
      },
    ],
  },
  {
    id: 'expect',
    title: 'What to expect',
    items: [
      {
        q: 'What happens first?',
        a: 'We start with a free phone consultation. We talk through your goals and your dog’s history, then choose the training that fits. For obedience work I can travel to you, and hunting dog training usually happens at my place in Alger, MI.',
        open: true,
      },
      {
        q: 'Do I need to be there?',
        a: 'Yes — you’re half the team. Everyone who lives with your dog is welcome to join, kids included. The more consistent everyone is, the faster things change.',
      },
      {
        q: 'What should I have ready?',
        a: 'Your dog’s favorite treats (cut small), a flat collar or harness, and a regular 4–6 ft leash. I’ll bring anything else we need.',
      },
    ],
  },
  {
    id: 'ages',
    title: 'Ages & breeds',
    items: [
      {
        q: 'What ages do you work with?',
        a: `Puppies from ${site.ages.minAge} through seniors. It’s never too late to learn — older dogs often surprise their people.`,
        open: true,
      },
      {
        q: 'Do you work with all breeds?',
        a: `Yes — all breeds, sizes and mixes. ${site.ages.breedExceptions}`,
      },
    ],
  },
];

export const faqCopy = {
  eyebrow: 'FAQ',
  title: 'Questions, answered',
  intro: 'The things people ask most before we get started. Don’t see yours? Just ask on the free call.',
  ask: {
    title: 'Still have a question?',
    body: 'Call or send an email — happy to help, even if you’re not ready to book.',
  },
} as const;

/** Flat list of all nine Q&As. */
export const allFaqs: FaqItem[] = faqGroups.flatMap((g) => g.items);

/** FAQPage JSON-LD object. Serialize with JSON.stringify in a <script type="application/ld+json">. */
export const faqJsonLd = () => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: allFaqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
});
