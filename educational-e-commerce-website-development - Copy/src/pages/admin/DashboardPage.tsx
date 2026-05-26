import { Link } from 'react-router-dom';
import { getCourses, getBlogs } from '../../utils/storage';

export default function DashboardPage() {
  const courses = getCourses();
  const blogs = getBlogs();

  const stats = [
    { label: 'تعداد دوره‌ها', value: courses.length, icon: '📚', color: 'from-blue-500 to-blue-600', link: '/admin/courses' },
    { label: 'دوره‌های فعال', value: courses.filter(c => c.isActive).length, icon: '✅', color: 'from-green-500 to-green-600', link: '/admin/courses' },
    { label: 'مقالات وبلاگ', value: blogs.length, icon: '📝', color: 'from-purple-500 to-purple-600', link: '/admin/blogs' },
    { label: 'مقالات منتشرشده', value: blogs.filter(b => b.isPublished).length, icon: '📰', color: 'from-amber-500 to-orange-500', link: '/admin/blogs' },
  ];

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="text-2xl font-black text-gray-800">داشبورد</h1>
        <p className="text-sm text-gray-500 mt-1">خلاصه وضعیت سایت</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, i) => (
          <Link
            key={i}
            to={stat.link}
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition group"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-3xl">{stat.icon}</span>
              <div className={`w-10 h-10 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center text-white font-bold text-sm`}>
                {stat.value}
              </div>
            </div>
            <h3 className="font-medium text-gray-600 text-sm">{stat.label}</h3>
            <p className="text-2xl font-black text-gray-800 mt-1">{stat.value}</p>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-8">
        <h2 className="text-lg font-bold text-gray-800 mb-4">دسترسی سریع</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Link to="/admin/courses/new" className="flex items-center gap-3 p-4 bg-primary-50 rounded-xl hover:bg-primary-100 transition text-sm font-medium text-primary-700">
            <span className="text-xl">➕</span>
            افزودن دوره جدید
          </Link>
          <Link to="/admin/blogs/new" className="flex items-center gap-3 p-4 bg-purple-50 rounded-xl hover:bg-purple-100 transition text-sm font-medium text-purple-700">
            <span className="text-xl">✍️</span>
            نوشتن مقاله جدید
          </Link>
          <Link to="/admin/settings" className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition text-sm font-medium text-gray-700">
            <span className="text-xl">⚙️</span>
            تنظیمات سایت
          </Link>
          <Link to="/" className="flex items-center gap-3 p-4 bg-green-50 rounded-xl hover:bg-green-100 transition text-sm font-medium text-green-700">
            <span className="text-xl">🌐</span>
            مشاهده سایت
          </Link>
        </div>
      </div>

      {/* Recent Items */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Courses */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-800">آخرین دوره‌ها</h2>
            <Link to="/admin/courses" className="text-sm text-primary-600 hover:underline">مشاهده همه</Link>
          </div>
          {courses.length > 0 ? (
            <div className="space-y-3">
              {courses.slice(0, 5).map(course => (
                <Link
                  key={course.id}
                  to={`/admin/courses/edit/${course.id}`}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition"
                >
                  <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center text-lg shrink-0">
                    {course.type === 'package' ? '📦' : '📖'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-gray-700 truncate">{course.title}</h3>
                    <p className="text-xs text-gray-400">{course.category}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${course.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                    {course.isActive ? 'فعال' : 'غیرفعال'}
                  </span>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-400 text-center py-8">دوره‌ای وجود ندارد</p>
          )}
        </div>

        {/* Recent Blog Posts */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-800">آخرین مقالات</h2>
            <Link to="/admin/blogs" className="text-sm text-primary-600 hover:underline">مشاهده همه</Link>
          </div>
          {blogs.length > 0 ? (
            <div className="space-y-3">
              {blogs.slice(0, 5).map(blog => (
                <Link
                  key={blog.id}
                  to={`/admin/blogs/edit/${blog.id}`}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition"
                >
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center text-lg shrink-0">
                    📝
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-gray-700 truncate">{blog.title}</h3>
                    <p className="text-xs text-gray-400">{blog.category}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${blog.isPublished ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                    {blog.isPublished ? 'منتشرشده' : 'پیش‌نویس'}
                  </span>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-400 text-center py-8">مقاله‌ای وجود ندارد</p>
          )}
        </div>
      </div>
    </div>
  );
}
