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
        a: `Reward-based, science-backed training. I teach your dog what to do instead of punishing what they get wrong — using food, toys, play and praise. No prong, choke or shock collars. ${site.methodConfirmFaq}`,
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
        a: `It depends on your dog and your goals. Manners work often takes ${site.offer.mannersEstimate}; reactivity and anxiety usually take longer. After the evaluation I’ll give you an honest estimate — no surprise add-ons.`,
      },
    ],
  },
  {
    id: 'expect',
    title: 'What to expect',
    items: [
      {
        q: 'What happens at the first visit?',
        a: 'We start with your goals and your dog’s history. Then I watch how your dog handles their normal world — the house, the doorbell, the walk. You’ll leave with a clear plan and one or two things to start practicing right away.',
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
