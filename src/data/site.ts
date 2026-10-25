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

  city: '[CITY / AREA]',
  phone: '[PHONE]',
  email: '[EMAIL]',

  footerBlurb: 'Practical help for you and your dog, together.',

  socials: [
    { label: 'All links', url: 'https://paa.ge/bracemates/en' },
    { label: 'Instagram', url: 'https://example.com/instagram' },
    { label: 'Facebook', url: 'https://example.com/facebook' },
    { label: 'Google reviews', url: 'https://example.com/google' },
  ],
  socialsNote: '[Add your real profile links]',

  serviceArea: {
    towns: ['[Town]', '[Town]', '[Town]'],
    travelFeeNote: '[travel fee may apply beyond X miles]',
  },

  /** Offer details that appear inline in copy. */
  offer: {
    freeCallLength: '[20 minutes]',
    evaluationFee: '[free / $___]',
    textSupport: '[and text support between sessions]',
    replyTime: '[1 business day]',
    sessionLength: '[60 minutes]',
    puppySessionLength: '[45 minutes]',
    mannersEstimate: '[3–4 sessions]',
  },

  ages: {
    puppyRange: '[8–20 weeks]',
    minAge: '[8 weeks]',
    breedExceptions:
      '[Note any exceptions here, e.g. dogs with a serious bite history may need a different first step.]',
  },

  /** Confirmation flag that appears in the About page and FAQ. */
  methodConfirm: '[confirm]',
  methodConfirmFaq: '[Confirm this matches your approach.]',
} as const;

/** True when a value is still an unfilled [BRACKETED] placeholder. */
export const isPlaceholder = (value: string): boolean => /\[[A-Z$\d]/.test(value);

/** `tel:` href. Falls back to the bracketed value so the placeholder stays visible/greppable. */
export const telHref = (): string =>
  isPlaceholder(site.phone) ? `tel:${site.phone}` : `tel:${site.phone.replace(/[^\d+]/g, '')}`;

export const mailHref = (): string => `mailto:${site.email}`;

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
      title: 'Meet at your place',
      body: `I come to you for an in-home evaluation ${site.offer.evaluationFee}. I’ll see your dog at home and on your usual walk, then we build a plan together.`,
    },
    {
      title: 'Train together',
      body: `Hands-on sessions with simple homework in between. You’ll get written notes after every visit ${site.offer.textSupport}.`,
    },
  ],
} as const;

/** Home testimonial slots. Placeholders only - never write fake reviews. */
export const testimonialPlaceholders = [
  {
    quote:
      '[Placeholder: a 2–3 sentence quote from a client whose dog struggled with reactivity — what walks were like before, and what changed.]',
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
      '[Placeholder: a quote about leash walking or anxiety — one specific moment where they noticed the difference.]',
    name: '[Client name] & [Dog’s name]',
    location: '[Neighborhood, City]',
  },
] as const;

/** About page placeholders (bracketed story details and credentials). */
export const about = {
  storyPlaceholders: {
    dogName: '[Dog’s name]',
    dogDescription: '[a nervous rescue who barked at everything that moved]',
    experience: '[trained dogs for X years / worked with X+ families]',
    background:
      '[Add any relevant background — shelter work, fostering, an apprenticeship, a past career that shapes how you teach.]',
  },
  /** Four checklist tiles. Insurance is the fourth. */
  credentials: [
    { name: '[Certification — e.g., CPDT-KA]', detail: '[Issuing organization, year]' },
    { name: '[Second certification or course]', detail: '[Issuing organization, year]' },
    { name: '[Pet first aid & CPR]', detail: '[Provider, year]' },
    { name: '[Insured]', detail: '[Insurance provider]' },
  ],
} as const;
