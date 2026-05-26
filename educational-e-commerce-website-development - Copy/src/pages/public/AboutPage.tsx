import { Helmet } from 'react-helmet-async';
import { getSettings } from '../../utils/storage';

const logoSvg = `<svg width='74' height='48' viewBox='0 0 74 48' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M36.4727 2.52051C41.1157 1.88807 45.7566 1.24713 50.3996 0.609375C51.0412 5.24904 51.6796 9.88977 52.3158 14.5294C47.8143 14.3254 43.3106 14.1436 38.8112 13.9055C38.7559 13.6228 38.7027 13.339 38.6527 13.0562C39.6506 11.9561 40.6284 10.8337 41.5923 9.70376C40.2145 8.92676 38.8729 8.08705 37.5036 7.29517C37.3919 7.14849 37.3823 6.95716 37.3398 6.78497C37.0621 5.36171 36.7376 3.94696 36.4727 2.52051Z' fill='#FF6ECC'/><path d='M22.2852 14.6228C24.679 10.5922 27.0697 6.55945 29.4838 2.54053C32.1596 4.1211 34.8226 5.72399 37.5038 7.29499C38.8731 8.08687 40.2147 8.92658 41.5925 9.70358C40.6286 10.8335 39.6508 11.9559 38.6528 13.056C36.6728 15.3413 34.6684 17.6054 32.6831 19.8853C32.4224 19.727 32.0851 19.6547 31.884 19.4251C31.6212 17.9912 31.3659 16.5563 31.1042 15.1224C29.6093 15.6825 28.1166 16.2469 26.6239 16.8114C25.1738 16.0886 23.7311 15.3541 22.2852 14.6228Z' fill='#2E59F2'/><path d='M26.623 16.8115C28.1157 16.2471 29.6084 15.6827 31.1032 15.1226C31.365 16.5564 31.6203 17.9914 31.8831 19.4253C32.4236 22.4174 32.9641 25.4085 33.5088 28.3996C33.2407 28.5197 32.9747 28.6419 32.7109 28.7716C31.4086 28.0647 30.0904 27.3834 28.8009 26.6521C28.3327 28.1827 27.8263 29.7016 27.3305 31.2237C25.8506 31.8785 24.3898 32.579 22.9066 33.2263C21.2554 28.846 19.5957 24.4689 17.9434 20.0885C20.8341 18.9884 23.7291 17.9032 26.623 16.8115Z' fill='#00BD82'/><path d='M28.8017 26.6519C30.0912 27.3831 31.4094 28.0645 32.7117 28.7713C35.379 30.185 38.0292 31.6306 40.6912 33.056C40.6253 33.3419 40.555 33.6257 40.4806 33.9084C39.1251 34.4814 37.776 35.0702 36.4163 35.6325C37.2419 36.9867 38.1644 38.2803 39.0251 39.6121C38.6953 41.2012 38.2527 42.7711 37.8654 44.3485C33.4064 42.9093 28.9474 41.4701 24.4863 40.0373C25.4258 37.0962 26.377 34.1593 27.3313 31.2235C27.8271 29.7014 28.3335 28.1825 28.8017 26.6519Z' fill='#FFA300'/><path d='M40.4803 33.9085C43.2529 32.718 46.0383 31.5541 48.8045 30.3477C51.1867 33.4153 53.5306 36.5137 55.8957 39.5951C51.9921 42.1897 48.0811 44.7737 44.1732 47.363C42.4507 44.7832 40.7431 42.194 39.0248 39.6121C38.1641 38.2803 37.2416 36.9867 36.416 35.6325C37.7757 35.0702 39.1248 34.4814 40.4803 33.9085Z' fill='#FF0D38'/></svg>`;

export default function AboutPage() {
  const settings = getSettings();

  return (
    <>
      <Helmet>
        <title>درباره ما | {settings.siteName}</title>
        <meta name="description" content={`درباره ${settings.siteName} - ${settings.siteDescription}`} />
      </Helmet>

      <div className="bg-gradient-to-l from-primary-700 to-primary-900 text-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-black mb-3">درباره ما</h1>
          <p className="text-blue-200 text-lg">با کلاسینو بیشتر آشنا شوید</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12 border border-gray-100">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 flex items-center justify-center" dangerouslySetInnerHTML={{ __html: logoSvg }} />
            <div>
              <h2 className="text-2xl font-black text-gray-800">{settings.siteName}</h2>
              <p className="text-gray-500">نمایندگی رسمی آموزشگاه آنلاین کلاسینو</p>
            </div>
          </div>
          <div className="text-gray-600 leading-8 space-y-4">
            <p>{settings.aboutText}</p>
            <p>ما در کلاسینو با بهره‌گیری از بهترین اساتید کشور و استفاده از جدیدترین متدهای آموزشی، تلاش می‌کنیم تا بهترین تجربه یادگیری را برای دانش‌آموزان عزیز فراهم کنیم.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
            <div className="bg-primary-50 rounded-xl p-6 text-center">
              <span className="text-4xl block mb-3">🎯</span>
              <h3 className="font-bold text-gray-800 mb-2">مأموریت ما</h3>
              <p className="text-sm text-gray-500 leading-6">ارائه آموزش باکیفیت و در دسترس برای تمامی دانش‌آموزان</p>
            </div>
            <div className="bg-accent-400/10 rounded-xl p-6 text-center">
              <span className="text-4xl block mb-3">👁️</span>
              <h3 className="font-bold text-gray-800 mb-2">چشم‌انداز ما</h3>
              <p className="text-sm text-gray-500 leading-6">تبدیل شدن به بزرگ‌ترین پلتفرم آموزشی آنلاین ایران</p>
            </div>
            <div className="bg-green-50 rounded-xl p-6 text-center">
              <span className="text-4xl block mb-3">💎</span>
              <h3 className="font-bold text-gray-800 mb-2">ارزش‌های ما</h3>
              <p className="text-sm text-gray-500 leading-6">کیفیت، صداقت، نوآوری و احترام به دانش‌آموزان</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}