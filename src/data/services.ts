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
  /** Starting price. */
  price: string;
  /** Note under the price. */
  priceNote: string;
}

/**
 * The owner's four services, worded from his own answers (questionnaire, 2026-10-28).
 * Prices are "starting at" figures; the owner has not given session counts for any package.
 */
export const services: Service[] = [
  {
    slug: 'puppy-training',
    name: 'Puppy Training',
    tag: 'Puppies: hunting or non-hunting',
    homeTag: 'Puppies',
    summary:
      'Short, fun fundamentals with little to no pressure, plus an intro to birds and the field for hunting pups.',
    description:
      'Start your puppy right. Non-hunting puppies get light, low-pressure sessions on the fundamentals. Hunting puppies get a more involved start, with an introduction to birds, shotguns and field work.',
    included: [
      'Single sessions or weekly sessions',
      `Non-hunting sessions of about ${site.offer.puppySessionLength}, fun and light`,
      'Hunting pups: intro to birds, shotgun and field work',
      'Hunting sessions of at least 1 hour, depending on your dog’s ability',
    ],
    price: '$75',
    priceNote: 'per session. Hunting puppies start at $100 per session, and more if specialty birds are needed',
  },
  {
    slug: 'basic-obedience',
    name: 'Basic Obedience',
    tag: 'After the puppy stage',
    homeTag: 'After the puppy stage',
    summary: 'Leash walking, sit and down, kennel, an introduction to recall and good everyday manners.',
    description:
      'For dogs past the puppy stage, usually older than 1–2 years. We teach the basic behaviors that make everyday life with your dog easier.',
    included: [
      'Walking nicely on a leash',
      'Sit and down',
      'Kennel training',
      'Introduction to recall',
      'Basic manners',
      `Often done in about ${site.offer.mannersEstimate}, though more are always helpful`,
    ],
    price: '$50',
    priceNote: 'for the first session, then $100 per session to continue',
  },
  {
    slug: 'gun-dog-training',
    name: 'Started & Broke Gun Dog Training',
    tag: 'Hunting dogs',
    homeTag: 'Hunting dogs',
    summary:
      'From a started dog that finds and points birds to a broke gun dog that’s steady to wing, shot and fall.',
    description:
      'Two stages of gun dog training. Started work introduces your dog to shotguns, birds and field obedience at low to moderate pressure. Broke work builds a finished gun dog that is steady to wing, shot and fall.',
    included: [
      'Started: search for birds, point and break at the flush',
      'Started: a natural retrieve can be shaped',
      'Broke: steady to wing, shot and fall, with a retrieve to hand',
      'Broke has no time limit, since every dog is different, and needs weekly training and/or boarding with me',
      'Usually at my place in Alger, MI; other arrangements can be made',
    ],
    price: '$100',
    priceNote: 'per session for started dogs. Broke training starts at $1,200 per month, with limited slots',
  },
  {
    slug: 'retriever-training',
    name: 'Started Retriever Training',
    tag: 'Retrievers',
    homeTag: 'Retrievers',
    summary:
      'Obedience-focused to start, then steadiness to wing and shot, tailored to how you release your dog.',
    description:
      'For owners who already have a trained retriever. We start with obedience, tailor the work to your style of releasing the dog, and build toward a restarted retriever that is steady to wing and/or shot.',
    included: [
      'Obedience-focused start',
      'Requires an already trained retriever',
      'Tailored to your style of releasing the dog',
      'A restarted retriever is steady to wing and/or shot',
    ],
    price: '$100',
    priceNote: 'per session',
  },
];

/** Services page intro and "Not sure which one fits?" band copy. */
export const servicesCopy = {
  eyebrow: 'Services',
  title: 'Training that fits you and your dog',
  intro:
    'Every plan starts with a free phone consultation. I can travel to you for obedience work. Hunting dog training usually happens at my place in Alger, MI, and other arrangements can be made.',
  fit: {
    title: 'Not sure which one fits?',
    body: 'That’s what the free call is for. Tell me what’s going on and I’ll point you in the right direction — even if that’s someone other than me.',
  },
  /** Home services-preview section header. */
  homePreview: {
    eyebrow: 'Services',
    title: 'Help for the dog you have',
    intro: 'Every plan is built around your dog and your goals. Here’s where most people start.',
  },
} as const;
