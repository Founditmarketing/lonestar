export interface PricingRow {
  size: string;
  price: string;
  rto36: string;
  rto60: string;
}

export interface ShedModel {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  features: string[];
  startPrice: number;
  category?: 'Garages' | 'Barns' | 'Cabins' | 'Cottages' | 'Utility Buildings' | 'Deluxe';
  configKey?: string;
  specs?: { label: string; value: string }[];
  pricingTable?: PricingRow[];
}

export enum BuildingStyle {
  MODERN = 'Modern Studio',
  BARN = 'Traditional Barn',
  GABLE = 'Classic Gable',
  GARAGE = 'Utility Garage'
}

export interface AIAnalysisResult {
  recommendedStyle: string;
  suggestedSize: string;
  reasoning: string;
  estimatedPriceRange: string;
}

export interface Review {
  author: string;
  rating: number;
  text: string;
  location: string;
  date: string;
  avatar_url?: string;
}