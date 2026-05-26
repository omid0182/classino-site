import { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate, Navigate } from 'react-router-dom';
import { isAuthenticated, logout } from '../../utils/storage';
// ایمپورت لوگو از مسیر مشخص شده در src/assets
import logoImage from '../../assets/logo.svg'; 

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  if (!isAuthenticated()) {
    return <Navigate to="/admin/login" replace />;
  }

  const menuItems = [
    { label: 'داشبورد', path: '/admin', icon: '📊' },
    { label: 'دوره‌ها', path: '/admin/courses', icon: '📚' },
    { label: 'وبلاگ', path: '/admin/blogs', icon: '📝' },
    { label: 'دسته‌بندی‌ها', path: '/admin/categories', icon: '🏷️' },
    { label: 'تنظیمات', path: '/admin/settings', icon: '⚙️' },
  ];

  const isActive = (path: string) => {
    if (path === '/admin') return location.pathname === '/admin';
    return location.pathname.startsWith(path);
  };

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-[#F0E8E2] flex font-sans">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 right-0 z-50 w-64 bg-[#1E293B] text-white transform transition-transform duration-300 md:translate-x-0 ${sidebarOpen ? 'translate-x-0' : 'translate-x-full md:translate-x-0'}`}>
        <div className="p-6">
          <Link to="/admin" className="flex items-center gap-3">
            {/* نمایش لوگو بجای حرف C */}
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg shadow-[#2F5AF3]/20 border border-black/5 overflow-hidden">
              <img 
                src={logoImage} 
                alt="لوگوی کلاسینو" 
                className="w-8 h-8 object-contain" 
              />
            </div>
            <div>
              <h1 className="font-black text-lg">پنل مدیریت</h1>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">کلاسینو</p>
            </div>
          </Link>
        </div>

        <nav className="px-4 space-y-1">
          {menuItems.map(item => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition ${
                isActive(item.path)
                  ? 'bg-[#2F5AF3] text-white shadow-lg shadow-[#2F5AF3]/20'
                  : 'text-gray-400 hover:bg-[#2F5AF3]/10 hover:text-white'
              }`}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-0 right-0 left-0 p-4 space-y-2">
          <Link
            to="/"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-gray-400 hover:bg-[#FFA300]/20 hover:text-[#FFA300] transition font-bold"
          >
            <span>🌐</span>
            <span>مشاهده سایت</span>
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-red-400 hover:bg-red-900/30 transition font-bold"
          >
            <span>🚪</span>
            <span>خروج</span>
          </button>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main Content */}
      <div className="flex-1 md:mr-64">
        <header className="bg-white/80 backdrop-blur shadow-sm sticky top-0 z-30 border-b border-black/5">
          <div className="flex items-center justify-between px-4 md:px-6 h-16">
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden p-2 rounded-lg hover:bg-[#F0E8E2] transition"
            >
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div className="text-sm font-bold text-gray-600">
              👋 خوش آمدید، مدیر عزیز
            </div>
            <div className="flex items-center gap-2">
              <Link to="/" className="text-sm font-bold text-[#2F5AF3] hover:underline hidden md:inline">
                مشاهده سایت ↗
              </Link>
            </div>
          </div>
        </header>

        <main className="p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}