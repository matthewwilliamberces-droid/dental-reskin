export interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  tag: string; // e.g. "Most Popular", "Emergency", "Cosmetic"
  iconSvg: string; // Raw clean inline SVG markup (stroke-width 1.5, currentColor)
  durationHint?: string;
  priceFrom?: string;
}

export interface Testimonial {
  author: string;
  suburb: string; // Australian location (e.g. "Surry Hills, NSW")
  rating: number; // 5
  treatment: string;
  quote: string;
  verified: boolean;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface SiteConfig {
  meta: {
    title: string;
    description: string;
    canonicalUrl: string;
    ogImage: string;
  };
  brand: {
    name: string;
    tagline: string;
    niche: string;
    abn: string;
    licenseBadge: string;
    emergencyBannerText: string;
  };
  contact: {
    phone: string;
    phoneFormatted: string; // For display: (02) 9876 5432
    email: string;
    address: {
      line1: string;
      line2: string;
      suburb: string;
      state: string;
      postcode: string;
    };
    googleMapsEmbedUrl?: string;
    hours: Array<{ days: string; time: string }>;
  };
  theme: {
    primaryOklch: string;
    primaryLight: string;
    accentOklch: string;
    surfaceDark: string;
  };
  navigation: Array<{ label: string; href: string }>;
  trustStats: Array<{ value: string; label: string; subtext: string }>;
  services: ServiceItem[];
  beforeAfter: {
    title: string;
    subtitle: string;
    beforeLabel: string;
    afterLabel: string;
    beforeImage: string;
    afterImage: string;
    treatmentNote: string;
  };
  benefits: Array<{ title: string; desc: string; iconSvg: string }>;
  testimonials: Testimonial[];
  faqs: FaqItem[];
  bookingForm: {
    endpoint: string; // Web3Forms or Formspree access key
    submitUrl: string;
    title: string;
    subtitle: string;
    servicesList: string[];
    preferredTimes: string[];
    healthFunds: string[];
  };
  hero: {
    eyebrow: string;
    headline: string;
    headlineAccent: string;
    subheadline: string;
    primaryCta: string;
    secondaryCta: string;
    ratingText: string;
    availability: { label: string; status: string; detail: string };
    checklist: string[];
  };
  sections: {
    services: { eyebrow: string; title: string; subtitle: string };
    comfort: { eyebrow: string; title: string; subtitle: string };
    reviews: { eyebrow: string; title: string; subtitle: string };
    faq: { eyebrow: string; title: string; subtitle: string };
    cta: { title: string; subtitle: string };
  };
  ui: {
    bookCta: string;
    callCta: string;
    menuLabel: string;
    navLabel: string;
    close: string;
    next: string;
    back: string;
    submit: string;
    sending: string;
    verified: string;
    stepLabels: string[];
    stepProgress: string; // "Step {n} of {total}"
    nameLabel: string;
    mobileLabel: string;
    emailLabel: string;
    healthFundLabel: string;
    chooseOne: string;
    successTitle: string;
    successMessage: string;
    errorMessage: string;
    sliderHint: string;
    mapTitle: string;
    featuredLabel: string;
    durationLabel: string;
  };
  footer: {
    hoursTitle: string;
    contactTitle: string;
    fundsTitle: string;
    funds: string[];
    badges: string[];
    disclaimer: string;
    legal: string;
  };
}

// Shared inline SVG wrapper pieces keep every icon single-tone, 1.5 stroke.
const svg = (paths: string): string =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${paths}</svg>`;

export const siteConfig: SiteConfig = {
  meta: {
    title: 'Sydney CBD Dental Studio | Gentle Dentist in Sydney NSW 2000',
    description:
      'Gentle, modern dentistry in the heart of Sydney CBD. Same-day emergency appointments, Invisalign, veneers and implants. Instant HICAPS claims and 0% interest payment plans.',
    canonicalUrl: 'https://www.sydneycbddentalstudio.com.au/',
    ogImage: '/og-image.png',
  },

  brand: {
    name: 'Sydney CBD Dental Studio',
    tagline: 'Gentle dentistry for people who dread the dentist.',
    niche: 'Dentist',
    abn: 'ABN 12 345 678 901',
    licenseBadge: 'AHPRA Registered Dental Practitioners',
    emergencyBannerText:
      'Toothache or broken tooth? Emergency appointments reserved every day. Call now:',
  },

  contact: {
    phone: '1300 123 456',
    phoneFormatted: '1300 123 456',
    email: 'smile@sydneycbddentalstudio.com.au',
    address: {
      line1: 'Level 3, 140 Elizabeth Street',
      line2: 'Opposite Hyde Park, 2 minutes from Museum Station',
      suburb: 'Sydney',
      state: 'NSW',
      postcode: '2000',
    },
    googleMapsEmbedUrl:
      'https://www.google.com/maps?q=140+Elizabeth+Street+Sydney+NSW+2000&output=embed',
    hours: [
      { days: 'Monday to Thursday', time: '8:00am to 6:30pm' },
      { days: 'Friday', time: '8:00am to 5:00pm' },
      { days: 'Saturday', time: '9:00am to 2:00pm (emergency and booked patients)' },
      { days: 'Sunday', time: 'Closed' },
    ],
  },

  theme: {
    primaryOklch: 'oklch(0.60 0.15 238)',
    primaryLight: 'oklch(0.95 0.03 232)',
    accentOklch: 'oklch(0.78 0.13 200)',
    surfaceDark: 'oklch(0.20 0.04 255)',
  },

  navigation: [
    { label: 'Treatments', href: '#services' },
    { label: 'Results', href: '#results' },
    { label: 'Why Us', href: '#about' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'FAQ', href: '#faq' },
  ],

  trustStats: [
    { value: '15,000+', label: 'Patients Treated', subtext: 'Since opening in 2009' },
    { value: '4.9 / 5', label: 'Google Rating', subtext: 'From 1,280 verified reviews' },
    { value: 'HICAPS', label: 'Instant Claiming', subtext: 'Bupa, Medibank, HCF, CBHS, nib' },
    { value: '0%', label: 'Interest Payment Plans', subtext: 'Spread the cost via Afterpay or Zip' },
  ],

  services: [
    {
      id: 'smile-design',
      title: 'Cosmetic Smile Design',
      shortDesc:
        'Porcelain veneers, Invisalign and whitening planned together. You see a digital preview of your new smile before we touch a single tooth.',
      tag: 'Cosmetic',
      iconSvg: svg(
        '<path d="M3 12c2.5 4.5 5.5 6.5 9 6.5s6.5-2 9-6.5"/><path d="M5.5 9.5c1 .8 2.2 1.2 3.5 1.2M18.5 9.5c-1 .8-2.2 1.2-3.5 1.2M12 11v4"/><circle cx="12" cy="12" r="9"/>',
      ),
      durationHint: '2 to 3 visits',
      priceFrom: 'Veneers from $1,650 per tooth',
    },
    {
      id: 'checkup',
      title: 'Check-up and Clean',
      shortDesc:
        'Full exam, digital X-rays, scale and polish. Usually fully covered by extras cover with instant HICAPS claiming.',
      tag: 'Preventive',
      iconSvg: svg(
        '<path d="M12 4c-2 0-3-1-5-1S4 4.500 4 7c0 3 1.500 5 2 8s.8 6 2.300 6S10 17 12 17s2.200 4 3.700 4 1.800-3 2.300-6 2-5 2-8c0-2.500-1-4-3-4s-3 1-5 1z"/>',
      ),
      durationHint: '45 minutes',
      priceFrom: 'From $245',
    },
    {
      id: 'implants',
      title: 'Dental Implants',
      shortDesc:
        'Permanent tooth replacement placed with 3D guided planning. Most patients return to work the next day.',
      tag: 'Restorative',
      iconSvg: svg(
        '<path d="M8 3h8l-1 6H9L8 3z"/><path d="M9.500 9l.5 3m4-3l-.5 3M10 12h4M10.500 14.500h3M11 17h2M12 17v4"/>',
      ),
      durationHint: '3 to 6 months start to finish',
      priceFrom: 'From $4,900',
    },
    {
      id: 'whitening',
      title: 'Teeth Whitening',
      shortDesc:
        'Dentist-supervised whitening that is safe for enamel. Choose in-chair in about an hour or a custom take-home kit.',
      tag: 'Cosmetic',
      iconSvg: svg(
        '<path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.600 5.600l2.100 2.100M16.300 16.300l2.100 2.100M5.600 18.400l2.100-2.100M16.300 7.700l2.100-2.100"/><circle cx="12" cy="12" r="3"/>',
      ),
      durationHint: '60 minutes in-chair',
      priceFrom: 'From $490',
    },
    {
      id: 'emergency',
      title: 'Emergency Dental Relief',
      shortDesc:
        'Severe toothache, chipped or knocked-out tooth, lost filling. Daily appointments are held back so you are seen the same day.',
      tag: 'Same-Day Emergency',
      iconSvg: svg(
        '<path d="M12 3l9 16H3L12 3z"/><path d="M12 10v4M12 16.500v.01"/>',
      ),
      durationHint: 'Seen today',
      priceFrom: 'Emergency exam from $120',
    },
  ],

  beforeAfter: {
    title: 'Real planning, real results',
    subtitle:
      'Drag the handle to compare. Every case starts with a 3D scan so the result you see on screen is the result we aim for.',
    beforeLabel: 'Before',
    afterLabel: 'After',
    beforeImage: '/images/smile-before.svg',
    afterImage: '/images/smile-after.svg',
    treatmentNote:
      'Illustrative example: six upper porcelain veneers over two visits. Results vary between patients.',
  },

  benefits: [
    {
      title: 'Gentle, zero-pinch numbing',
      desc: 'Computer-controlled anaesthetic delivery with numbing gel first. Sleep dentistry and nitrous oxide are available for anxious patients.',
      iconSvg: svg(
        '<path d="M20 14.500A8 8 0 1 1 9.500 4a6.500 6.500 0 0 0 10.500 10.500z"/>',
      ),
    },
    {
      title: '3D intraoral scanning',
      desc: 'No gagging on impression trays. A small wand maps your teeth in about three minutes and shows you the result on screen.',
      iconSvg: svg(
        '<path d="M4 8V5a1 1 0 0 1 1-1h3M16 4h3a1 1 0 0 1 1 1v3M20 16v3a1 1 0 0 1-1 1h-3M8 20H5a1 1 0 0 1-1-1v-3"/><path d="M8 12h8M12 8v8"/>',
      ),
    },
    {
      title: 'Upfront pricing, no surprises',
      desc: 'You receive a written, itemised quote with your health fund rebate calculated before any treatment starts.',
      iconSvg: svg(
        '<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 8h8M8 12h8M8 16h4"/>',
      ),
    },
    {
      title: 'Low-dose digital X-rays',
      desc: 'Digital imaging uses up to 90 percent less radiation than film and appears on screen instantly.',
      iconSvg: svg(
        '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
      ),
    },
  ],

  testimonials: [
    {
      author: 'Sarah M.',
      suburb: 'Surry Hills, NSW',
      rating: 5,
      treatment: 'Emergency Dental Relief',
      quote:
        'Cracked a molar on a Friday morning and was in the chair by 11. They numbed it so gently I barely noticed, and the quote was explained before they started.',
      verified: true,
    },
    {
      author: 'James T.',
      suburb: 'Bondi, NSW',
      rating: 5,
      treatment: 'Invisalign',
      quote:
        'I was terrified of dentists for ten years. The team took it slowly, and the 3D scan meant no horrible putty trays. My claim went through on the spot.',
      verified: true,
    },
    {
      author: 'Priya R.',
      suburb: 'Paddington, NSW',
      rating: 5,
      treatment: 'Porcelain Veneers',
      quote:
        'They showed me a preview of the veneers before anything was done and adjusted the shape twice until I was happy. Looks natural, not like a row of tiles.',
      verified: true,
    },
    {
      author: 'Daniel K.',
      suburb: 'Neutral Bay, NSW',
      rating: 5,
      treatment: 'Dental Implant',
      quote:
        'Straightforward from consultation to final crown. Pricing was exactly what was quoted and the payment plan made it manageable.',
      verified: true,
    },
  ],

  faqs: [
    {
      question: 'Can I claim on my private health insurance on the spot?',
      answer:
        'Yes. We have HICAPS terminals at reception, so your rebate from Bupa, Medibank, HCF, nib, CBHS and most other funds is processed instantly and you only pay the gap.',
    },
    {
      question: 'Is my child eligible for the Medicare Child Dental Benefits Schedule?',
      answer:
        'Children aged 2 to 17 who receive an eligible Family Tax Benefit or other qualifying payment may have up to $1,132 in benefits over two calendar years. We check eligibility for you when you book.',
    },
    {
      question: 'Do you offer payment plans?',
      answer:
        'Yes. Larger treatments can be spread over interest-free instalments through Afterpay or Zip, subject to approval. Ask us for a written quote and we will walk you through the options.',
    },
    {
      question: 'I am very anxious about the dentist. What can you do?',
      answer:
        'Book a no-pressure first visit where we just talk. We use numbing gel and computer-controlled anaesthetic, and we offer nitrous oxide and sedation dentistry for longer procedures.',
    },
    {
      question: 'Can I be seen today for a toothache?',
      answer:
        'Probably, yes. We hold emergency appointments back every weekday and on Saturday mornings. Call us before 3pm and we will do our best to see you the same day.',
    },
    {
      question: 'How long does a dental implant take?',
      answer:
        'The implant itself is placed in one visit of around an hour. It then needs three to six months to fuse with the bone before the final crown is fitted, depending on your case.',
    },
  ],

  bookingForm: {
    endpoint: 'YOUR_WEB3FORMS_ACCESS_KEY',
    submitUrl: 'https://api.web3forms.com/submit',
    healthFunds: ['Bupa', 'Medibank', 'HCF', 'nib', 'CBHS', 'AHM', 'Other fund', 'No private cover'],
    title: 'Book your appointment',
    subtitle: 'Tell us what you need and we will confirm by phone or SMS within one business hour.',
    servicesList: [
      'Check-up and Clean',
      'Emergency Dental Relief',
      'Cosmetic Smile Design',
      'Invisalign',
      'Dental Implants',
      'Teeth Whitening',
      'Child Dental (CDBS)',
    ],
    preferredTimes: [
      'Morning (8am to 12pm)',
      'Afternoon (12pm to 4pm)',
      'Late (4pm to 6:30pm)',
      'Saturday morning',
    ],
  },

  hero: {
    eyebrow: 'Sydney CBD · Level 3, 140 Elizabeth Street',
    headline: 'A dentist who actually',
    headlineAccent: 'listens before drilling.',
    subheadline:
      'Gentle numbing, 3D scans instead of putty trays, and a written quote with your health fund rebate worked out before we start. Same-day appointments held back every day for emergencies.',
    primaryCta: 'Book a Consultation',
    secondaryCta: 'Explore Treatments',
    ratingText: 'Rated 4.9 from 1,280 Google reviews',
    availability: {
      label: 'Next available',
      status: 'Today, 2:30pm',
      detail: 'Emergency and new patient slots open',
    },
    checklist: [
      'HICAPS claims processed on the spot',
      'Medicare CDBS accepted for children',
      'Sleep dentistry for anxious patients',
    ],
  },

  sections: {
    services: {
      eyebrow: 'Treatments',
      title: 'Everything under one roof, priced up front',
      subtitle:
        'From a routine clean to a full smile rebuild. You get an itemised quote and your rebate calculated before any treatment begins.',
    },
    comfort: {
      eyebrow: 'Why patients stay',
      title: 'Built around people who hate the dentist',
      subtitle:
        'Most of our new patients have avoided a check-up for years. These are the four things we changed so that stops being a reason.',
    },
    reviews: {
      eyebrow: 'Patient reviews',
      title: 'What Sydney patients say after their visit',
      subtitle: 'Every review below is from a verified patient, shared with permission.',
    },
    faq: {
      eyebrow: 'Questions',
      title: 'Cost, claims and what to expect',
      subtitle: 'Straight answers to what people ask us most. Still unsure? Call and talk to the front desk.',
    },
    cta: {
      title: 'Toothache today? Or just overdue for a check-up?',
      subtitle: 'Book online in under a minute, or call and speak to a real person.',
    },
  },

  ui: {
    bookCta: 'Book Now',
    callCta: 'Call',
    menuLabel: 'Open menu',
    navLabel: 'Main navigation',
    close: 'Close',
    next: 'Continue',
    back: 'Back',
    submit: 'Request Appointment',
    sending: 'Sending…',
    verified: 'Verified patient',
    stepLabels: ['Treatment', 'Time', 'Your details'],
    stepProgress: 'Step {n} of {total}',
    nameLabel: 'Full name',
    mobileLabel: 'Mobile number',
    emailLabel: 'Email address',
    healthFundLabel: 'Private health fund',
    chooseOne: 'Choose one to continue',
    successTitle: 'Request received',
    successMessage: 'Thanks. We will confirm your appointment by phone or SMS within one business hour.',
    errorMessage: 'Sorry, that did not send. Please call us on',
    sliderHint: 'Drag to compare before and after',
    mapTitle: 'Map showing clinic location',
    featuredLabel: 'Most requested',
    durationLabel: 'Typical time',
  },

  footer: {
    hoursTitle: 'Opening hours',
    contactTitle: 'Find us',
    fundsTitle: 'Health funds we claim on the spot',
    funds: ['Bupa', 'Medibank', 'HCF', 'nib', 'CBHS', 'AHM'],
    badges: [
      'HICAPS Instant Health Fund Claims',
      'Medicare Child Dental Benefits Schedule (CDBS)',
      'AHPRA Registered Dental Practitioners',
    ],
    disclaimer:
      'All dental treatment carries risk. Individual results vary. Always seek a second opinion and read the patient information provided before consenting to treatment.',
    legal: 'All rights reserved.',
  },
};
