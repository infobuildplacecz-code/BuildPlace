export type Language = 'ru' | 'cs' | 'uk' | 'en';

export interface TranslationSchema {
  nav: {
    whyUs: string;
    howItWorks: string;
    benefits: string;
    orders: string;
    contacts: string;
    telegramButton: string;
  };
  hero: {
    tagline: string;
    titlePart1: string;
    titleAccent: string;
    subtitle: string;
    ctaTelegram: string;
    badgeVerified: string;
    statCities: string;
    statDaily: string;
    statNoSpam: string;
  };
  whyBuildplace: {
    title: string;
    subtitle: string;
    cards: Array<{
      title: string;
      description: string;
    }>;
  };
  howItWorks: {
    title: string;
    subtitle: string;
    steps: Array<{
      number: string;
      title: string;
      description: string;
    }>;
  };
  whyUsDetailed: {
    title: string;
    subtitle: string;
    reasons: Array<{
      title: string;
      description: string;
      highlight: string;
    }>;
  };
  liveOrders: {
    title: string;
    subtitle: string;
    liveBadge: string;
    viewInTelegram: string;
    orders: Array<{
      title: string;
      city: string;
      category: string;
      budget: string;
      date: string;
    }>;
  };
  ctaBanner: {
    motto1: string;
    motto2: string;
    motto3: string;
    text: string;
    ctaButton: string;
  };
  footer: {
    tagline: string;
    description: string;
    contactsTitle: string;
    socialTitle: string;
    telegramHighlight: string;
    telegramCta: string;
    telegramHandle: string;
    email: string;
    instagram: string;
    facebook: string;
    rights: string;
    czechMarketBadge: string;
  };
}

export interface TelegramOrder {
  id: number;
  postId: string;
  url: string;
  date: string;
  datetime: string;
  time: string;
  views: string;
  city: string;
  category: string;
  title: string;
  summary: string;
  price: string;
  fullText: string;
  bullets: string[];
  lines?: string[];
  isNew?: boolean;
}
