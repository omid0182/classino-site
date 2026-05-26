import { Link } from 'react-router-dom';
import { Course } from '../../types';
import { formatPrice } from '../../utils/storage';

interface Props {
  course: Course;
}

export default function CourseCard({ course }: Props) {
  return (
    <Link
      to={`/course/${course.slug}`}
      className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col"
    >
      {/* Image */}
      <div className="relative h-48 bg-gradient-to-br from-primary-100 to-primary-200 overflow-hidden">
        {course.image ? (
          <img src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center">
              <span className="text-5xl">📚</span>
              <p className="text-primary-600 text-sm mt-2 font-medium">{course.category}</p>
            </div>
          </div>
        )}
        
        {/* Badge */}
        <div className="absolute top-3 right-3 flex gap-2">
          <span className={`text-xs px-3 py-1 rounded-full font-medium ${
            course.type === 'package' 
              ? 'bg-accent-400 text-white' 
              : 'bg-white/90 text-gray-700'
          }`}>
            {course.type === 'package' ? '📦 پکیج' : '📖 تک درس'}
          </span>
        </div>

        {course.discountPrice && (
          <div className="absolute top-3 left-3">
            <span className="bg-danger-500 text-white text-xs px-2 py-1 rounded-full font-medium">
              {Math.round((1 - course.discountPrice / course.price) * 100)}% تخفیف
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs bg-primary-50 text-primary-700 px-2 py-0.5 rounded-md">{course.category}</span>
          <span className="text-xs text-gray-400">{course.level}</span>
        </div>
        
        <h3 className="font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-primary-600 transition">
          {course.title}
        </h3>
        
        <p className="text-sm text-gray-500 mb-4 line-clamp-2 leading-6 flex-1">
          {course.description}
        </p>

        {/* Teachers */}
        {course.teachers.length > 0 && (
          <div className="flex items-center gap-1 mb-3">
            <span className="text-xs text-gray-400">👨‍🏫</span>
            <span className="text-xs text-gray-500 truncate">
              {course.teachers.map(t => t.name).join('، ')}
            </span>
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex flex-col gap-1">
            <span className="text-xs text-gray-400">⏱️ {course.duration}</span>
            {course.startDate && (
              <span className="text-xs text-green-600">📅 شروع: {new Date(course.startDate).toLocaleDateString('fa-IR')}</span>
            )}
          </div>
          <div className="text-left">
            {course.discountPrice ? (
              <div className="flex flex-col items-end">
                <span className="text-xs text-gray-400 line-through">{formatPrice(course.price)}</span>
                <span className="text-primary-600 font-bold text-sm">{formatPrice(course.discountPrice)} تومان</span>
              </div>
            ) : (
              <span className="text-primary-600 font-bold text-sm">{formatPrice(course.price)} تومان</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
