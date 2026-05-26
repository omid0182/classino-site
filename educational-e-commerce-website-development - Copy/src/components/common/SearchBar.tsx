import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function SearchBar({ courses, onFilter }: { courses: any[], onFilter: (filtered: any[]) => void }) {
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const filtered = courses.filter((course) => {
      const term = searchTerm.toLowerCase();
      if (!term) return true;
      
      return (
        course.title.toLowerCase().includes(term) ||
        course.subjects.some((s: string) => s.toLowerCase().includes(term)) ||
        course.teachers.some((t: any) => t.name.toLowerCase().includes(term)) ||
        course.level.toLowerCase().includes(term)
      );
    });
    
    onFilter(filtered);
  }, [searchTerm, courses, onFilter]);

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-white p-2 rounded-2xl shadow-lg shadow-black/5 border border-black/5 flex items-center transition-all focus-within:ring-2 focus-within:ring-[#2F5AF3]/20">
        <span className="text-xl px-4">🔍</span>
        <input
          type="text"
          placeholder="جستجو در دوره‌ها، دروس، اساتید یا پایه..."
          className="flex-1 py-3 outline-none text-gray-700 font-bold placeholder-gray-400 bg-transparent"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="bg-[#2F5AF3] text-white px-6 py-3 rounded-xl font-black hover:bg-[#1E41C8] transition">
          جستجو
        </button>
      </div>
    </div>
  );
}