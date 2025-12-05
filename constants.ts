import { Influencer, Niche } from './types';

export const MOCK_INFLUENCERS: Influencer[] = [
  {
    id: '1',
    name: 'Sarah Jenkins',
    handle: '@sarahstyles',
    avatar: 'https://picsum.photos/200/200?random=1',
    bio: 'Sustainable fashion advocate sharing daily outfit inspo and thrifting tips. Promoting slow fashion in NYC.',
    niche: [Niche.FASHION, Niche.LIFESTYLE],
    followers: 45000,
    engagementRate: 5.2,
    location: 'New York, USA',
    startingRate: 250,
    portfolioImages: [
      'https://picsum.photos/400/500?random=10',
      'https://picsum.photos/400/500?random=11',
      'https://picsum.photos/400/500?random=12'
    ],
    verified: true,
    reviews: [
      { id: 'r1', authorName: 'Everlane', rating: 5, comment: 'Sarah was amazing to work with! High quality content.', date: '2023-10-15' },
      { id: 'r2', authorName: 'Reformation', rating: 4, comment: 'Great engagement, slight delay in posting.', date: '2023-09-01' }
    ]
  },
  {
    id: '2',
    name: 'David Chen',
    handle: '@dave_eats',
    avatar: 'https://picsum.photos/200/200?random=2',
    bio: 'Exploring the hidden culinary gems of San Francisco. Love spicy food and street snacks.',
    niche: [Niche.FOOD, Niche.TRAVEL],
    followers: 12500,
    engagementRate: 8.5,
    location: 'San Francisco, USA',
    startingRate: 150,
    portfolioImages: [
      'https://picsum.photos/400/500?random=13',
      'https://picsum.photos/400/500?random=14'
    ],
    verified: false,
    reviews: []
  },
  {
    id: '3',
    name: 'Elena Rodriguez',
    handle: '@fitwithelena',
    avatar: 'https://picsum.photos/200/200?random=3',
    bio: 'Certified personal trainer. Helping busy moms stay fit from home. Workouts, nutrition, and mindset.',
    niche: [Niche.FITNESS, Niche.LIFESTYLE],
    followers: 89000,
    engagementRate: 3.1,
    location: 'Miami, USA',
    startingRate: 500,
    portfolioImages: [
      'https://picsum.photos/400/500?random=15',
      'https://picsum.photos/400/500?random=16',
      'https://picsum.photos/400/500?random=17',
      'https://picsum.photos/400/500?random=18'
    ],
    verified: true,
    reviews: [
      { id: 'r3', authorName: 'Gymshark', rating: 5, comment: 'Professional and energetic.', date: '2023-11-20' }
    ]
  },
  {
    id: '4',
    name: 'Marcus Wright',
    handle: '@marcus_tech',
    avatar: 'https://picsum.photos/200/200?random=4',
    bio: 'Tech reviewer. Unboxing the latest gadgets and giving honest opinions. minimalist desk setups.',
    niche: [Niche.TECH, Niche.GAMING],
    followers: 210000,
    engagementRate: 2.8,
    location: 'London, UK',
    startingRate: 1200,
    portfolioImages: [
      'https://picsum.photos/400/500?random=19',
      'https://picsum.photos/400/500?random=20'
    ],
    verified: true,
    reviews: []
  },
  {
    id: '5',
    name: 'Sophie & Tom',
    handle: '@wandering_duo',
    avatar: 'https://picsum.photos/200/200?random=5',
    bio: 'Vanlife couple traveling across Europe. Capturing sunsets and cozy moments.',
    niche: [Niche.TRAVEL, Niche.LIFESTYLE],
    followers: 67000,
    engagementRate: 6.4,
    location: 'Berlin, Germany',
    startingRate: 400,
    portfolioImages: [
      'https://picsum.photos/400/500?random=21'
    ],
    verified: false,
    reviews: []
  }
];

export const MOCK_CHATS = [
  {
    id: 'c1',
    participantId: '1',
    participantName: 'Sarah Jenkins',
    participantAvatar: 'https://picsum.photos/200/200?random=1',
    lastMessage: 'Sounds great! When do you need the draft?',
    unreadCount: 2,
    messages: [
      { id: 'm1', senderId: 'brand', text: 'Hi Sarah, love your profile!', timestamp: new Date(Date.now() - 86400000), isRead: true },
      { id: 'm2', senderId: '1', text: 'Thanks! I am a big fan of your brand.', timestamp: new Date(Date.now() - 86000000), isRead: true },
      { id: 'm3', senderId: '1', text: 'Sounds great! When do you need the draft?', timestamp: new Date(Date.now() - 3600000), isRead: false }
    ]
  },
  {
    id: 'c2',
    participantId: '4',
    participantName: 'Marcus Wright',
    participantAvatar: 'https://picsum.photos/200/200?random=4',
    lastMessage: 'I charge $1500 for a dedicated video.',
    unreadCount: 0,
    messages: [
      { id: 'm1', senderId: 'brand', text: 'Hey Marcus, are you open to a sponsorship?', timestamp: new Date(Date.now() - 100000000), isRead: true },
      { id: 'm2', senderId: '4', text: 'I charge $1500 for a dedicated video.', timestamp: new Date(Date.now() - 90000000), isRead: true }
    ]
  }
];
