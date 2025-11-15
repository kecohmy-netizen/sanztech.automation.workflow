export interface Product {
  id: string;
  title: string;
  category: 'baju-melayu' | 'baju-kurung' | 'baby' | 'sibling-sets' | 'all';
  priceRange: {
    min: number;
    max: number;
  };
  imageUrl: string;
  affiliateUrl: string;
  sizes: string[];
  colors: string[];
  features: string[];
  description: string;
  isPopular?: boolean;
  isNew?: boolean;
}

export const products: Product[] = [
  {
    id: '1',
    title: 'Baju Melayu Budak Premium Set',
    category: 'baju-melayu',
    priceRange: { min: 89, max: 129 },
    imageUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500',
    affiliateUrl: 'https://shopee.com.my/baju-melayu-premium',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Putih', 'Kuning', 'Biru', 'Merah'],
    features: ['100% Cotton', 'Free Size Chart', 'Easy Care'],
    description: 'Baju Melayu klasik dengan kualiti premium, selesa untuk dipakai sepanjang hari.',
    isPopular: true,
  },
  {
    id: '2',
    title: 'Baju Kurung Budak Moden',
    category: 'baju-kurung',
    priceRange: { min: 79, max: 119 },
    imageUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500',
    affiliateUrl: 'https://shopee.com.my/baju-kurung-moden',
    sizes: ['S', 'M', 'L'],
    colors: ['Pink', 'Biru Muda', 'Kuning', 'Hijau'],
    features: ['Breathable Fabric', 'Comfortable Fit', 'Modern Design'],
    description: 'Baju kurung dengan sentuhan moden, sesuai untuk majlis Raya yang istimewa.',
    isNew: true,
  },
  {
    id: '3',
    title: 'Baju Raya Baby Set (0-24 Bulan)',
    category: 'baby',
    priceRange: { min: 49, max: 79 },
    imageUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500',
    affiliateUrl: 'https://shopee.com.my/baju-raya-baby',
    sizes: ['0-6M', '6-12M', '12-18M', '18-24M'],
    colors: ['Putih', 'Kuning', 'Pink', 'Biru'],
    features: ['Soft Fabric', 'Easy Diaper Change', 'Hypoallergenic'],
    description: 'Set baju Raya comel untuk bayi, lembut dan selamat untuk kulit sensitif.',
    isPopular: true,
  },
  {
    id: '4',
    title: 'Sibling Set - Baju Melayu & Kurung',
    category: 'sibling-sets',
    priceRange: { min: 199, max: 299 },
    imageUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500',
    affiliateUrl: 'https://shopee.com.my/sibling-set',
    sizes: ['S-M Set', 'M-L Set', 'L-XL Set'],
    colors: ['Matching Colors', 'Complementary Colors'],
    features: ['Matching Design', 'Save More', 'Perfect for Photos'],
    description: 'Set lengkap untuk adik-beradik dengan design matching, perfect untuk family photos.',
    isPopular: true,
  },
  {
    id: '5',
    title: 'Baju Melayu Budak Classic',
    category: 'baju-melayu',
    priceRange: { min: 69, max: 99 },
    imageUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500',
    affiliateUrl: 'https://shopee.com.my/baju-melayu-classic',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Putih', 'Kuning', 'Biru'],
    features: ['Classic Design', 'Durable', 'Value for Money'],
    description: 'Baju Melayu klasik dengan harga berpatutan, kualiti terjamin.',
  },
  {
    id: '6',
    title: 'Baju Kurung Budak Premium',
    category: 'baju-kurung',
    priceRange: { min: 99, max: 149 },
    imageUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500',
    affiliateUrl: 'https://shopee.com.my/baju-kurung-premium',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Pink', 'Kuning', 'Hijau', 'Ungu'],
    features: ['Premium Fabric', 'Elegant Design', 'Comfortable'],
    description: 'Baju kurung premium dengan fabrik berkualiti tinggi dan design elegan.',
    isNew: true,
  },
  {
    id: '7',
    title: 'Baju Raya Baby Comel Set',
    category: 'baby',
    priceRange: { min: 59, max: 89 },
    imageUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500',
    affiliateUrl: 'https://shopee.com.my/baby-comel-set',
    sizes: ['0-6M', '6-12M', '12-18M'],
    colors: ['Putih', 'Kuning', 'Pink'],
    features: ['Super Soft', 'Easy Wear', 'Cute Design'],
    description: 'Set baju Raya yang comel untuk bayi anda, selesa dan mudah dipakai.',
  },
  {
    id: '8',
    title: 'Family Set - 3 Piece',
    category: 'sibling-sets',
    priceRange: { min: 249, max: 349 },
    imageUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500',
    affiliateUrl: 'https://shopee.com.my/family-set-3piece',
    sizes: ['Small Set', 'Medium Set', 'Large Set'],
    colors: ['Matching Theme'],
    features: ['3 Pieces', 'Best Value', 'Family Photo Ready'],
    description: 'Set lengkap untuk 3 adik-beradik dengan design matching, perfect untuk Raya photos.',
    isPopular: true,
  },
];

export const categories = [
  { id: 'all', label: 'Semua', value: 'all' },
  { id: 'baju-melayu', label: 'Baju Melayu', value: 'baju-melayu' },
  { id: 'baju-kurung', label: 'Baju Kurung', value: 'baju-kurung' },
  { id: 'baby', label: 'Baby', value: 'baby' },
  { id: 'sibling-sets', label: 'Sibling Sets', value: 'sibling-sets' },
] as const;

export const sortOptions = [
  { id: 'popular', label: 'Popular', value: 'popular' },
  { id: 'newest', label: 'Terbaru', value: 'newest' },
  { id: 'price-low', label: 'Harga: Rendah ke Tinggi', value: 'price-low' },
  { id: 'price-high', label: 'Harga: Tinggi ke Rendah', value: 'price-high' },
] as const;

