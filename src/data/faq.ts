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
        // Lance's own description (2026-11-10). Do not restore the mockup's "reward-based, no prong, choke or shock" claim.
        a: 'I base my training on B.F. Skinner’s theory of operant conditioning, which includes positive and negative reinforcement as well as positive and negative punishment. I have core ideas and steps, but they change for each dog. A program built to work for every dog wouldn’t work for any of them.',
        open: true,
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
        a: 'It depends on the service, but I have all my own training tools on site. I can also use tools you already have or want to use.',
      },
    ],
  },
  {
    id: 'ages',
    title: 'Ages & breeds',
    items: [
      {
        q: 'What ages do you work with?',
        a: 'There’s no age restriction, and all dogs are welcome. A dog’s age can affect what it can handle in training, and we’ll talk through that on the free call.',
        open: true,
      },
      {
        q: 'Do you work with all breeds?',
        a: 'Yes. There’s no breed restriction, and all dogs are welcome.',
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

/** Flat list of all Q&As. */
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
