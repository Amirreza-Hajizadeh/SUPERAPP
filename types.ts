
export enum UserTier {
  GUEST = 'MEMBER',
  STUDENT = 'STUDENT',
  ADMIN = 'ADMIN'
}

export interface UserProfile {
  id: string;
  name: string;
  studentId: string;
  nationalId?: string;
  major: string;
  entryYear: number;
  avatar: string;
  walletBalance: number;
  tier: UserTier;
  skills: string[];
  bio?: string;
  xp?: number;
  level?: number;
}

export interface MarketplaceItem {
  id: string;
  title: string;
  price: number;
  category: 'BOOK' | 'EQUIPMENT' | 'DORM' | 'OTHER';
  image: string;
  seller: string;
  date: string;
}

export interface Message {
  role: 'user' | 'model';
  text: string;
}

export interface Professor {
  id: string;
  name: string;
  department: string;
  rating: number;
  image: string;
  email: string;
}

export interface AcademicPath {
  id: string;
  title: string;
  degree: 'Master' | 'PhD';
  description: string;
  prerequisites: string[];
  jobOutlook: 'High Demand' | 'Stable' | 'Research Focused';
  topUniversities: string[];
}

export interface Lab {
  id: string;
  name: string;
  supervisor: string;
  location: string;
  capacity: number;
  image: string;
  status: 'Open' | 'Full' | 'Maintenance';
}

export interface CityPlace {
  id: string;
  title: string;
  category: 'FOOD' | 'HOUSING' | 'FUN' | 'SHOPPING';
  description: string;
  priceRange?: string; // e.g. "Economic" | "Luxury" or Price amounts
  image: string;
  instagram?: string;
  location: string;
  discount?: string;
}

export interface Slide {
  title: string;
  content: string[];
  imagePrompt?: string; // For placeholder visual description
}

export interface Flashcard {
  id: string;
  question: string;
  answer: string;
  meaning?: string;
  example?: string;
  image?: string;
  box: number; // Leitner box number (1-5)
}

export interface JobOpportunity {
  id: string;
  title: string;
  company: string;
  type: 'Full-time' | 'Part-time' | 'Internship';
  skills: string[];
  date: string;
  description: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}
