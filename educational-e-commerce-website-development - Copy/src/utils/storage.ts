import { Course, BlogPost, SiteSettings, Category } from '../types';
import { v4 as uuidv4 } from 'uuid';

const COURSES_KEY = 'classino_courses';
const BLOGS_KEY = 'classino_blogs';
const SETTINGS_KEY = 'classino_settings';
const CATEGORIES_KEY = 'classino_categories';
const AUTH_KEY = 'classino_auth';

// Default categories
const defaultCategories: Category[] = [
  // Featured
  { id: uuidv4(), name: 'تیزهوشان', slug: 'tizhoushan', icon: '🏆', color: 'from-amber-400 via-yellow-500 to-orange-500', description: 'آمادگی آزمون تیزهوشان پایه ششم و نهم', type: 'featured', order: 1, isActive: true },
  { id: uuidv4(), name: 'کنکور', slug: 'konkur', icon: '🎯', color: 'from-red-500 via-rose-600 to-pink-600', description: 'دوره‌های جامع کنکور تجربی، ریاضی و انسانی', type: 'featured', order: 2, isActive: true },
  // Elementary
  { id: uuidv4(), name: 'پایه اول', slug: 'paye-1', icon: '🌱', color: 'from-green-400 to-emerald-500', description: 'شروع سفر یادگیری', type: 'elementary', order: 1, isActive: true },
  { id: uuidv4(), name: 'پایه دوم', slug: 'paye-2', icon: '🌿', color: 'from-green-500 to-teal-500', description: 'تقویت پایه‌ها', type: 'elementary', order: 2, isActive: true },
  { id: uuidv4(), name: 'پایه سوم', slug: 'paye-3', icon: '🌳', color: 'from-teal-400 to-cyan-500', description: 'رشد مهارت‌ها', type: 'elementary', order: 3, isActive: true },
  { id: uuidv4(), name: 'پایه چهارم', slug: 'paye-4', icon: '📗', color: 'from-cyan-400 to-blue-500', description: 'گسترش دانش', type: 'elementary', order: 4, isActive: true },
  { id: uuidv4(), name: 'پایه پنجم', slug: 'paye-5', icon: '📘', color: 'from-blue-400 to-indigo-500', description: 'آماده‌سازی', type: 'elementary', order: 5, isActive: true },
  { id: uuidv4(), name: 'پایه ششم', slug: 'paye-6', icon: '🎓', color: 'from-indigo-400 to-purple-500', description: 'پایان ابتدایی', type: 'elementary', order: 6, isActive: true },
  // Middle school
  { id: uuidv4(), name: 'پایه هفتم', slug: 'paye-7', icon: '🔬', color: 'from-purple-400 to-violet-500', description: 'ورود به دوره جدید', type: 'middle', order: 1, isActive: true },
  { id: uuidv4(), name: 'پایه هشتم', slug: 'paye-8', icon: '⚗️', color: 'from-violet-400 to-purple-600', description: 'تعمیق مفاهیم', type: 'middle', order: 2, isActive: true },
  { id: uuidv4(), name: 'پایه نهم', slug: 'paye-9', icon: '🎯', color: 'from-fuchsia-400 to-pink-500', description: 'آماده کنکور تیزهوشان', type: 'middle', order: 3, isActive: true },
  // High school
  { id: uuidv4(), name: 'پایه دهم', slug: 'paye-10', icon: '📐', color: 'from-rose-400 to-red-500', description: 'پایه‌گذاری تخصصی', type: 'high', order: 1, isActive: true },
  { id: uuidv4(), name: 'پایه یازدهم', slug: 'paye-11', icon: '📊', color: 'from-red-400 to-orange-500', description: 'تقویت تخصصی', type: 'high', order: 2, isActive: true },
  { id: uuidv4(), name: 'پایه دوازدهم', slug: 'paye-12', icon: '🚀', color: 'from-orange-400 to-amber-500', description: 'آماده کنکور', type: 'high', order: 3, isActive: true },
];

// Default settings
const defaultSettings: SiteSettings = {
  siteName: 'کلاسینو',
  siteDescription: 'آموزشگاه آنلاین از ابتدایی تا کنکور با بهترین اساتید کشور',
  phone: '021-12345678',
  email: 'info@classino.ir',
  address: 'تهران، خیابان ولیعصر',
  instagram: 'classino_ir',
  telegram: 'classino_ir',
  whatsapp: '09121234567',
  aboutText: 'کلاسینو یک پلتفرم آموزشی آنلاین است که با هدف ارائه آموزش باکیفیت از مقطع ابتدایی تا کنکور تأسیس شده است.',
  heroTitle: 'با کلاسینو، موفقیت تضمینی است!',
  heroSubtitle: 'آموزش آنلاین از ابتدایی تا کنکور با بهترین اساتید کشور',
};

// Sample courses
const sampleCourses: Course[] = [
  {
    id: uuidv4(),
    title: 'پکیج جامع کنکور تجربی ۱۴۰۵',
    slug: 'konkur-tajrobi-1405',
    description: 'پکیج کامل آمادگی کنکور تجربی شامل تمام دروس اختصاصی و عمومی با بهترین اساتید',
    content: '<h2>توضیحات دوره</h2><p>این پکیج شامل تمامی دروس مورد نیاز برای کنکور تجربی می‌باشد. با شرکت در این دوره، شما به تمامی ویدیوهای آموزشی، جزوات و آزمون‌های آزمایشی دسترسی خواهید داشت.</p><h3>مزایای دوره</h3><ul><li>تدریس توسط بهترین اساتید کشور</li><li>جزوات اختصاصی</li><li>آزمون‌های آزمایشی هفتگی</li><li>مشاوره تحصیلی رایگان</li><li>پشتیبانی ۲۴ ساعته</li></ul>',
    image: '',
    category: 'کنکور',
    level: 'پیشرفته',
    type: 'package',
    subjects: ['زیست‌شناسی', 'شیمی', 'فیزیک', 'ریاضی', 'زبان انگلیسی', 'ادبیات', 'عربی', 'دینی'],
    teachers: [
      { name: 'دکتر احمدی', subject: 'زیست‌شناسی', bio: 'دکترای زیست‌شناسی از دانشگاه تهران' },
      { name: 'مهندس رضایی', subject: 'شیمی', bio: 'فوق لیسانس شیمی' },
      { name: 'دکتر محمدی', subject: 'فیزیک', bio: 'دکترای فیزیک' },
    ],
    schedule: [
      { day: 'شنبه', startTime: '16:00', endTime: '18:00', subject: 'زیست‌شناسی' },
      { day: 'یکشنبه', startTime: '16:00', endTime: '18:00', subject: 'شیمی' },
      { day: 'دوشنبه', startTime: '16:00', endTime: '18:00', subject: 'فیزیک' },
      { day: 'سه‌شنبه', startTime: '16:00', endTime: '18:00', subject: 'ریاضی' },
    ],
    price: 12000000,
    discountPrice: 9500000,
    duration: '۱۲ ماه',
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    seoTitle: 'پکیج جامع کنکور تجربی ۱۴۰۵ | کلاسینو',
    seoDescription: 'پکیج کامل آمادگی کنکور تجربی با بهترین اساتید کشور - شامل تمام دروس اختصاصی و عمومی',
  },
  {
    id: uuidv4(),
    title: 'ریاضی پایه دهم',
    slug: 'riazi-dahom',
    description: 'آموزش کامل ریاضی پایه دهم',
    content: '<h2>سرفصل‌های دوره</h2><ul><li>مجموعه، الگو و دنباله</li><li>مثلثات</li><li>توابع</li><li>معادلات و نامعادلات</li><li>آمار و احتمال</li></ul>',
    image: '',
    category: 'پایه دهم',
    level: 'متوسط',
    type: 'single',
    subjects: ['ریاضی'],
    teachers: [
      { name: 'استاد کریمی', subject: 'ریاضی', bio: 'فوق لیسانس ریاضی کاربردی' },
    ],
    schedule: [
      { day: 'چهارشنبه', startTime: '17:00', endTime: '19:00', subject: 'ریاضی' },
    ],
    price: 3500000,
    duration: '۶ ماه',
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    title: 'زبان انگلیسی پایه هفتم',
    slug: 'english-haftom',
    description: 'آموزش جامع زبان انگلیسی پایه هفتم',
    content: '<h2>محتوای دوره</h2><p>آموزش کامل کتاب زبان انگلیسی هفتم با تمرینات شنیداری و گفتاری</p>',
    image: '',
    category: 'پایه هفتم',
    level: 'مقدماتی',
    type: 'single',
    subjects: ['زبان انگلیسی'],
    teachers: [
      { name: 'خانم نوری', subject: 'زبان انگلیسی', bio: 'فوق لیسانس آموزش زبان انگلیسی' },
    ],
    schedule: [
      { day: 'پنجشنبه', startTime: '10:00', endTime: '12:00', subject: 'زبان انگلیسی' },
    ],
    price: 2000000,
    discountPrice: 1500000,
    duration: '۴ ماه',
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    title: 'دوره جامع تیزهوشان پایه ششم',
    slug: 'tizhoushan-sheshom',
    description: 'آمادگی کامل برای آزمون ورودی مدارس تیزهوشان پایه ششم',
    content: '<h2>محتوای دوره</h2><ul><li>ریاضی پیشرفته</li><li>علوم تجربی</li><li>هوش و استعداد</li><li>آزمون‌های شبیه‌ساز</li></ul>',
    image: '',
    category: 'تیزهوشان',
    level: 'پیشرفته',
    type: 'package',
    subjects: ['ریاضی', 'علوم', 'هوش و استعداد'],
    teachers: [
      { name: 'دکتر صادقی', subject: 'ریاضی', bio: 'مدرس برتر المپیاد ریاضی' },
      { name: 'استاد موسوی', subject: 'هوش', bio: 'متخصص آزمون‌های هوش' },
    ],
    schedule: [
      { day: 'جمعه', startTime: '09:00', endTime: '12:00', subject: 'ریاضی و هوش' },
    ],
    price: 5000000,
    discountPrice: 4200000,
    duration: '۴ ماه',
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    seoTitle: 'دوره تیزهوشان پایه ششم | کلاسینو',
    seoDescription: 'آمادگی کامل آزمون تیزهوشان ششم با بهترین اساتید',
  },
  {
    id: uuidv4(),
    title: 'ریاضی پایه ششم',
    slug: 'riazi-sheshom',
    description: 'آموزش کامل ریاضی پایه ششم ابتدایی',
    content: '<h2>سرفصل‌ها</h2><ul><li>کسر و اعشار</li><li>تناسب</li><li>هندسه</li><li>آمار</li></ul>',
    image: '',
    category: 'پایه ششم',
    level: 'متوسط',
    type: 'single',
    subjects: ['ریاضی'],
    teachers: [
      { name: 'آقای حسینی', subject: 'ریاضی', bio: 'معلم نمونه استان' },
    ],
    schedule: [
      { day: 'شنبه', startTime: '15:00', endTime: '17:00', subject: 'ریاضی' },
    ],
    price: 1800000,
    duration: '۵ ماه',
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const sampleBlogs: BlogPost[] = [
  {
    id: uuidv4(),
    title: 'چگونه برای کنکور ۱۴۰۵ برنامه‌ریزی کنیم؟',
    slug: 'konkur-1405-plan',
    excerpt: 'در این مقاله به بررسی بهترین روش‌های برنامه‌ریزی برای کنکور می‌پردازیم.',
    content: '<h2>اهمیت برنامه‌ریزی</h2><p>برنامه‌ریزی صحیح یکی از مهم‌ترین عوامل موفقیت در کنکور است. بدون برنامه‌ریزی، حتی باهوش‌ترین دانش‌آموزان هم نمی‌توانند به نتیجه مطلوب برسند.</p><h3>قدم اول: شناخت وضعیت فعلی</h3><p>قبل از هر چیز باید بدانید در هر درس چه وضعیتی دارید. یک آزمون جامع از خودتان بگیرید.</p><h3>قدم دوم: تعیین اهداف</h3><p>اهداف خود را مشخص کنید. چه رشته‌ای می‌خواهید قبول شوید؟ در چه دانشگاهی؟</p>',
    image: '',
    category: 'مشاوره تحصیلی',
    tags: ['کنکور', 'برنامه‌ریزی', 'مشاوره'],
    author: 'تیم مشاوره کلاسینو',
    isPublished: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    seoTitle: 'برنامه‌ریزی کنکور ۱۴۰۵ | کلاسینو',
    seoDescription: 'بهترین روش‌های برنامه‌ریزی برای کنکور سراسری',
  },
  {
    id: uuidv4(),
    title: '۱۰ نکته طلایی برای موفقیت در امتحانات نهایی',
    slug: '10-tips-final-exam',
    excerpt: 'نکات کلیدی که رعایت آن‌ها می‌تواند نمرات شما در امتحانات نهایی را به طور چشمگیری افزایش دهد.',
    content: '<h2>نکات طلایی امتحانات نهایی</h2><ol><li><strong>برنامه‌ریزی دقیق:</strong> از حداقل دو هفته قبل شروع به مطالعه کنید</li><li><strong>مرور منظم:</strong> هر روز مباحث قبلی را مرور کنید</li><li><strong>تست‌زنی:</strong> حتماً سؤالات سال‌های قبل را حل کنید</li></ol>',
    image: '',
    category: 'نکات کنکوری',
    tags: ['امتحانات', 'نکات', 'موفقیت'],
    author: 'استاد محمدی',
    isPublished: true,
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 86400000).toISOString(),
  },
];

// Storage functions
export function getCourses(): Course[] {
  const data = localStorage.getItem(COURSES_KEY);
  if (!data) {
    localStorage.setItem(COURSES_KEY, JSON.stringify(sampleCourses));
    return sampleCourses;
  }
  return JSON.parse(data);
}

export function saveCourses(courses: Course[]): void {
  localStorage.setItem(COURSES_KEY, JSON.stringify(courses));
}

export function getCourse(id: string): Course | undefined {
  return getCourses().find(c => c.id === id);
}

export function getCourseBySlug(slug: string): Course | undefined {
  return getCourses().find(c => c.slug === slug);
}

export function saveCourse(course: Course): void {
  const courses = getCourses();
  const index = courses.findIndex(c => c.id === course.id);
  if (index >= 0) {
    courses[index] = { ...course, updatedAt: new Date().toISOString() };
  } else {
    courses.push(course);
  }
  saveCourses(courses);
}

export function deleteCourse(id: string): void {
  saveCourses(getCourses().filter(c => c.id !== id));
}

export function getBlogs(): BlogPost[] {
  const data = localStorage.getItem(BLOGS_KEY);
  if (!data) {
    localStorage.setItem(BLOGS_KEY, JSON.stringify(sampleBlogs));
    return sampleBlogs;
  }
  return JSON.parse(data);
}

export function saveBlogs(blogs: BlogPost[]): void {
  localStorage.setItem(BLOGS_KEY, JSON.stringify(blogs));
}

export function getBlog(id: string): BlogPost | undefined {
  return getBlogs().find(b => b.id === id);
}

export function getBlogBySlug(slug: string): BlogPost | undefined {
  return getBlogs().find(b => b.slug === slug);
}

export function saveBlog(blog: BlogPost): void {
  const blogs = getBlogs();
  const index = blogs.findIndex(b => b.id === blog.id);
  if (index >= 0) {
    blogs[index] = { ...blog, updatedAt: new Date().toISOString() };
  } else {
    blogs.push(blog);
  }
  saveBlogs(blogs);
}

export function deleteBlog(id: string): void {
  saveBlogs(getBlogs().filter(b => b.id !== id));
}

// Categories
export function getCategories(): Category[] {
  const data = localStorage.getItem(CATEGORIES_KEY);
  if (!data) {
    localStorage.setItem(CATEGORIES_KEY, JSON.stringify(defaultCategories));
    return defaultCategories;
  }
  return JSON.parse(data);
}

export function saveCategories(categories: Category[]): void {
  localStorage.setItem(CATEGORIES_KEY, JSON.stringify(categories));
}

export function getCategory(id: string): Category | undefined {
  return getCategories().find(c => c.id === id);
}

export function saveCategory(category: Category): void {
  const categories = getCategories();
  const index = categories.findIndex(c => c.id === category.id);
  if (index >= 0) {
    categories[index] = category;
  } else {
    categories.push(category);
  }
  saveCategories(categories);
}

export function deleteCategory(id: string): void {
  saveCategories(getCategories().filter(c => c.id !== id));
}

export function getCategoriesByType(type: Category['type']): Category[] {
  return getCategories()
    .filter(c => c.type === type && c.isActive)
    .sort((a, b) => a.order - b.order);
}

export function getAllCategoryNames(): string[] {
  return getCategories()
    .filter(c => c.isActive)
    .map(c => c.name);
}

export function getSettings(): SiteSettings {
  const data = localStorage.getItem(SETTINGS_KEY);
  if (!data) {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(defaultSettings));
    return defaultSettings;
  }
  return JSON.parse(data);
}

export function saveSettings(settings: SiteSettings): void {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}

export function isAuthenticated(): boolean {
  return localStorage.getItem(AUTH_KEY) === 'true';
}

export function login(username: string, password: string): boolean {
  if (username === 'admin' && password === 'classino2024') {
    localStorage.setItem(AUTH_KEY, 'true');
    return true;
  }
  return false;
}

export function logout(): void {
  localStorage.removeItem(AUTH_KEY);
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('fa-IR').format(price);
}

export function generateSlug(text: string): string {
  return text
    .replace(/\s+/g, '-')
    .replace(/[^\u0600-\u06FFa-zA-Z0-9-]/g, '')
    .toLowerCase();
}
