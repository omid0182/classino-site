import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { getSettings } from '../../utils/storage';

export default function ContactPage() {
  const settings = getSettings();
  const [formData, setFormData] = useState({ name: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setFormData({ name: '', phone: '', message: '' });
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="bg-[#F0E8E2] min-h-screen">
      <Helmet>
        <title>تماس با ما | {settings.siteName}</title>
        <meta name="description" content={`تماس با ${settings.siteName} - ${settings.phone}`} />
      </Helmet>

      {/* Header */}
      <div className="bg-gradient-to-l from-[#1E41C8] to-[#2F5AF3] text-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-black mb-3">تماس با ما</h1>
          <p className="text-blue-100 text-lg">ما آماده پاسخگویی به سؤالات شما هستیم</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Info */}
          <div className="space-y-6">
            <div className="bg-white rounded-3xl shadow-sm p-6 border border-black/5">
              <h2 className="text-xl font-black text-gray-800 mb-6">اطلاعات تماس</h2>
              <div className="space-y-4">
                {[
                  { icon: '📞', label: 'تلفن', val: settings.phone, href: `tel:${settings.phone}` },
                  { icon: '📧', label: 'ایمیل', val: settings.email, href: `mailto:${settings.email}` },
                  { icon: '📍', label: 'آدرس', val: settings.address, href: '#' }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 bg-[#F0E8E2] rounded-2xl">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-xl shadow-sm">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-400">{item.label}</p>
                      <a href={item.href} className="font-bold text-gray-800 hover:text-[#2F5AF3] transition">
                        {item.val}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-3xl shadow-sm p-6 border border-black/5">
              <h2 className="text-xl font-black text-gray-800 mb-4">شبکه‌های اجتماعی</h2>
              <div className="grid grid-cols-3 gap-3">
                {settings.instagram && (
                  <a href={`https://instagram.com/${settings.instagram}`} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 p-4 bg-[#F0E8E2] rounded-2xl hover:bg-[#FFA300]/10 transition">
                    <span className="text-2xl">📸</span>
                    <span className="text-[10px] font-bold text-gray-600">اینستاگرام</span>
                  </a>
                )}
                {settings.telegram && (
                  <a href={`https://t.me/${settings.telegram}`} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 p-4 bg-[#F0E8E2] rounded-2xl hover:bg-[#FFA300]/10 transition">
                    <span className="text-2xl">✈️</span>
                    <span className="text-[10px] font-bold text-gray-600">تلگرام</span>
                  </a>
                )}
                {settings.whatsapp && (
                  <a href={`https://wa.me/${settings.whatsapp}`} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 p-4 bg-[#F0E8E2] rounded-2xl hover:bg-[#FFA300]/10 transition">
                    <span className="text-2xl">💬</span>
                    <span className="text-[10px] font-bold text-gray-600">واتساپ</span>
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-3xl shadow-sm p-6 md:p-8 border border-black/5">
            <h2 className="text-xl font-black text-gray-800 mb-6">ارسال پیام</h2>
            
            {submitted && (
              <div className="bg-[#00BC83]/10 text-[#008F64] p-4 rounded-2xl mb-6 text-sm font-bold border border-[#00BC83]/20">
                ✅ پیام شما با موفقیت ارسال شد! به زودی با شما تماس خواهیم گرفت.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-600 mb-1.5">نام و نام خانوادگی</label>
                <input
                  type="text" required value={formData.name}
                  onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-[#2F5AF3] focus:ring-2 focus:ring-[#2F5AF3]/20 outline-none text-sm transition"
                  placeholder="نام خود را وارد کنید"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-600 mb-1.5">شماره تماس</label>
                <input
                  type="tel" required value={formData.phone}
                  onChange={e => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-[#2F5AF3] focus:ring-2 focus:ring-[#2F5AF3]/20 outline-none text-sm transition text-left"
                  placeholder="09xxxxxxxxx" dir="ltr"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-600 mb-1.5">پیام شما</label>
                <textarea
                  required rows={5} value={formData.message}
                  onChange={e => setFormData(prev => ({ ...prev, message: e.target.value }))}
                  className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-[#2F5AF3] focus:ring-2 focus:ring-[#2F5AF3]/20 outline-none text-sm transition resize-none"
                  placeholder="پیام خود را بنویسید..."
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#2F5AF3] text-white py-4 rounded-2xl font-black text-lg hover:bg-[#1E41C8] transition-all duration-200 shadow-lg shadow-[#2F5AF3]/30"
              >
                ارسال پیام
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}