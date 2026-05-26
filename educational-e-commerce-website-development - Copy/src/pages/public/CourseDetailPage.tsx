import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { getCourseBySlug, getSettings, formatPrice } from '../../utils/storage';

export default function CourseDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const settings = getSettings();
  const course = getCourseBySlug(slug || '');

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F0E8E2]">
        <div className="text-center">
          <span className="text-6xl block mb-4">😕</span>
          <h2 className="text-2xl font-bold text-gray-700 mb-4">دوره مورد نظر یافت نشد</h2>
          <Link to="/courses" className="bg-primary-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-primary-700 transition">
            بازگشت به دوره‌ها
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F0E8E2] min-h-screen">
      <Helmet>
        <title>{course.seoTitle || `${course.title} | ${settings.siteName}`}</title>
        <meta name="description" content={course.seoDescription || course.description} />
      </Helmet>

      <div className="bg-gradient-to-l from-[#1E41C8] to-[#2F5AF3] text-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 text-sm text-blue-200 mb-4">
            <Link to="/" className="hover:text-white transition">خانه</Link>
            <span>←</span>
            <Link to="/courses" className="hover:text-white transition">دوره‌ها</Link>
            <span>←</span>
            <span className="text-white">{course.title}</span>
          </div>
          <h1 className="text-2xl md:text-4xl font-black mb-3">{course.title}</h1>
          <p className="text-blue-100 text-lg">{course.description}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-black/5">
              <div className="flex flex-wrap gap-3 mb-6">
                <span className="bg-primary-50 text-primary-700 px-3 py-1 rounded-full text-sm font-bold">📚 {course.category}</span>
                <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm font-bold">📊 {course.level}</span>
                {course.duration && <span className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm font-bold">⏱ {course.duration}</span>}
                <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-bold">{course.type === 'package' ? '📦 پکیج' : '📖 تک درس'}</span>
              </div>

              {course.image && (
                <img src={course.image} alt={course.title} className="w-full h-64 object-cover rounded-xl mb-6" />
              )}

              <div
                className="prose prose-sm max-w-none text-gray-700 leading-8"
                dangerouslySetInnerHTML={{ __html: course.content }}
              />
            </div>

            {course.teachers && course.teachers.length > 0 && (
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-black/5">
                <h2 className="text-xl font-black text-gray-800 mb-4">👨‍🏫 اساتید دوره</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {course.teachers.map((teacher, i) => (
                    <div key={i} className="flex items-center gap-3 bg-gray-50 rounded-xl p-4">
                      <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-primary-700 font-bold text-lg">
                        {teacher.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-gray-800">{teacher.name}</p>
                        <p className="text-sm text-gray-500">{teacher.subject}</p>
                        {teacher.bio && <p className="text-xs text-gray-400 mt-1">{teacher.bio}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {course.schedule && course.schedule.length > 0 && (
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-black/5">
                <h2 className="text-xl font-black text-gray-800 mb-4">📅 برنامه کلاس‌ها</h2>
                <div className="space-y-3">
                  {course.schedule.map((item, i) => (
                    <div key={i} className="flex items-center justify-between bg-gray-50 rounded-xl p-4">
                      <span className="font-bold text-gray-800">{item.day}</span>
                      <span className="text-gray-600">{item.subject}</span>
                      <span className="text-primary-600 font-bold">{item.startTime} - {item.endTime}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-black/5 sticky top-24">
              <div className="mb-6">
                {course.discountPrice ? (
                  <>
                    <p className="text-gray-400 line-through text-sm mb-1">{formatPrice(course.price)} تومان</p>
                    <p className="text-3xl font-black text-primary-600">{formatPrice(course.discountPrice)} <span className="text-lg font-bold">تومان</span></p>
                    <span className="inline-block bg-red-100 text-red-600 text-sm font-bold px-3 py-1 rounded-full mt-2">
                      {Math.round((1 - course.discountPrice / course.price) * 100)}٪ تخفیف
                    </span>
                  </>
                ) : (
                  <p className="text-3xl font-black text-primary-600">{formatPrice(course.price)} <span className="text-lg font-bold">تومان</span></p>
                )}
              </div>

              
              <a href="https://panel.classino.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-gradient-to-l from-primary-600 to-primary-800 text-white py-4 rounded-xl font-black text-lg hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 mb-3"
              >
                <span>👤</span>
                <span>ثبت‌نام در دوره</span>
              </a>

              
              <a  href={`tel:${settings.phone}`}className="w-full border-2 border-primary-200 text-primary-700 py-3 rounded-xl font-bold text-sm hover:bg-primary-50 transition flex items-center justify-center gap-2">
              
                <span>📞</span>
                <span>مشاوره رایگان</span>
              </a>

              {course.subjects && course.subjects.length > 0 && (
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <h3 className="font-bold text-gray-700 mb-3">دروس این دوره:</h3>
                  <div className="flex flex-wrap gap-2">
                    {course.subjects.map((subject, i) => (
                      <span key={i} className="bg-primary-50 text-primary-700 px-3 py-1 rounded-full text-sm font-bold">
                        {subject}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}