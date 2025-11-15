export interface AffiliateLink {
  id: number;
  title: string;
  url: string;
  category: string;
  featured: boolean;
}

export const affiliateLinks: AffiliateLink[] = [
  {
    id: 3,
    title: "🔥 Collection Baju Budak",
    url: "/baju-raya",
    category: "affiliate",
    featured: false,
  },
];

