export enum Niche {
  FASHION = 'Fashion',
  BEAUTY = 'Beauty',
  TECH = 'Tech',
  LIFESTYLE = 'Lifestyle',
  FOOD = 'Food',
  TRAVEL = 'Travel',
  FITNESS = 'Fitness',
  GAMING = 'Gaming'
}

export interface Review {
  id: string;
  authorName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Influencer {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  bio: string;
  niche: Niche[];
  followers: number;
  engagementRate: number;
  location: string;
  startingRate: number; // in USD
  portfolioImages: string[];
  reviews: Review[];
  verified: boolean;
}

export interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: Date;
  isRead: boolean;
}

export interface ChatConversation {
  id: string;
  participantId: string; // The other person
  participantName: string;
  participantAvatar: string;
  lastMessage: string;
  unreadCount: number;
  messages: Message[];
}

export interface FilterState {
  minFollowers: number;
  maxFollowers: number;
  minRate: number;
  maxRate: number;
  niche: Niche | '';
  location: string;
}
