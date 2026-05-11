export interface Product {
  id: string;
  title: string;
  brand: string;
  price: number;
  originalPrice?: number;
  condition: 'thrift' | 'new';
  category: string;
  image: string;
  seller: string;
  sellerAvatar: string;
  verified: boolean;
  liked: boolean;
  size: string;
  location: string;
  badges?: string[];
}

export interface Squad {
  id: string;
  name: string;
  members: number;
  maxMembers: number;
  goal: number;
  saved: number;
  coverColor: string;
  avatars: string[];
  category: string;
  deadline: string;
  description: string;
}

export interface InvestmentClub {
  id: string;
  brand: string;
  tagline: string;
  category: string;
  logo: string;
  coverColor: string;
  target: number;
  raised: number;
  investors: number;
  minInvestment: number;
  projectedROI: string;
  deadline: string;
  tags: string[];
  origin: string;
}

export const products: Product[] = [
  {
    id: '1',
    title: 'Vintage Levi\'s 501 Jeans',
    brand: 'Levi\'s',
    price: 8500,
    originalPrice: 25000,
    condition: 'thrift',
    category: 'Bottoms',
    image: 'https://picsum.photos/seed/fashion1/400/500',
    seller: 'Amara_Style',
    sellerAvatar: 'https://picsum.photos/seed/avatar1/40/40',
    verified: true,
    liked: false,
    size: 'W28 L30',
    location: 'Lagos',
    badges: ['Hot Pick', 'Verified'],
  },
  {
    id: '2',
    title: 'Silk Wrap Midi Dress',
    brand: 'Zara Studio',
    price: 34000,
    condition: 'new',
    category: 'Dresses',
    image: 'https://picsum.photos/seed/fashion2/400/500',
    seller: 'Chic_by_Temi',
    sellerAvatar: 'https://picsum.photos/seed/avatar2/40/40',
    verified: true,
    liked: true,
    size: 'M',
    location: 'Abuja',
    badges: ['New Arrival'],
  },
  {
    id: '3',
    title: 'Air Jordan 1 Mid Chicago',
    brand: 'Nike',
    price: 95000,
    originalPrice: 120000,
    condition: 'thrift',
    category: 'Shoes',
    image: 'https://picsum.photos/seed/fashion3/400/500',
    seller: 'Sneaker_Plug_NG',
    sellerAvatar: 'https://picsum.photos/seed/avatar3/40/40',
    verified: true,
    liked: false,
    size: 'UK 9',
    location: 'Lagos',
    badges: ['Grail', 'Authenticated'],
  },
  {
    id: '4',
    title: 'Ankara Blazer Set',
    brand: 'Adire Studio',
    price: 45000,
    condition: 'new',
    category: 'Sets',
    image: 'https://picsum.photos/seed/fashion4/400/500',
    seller: 'Adire_Studio',
    sellerAvatar: 'https://picsum.photos/seed/avatar4/40/40',
    verified: true,
    liked: true,
    size: 'L',
    location: 'Port Harcourt',
    badges: ['African Design', 'Limited'],
  },
  {
    id: '5',
    title: 'Y2K Butterfly Crop Top',
    brand: 'Vintage Find',
    price: 5500,
    originalPrice: 15000,
    condition: 'thrift',
    category: 'Tops',
    image: 'https://picsum.photos/seed/fashion5/400/500',
    seller: 'Retro_Wardrobe',
    sellerAvatar: 'https://picsum.photos/seed/avatar5/40/40',
    verified: false,
    liked: false,
    size: 'XS/S',
    location: 'Ibadan',
    badges: ['Trending'],
  },
  {
    id: '6',
    title: 'Oversized Blazer – Ecru',
    brand: 'H&M Premium',
    price: 22000,
    condition: 'new',
    category: 'Outerwear',
    image: 'https://picsum.photos/seed/fashion6/400/500',
    seller: 'The_Closet_Hub',
    sellerAvatar: 'https://picsum.photos/seed/avatar6/40/40',
    verified: true,
    liked: false,
    size: 'L/XL',
    location: 'Lagos',
  },
  {
    id: '7',
    title: 'Gold Chain Bag – Mini',
    brand: 'Gucci',
    price: 280000,
    originalPrice: 450000,
    condition: 'thrift',
    category: 'Bags',
    image: 'https://picsum.photos/seed/fashion7/400/500',
    seller: 'Luxury_Lane_NG',
    sellerAvatar: 'https://picsum.photos/seed/avatar7/40/40',
    verified: true,
    liked: true,
    size: 'One Size',
    location: 'Lagos',
    badges: ['Luxury', 'Authenticated'],
  },
  {
    id: '8',
    title: 'Agbada Modern Cut',
    brand: 'House of Deola',
    price: 75000,
    condition: 'new',
    category: 'Menswear',
    image: 'https://picsum.photos/seed/fashion8/400/500',
    seller: 'House_of_Deola',
    sellerAvatar: 'https://picsum.photos/seed/avatar8/40/40',
    verified: true,
    liked: false,
    size: 'XL',
    location: 'Lagos',
    badges: ['Designer', 'African Fashion'],
  },
];

export const squads: Squad[] = [
  {
    id: '1',
    name: 'Lagos Fashion Week Fund',
    members: 12,
    maxMembers: 15,
    goal: 500000,
    saved: 375000,
    coverColor: 'from-brand-violet to-purple-900',
    avatars: [
      'https://picsum.photos/seed/sq1a/32/32',
      'https://picsum.photos/seed/sq1b/32/32',
      'https://picsum.photos/seed/sq1c/32/32',
    ],
    category: 'Events',
    deadline: '2026-10-15',
    description: 'Saving up for the ultimate Lagos Fashion Week experience — outfits, shows, and after-parties.',
  },
  {
    id: '2',
    name: 'Sneakerhead Collective',
    members: 8,
    maxMembers: 10,
    goal: 1200000,
    saved: 840000,
    coverColor: 'from-brand-coral to-orange-700',
    avatars: [
      'https://picsum.photos/seed/sq2a/32/32',
      'https://picsum.photos/seed/sq2b/32/32',
      'https://picsum.photos/seed/sq2c/32/32',
    ],
    category: 'Sneakers',
    deadline: '2026-08-01',
    description: 'Pooling funds for exclusive sneaker drops. From Jordans to Yeezys — we buy smart, we buy together.',
  },
  {
    id: '3',
    name: 'Thrift Queens 👑',
    members: 20,
    maxMembers: 25,
    goal: 300000,
    saved: 210000,
    coverColor: 'from-pink-600 to-rose-900',
    avatars: [
      'https://picsum.photos/seed/sq3a/32/32',
      'https://picsum.photos/seed/sq3b/32/32',
      'https://picsum.photos/seed/sq3c/32/32',
    ],
    category: 'Thrift',
    deadline: '2026-07-30',
    description: 'Curating the best vintage and thrift finds across Nigeria. Sustainable fashion is our love language.',
  },
  {
    id: '4',
    name: 'Men\'s Luxury Club',
    members: 5,
    maxMembers: 8,
    goal: 2000000,
    saved: 650000,
    coverColor: 'from-brand-gold to-amber-700',
    avatars: [
      'https://picsum.photos/seed/sq4a/32/32',
      'https://picsum.photos/seed/sq4b/32/32',
      'https://picsum.photos/seed/sq4c/32/32',
    ],
    category: 'Luxury',
    deadline: '2026-12-01',
    description: 'Building a war chest for luxury menswear — Berluti, Tom Ford, and bespoke African tailoring.',
  },
];

export const investmentClubs: InvestmentClub[] = [
  {
    id: '1',
    brand: 'Adire Studio',
    tagline: 'Redefining African fashion for a global audience',
    category: 'African Fashion',
    logo: 'https://picsum.photos/seed/brand1/80/80',
    coverColor: 'from-amber-500 to-orange-600',
    target: 15000000,
    raised: 10200000,
    investors: 284,
    minInvestment: 5000,
    projectedROI: '28% / yr',
    deadline: '2026-09-30',
    tags: ['African', 'Sustainable', 'Ready-to-Wear'],
    origin: 'Lagos, Nigeria',
  },
  {
    id: '2',
    brand: 'Kente Kings',
    tagline: 'Premium Ghanaian kente for the modern wardrobe',
    category: 'Heritage Fashion',
    logo: 'https://picsum.photos/seed/brand2/80/80',
    coverColor: 'from-green-500 to-emerald-700',
    target: 8000000,
    raised: 5600000,
    investors: 156,
    minInvestment: 10000,
    projectedROI: '22% / yr',
    deadline: '2026-08-15',
    tags: ['Ghana', 'Heritage', 'Kente'],
    origin: 'Accra, Ghana',
  },
  {
    id: '3',
    brand: 'NeoAfrik',
    tagline: 'Afrofuturism meets high fashion',
    category: 'Avant-garde',
    logo: 'https://picsum.photos/seed/brand3/80/80',
    coverColor: 'from-brand-violet to-blue-900',
    target: 25000000,
    raised: 8750000,
    investors: 412,
    minInvestment: 2500,
    projectedROI: '35% / yr',
    deadline: '2026-12-31',
    tags: ['Afrofuturism', 'Luxury', 'Global'],
    origin: 'Lagos & Paris',
  },
  {
    id: '4',
    brand: 'Thrift Republic',
    tagline: 'Scaling sustainable fashion across Africa',
    category: 'Sustainable Fashion',
    logo: 'https://picsum.photos/seed/brand4/80/80',
    coverColor: 'from-teal-500 to-cyan-700',
    target: 5000000,
    raised: 4800000,
    investors: 921,
    minInvestment: 1000,
    projectedROI: '18% / yr',
    deadline: '2026-07-01',
    tags: ['Sustainable', 'Thrift', 'Circular'],
    origin: 'Nairobi, Kenya',
  },
];

export const categories = [
  { id: 'all', label: 'All', emoji: '✨' },
  { id: 'dresses', label: 'Dresses', emoji: '👗' },
  { id: 'tops', label: 'Tops', emoji: '👕' },
  { id: 'bottoms', label: 'Bottoms', emoji: '👖' },
  { id: 'shoes', label: 'Shoes', emoji: '👟' },
  { id: 'bags', label: 'Bags', emoji: '👜' },
  { id: 'accessories', label: 'Accessories', emoji: '💍' },
  { id: 'menswear', label: 'Menswear', emoji: '🕴️' },
  { id: 'sets', label: 'Sets', emoji: '🎭' },
];
