export type ProductCategoryId = "text" | "vision" | "audio" | "code";

export interface AIProduct {
  id: ProductCategoryId;
  name: string;
  tagline: string;
  description: string;
  extendedDescription: string;
  iconName: string; // Used to dynamically map Lucide icons
  badge: string;
  stats: {
    label: string;
    value: string;
    change: string;
  }[];
  features: string[];
}

export interface PlaygroundPreset {
  id: string;
  title: string;
  prompt: string;
  output?: string;
  imageUrl?: string;
  duration?: string;
  metadata?: string;
}

export interface PricingTier {
  name: string;
  price: string;
  frequency: string;
  description: string;
  features: string[];
  isPopular: boolean;
  ctaText: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  industry: "SaaS" | "E-commerce" | "Agency" | "Creator";
  rating: number;
}
