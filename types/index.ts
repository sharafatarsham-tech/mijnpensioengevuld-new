export interface FAQ {
  question: string;
  answer: string;
}

export interface Testimonial {
  name: string;
  role: string;
  quote: string;
  result: string;
}

export interface ArticleFAQ {
  question: string;
  answer: string;
}

export interface KnowledgeArticle {
  slug: string;
  title: string;
  description: string;
  category: string;
  readingTime: number;
  lastUpdated: string;
  content: string;
  relatedSlugs?: string[];
  faqs?: ArticleFAQ[];
}

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  message?: string;
  privacy: boolean;
  honeypot?: string;
}

export interface CalculatorValues {
  age: number;
  salary: number;
  currentPension: number;
  includeAOW: boolean;
}
