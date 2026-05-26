import { useState } from 'react';
import { SiteSettings } from '../../types';
import { getSettings, saveSettings } from '../../utils/storage';

export default function SettingsPage() {
  const [settings, setSettings] = useState<SiteSettings>(getSettings());
  const [saved, setSaved] = useState(false);

  const handleChange = (field: keyof SiteSettings, value: string) => {
    setSettings(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveSettings(settings);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="animate-fade-in max-w-3xl">
      <div className="mb-6">
        <h1 className="text-2xl font-black text-gray-800">تنظیمات سایت</h1>
        <p className="text-sm text-gray-500 mt-1">اطلاعات کلی سایت را ویرایش کنید</p>
      </div>

      {saved && (
        <div className="bg-green-50 text-green-700 p-4 rounded-xl mb-6 text-sm animate-fade-in">
          ✅ تنظیمات با موفقیت ذخیره شد!
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* General */}
        <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
          <h2 className="text-lg font-bold text-gray-800 mb-4">🌐 اطلاعات کلی</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1.5">نام سایت</label>
                <input
                  type="text"
                  value={settings.siteName}
                  onChange={e => handleChange('siteName', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-400 outline-none text-sm transition"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1.5">عنوان هیرو</label>
                <input
                  type="text"
                  value={settings.heroTitle}
                  onChange={e => handleChange('heroTitle', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-400 outline-none text-sm transition"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1.5">توضیحات سایت</label>
              <input
                type="text"
                value={settings.siteDescription}
                onChange={e => handleChange('siteDescription', e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-400 outline-none text-sm transition"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1.5">زیرعنوان هیرو</label>
              <input
                type="text"
                value={settings.heroSubtitle}
                onChange={e => handleChange('heroSubtitle', e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-400 outline-none text-sm transition"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1.5">درباره ما</label>
              <textarea
                rows={4}
                value={settings.aboutText}
                onChange={e => handleChange('aboutText', e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-400 outline-none text-sm transition resize-none"
              />
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
          <h2 className="text-lg font-bold text-gray-800 mb-4">📞 اطلاعات تماس</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1.5">تلفن</label>
              <input
                type="text"
                value={settings.phone}
                onChange={e => handleChange('phone', e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-400 outline-none text-sm transition"
                dir="ltr"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1.5">ایمیل</label>
              <input
                type="email"
                value={settings.email}
                onChange={e => handleChange('email', e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-400 outline-none text-sm transition"
                dir="ltr"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-600 mb-1.5">آدرس</label>
              <input
                type="text"
                value={settings.address}
                onChange={e => handleChange('address', e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-400 outline-none text-sm transition"
              />
            </div>
          </div>
        </div>

        {/* Social */}
        <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
          <h2 className="text-lg font-bold text-gray-800 mb-4">📱 شبکه‌های اجتماعی</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1.5">📸 اینستاگرام (نام کاربری)</label>
              <input
                type="text"
                value={settings.instagram}
                onChange={e => handleChange('instagram', e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-400 outline-none text-sm transition"
                placeholder="classino_ir"
                dir="ltr"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1.5">✈️ تلگرام (نام کاربری)</label>
              <input
                type="text"
                value={settings.telegram}
                onChange={e => handleChange('telegram', e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-400 outline-none text-sm transition"
                placeholder="classino_ir"
                dir="ltr"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1.5">💬 واتساپ (شماره)</label>
              <input
                type="text"
                value={settings.whatsapp}
                onChange={e => handleChange('whatsapp', e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-400 outline-none text-sm transition"
                placeholder="09121234567"
                dir="ltr"
              />
            </div>
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="bg-primary-600 text-white px-8 py-3.5 rounded-xl font-bold hover:bg-primary-700 transition"
        >
          💾 ذخیره تنظیمات
        </button>
      </form>
    </div>
  );
}
