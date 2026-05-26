import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getSettings } from '../../utils/storage';

// اصلاح اصلی اینجاست: آدرس دهی نسبی از داخل پوشه خود پروژه به جای مسیر ویندوز
import logoImg from '../../assets/logo.svg'; 

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const settings = getSettings();

  const navItems = [
    { label: 'صفحه اصلی', path: '/' },
    { label: 'دوره‌ها', path: '/courses' },
    { label: 'وبلاگ', path: '/blog' },
    { label: 'درباره ما', path: '/about' },
    { label: 'تماس با ما', path: '/contact' },
  ];

  const isActive = (path: string) => {
  if (path === '/') return location.pathname === '/';
  return location.pathname === path;
};

  return (
    <header className="bg-white shadow-md sticky top-0 z-50 w-full transition-all duration-300">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
        <div className="flex items-center justify-between h-16 md:h-20 gap-2">
          
          {/* بخش لوگو و نام سایت (کاملاً ریسپانسیو و خودکار) */}
          <Link to="/" className="flex items-center gap-1.5 sm:gap-2 shrink-0 max-w-[50%] sm:max-w-none">
            <img 
              src={logoImg} 
              alt={settings.siteName || "لوگو"} 
              className="w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 object-contain transition-all" 
            />
            <div className="min-w-0">
              <h1 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-primary-700 truncate">
                {settings.siteName}
              </h1>
              <p className="text-[9px] sm:text-[10px] md:text-xs text-gray-500 hidden xs:block truncate">
                آموزش آنلاین از ابتدایی تا کنکور
              </p>
            </div>
          </Link>

          {/* منوی ناوبری دسکتاپ */}
          <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1">
            {navItems.map(item => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 xl:px-4 py-2 rounded-lg text-xs xl:text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                  isActive(item.path)
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* دکمه‌های اکشن دسکتاپ */}
          <div className="hidden lg:flex items-center gap-2 xl:gap-3 shrink-0">
            <a
              href="https://panel.classino.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 text-white px-4 xl:px-5 py-2 md:py-2.5 rounded-xl text-xs xl:text-sm font-medium hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-200 transition-all duration-200 whitespace-nowrap"
            >
              ورود و ثبت‌نام
            </a>
            
            <a
              href={`tel:${settings.phone}`}
              className="bg-gradient-to-l from-primary-500 to-primary-600 text-white px-4 xl:px-5 py-2 md:py-2.5 rounded-xl text-xs xl:text-sm font-medium hover:shadow-lg hover:shadow-primary-200 transition-all duration-200 whitespace-nowrap"
            >
              📞 {settings.phone}
            </a>
          </div>

          {/* دکمه منوی همبرگری موبایل */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition shrink-0"
            aria-label="منوی همراه"
          >
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* منوی کشویی موبایل و تبلت */}
        {isMenuOpen && (
          <div className="lg:hidden pb-4 border-t border-gray-100 pt-2 animate-fade-in">
            <nav className="flex flex-col gap-1">
              {navItems.map(item => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`px-4 py-3 rounded-lg text-sm font-medium transition ${
                    isActive(item.path)
                      ? 'bg-primary-50 text-primary-700'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              
              <a
                href="https://panel.classino.com"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMenuOpen(false)}
                className="mx-4 mt-3 bg-blue-600 text-white text-center py-3 rounded-xl text-sm font-medium hover:bg-blue-700 transition shadow-md block"
              >
                ورود و ثبت‌نام
              </a>

              <a
                href={`tel:${settings.phone}`}
                className="mx-4 mt-2 bg-primary-600 text-white text-center py-3 rounded-xl text-sm font-medium shadow-md block"
              >
                📞 {settings.phone}
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}