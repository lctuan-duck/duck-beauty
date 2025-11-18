export interface CompanyReview {
  id: string;
  companyId: string;
  userId: string;
  content: string;
  summary: string;
  rating: number;
  ratings: {
    salary: number;
    culture: number;
    management: number;
    workLifeBalance: number;
    careerGrowth: number;
  };
  position: string;
  employmentStatus: "current" | "former" | "candidate";
  isAnonymous: boolean;
  isVerified: boolean;
  priceCoin: number;
  totalTips: number;
  helpfulCount: number;
  notHelpfulCount: number;
  tags: string[];
  createdAt: string;
  isPurchased?: boolean;
}

export interface Company {
  id: string;
  name: string;
  slug:string
  logo: string;
  industry: string;
  location: string;
  description: string;
  totalReviews: number;
  averageRating: number;
  ratings: {
    salary: number;
    culture: number;
    management: number;
    workLifeBalance: number;
    careerGrowth: number;
  };
  trending: "up" | "down" | "stable";
}
