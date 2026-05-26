import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname, hash, search } = useLocation();

  useEffect(() => {
    // If there's a hash (like #categories), scroll to that element
    if (hash) {
      setTimeout(() => {
        const el = document.getElementById(hash.replace('#', ''));
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
      return;
    }

    // If navigating to /courses with a category query, don't auto-scroll
    // CoursesPage handles its own scroll to results
    if (pathname === '/courses' && search.includes('category')) {
      return;
    }

    // Default: scroll to top
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname, hash, search]);

  return null;
}
