/**
 * Business info and every [PLACEHOLDER] in one place.
 * Brackets stay visible until the owner confirms each value.
 * Copy is verbatim from reference/*.dc.html.
 */

export const site = {
  name: 'Brace Mates Dog Training',
  shortName: 'Brace Mates',
  wordmarkSub: 'Dog Training',
  trainer: 'Lance Beson-Montoya',
  /** Keep in sync with `site` in astro.config.mjs. Domain is not bought yet. */
  url: 'https://bracematesdogtraining.com',

  city: 'Mid Michigan',
  phone: '(989) 780-6105',
  email: 'bracematesdogtrainingllc@gmail.com',

  footerBlurb: 'Practical help for you and your dog, together.',

  /** No Google Business Profile yet, so there is no Google reviews link. */
  socials: [
    { label: 'All links', url: 'https://paa.ge/bracemates/en' },
    { label: 'Instagram', url: 'https://www.instagram.com/bracematesdogtraining/' },
    { label: 'Facebook', url: 'https://www.facebook.com/people/Brace-Mates-Dog-Training/61579234718555/' },
  ],
  socialsNote: '[Add your real profile links]',

  serviceArea: {
    /** The owner's list, as given. Shown after "including" on the Contact page. */
    areas: ['Bay City', 'Clare', 'Clinton', 'Eaton', 'Genesee', 'Gladwin', 'Lapeer', 'Midland', 'Saginaw'],
    travelFeeNote: 'a service fee applies beyond 75 miles from Bay City, and a phone consultation is always free',
  },

  /** Offer details that appear inline in copy. */
  offer: {
    freeCallLength: '10–30 minutes',
    textSupport: 'and text support between sessions',
    replyTime: '1 business day',
    sessionLength: '1 hour',
    puppySessionLength: '30–45 minutes',
    mannersEstimate: '3–4 sessions',
  },

  ages: {
    puppyRange: '[8–20 weeks]',
    minAge: '[8 weeks]',
    breedExceptions:
      '[Note any exceptions here, e.g. dogs with a serious bite history may need a different first step.]',
  },

  /** Confirmation flag that appears in the About page. The FAQ method answer is held back until Lance describes his approach. */
  methodConfirm: '[confirm]',
} as const;

/** True when a value is still an unfilled [BRACKETED] placeholder. */
export const isPlaceholder = (value: string): boolean => /\[[A-Z$\d]/.test(value);

/** `tel:` href. Falls back to the bracketed value so the placeholder stays visible/greppable. */
export const telHref = (): string =>
  isPlaceholder(site.phone) ? `tel:${site.phone}` : `tel:${site.phone.replace(/[^\d+]/g, '')}`;

export const mailHref = (): string => `mailto:${site.email}`;

/** Keep false until the owner's real details are in; true removes the sitewide noindex tag. */
export const allowIndexing = false;

/** Social links that are real (not the example.com stand-ins). Use for JSON-LD sameAs. */
export const realSocials = () => site.socials.filter((s) => !s.url.includes('example.com'));

export const hasPlaceholderSocials = (): boolean => site.socials.some((s) => s.url.includes('example.com'));

/** Main navigation, in header order. */
export const nav = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact', href: '/contact' },
] as const;

/** Home "How it works" steps. Also usable on other pages. */
export const howItWorks = {
  eyebrow: 'How it works',
  title: 'Getting started is simple',
  steps: [
    {
      title: 'Book a free call',
      body: `Tell me about your dog and what’s been tough lately. In about ${site.offer.freeCallLength} we’ll figure out if I’m the right fit — no pressure, no sales pitch.`,
    },
    {
      title: 'Choose your training',
      body: 'We pick the package that fits you and your dog. For obedience work I can travel to you. Hunting dog training usually happens at my place in Alger, MI, and other arrangements can be made.',
    },
    {
      title: 'Train together',
      body: `Hands-on sessions with simple homework in between, ${site.offer.textSupport}.`,
    },
  ],
} as const;

/** Home testimonial slots. Placeholders only - never write fake reviews. */
export const testimonialPlaceholders = [
  {
    quote:
      '[Placeholder: a 2–3 sentence quote from a client whose dog went through training — what things were like before, and what changed.]',
    name: '[Client name] & [Dog’s name]',
    location: '[Neighborhood, City]',
  },
  {
    quote: '[Placeholder: a quote from a puppy client — the chaos of the first weeks, and how things feel now.]',
    name: '[Client name] & [Dog’s name]',
    location: '[Neighborhood, City]',
  },
  {
    quote:
      '[Placeholder: a quote from a hunting or retriever client — one specific moment in the field where they noticed the difference.]',
    name: '[Client name] & [Dog’s name]',
    location: '[Neighborhood, City]',
  },
] as const;

/** About page placeholders (bracketed story details). The credentials section was removed at the owner's request. */
export const about = {
  storyPlaceholders: {
    dogName: '[Dog’s name]',
    dogDescription: '[a nervous rescue who barked at everything that moved]',
    experience: '[trained dogs for X years / worked with X+ families]',
    background:
      '[Add any relevant background — shelter work, fostering, an apprenticeship, a past career that shapes how you teach.]',
  },
} as const;
