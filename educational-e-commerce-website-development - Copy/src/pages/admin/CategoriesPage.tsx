import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Category } from '../../types';
import { getCategories, saveCategory, deleteCategory } from '../../utils/storage';

const categoryTypes = [
  { value: 'featured', label: '⭐ ویژه (تیزهوشان/کنکور)', color: 'bg-amber-100 text-amber-700' },
  { value: 'elementary', label: '🎨 ابتدایی', color: 'bg-green-100 text-green-700' },
  { value: 'middle', label: '📐 متوسطه اول', color: 'bg-purple-100 text-purple-700' },
  { value: 'high', label: '🔬 متوسطه دوم', color: 'bg-rose-100 text-rose-700' },
];

const colorOptions = [
  { value: 'from-amber-400 via-yellow-500 to-orange-500', label: 'طلایی' },
  { value: 'from-red-500 via-rose-600 to-pink-600', label: 'قرمز' },
  { value: 'from-green-400 to-emerald-500', label: 'سبز' },
  { value: 'from-blue-400 to-indigo-500', label: 'آبی' },
  { value: 'from-purple-400 to-violet-500', label: 'بنفش' },
  { value: 'from-cyan-400 to-blue-500', label: 'فیروزه‌ای' },
  { value: 'from-rose-400 to-red-500', label: 'صورتی' },
  { value: 'from-orange-400 to-amber-500', label: 'نارنجی' },
  { value: 'from-teal-400 to-cyan-500', label: 'سبزآبی' },
  { value: 'from-fuchsia-400 to-pink-500', label: 'سرخابی' },
];

const iconOptions = ['🏆', '🎯', '🌱', '🌿', '🌳', '📗', '📘', '🎓', '🔬', '⚗️', '📐', '📊', '🚀', '💡', '📚', '✨', '🎨', '🧬', '📝', '🎭'];

const emptyCategory: Category = {
  id: '',
  name: '',
  slug: '',
  icon: '📚',
  color: 'from-blue-400 to-indigo-500',
  description: '',
  type: 'elementary',
  order: 1,
  isActive: true,
};

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>(getCategories());
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const refreshCategories = () => {
    setCategories(getCategories());
  };

  const openModal = (category?: Category) => {
    if (category) {
      setEditingCategory({ ...category });
    } else {
      setEditingCategory({ ...emptyCategory, id: uuidv4() });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setEditingCategory(null);
    setIsModalOpen(false);
  };

  const handleSave = () => {
    if (editingCategory && editingCategory.name) {
      // Generate slug if empty
      if (!editingCategory.slug) {
        editingCategory.slug = editingCategory.name.replace(/\s+/g, '-');
      }
      saveCategory(editingCategory);
      refreshCategories();
      closeModal();
    }
  };

  const handleDelete = (id: string) => {
    deleteCategory(id);
    refreshCategories();
    setDeleteConfirm(null);
  };

  const handleChange = (field: keyof Category, value: unknown) => {
    if (editingCategory) {
      setEditingCategory({ ...editingCategory, [field]: value });
    }
  };

  const getTypeLabel = (type: string) => {
    return categoryTypes.find(t => t.value === type)?.label || type;
  };

  const getTypeColor = (type: string) => {
    return categoryTypes.find(t => t.value === type)?.color || 'bg-gray-100 text-gray-700';
  };

  const groupedCategories = {
    featured: categories.filter(c => c.type === 'featured').sort((a, b) => a.order - b.order),
    elementary: categories.filter(c => c.type === 'elementary').sort((a, b) => a.order - b.order),
    middle: categories.filter(c => c.type === 'middle').sort((a, b) => a.order - b.order),
    high: categories.filter(c => c.type === 'high').sort((a, b) => a.order - b.order),
  };

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black text-gray-800">مدیریت دسته‌بندی‌ها</h1>
          <p className="text-sm text-gray-500 mt-1">{categories.length} دسته‌بندی</p>
        </div>
        <button
          onClick={() => openModal()}
          className="bg-primary-600 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-primary-700 transition flex items-center gap-2"
        >
          <span>➕</span>
          افزودن دسته‌بندی
        </button>
      </div>

      {/* Categories by Type */}
      {Object.entries(groupedCategories).map(([type, cats]) => (
        <div key={type} className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className={`text-xs px-3 py-1 rounded-full font-medium ${getTypeColor(type)}`}>
              {getTypeLabel(type)}
            </span>
            <div className="flex-1 h-px bg-gray-200"></div>
            <span className="text-xs text-gray-400">{cats.length} دسته</span>
          </div>

          {cats.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {cats.map(cat => (
                <div
                  key={cat.id}
                  className={`bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden ${!cat.isActive ? 'opacity-50' : ''}`}
                >
                  <div className={`h-3 bg-gradient-to-r ${cat.color}`}></div>
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{cat.icon}</span>
                        <div>
                          <h3 className="font-bold text-gray-800">{cat.name}</h3>
                          <p className="text-xs text-gray-400">{cat.slug}</p>
                        </div>
                      </div>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${cat.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                        {cat.isActive ? 'فعال' : 'غیرفعال'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mb-4 line-clamp-2">{cat.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-400">ترتیب: {cat.order}</span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openModal(cat)}
                          className="text-xs bg-blue-50 text-blue-600 px-3 py-1.5 rounded-lg hover:bg-blue-100 transition"
                        >
                          ✏️ ویرایش
                        </button>
                        {deleteConfirm === cat.id ? (
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => handleDelete(cat.id)}
                              className="text-xs bg-red-500 text-white px-2 py-1.5 rounded-lg"
                            >
                              تأیید
                            </button>
                            <button
                              onClick={() => setDeleteConfirm(null)}
                              className="text-xs bg-gray-100 text-gray-600 px-2 py-1.5 rounded-lg"
                            >
                              لغو
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setDeleteConfirm(cat.id)}
                            className="text-xs bg-red-50 text-red-600 px-3 py-1.5 rounded-lg hover:bg-red-100 transition"
                          >
                            🗑️
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-gray-50 rounded-xl p-6 text-center text-gray-400 text-sm">
              دسته‌بندی در این گروه وجود ندارد
            </div>
          )}
        </div>
      ))}

      {/* Modal */}
      {isModalOpen && editingCategory && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto animate-fade-in">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-800">
                {editingCategory.id && categories.find(c => c.id === editingCategory.id) ? 'ویرایش دسته‌بندی' : 'افزودن دسته‌بندی جدید'}
              </h2>
            </div>

            <div className="p-6 space-y-4">
              {/* Preview */}
              <div className={`bg-gradient-to-r ${editingCategory.color} rounded-xl p-4 text-white`}>
                <div className="flex items-center gap-3">
                  <span className="text-4xl">{editingCategory.icon}</span>
                  <div>
                    <h3 className="font-bold text-lg">{editingCategory.name || 'نام دسته‌بندی'}</h3>
                    <p className="text-white/80 text-sm">{editingCategory.description || 'توضیحات'}</p>
                  </div>
                </div>
              </div>

              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1.5">نام دسته‌بندی *</label>
                <input
                  type="text"
                  value={editingCategory.name}
                  onChange={e => handleChange('name', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-400 outline-none text-sm transition"
                  placeholder="مثال: پایه ششم"
                />
              </div>

              {/* Slug */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1.5">اسلاگ (URL)</label>
                <input
                  type="text"
                  value={editingCategory.slug}
                  onChange={e => handleChange('slug', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-400 outline-none text-sm transition"
                  placeholder="خودکار تولید می‌شود"
                  dir="ltr"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1.5">توضیحات</label>
                <input
                  type="text"
                  value={editingCategory.description}
                  onChange={e => handleChange('description', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-400 outline-none text-sm transition"
                  placeholder="توضیح کوتاه"
                />
              </div>

              {/* Type */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1.5">نوع دسته‌بندی *</label>
                <select
                  value={editingCategory.type}
                  onChange={e => handleChange('type', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-400 outline-none text-sm transition"
                >
                  {categoryTypes.map(t => (
                    <option key={t.value} value={t.value}>{t.label}</option>
                  ))}
                </select>
              </div>

              {/* Icon */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1.5">آیکون</label>
                <div className="flex flex-wrap gap-2">
                  {iconOptions.map(icon => (
                    <button
                      key={icon}
                      type="button"
                      onClick={() => handleChange('icon', icon)}
                      className={`w-10 h-10 rounded-lg text-xl flex items-center justify-center transition ${
                        editingCategory.icon === icon
                          ? 'bg-primary-100 border-2 border-primary-500'
                          : 'bg-gray-50 hover:bg-gray-100 border border-gray-200'
                      }`}
                    >
                      {icon}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1.5">رنگ</label>
                <div className="grid grid-cols-5 gap-2">
                  {colorOptions.map(color => (
                    <button
                      key={color.value}
                      type="button"
                      onClick={() => handleChange('color', color.value)}
                      className={`h-10 rounded-lg bg-gradient-to-r ${color.value} transition ${
                        editingCategory.color === color.value
                          ? 'ring-2 ring-offset-2 ring-primary-500'
                          : ''
                      }`}
                      title={color.label}
                    />
                  ))}
                </div>
              </div>

              {/* Order */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1.5">ترتیب نمایش</label>
                <input
                  type="number"
                  min="1"
                  value={editingCategory.order}
                  onChange={e => handleChange('order', Number(e.target.value))}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-400 outline-none text-sm transition"
                />
              </div>

              {/* Active */}
              <div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingCategory.isActive}
                    onChange={e => handleChange('isActive', e.target.checked)}
                    className="rounded text-primary-600"
                  />
                  <span className="text-sm text-gray-600">فعال باشد</span>
                </label>
              </div>
            </div>

            <div className="p-6 border-t border-gray-100 flex items-center gap-3">
              <button
                onClick={handleSave}
                className="flex-1 bg-primary-600 text-white py-3 rounded-xl font-bold hover:bg-primary-700 transition"
              >
                💾 ذخیره
              </button>
              <button
                onClick={closeModal}
                className="px-6 py-3 text-gray-500 hover:text-gray-700 transition"
              >
                انصراف
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
