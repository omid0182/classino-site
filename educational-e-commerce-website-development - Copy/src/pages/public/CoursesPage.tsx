import { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { getCourses, getCategories } from '../../utils/storage';
import CourseCard from '../../components/public/CourseCard';

const types = ['همه', 'تک درس', 'پکیج'];

export default function CoursesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const categoryFromUrl = searchParams.get('category') || 'همه';
  const resultsRef = useRef<HTMLDivElement>(null);

  const storedCategories = getCategories().filter(c => c.isActive);
  const allCategories = [
    { label: 'همه', value: 'همه', icon: '' },
    ...storedCategories.map(c => ({ label: c.name, value: c.name, icon: c.icon }))
  ];
  
  const [selectedCategory, setSelectedCategory] = useState(categoryFromUrl);
  const [selectedType, setSelectedType] = useState('همه');
  const [searchTerm, setSearchTerm] = useState('');

  const scrollToResults = useCallback(() => {
    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  }, []);

  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) {
      setSelectedCategory(cat);
      scrollToResults();
    }
  }, [searchParams, scrollToResults]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    if (category === 'همه') {
      setSearchParams({});
    } else {
      setSearchParams({ category });
    }
    scrollToResults();
  };

  const courses = getCourses().filter(c => c.isActive);

  const filtered = useMemo(() => {
    return courses.filter(c => {
      const matchCategory = selectedCategory === 'همه' || c.category === selectedCategory;
      const matchType = selectedType === 'همه' || 
        (selectedType === 'تک درس' && c.type === 'single') || 
        (selectedType === 'پکیج' && c.type === 'package');
      const matchSearch = !searchTerm || 
        c.title.includes(searchTerm) || 
        c.description.includes(searchTerm) ||
        c.subjects.some(s => s.includes(searchTerm));
      return matchCategory && matchType && matchSearch;
    });
  }, [courses, selectedCategory, selectedType, searchTerm]);

  const getCategoryTitle = () => {
    if (selectedCategory === 'همه') return 'دوره‌های آموزشی';
    if (selectedCategory === 'تیزهوشان') return '🏆 دوره‌های تیزهوشان';
    if (selectedCategory === 'کنکور') return '🎯 دوره‌های کنکور';
    return `دوره‌های ${selectedCategory}`;
  };

  return (
    <div className="bg-[#F0E8E2] min-h-screen">
      <Helmet>
        <title>{selectedCategory === 'همه' ? 'دوره‌های آموزشی' : `دوره‌های ${selectedCategory}`} | کلاسینو</title>
        <meta name="description" content={`لیست دوره‌های آموزشی ${selectedCategory === 'همه' ? 'آنلاین کلاسینو' : selectedCategory}`} />
      </Helmet>

      {/* Header - استفاده از رنگ آبی لوگو */}
      <div className="bg-gradient-to-l from-[#1E41C8] to-[#2F5AF3] text-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-black mb-3">{getCategoryTitle()}</h1>
          <p className="text-blue-100 text-lg">بهترین دوره‌ها با بهترین اساتید</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-sm p-4 md:p-6 mb-8 border border-black/5">
          {/* Search */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="🔍 نام درس..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full md:w-80 px-4 py-3 rounded-xl border border-gray-200 focus:border-[#2F5AF3] focus:ring-2 focus:ring-[#2F5AF3]/20 outline-none text-sm transition"
            />
          </div>

          {/* Category Filter */}
          <div className="mb-3">
            <label className="text-sm font-bold text-gray-700 mb-2 block">دسته‌بندی:</label>
            <div className="flex flex-wrap gap-2">
              {allCategories.map(cat => (
                <button
                  key={cat.value}
                  onClick={() => handleCategoryChange(cat.value)}
                  className={`px-4 py-2 rounded-lg text-sm font-bold transition ${
                    selectedCategory === cat.value
                      ? 'bg-[#2F5AF3] text-white shadow-lg'
                      : 'bg-gray-100 text-gray-600 hover:bg-[#FFA300]/20 hover:text-[#FFA300]'
                  }`}
                >
                  {cat.icon && <span className="ml-1">{cat.icon}</span>}
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Type Filter */}
          <div>
            <label className="text-sm font-bold text-gray-700 mb-2 block">نوع دوره:</label>
            <div className="flex gap-2">
              {types.map(type => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`px-4 py-2 rounded-lg text-sm font-bold transition ${
                    selectedType === type
                      ? 'bg-[#2F5AF3] text-white shadow-lg'
                      : 'bg-gray-100 text-gray-600 hover:bg-[#FFA300]/20 hover:text-[#FFA300]'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results */}
        <div ref={resultsRef} className="scroll-mt-24">
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm font-bold text-gray-600">
              {filtered.length} دوره یافت شد
            </p>
            {selectedCategory !== 'همه' && (
              <button
                onClick={() => navigate('/#categories')}
                className="text-sm text-[#FF0D38] hover:text-red-700 font-bold"
              >
                ✕ حذف فیلتر
              </button>
            )}
          </div>

          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map(course => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-gray-400">
              <span className="text-6xl block mb-4">🔍</span>
              <p className="text-lg font-bold text-gray-600 mb-2">دوره‌ای با این مشخصات یافت نشد</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}