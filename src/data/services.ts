import { site } from './site';

export interface Service {
  slug: string;
  name: string;
  /** Tag pill on the Services page. */
  tag: string;
  /** Tag pill on the Home preview cards (shorter). */
  homeTag: string;
  /** One-liner on the Home preview cards. */
  summary: string;
  /** Description on the Services page cards. */
  description: string;
  /** "What's included" checklist. */
  included: string[];
  /** Starting price, still a placeholder. */
  price: string;
  /** Note under the price. */
  priceNote: string;
}

export const services: Service[] = [
  {
    slug: 'puppy-foundations',
    name: 'Puppy Foundations',
    tag: `Puppies ${site.ages.puppyRange}`,
    homeTag: `Puppies ${site.ages.puppyRange}`,
    summary: 'Potty training, nipping, crate time and first manners — a good start that lasts.',
    description:
      'Start right from day one. We cover the puppy essentials and build habits that make the years ahead easier for everyone.',
    included: [
      '[3] in-home sessions',
      'Potty and crate training plan',
      'Nipping, chewing and handling',
      'First cues: sit, come, settle and walking nicely',
    ],
    price: '[$___]',
    priceNote: '[for 3 sessions]',
  },
  {
    slug: 'manners-leash-skills',
    name: 'Manners & Leash Skills',
    tag: 'Any age',
    homeTag: 'Any age',
    summary:
      'Loose-leash walks, a recall you can trust, polite greetings and settling down when guests come over.',
    description:
      'For dogs who pull, jump, tune you out outside or can’t settle when guests come over. Real-world manners for everyday life.',
    included: [
      '[4] in-home sessions',
      'Loose-leash walking on your own routes',
      'Recall, polite greetings and settling down',
      'Written notes after every visit',
    ],
    price: '[$___]',
    priceNote: '[for 4 sessions]',
  },
  {
    slug: 'reactivity',
    name: 'Reactivity',
    tag: 'Barking, lunging, freezing',
    homeTag: 'Barking & lunging',
    summary:
      'For dogs who bark, lunge or freeze at other dogs, people or bikes. We go at your dog’s pace.',
    description:
      'For dogs who go over the top around other dogs, people, bikes or cars. We work at your dog’s pace to build calm, one walk at a time.',
    included: [
      'In-depth behavior evaluation',
      '[6]-session training plan',
      'Practice on your real walking routes',
      'Management tips you can use right away',
    ],
    price: '[$___]',
    priceNote: '[for 6 sessions]',
  },
  {
    slug: 'anxiety-confidence',
    name: 'Anxiety & Confidence',
    tag: 'Nervous or anxious dogs',
    homeTag: 'Nervous dogs',
    summary:
      'For dogs who panic when left alone or shut down in new places. Gentle, step-by-step work.',
    description:
      'For dogs who panic when left alone, hide from visitors or shut down in new places. Gentle, gradual work that builds confidence.',
    included: [
      'Evaluation and goal-setting',
      'A step-by-step plan at your dog’s pace',
      '[Video check-ins between sessions]',
      '[Referral to a vet behaviorist when needed]',
    ],
    price: '[$___]',
    priceNote: '[per session or package]',
  },
];

/** Services page intro and "Not sure which one fits?" band copy. */
export const servicesCopy = {
  eyebrow: 'Services',
  title: 'Training that comes to you',
  intro:
    'Every plan starts with a free call. Sessions happen in your home and neighborhood — where the problems actually happen.',
  fit: {
    title: 'Not sure which one fits?',
    body: 'That’s what the free call is for. Tell me what’s going on and I’ll point you in the right direction — even if that’s someone other than me.',
  },
  /** Home services-preview section header. */
  homePreview: {
    eyebrow: 'Services',
    title: 'Help for the dog you have',
    intro: 'Every plan is built around your dog, your home and your schedule. Here’s where most people start.',
  },
} as const;
