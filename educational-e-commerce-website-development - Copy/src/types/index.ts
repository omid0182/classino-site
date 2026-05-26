export interface Course {
  id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  image: string;
  category: string;
  level: string;
  type: 'single' | 'package';
  subjects: string[];
  teachers: Teacher[];
  schedule: Schedule[];
  price: number;
  discountPrice?: number;
  duration: string;
  startDate?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string;
}

export interface Teacher {
  name: string;
  subject: string;
  image?: string;
  bio?: string;
}

export interface Schedule {
  day: string;
  startTime: string;
  endTime: string;
  subject?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  tags: string[];
  author: string;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string;
}

export interface SiteSettings {
  siteName: string;
  siteDescription: string;
  phone: string;
  email: string;
  address: string;
  instagram: string;
  telegram: string;
  whatsapp: string;
  aboutText: string;
  heroTitle: string;
  heroSubtitle: string;
  logo?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  color: string;
  description: string;
  type: 'featured' | 'elementary' | 'middle' | 'high';
  order: number;
  isActive: boolean;
}

export type CourseCategory = 
  | 'تیزهوشان'
  | 'کنکور'
  | 'پایه اول'
  | 'پایه دوم'
  | 'پایه سوم'
  | 'پایه چهارم'
  | 'پایه پنجم'
  | 'پایه ششم'
  | 'پایه هفتم'
  | 'پایه هشتم'
  | 'پایه نهم'
  | 'پایه دهم'
  | 'پایه یازدهم'
  | 'پایه دوازدهم';

export type BlogCategory =
  | 'مقالات آموزشی'
  | 'نکات کنکوری'
  | 'اخبار آموزشی'
  | 'مشاوره تحصیلی'
  | 'معرفی رشته';
