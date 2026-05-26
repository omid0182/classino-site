import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { getBlogs } from '../../utils/storage';

const blogCategories = ['همه', 'مقالات آموزشی', 'نکات کنکوری', 'اخبار آموزشی', 'مشاوره تحصیلی', 'معرفی رشته'];

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('همه');
  const [searchTerm, setSearchTerm] = useState('');

  const blogs = getBlogs().filter(b => b.isPublished);

  const filtered = useMemo(() => {
    return blogs.filter(b => {
      const matchCategory = selectedCategory === 'همه' || b.category === selectedCategory;
      const matchSearch = !searchTerm || b.title.includes(searchTerm) || b.excerpt.includes(searchTerm);
      return matchCategory && matchSearch;
    });
  }, [blogs, selectedCategory, searchTerm]);

  return (
    <div className="bg-[#F0E8E2] min-h-screen">
      <Helmet>
        <title>وبلاگ | کلاسینو - مقالات آموزشی و مشاوره‌ای</title>
        <meta name="description" content="آخرین مقالات آموزشی، نکات کنکوری و مشاوره تحصیلی در وبلاگ کلاسینو" />
      </Helmet>

      {/* Header */}
      <div className="bg-gradient-to-l from-[#1E41C8] to-[#2F5AF3] text-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-black mb-3">وبلاگ کلاسینو</h1>
          <p className="text-blue-100 text-lg">مقالات آموزشی، نکات کنکوری و مشاوره تحصیلی</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-sm p-4 md:p-6 mb-8 border border-black/5">
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="🔍 جستجو در مقالات..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="flex-1 md:max-w-xs px-4 py-3 rounded-xl border border-gray-200 focus:border-[#2F5AF3] focus:ring-2 focus:ring-[#2F5AF3]/20 outline-none text-sm transition"
            />
            <div className="flex flex-wrap gap-2">
              {blogCategories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-lg text-sm font-bold transition ${
                    selectedCategory === cat
                      ? 'bg-[#2F5AF3] text-white shadow-lg'
                      : 'bg-white text-gray-600 hover:bg-[#FFA300]/10 hover:text-[#FFA300] border border-gray-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(post => (
              <Link
                key={post.id}
                to={`/blog/${post.slug}`}
                className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-black/5"
              >
                <div className="h-48 bg-[#2F5AF3]/10 flex items-center justify-center overflow-hidden">
                  {post.image ? (
                    <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  ) : (
                    <span className="text-6xl">📝</span>
                  )}
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-[10px] uppercase font-bold text-[#2F5AF3] bg-[#2F5AF3]/10 px-2 py-1 rounded-md">{post.category}</span>
                    <span className="text-[10px] text-gray-400">{new Date(post.createdAt).toLocaleDateString('fa-IR')}</span>
                  </div>
                  <h2 className="font-black text-gray-800 text-lg mb-3 group-hover:text-[#2F5AF3] transition line-clamp-2">
                    {post.title}
                  </h2>
                  <p className="text-sm text-gray-500 line-clamp-3 leading-7 mb-4">{post.excerpt}</p>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <span className="text-xs text-gray-400 font-bold">✍️ {post.author}</span>
                    <span className="text-xs text-[#2F5AF3] font-bold group-hover:underline">ادامه مطلب ←</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-400">
            <span className="text-6xl block mb-4">📝</span>
            <p className="text-lg font-bold">هنوز مقاله‌ای منتشر نشده است</p>
          </div>
        )}
      </div>
    </div>
  );
}