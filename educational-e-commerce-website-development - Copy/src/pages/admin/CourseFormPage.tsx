import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { Course, Teacher, Schedule } from '../../types';
import { getCourse, saveCourse, generateSlug, getAllCategoryNames } from '../../utils/storage';
import RichTextEditor from '../../components/admin/RichTextEditor';
const levels = ['مقدماتی', 'متوسط', 'پیشرفته'];
const weekDays = ['شنبه', 'یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنجشنبه', 'جمعه'];

const emptyCourse: Course = {
  id: '',
  title: '',
  slug: '',
  description: '',
  content: '',
  image: '',
  category: 'کنکور',
  level: 'متوسط',
  type: 'single',
  subjects: [],
  teachers: [],
  schedule: [],
  price: 0,
  duration: '',
  startDate: '',
  isActive: true,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  seoTitle: '',
  seoDescription: '',
  seoKeywords: '',
};

export default function CourseFormPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditing = !!id;

  const [course, setCourse] = useState<Course>(emptyCourse);
  const [newSubject, setNewSubject] = useState('');
  const [saved, setSaved] = useState(false);
  const categories = getAllCategoryNames();

  useEffect(() => {
    if (id) {
      const existing = getCourse(id);
      if (existing) {
        setCourse(existing);
      } else {
        navigate('/admin/courses');
      }
    }
  }, [id, navigate]);

  const handleChange = (field: keyof Course, value: unknown) => {
    setCourse(prev => ({ ...prev, [field]: value }));
  };

  const addSubject = () => {
    if (newSubject.trim() && !course.subjects.includes(newSubject.trim())) {
      handleChange('subjects', [...course.subjects, newSubject.trim()]);
      setNewSubject('');
    }
  };

  const removeSubject = (subject: string) => {
    handleChange('subjects', course.subjects.filter(s => s !== subject));
  };

  const addTeacher = () => {
    const newTeacher: Teacher = { name: '', subject: '', bio: '' };
    handleChange('teachers', [...course.teachers, newTeacher]);
  };

  const updateTeacher = (index: number, field: keyof Teacher, value: string) => {
    const updated = [...course.teachers];
    updated[index] = { ...updated[index], [field]: value };
    handleChange('teachers', updated);
  };

  const removeTeacher = (index: number) => {
    handleChange('teachers', course.teachers.filter((_, i) => i !== index));
  };

  const addSchedule = () => {
    const newSchedule: Schedule = { day: 'شنبه', startTime: '16:00', endTime: '18:00', subject: '' };
    handleChange('schedule', [...course.schedule, newSchedule]);
  };

  const updateSchedule = (index: number, field: keyof Schedule, value: string) => {
    const updated = [...course.schedule];
    updated[index] = { ...updated[index], [field]: value };
    handleChange('schedule', updated);
  };

  const removeSchedule = (index: number) => {
    handleChange('schedule', course.schedule.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const toSave: Course = {
      ...course,
      id: course.id || uuidv4(),
      slug: course.slug || generateSlug(course.title),
    };
    saveCourse(toSave);
    setSaved(true);
    setTimeout(() => {
      navigate('/admin/courses');
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
            {isEditing ? 'ویرایش دوره' : 'افزودن دوره جدید'}
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            {isEditing ? 'اطلاعات دوره را ویرایش کنید' : 'اطلاعات دوره جدید را وارد کنید'}
          </p>
        </div>
        <button
          onClick={() => navigate('/admin/courses')}
          className="text-sm text-gray-500 hover:text-gray-700 transition"
        >
          ← بازگشت
        </button>
      </div>

      {saved && (
        <div className="bg-green-50 text-green-700 p-4 rounded-xl mb-6 text-sm animate-fade-in">
          ✅ دوره با موفقیت ذخیره شد!
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
          <h2 className="text-lg font-bold text-gray-800 mb-4">📋 اطلاعات اصلی</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-600 mb-1.5">عنوان دوره *</label>
              <input
                type="text"
                required
                value={course.title}
                onChange={e => handleChange('title', e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none text-sm transition"
                placeholder="مثال: پکیج جامع کنکور تجربی"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1.5">اسلاگ (URL)</label>
              <input
                type="text"
                value={course.slug}
                onChange={e => handleChange('slug', e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none text-sm transition"
                placeholder="خودکار تولید می‌شود"
                dir="ltr"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1.5">دسته‌بندی *</label>
              <select
                value={course.category}
                onChange={e => handleChange('category', e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none text-sm transition"
              >
                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1.5">سطح</label>
              <select
                value={course.level}
                onChange={e => handleChange('level', e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none text-sm transition"
              >
                {levels.map(l => <option key={l} value={l}>{l}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1.5">نوع دوره *</label>
              <div className="flex gap-4 mt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    checked={course.type === 'single'}
                    onChange={() => handleChange('type', 'single')}
                    className="text-primary-600"
                  />
                  <span className="text-sm text-gray-600">📖 تک درس</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    checked={course.type === 'package'}
                    onChange={() => handleChange('type', 'package')}
                    className="text-primary-600"
                  />
                  <span className="text-sm text-gray-600">📦 پکیج</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1.5">مدت دوره</label>
              <input
                type="text"
                value={course.duration}
                onChange={e => handleChange('duration', e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none text-sm transition"
                placeholder="مثال: ۶ ماه"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1.5">📅 تاریخ شروع دوره</label>
              <input
                type="date"
                value={course.startDate || ''}
                onChange={e => handleChange('startDate', e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none text-sm transition"
                dir="ltr"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1.5">قیمت (تومان) *</label>
              <input
                type="number"
                required
                value={course.price || ''}
                onChange={e => handleChange('price', Number(e.target.value))}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none text-sm transition"
                placeholder="مثال: 5000000"
                dir="ltr"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1.5">قیمت با تخفیف (تومان)</label>
              <input
                type="number"
                value={course.discountPrice || ''}
                onChange={e => handleChange('discountPrice', e.target.value ? Number(e.target.value) : undefined)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none text-sm transition"
                placeholder="خالی بگذارید اگر تخفیف ندارد"
                dir="ltr"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-600 mb-1.5">توضیح کوتاه *</label>
              <textarea
                required
                rows={2}
                value={course.description}
                onChange={e => handleChange('description', e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none text-sm transition resize-none"
                placeholder="توضیح کوتاه درباره دوره..."
              />
            </div>

            <div className="md:col-span-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={course.isActive}
                  onChange={e => handleChange('isActive', e.target.checked)}
                  className="rounded text-primary-600"
                />
                <span className="text-sm text-gray-600">دوره فعال باشد</span>
              </label>
            </div>
          </div>
        </div>

        {/* Image */}
        <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
          <h2 className="text-lg font-bold text-gray-800 mb-4">🖼️ تصویر دوره</h2>
          <div className="flex items-start gap-4">
            <div className="w-32 h-32 bg-gray-100 rounded-xl overflow-hidden shrink-0 flex items-center justify-center">
              {course.image ? (
                <img src={course.image} alt="" className="w-full h-full object-cover" />
              ) : (
                <span className="text-4xl text-gray-300">📷</span>
              )}
            </div>
            <div className="flex-1 space-y-3">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
              />
              <p className="text-xs text-gray-400">یا لینک تصویر:</p>
              <input
                type="text"
                value={course.image}
                onChange={e => handleChange('image', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-primary-400 outline-none text-sm transition"
                placeholder="https://example.com/image.jpg"
                dir="ltr"
              />
              {course.image && (
                <button type="button" onClick={() => handleChange('image', '')} className="text-xs text-red-500 hover:underline">
                  حذف تصویر
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
          <h2 className="text-lg font-bold text-gray-800 mb-4">📝 محتوای دوره</h2>
          <RichTextEditor
            value={course.content}
            onChange={(value) => handleChange('content', value)}
            placeholder="محتوای دوره را اینجا بنویسید..."
          />
          <p className="text-xs text-gray-400 mt-2">از ابزارهای بالا برای فرمت‌دهی متن استفاده کنید</p>
        </div>

        {/* Subjects */}
        <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
          <h2 className="text-lg font-bold text-gray-800 mb-4">📖 دروس</h2>
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={newSubject}
              onChange={e => setNewSubject(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addSubject())}
              className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 focus:border-primary-400 outline-none text-sm transition"
              placeholder="نام درس را وارد کنید"
            />
            <button
              type="button"
              onClick={addSubject}
              className="bg-primary-600 text-white px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-primary-700 transition"
            >
              افزودن
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {course.subjects.map((subject, i) => (
              <span key={i} className="bg-primary-50 text-primary-700 px-3 py-1.5 rounded-lg text-sm flex items-center gap-2">
                {subject}
                <button type="button" onClick={() => removeSubject(subject)} className="text-primary-400 hover:text-red-500">×</button>
              </span>
            ))}
          </div>
        </div>

        {/* Teachers */}
        <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-800">👨‍🏫 اساتید</h2>
            <button
              type="button"
              onClick={addTeacher}
              className="text-sm text-primary-600 hover:text-primary-700 font-medium"
            >
              + افزودن استاد
            </button>
          </div>
          <div className="space-y-4">
            {course.teachers.map((teacher, i) => (
              <div key={i} className="grid grid-cols-1 md:grid-cols-4 gap-3 p-4 bg-gray-50 rounded-xl">
                <input
                  type="text"
                  value={teacher.name}
                  onChange={e => updateTeacher(i, 'name', e.target.value)}
                  className="px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-sm"
                  placeholder="نام استاد"
                />
                <input
                  type="text"
                  value={teacher.subject}
                  onChange={e => updateTeacher(i, 'subject', e.target.value)}
                  className="px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-sm"
                  placeholder="درس"
                />
                <input
                  type="text"
                  value={teacher.bio || ''}
                  onChange={e => updateTeacher(i, 'bio', e.target.value)}
                  className="px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-sm"
                  placeholder="توضیحات (اختیاری)"
                />
                <button
                  type="button"
                  onClick={() => removeTeacher(i)}
                  className="text-xs text-red-500 hover:text-red-600 text-right md:text-center"
                >
                  🗑️ حذف
                </button>
              </div>
            ))}
            {course.teachers.length === 0 && (
              <p className="text-sm text-gray-400 text-center py-4">هنوز استادی اضافه نشده است</p>
            )}
          </div>
        </div>

        {/* Schedule */}
        <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-800">📅 برنامه کلاسی</h2>
            <button
              type="button"
              onClick={addSchedule}
              className="text-sm text-primary-600 hover:text-primary-700 font-medium"
            >
              + افزودن جلسه
            </button>
          </div>
          <div className="space-y-4">
            {course.schedule.map((item, i) => (
              <div key={i} className="grid grid-cols-2 md:grid-cols-5 gap-3 p-4 bg-gray-50 rounded-xl">
                <select
                  value={item.day}
                  onChange={e => updateSchedule(i, 'day', e.target.value)}
                  className="px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-sm"
                >
                  {weekDays.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
                <input
                  type="time"
                  value={item.startTime}
                  onChange={e => updateSchedule(i, 'startTime', e.target.value)}
                  className="px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-sm"
                  dir="ltr"
                />
                <input
                  type="time"
                  value={item.endTime}
                  onChange={e => updateSchedule(i, 'endTime', e.target.value)}
                  className="px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-sm"
                  dir="ltr"
                />
                <input
                  type="text"
                  value={item.subject || ''}
                  onChange={e => updateSchedule(i, 'subject', e.target.value)}
                  className="px-3 py-2 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-sm"
                  placeholder="درس (اختیاری)"
                />
                <button
                  type="button"
                  onClick={() => removeSchedule(i)}
                  className="text-xs text-red-500 hover:text-red-600"
                >
                  🗑️ حذف
                </button>
              </div>
            ))}
            {course.schedule.length === 0 && (
              <p className="text-sm text-gray-400 text-center py-4">هنوز برنامه‌ای اضافه نشده است</p>
            )}
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
                value={course.seoTitle || ''}
                onChange={e => handleChange('seoTitle', e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-400 outline-none text-sm transition"
                placeholder="عنوان نمایش داده شده در گوگل"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1.5">توضیحات سئو</label>
              <textarea
                rows={2}
                value={course.seoDescription || ''}
                onChange={e => handleChange('seoDescription', e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-400 outline-none text-sm transition resize-none"
                placeholder="توضیحات نمایش داده شده در نتایج گوگل"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1.5">کلمات کلیدی</label>
              <input
                type="text"
                value={course.seoKeywords || ''}
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
            {isEditing ? '💾 ذخیره تغییرات' : '➕ افزودن دوره'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/admin/courses')}
            className="text-gray-500 hover:text-gray-700 transition px-4 py-3.5"
          >
            انصراف
          </button>
        </div>
      </form>
    </div>
  );
}
