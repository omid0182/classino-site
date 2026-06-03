import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { getCourses, getBlogs, getSettings, getCategoriesByType } from '../../utils/storage';
import CourseCard from '../../components/public/CourseCard';

export default function HomePage() {
  const settings = getSettings();
  const courses = getCourses().filter(c => c.isActive).slice(0, 6);
  const blogs = getBlogs().filter(b => b.isPublished).slice(0, 3);

  const featuredCategories = getCategoriesByType('featured').map(c => ({
    label: c.name,
    icon: c.icon,
    color: c.name === 'تیزهوشان' ? 'from-[#FF6DCC] to-[#FF0D38]' : 'from-[#2F5AF3] to-[#1E41C8]',
    desc: c.description,
    badge: c.name === 'تیزهوشان' ? 'ویژه' : 'پرطرفدار',
  }));

  const elementaryGrades = getCategoriesByType('elementary').map(c => ({
    label: c.name,
    icon: c.icon,
    color: 'from-[#00BC83] to-[#009668]',
    desc: c.description,
  }));

  const middleGrades = getCategoriesByType('middle').map(c => ({
    label: c.name,
    icon: c.icon,
    color: 'from-[#2F5AF3] to-[#1E41C8]',
    desc: c.description,
  }));

  const highGrades = getCategoriesByType('high').map(c => ({
    label: c.name,
    icon: c.icon,
    color: 'from-[#FF6DCC] to-[#D84BA8]',
    desc: c.description,
  }));

  const stats = [
    { number: '۵۰۰+', label: 'دانش‌آموز فعال', icon: '👨‍🎓' },
    { number: '۵۰+', label: 'استاد برتر', icon: '👨‍🏫' },
    { number: '۱۰۰+', label: 'دوره آموزشی', icon: '📚' },
    { number: '۹۸٪', label: 'رضایت کاربران', icon: '⭐' },
  ];

  return (
    <div className="bg-[#F0E8E2] min-h-screen">
      <Helmet>
        <title>{settings.siteName} - آموزشگاه آنلاین از ابتدایی تا کنکور</title>
        <meta name="description" content={settings.siteDescription} />
      </Helmet>

      {/* Hero Section */}
      <section className="relative bg-[#0B1E5B] text-white overflow-hidden min-h-[580px] md:min-h-[680px] flex items-center">
        {/* Background layers */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-bl from-[#1a3a9e] via-[#0B1E5B] to-[#060f30]"></div>
          <div
            className="absolute top-0 left-0 w-full h-full opacity-20"
            style={{
              backgroundImage:
                'radial-gradient(circle at 20% 50%, #2F5AF3 0%, transparent 50%), radial-gradient(circle at 80% 20%, #00BC83 0%, transparent 40%), radial-gradient(circle at 60% 80%, #FFA300 0%, transparent 35%)',
            }}
          ></div>
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
              backgroundSize: '48px 48px',
            }}
          ></div>
        </div>

        <div className="absolute top-12 left-12 w-64 h-64 rounded-full bg-[#2F5AF3]/20 blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-[#00BC83]/10 blur-3xl pointer-events-none"></div>

        <div className="relative w-full max-w-7xl mx-auto px-4 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">

            {/* Left column - text */}
            <div className="animate-fade-in order-2 lg:order-1">
              {/* Live badge */}
              <div className="inline-flex items-center gap-2.5 bg-white/10 backdrop-blur-sm border border-white/15 px-4 py-2 rounded-full text-sm font-bold mb-7">
                <span className="flex h-2.5 w-2.5 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00BC83] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#00BC83]"></span>
                </span>
                ثبت‌نام ترم جدید آغاز شد
              </div>

              <h1 className="text-3xl md:text-5xl lg:text-[3.25rem] font-black leading-[1.2] mb-5 tracking-tight">
                {settings.heroTitle}
              </h1>

              <p className="text-base md:text-lg text-blue-200/90 leading-8 mb-8 max-w-xl">
                {settings.heroSubtitle}
              </p>

              {/* CTA buttons */}
              <div className="flex flex-wrap gap-3 mb-10">
                <button
                  onClick={() => document.getElementById('categories')?.scrollIntoView({ behavior: 'smooth' })}
                  className="group inline-flex items-center gap-2 bg-[#2F5AF3] hover:bg-[#1E41C8] text-white px-7 py-3.5 rounded-xl font-bold text-sm shadow-lg shadow-[#2F5AF3]/30 hover:shadow-[#2F5AF3]/50 transition-all duration-200 cursor-pointer"
                >
                  مشاهده دوره‌ها
                  <span className="group-hover:-translate-x-1 transition-transform duration-200">←</span>
                </button>
                <a
                  href={`tel:${settings.phone}`}
                  className="inline-flex items-center gap-2 bg-[#FFA300] text-[#0B1E5B] px-7 py-3.5 rounded-xl font-bold text-sm hover:bg-[#e6930a] transition-all duration-200 shadow-lg shadow-[#FFA300]/20"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  مشاوره رایگان
                </a>
              </div>

              {/* Trust signals */}
              <div className="flex flex-wrap items-center gap-5 text-sm text-blue-200/70">
                {['بهترین اساتید کشور', 'پشتیبانی ۲۴ ساعته', 'تضمین کیفیت آموزش'].map((item, i) => (
                  <div key={i} className="flex items-center gap-1.5">
                    <svg className="w-4 h-4 text-[#00BC83] shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right column - visual card */}
            <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
              <div className="relative w-full max-w-sm">

                {/* Main card */}
                <div className="relative bg-white/10 backdrop-blur-md border border-white/15 rounded-3xl p-6 shadow-2xl">
                  {/* Card header */}
                  <div className="flex items-center justify-between mb-5">
                    <div>
                      <p className="text-[10px] text-blue-200/60 font-bold uppercase tracking-widest mb-0.5">ترم جدید</p>
                      <h3 className="text-lg font-black">آمادگی کنکور ۱۴۰۵</h3>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#FFA300] to-[#FF6B00] flex items-center justify-center text-2xl shadow-lg">
                      🎯
                    </div>
                  </div>

                  {/* Mini stats */}
                  <div className="grid grid-cols-3 gap-3 mb-5">
                    {[
                      { num: '۵۰۰+', lbl: 'دانش‌آموز', color: 'from-[#2F5AF3]/30 to-[#2F5AF3]/10' },
                      { num: '۵۰+', lbl: 'استاد', color: 'from-[#00BC83]/30 to-[#00BC83]/10' },
                      { num: '۹۸٪', lbl: 'رضایت', color: 'from-[#FFA300]/30 to-[#FFA300]/10' },
                    ].map((s, i) => (
                      <div key={i} className={`bg-gradient-to-b ${s.color} rounded-2xl p-3 text-center border border-white/10`}>
                        <div className="text-lg font-black">{s.num}</div>
                        <div className="text-[10px] text-blue-200/70 mt-0.5">{s.lbl}</div>
                      </div>
                    ))}
                  </div>

                  {/* Grade level bars */}
                  <div className="mb-5">
                    <p className="text-[10px] text-blue-200/60 font-bold mb-3">مقاطع تحصیلی</p>
                    <div className="space-y-2">
                      {[
                        { label: 'ابتدایی', color: 'bg-[#00BC83]', w: 'w-[40%]' },
                        { label: 'متوسطه', color: 'bg-[#2F5AF3]', w: 'w-[65%]' },
                        { label: 'کنکور', color: 'bg-[#FF6DCC]', w: 'w-[85%]' },
                        { label: 'تیزهوشان', color: 'bg-[#FFA300]', w: 'w-[55%]' },
                      ].map((item, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <span className="text-xs text-white/80 w-20 text-right shrink-0">{item.label}</span>
                          <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                            <div className={`h-full ${item.color} ${item.w} rounded-full`}></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <a
                    href="https://panel.classino.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center bg-white text-[#0B1E5B] py-3 rounded-xl font-black text-sm hover:bg-blue-50 transition"
                  >
                    ورود و ثبت‌نام
                  </a>
                </div>

                {/* Floating badge top-left */}
                <div className="absolute -top-4 -left-4 bg-[#00BC83] text-white px-3.5 py-2 rounded-2xl text-xs font-black shadow-lg shadow-[#00BC83]/30 flex items-center gap-1.5 whitespace-nowrap">
                  <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
                  ثبت‌نام فعال
                </div>

                {/* Floating badge bottom-right */}
                <div className="absolute -bottom-4 -right-4 bg-[#FFA300] text-[#0B1E5B] px-3.5 py-2 rounded-2xl text-xs font-black shadow-lg shadow-[#FFA300]/30 whitespace-nowrap">
                  مشاوره رایگان
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none pointer-events-none">
          <svg
            viewBox="0 0 1440 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full block"
            preserveAspectRatio="none"
            style={{ height: 48 }}
          >
            <path
              d="M0 48L60 42C120 36 240 24 360 20C480 16 600 20 720 26C840 32 960 40 1080 40C1200 40 1320 32 1380 28L1440 24V48H1380C1320 48 1200 48 1080 48C960 48 840 48 720 48C600 48 480 48 360 48C240 48 120 48 60 48H0Z"
              fill="#F0E8E2"
            />
          </svg>
        </div>
      </section>

      {/* Stats */}
      <section className="relative -mt-8 z-10">
        <div className="max-w-5xl mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <span className="text-3xl mb-2 block">{stat.icon}</span>
                <div className="text-2xl md:text-3xl font-black text-[#2F5AF3]">{stat.number}</div>
                <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section id="categories" className="py-16 md:py-24 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-black text-gray-800 mb-3">مقاطع تحصیلی</h2>
            <p className="text-gray-500 max-w-lg mx-auto">دوره‌های آموزشی ما تمام مقاطع تحصیلی از ابتدایی تا کنکور را پوشش می‌دهد</p>
          </div>

          {/* Featured */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {featuredCategories.map((cat, i) => (
              <Link
                key={i}
                to={`/courses?category=${encodeURIComponent(cat.label)}`}
                className="group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-90`}></div>
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="relative p-8 md:p-10 text-white">
                  <span className="inline-block bg-white/20 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full mb-4 font-medium">
                    ⭐ {cat.badge}
                  </span>
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 md:w-24 md:h-24 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center text-5xl md:text-6xl group-hover:scale-110 transition-transform duration-300">
                      {cat.icon}
                    </div>
                    <div>
                      <h3 className="text-2xl md:text-3xl font-black mb-2">{cat.label}</h3>
                      <p className="text-white/90 text-sm md:text-base">{cat.desc}</p>
                    </div>
                  </div>
                  <div className="mt-6 flex items-center gap-2 text-sm font-medium">
                    <span>مشاهده دوره‌ها</span>
                    <span className="group-hover:translate-x-[-4px] transition-transform">←</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Elementary */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-[#00BC83] to-[#009668] rounded-xl flex items-center justify-center text-white text-lg">🎨</div>
              <h3 className="text-xl font-bold text-gray-800">دوره ابتدایی</h3>
              <div className="flex-1 h-px bg-gray-200"></div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
              {elementaryGrades.map((grade, i) => (
                <Link
                  key={i}
                  to={`/courses?category=${encodeURIComponent(grade.label)}`}
                  className="group bg-white rounded-2xl p-4 text-center shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-gray-200"
                >
                  <div className={`w-12 h-12 bg-gradient-to-br ${grade.color} rounded-xl flex items-center justify-center text-2xl mx-auto mb-2 group-hover:scale-110 transition-transform shadow-md`}>
                    {grade.icon}
                  </div>
                  <h4 className="font-bold text-gray-800 text-sm mb-0.5">{grade.label}</h4>
                  <p className="text-[10px] text-gray-400">{grade.desc}</p>
                </Link>
              ))}
            </div>
          </div>

          {/* Middle school */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-[#2F5AF3] to-[#1E41C8] rounded-xl flex items-center justify-center text-white text-lg">📐</div>
              <h3 className="text-xl font-bold text-gray-800">دوره متوسطه اول</h3>
              <div className="flex-1 h-px bg-gray-200"></div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {middleGrades.map((grade, i) => (
                <Link
                  key={i}
                  to={`/courses?category=${encodeURIComponent(grade.label)}`}
                  className="group bg-white rounded-2xl p-4 text-center shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-gray-200"
                >
                  <div className={`w-12 h-12 bg-gradient-to-br ${grade.color} rounded-xl flex items-center justify-center text-2xl mx-auto mb-2 group-hover:scale-110 transition-transform shadow-md`}>
                    {grade.icon}
                  </div>
                  <h4 className="font-bold text-gray-800 text-sm mb-0.5">{grade.label}</h4>
                  <p className="text-[10px] text-gray-400">{grade.desc}</p>
                </Link>
              ))}
            </div>
          </div>

          {/* High school */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-[#FF6DCC] to-[#D84BA8] rounded-xl flex items-center justify-center text-white text-lg">🔬</div>
              <h3 className="text-xl font-bold text-gray-800">دوره متوسطه دوم</h3>
              <div className="flex-1 h-px bg-gray-200"></div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {highGrades.map((grade, i) => (
                <Link
                  key={i}
                  to={`/courses?category=${encodeURIComponent(grade.label)}`}
                  className="group bg-white rounded-2xl p-4 text-center shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-gray-200"
                >
                  <div className={`w-12 h-12 bg-gradient-to-br ${grade.color} rounded-xl flex items-center justify-center text-2xl mx-auto mb-2 group-hover:scale-110 transition-transform shadow-md`}>
                    {grade.icon}
                  </div>
                  <h4 className="font-bold text-gray-800 text-sm mb-0.5">{grade.label}</h4>
                  <p className="text-[10px] text-gray-400">{grade.desc}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-16 bg-white/40 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-2xl md:text-3xl font-black text-gray-800 mb-2">دوره‌های پرطرفدار</h2>
              <p className="text-gray-500 text-sm">بهترین دوره‌های آموزشی با بالاترین کیفیت</p>
            </div>
            <Link to="/courses" className="text-[#2F5AF3] hover:text-[#1E41C8] font-medium text-sm hidden md:flex items-center gap-1">
              مشاهده همه ←
            </Link>
          </div>

          {courses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map(course => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 text-gray-400">
              <span className="text-6xl block mb-4">📚</span>
              <p>هنوز دوره‌ای اضافه نشده است</p>
            </div>
          )}

          <div className="md:hidden text-center mt-6">
            <Link to="/courses" className="text-[#2F5AF3] font-medium text-sm">مشاهده همه دوره‌ها ←</Link>
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-black text-gray-800 mb-3">چرا کلاسینو؟</h2>
            <p className="text-gray-500 max-w-lg mx-auto">دلایلی که هزاران دانش‌آموز ما را انتخاب کرده‌اند</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: '🏆', title: 'اساتید برتر کشور', desc: 'تدریس توسط بهترین و باتجربه‌ترین اساتید' },
              { icon: '🎯', title: 'آموزش هدفمند', desc: 'دوره‌ها مطابق با آخرین تغییرات کنکور طراحی شده' },
              { icon: '💡', title: 'پشتیبانی ۲۴ ساعته', desc: 'تیم پشتیبانی ما همیشه آماده پاسخگویی است' },
              { icon: '📱', title: 'دسترسی آسان', desc: 'از هر کجا و با هر دستگاهی آموزش ببینید' },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition border border-gray-100">
                <span className="text-4xl block mb-4">{item.icon}</span>
                <h3 className="font-bold text-gray-800 text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-7">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Blog Posts */}
      {blogs.length > 0 && (
        <section className="py-16 bg-white/40 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h2 className="text-2xl md:text-3xl font-black text-gray-800 mb-2">آخرین مقالات</h2>
                <p className="text-gray-500 text-sm">مطالب آموزشی و مشاوره‌ای</p>
              </div>
              <Link to="/blog" className="text-[#2F5AF3] hover:text-[#1E41C8] font-medium text-sm hidden md:flex items-center gap-1">
                مشاهده همه ←
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogs.map(post => (
                <Link
                  key={post.id}
                  to={`/blog/${post.slug}`}
                  className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100"
                >
                  <div className="h-44 bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
                    {post.image ? (
                      <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-5xl">📝</span>
                    )}
                  </div>
                  <div className="p-5">
                    <span className="text-xs text-[#2F5AF3] bg-blue-50 px-2 py-0.5 rounded-md">{post.category}</span>
                    <h3 className="font-bold text-gray-800 mt-2 mb-2 group-hover:text-[#2F5AF3] transition line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-sm text-gray-500 line-clamp-2 leading-6">{post.excerpt}</p>
                    <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
                      <span className="text-xs text-gray-400">{post.author}</span>
                      <span className="text-xs text-gray-400">
                        {new Date(post.createdAt).toLocaleDateString('fa-IR')}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-gradient-to-l from-[#2F5AF3] to-[#1E41C8] rounded-3xl p-8 md:p-12 text-white text-center relative overflow-hidden shadow-lg">
            <div className="absolute top-0 left-0 w-32 h-32 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-48 h-48 bg-white/5 rounded-full translate-x-1/2 translate-y-1/2"></div>
            <div className="relative">
              <h2 className="text-2xl md:text-3xl font-black mb-4">آماده شروع یادگیری هستید?</h2>
              <p className="text-blue-100 mb-8 max-w-lg mx-auto">همین الان ثبت‌نام کنید و از مشاوره رایگان بهره‌مند شوید</p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/courses" className="bg-white text-[#2F5AF3] px-8 py-3.5 rounded-xl font-bold hover:bg-gray-50 transition">
                  مشاهده دوره‌ها
                </Link>
                <a href={`tel:${settings.phone}`} className="border-2 border-white/30 px-8 py-3.5 rounded-xl font-medium hover:bg-white/10 transition">
                  تماس با ما
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
