import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { login, isAuthenticated } from '../../utils/storage';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  if (isAuthenticated()) {
    return <Navigate to="/admin" replace />;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(username, password)) {
      navigate('/admin');
    } else {
      setError('نام کاربری یا رمز عبور اشتباه است');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md animate-fade-in">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-primary-400 to-primary-600 rounded-2xl flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4 shadow-xl">
            C
          </div>
          <h1 className="text-2xl font-black text-white">ورود به پنل مدیریت</h1>
          <p className="text-blue-200 mt-2 text-sm">کلاسینو - آموزشگاه آنلاین</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-2xl p-8 space-y-5">
          {error && (
            <div className="bg-red-50 text-danger-500 p-3 rounded-xl text-sm text-center">
              ❌ {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1.5">نام کاربری</label>
            <input
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none text-sm transition"
              placeholder="admin"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1.5">رمز عبور</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none text-sm transition"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-l from-primary-500 to-primary-600 text-white py-3.5 rounded-xl font-bold hover:shadow-lg hover:shadow-primary-200 transition-all duration-200"
          >
            ورود
          </button>

          <div className="text-center">
            <p className="text-xs text-gray-400">
              نام کاربری: admin | رمز عبور: classino2024
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
