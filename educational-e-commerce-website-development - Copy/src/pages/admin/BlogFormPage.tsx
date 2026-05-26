import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { BlogPost } from '../../types';
import { getBlog, saveBlog, generateSlug } from '../../utils/storage';
import RichTextEditor from '../../components/admin/RichTextEditor';

const blogCategories = ['مقالات آموزشی', 'نکات کنکوری', 'اخبار آموزشی', 'مشاوره تحصیلی', 'معرفی رشته'];

const emptyBlog: BlogPost = {
  id: '',
  title: '',
  slug: '',
  excerpt: '',
  content: '',
  image: '',
  category: 'مقالات آموزشی',
  tags: [],
  author: 'تیم کلاسینو',
  isPublished: false,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  seoTitle: '',
  seoDescription: '',
  seoKeywords: '',
};

export default function BlogFormPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditing = !!id;

  const [blog, setBlog] = useState<BlogPost>(emptyBlog);
  const [newTag, setNewTag] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (id) {
      const existing = getBlog(id);
      if (existing) {
        setBlog(existing);
      } else {
        navigate('/admin/blogs');
      }
    }
  }, [id, navigate]);

  const handleChange = (field: keyof BlogPost, value: unknown) => {
    setBlog(prev => ({ ...prev, [field]: value }));
  };

  const addTag = () => {
    if (newTag.trim() && !blog.tags.includes(newTag.trim())) {
      handleChange('tags', [...blog.tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const removeTag = (tag: string) => {
    handleChange('tags', blog.tags.filter(t => t !== tag));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const toSave: BlogPost = {
      ...blog,
      id: blog.id || uuidv4(),
      slug: blog.slug || generateSlug(blog.title),
    };
    saveBlog(toSave);
    setSaved(true);
    setTimeout(() => {
      navigate('/admin/blogs');
    }, 1000);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        handleChange('image', ev.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="animate-fade-in max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black text-gray-800">
            {isEditing ? 'ویرایش مقاله' : 'نوشتن مقاله جدید'}
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            {isEditing ? 'محتوای مقاله را ویرایش کنید' : 'مقاله جدید بنویسید'}
          </p>
        </div>
        <button
          onClick={() => navigate('/admin/blogs')}
          className="text-sm text-gray-500 hover:text-gray-700 transition"
        >
          ← بازگشت
        </button>
      </div>

      {saved && (
        <div className="bg-green-50 text-green-700 p-4 rounded-xl mb-6 text-sm animate-fade-in">
          ✅ مقاله با موفقیت ذخیره شد!
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
          <h2 className="text-lg font-bold text-gray-800 mb-4">📋 اطلاعات مقاله</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1.5">عنوان مقاله *</label>
              <input
                type="text"
                required
                value={blog.title}
                onChange={e => handleChange('title', e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none text-sm transition"
                placeholder="عنوان مقاله را وارد کنید"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1.5">اسلاگ (URL)</label>
                <input
                  type="text"
                  value={blog.slug}
                  onChange={e => handleChange('slug', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-400 outline-none text-sm transition"
                  placeholder="خودکار تولید می‌شود"
                  dir="ltr"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1.5">دسته‌بندی</label>
                <select
                  value={blog.category}
                  onChange={e => handleChange('category', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-400 outline-none text-sm transition"
                >
                  {blogCategories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1.5">نویسنده</label>
                <input
                  type="text"
                  value={blog.author}
                  onChange={e => handleChange('author', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-400 outline-none text-sm transition"
                  placeholder="نام نویسنده"
                />
              </div>
              <div className="flex items-end">
                <label className="flex items-center gap-2 cursor-pointer pb-3">
                  <input
                    type="checkbox"
                    checked={blog.isPublished}
                    onChange={e => handleChange('isPublished', e.target.checked)}
                    className="rounded text-primary-600"
                  />
                  <span className="text-sm text-gray-600">منتشر شود</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1.5">خلاصه مقاله *</label>
              <textarea
                required
                rows={3}
                value={blog.excerpt}
                onChange={e => handleChange('excerpt', e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none text-sm transition resize-none"
                placeholder="خلاصه‌ای از مقاله برای نمایش در لیست..."
              />
            </div>
          </div>
        </div>

        {/* Image */}
        <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
          <h2 className="text-lg font-bold text-gray-800 mb-4">🖼️ تصویر مقاله</h2>
          <div className="flex items-start gap-4">
            <div className="w-32 h-24 bg-gray-100 rounded-xl overflow-hidden shrink-0 flex items-center justify-center">
              {blog.image ? (
                <img src={blog.image} alt="" className="w-full h-full object-cover" />
              ) : (
                <span className="text-3xl text-gray-300">📷</span>
              )}
            </div>
            <div className="flex-1 space-y-3">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
              />
              <input
                type="text"
                value={blog.image}
                onChange={e => handleChange('image', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-primary-400 outline-none text-sm transition"
                placeholder="یا لینک تصویر را وارد کنید"
                dir="ltr"
              />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
          <h2 className="text-lg font-bold text-gray-800 mb-4">📝 محتوای مقاله</h2>
          <RichTextEditor
            value={blog.content}
            onChange={(value) => handleChange('content', value)}
            placeholder="متن مقاله را اینجا بنویسید..."
          />
          <p className="text-xs text-gray-400 mt-2">از ابزارهای بالا برای فرمت‌دهی متن استفاده کنید</p>
        </div>

        {/* Tags */}
        <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
          <h2 className="text-lg font-bold text-gray-800 mb-4">🏷️ برچسب‌ها</h2>
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={newTag}
              onChange={e => setNewTag(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addTag())}
              className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 focus:border-primary-400 outline-none text-sm transition"
              placeholder="برچسب جدید"
            />
            <button
              type="button"
              onClick={addTag}
              className="bg-primary-600 text-white px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-primary-700 transition"
            >
              افزودن
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {blog.tags.map((tag, i) => (
              <span key={i} className="bg-gray-100 text-gray-600 px-3 py-1.5 rounded-lg text-sm flex items-center gap-2">
                # {tag}
                <button type="button" onClick={() => removeTag(tag)} className="text-gray-400 hover:text-red-500">×</button>
              </span>
            ))}
          </div>
        </div>

        {/* SEO */}
        <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
          <h2 className="text-lg font-bold text-gray-800 mb-4">🔍 تنظیمات سئو</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1.5">عنوان سئو</label>
              <input
                type="text"
                value={blog.seoTitle || ''}
                onChange={e => handleChange('seoTitle', e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-400 outline-none text-sm transition"
                placeholder="عنوان نمایش داده شده در گوگل"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1.5">توضیحات سئو</label>
              <textarea
                rows={2}
                value={blog.seoDescription || ''}
                onChange={e => handleChange('seoDescription', e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-400 outline-none text-sm transition resize-none"
                placeholder="توضیحات متا"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1.5">کلمات کلیدی</label>
              <input
                type="text"
                value={blog.seoKeywords || ''}
                onChange={e => handleChange('seoKeywords', e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-400 outline-none text-sm transition"
                placeholder="کلمات کلیدی با کاما جدا شوند"
              />
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex items-center gap-4">
          <button
            type="submit"
            className="bg-primary-600 text-white px-8 py-3.5 rounded-xl font-bold hover:bg-primary-700 transition"
          >
            {isEditing ? '💾 ذخیره تغییرات' : '✍️ انتشار مقاله'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/admin/blogs')}
            className="text-gray-500 hover:text-gray-700 transition px-4 py-3.5"
          >
            انصراف
          </button>
        </div>
      </form>
    </div>
  );
}
