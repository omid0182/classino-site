import { useState } from 'react';
import { Link } from 'react-router-dom';
import { getBlogs, deleteBlog } from '../../utils/storage';

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState(getBlogs());
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const handleDelete = (id: string) => {
    deleteBlog(id);
    setBlogs(getBlogs());
    setDeleteConfirm(null);
  };

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black text-gray-800">مدیریت وبلاگ</h1>
          <p className="text-sm text-gray-500 mt-1">{blogs.length} مقاله</p>
        </div>
        <Link
          to="/admin/blogs/new"
          className="bg-primary-600 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-primary-700 transition flex items-center gap-2"
        >
          <span>✍️</span>
          نوشتن مقاله جدید
        </Link>
      </div>

      {blogs.length > 0 ? (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="text-right px-4 py-3 text-sm font-semibold text-gray-600">عنوان</th>
                  <th className="text-right px-4 py-3 text-sm font-semibold text-gray-600 hidden md:table-cell">دسته‌بندی</th>
                  <th className="text-right px-4 py-3 text-sm font-semibold text-gray-600 hidden md:table-cell">نویسنده</th>
                  <th className="text-right px-4 py-3 text-sm font-semibold text-gray-600 hidden lg:table-cell">تاریخ</th>
                  <th className="text-right px-4 py-3 text-sm font-semibold text-gray-600">وضعیت</th>
                  <th className="text-right px-4 py-3 text-sm font-semibold text-gray-600">عملیات</th>
                </tr>
              </thead>
              <tbody>
                {blogs.map(blog => (
                  <tr key={blog.id} className="border-b border-gray-50 hover:bg-gray-50 transition">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center text-lg shrink-0">
                          📝
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-gray-700 line-clamp-1">{blog.title}</h3>
                          <p className="text-xs text-gray-400 md:hidden">{blog.category}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600 hidden md:table-cell">{blog.category}</td>
                    <td className="px-4 py-3 text-sm text-gray-600 hidden md:table-cell">{blog.author}</td>
                    <td className="px-4 py-3 text-sm text-gray-600 hidden lg:table-cell">
                      {new Date(blog.createdAt).toLocaleDateString('fa-IR')}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        blog.isPublished ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {blog.isPublished ? 'منتشرشده' : 'پیش‌نویس'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Link
                          to={`/admin/blogs/edit/${blog.id}`}
                          className="text-xs bg-blue-50 text-blue-600 px-3 py-1.5 rounded-lg hover:bg-blue-100 transition"
                        >
                          ✏️ ویرایش
                        </Link>
                        {deleteConfirm === blog.id ? (
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => handleDelete(blog.id)}
                              className="text-xs bg-red-500 text-white px-3 py-1.5 rounded-lg hover:bg-red-600 transition"
                            >
                              تأیید
                            </button>
                            <button
                              onClick={() => setDeleteConfirm(null)}
                              className="text-xs bg-gray-100 text-gray-600 px-3 py-1.5 rounded-lg hover:bg-gray-200 transition"
                            >
                              لغو
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setDeleteConfirm(blog.id)}
                            className="text-xs bg-red-50 text-red-600 px-3 py-1.5 rounded-lg hover:bg-red-100 transition"
                          >
                            🗑️ حذف
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm p-12 text-center border border-gray-100">
          <span className="text-6xl block mb-4">📝</span>
          <p className="text-gray-500 mb-4">هنوز مقاله‌ای نوشته نشده است</p>
          <Link
            to="/admin/blogs/new"
            className="inline-flex items-center gap-2 bg-primary-600 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-primary-700 transition"
          >
            ✍️ نوشتن اولین مقاله
          </Link>
        </div>
      )}
    </div>
  );
}
