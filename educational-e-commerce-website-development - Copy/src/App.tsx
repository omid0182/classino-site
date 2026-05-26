import { Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';

// Public pages
import PublicLayout from './components/public/PublicLayout';
import HomePage from './pages/public/HomePage';
import CoursesPage from './pages/public/CoursesPage';
import CourseDetailPage from './pages/public/CourseDetailPage';
import BlogPage from './pages/public/BlogPage';
import BlogDetailPage from './pages/public/BlogDetailPage';
import AboutPage from './pages/public/AboutPage';
import ContactPage from './pages/public/ContactPage';

// Admin pages
import AdminLayout from './components/admin/AdminLayout';
import LoginPage from './pages/admin/LoginPage';
import DashboardPage from './pages/admin/DashboardPage';
import AdminCoursesPage from './pages/admin/AdminCoursesPage';
import CourseFormPage from './pages/admin/CourseFormPage';
import AdminBlogsPage from './pages/admin/AdminBlogsPage';
import BlogFormPage from './pages/admin/BlogFormPage';
import CategoriesPage from './pages/admin/CategoriesPage';
import SettingsPage from './pages/admin/SettingsPage';

function App() {
  return (
    <>
    <ScrollToTop />
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<PublicLayout />}>
        <Route index element={<HomePage />} />
        <Route path="courses" element={<CoursesPage />} />
        <Route path="course/:slug" element={<CourseDetailPage />} />
        <Route path="blog" element={<BlogPage />} />
        <Route path="blog/:slug" element={<BlogDetailPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="contact" element={<ContactPage />} />
      </Route>

      {/* Admin Routes */}
      <Route path="/admin/login" element={<LoginPage />} />
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="courses" element={<AdminCoursesPage />} />
        <Route path="courses/new" element={<CourseFormPage />} />
        <Route path="courses/edit/:id" element={<CourseFormPage />} />
        <Route path="blogs" element={<AdminBlogsPage />} />
        <Route path="blogs/new" element={<BlogFormPage />} />
        <Route path="blogs/edit/:id" element={<BlogFormPage />} />
        <Route path="categories" element={<CategoriesPage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>
    </Routes>
    </>
  );
}

export default App;
