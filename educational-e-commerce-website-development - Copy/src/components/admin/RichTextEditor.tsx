import { useRef, useEffect, useCallback } from 'react';

interface Props {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function RichTextEditor({ value, onChange, placeholder }: Props) {
  const editorRef = useRef<HTMLDivElement>(null);
  const lastValueRef = useRef<string>('');
  const isFocused = useRef(false);

  useEffect(() => {
    if (editorRef.current && !isFocused.current && value !== lastValueRef.current) {
      editorRef.current.innerHTML = value;
      lastValueRef.current = value;
    }
  }, [value]);

  const execCommand = useCallback((command: string, val?: string) => {
    document.execCommand(command, false, val);
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
    editorRef.current?.focus();
  }, [onChange]);

  const handleInput = useCallback(() => {
    if (editorRef.current) {
      lastValueRef.current = editorRef.current.innerHTML;
      onChange(editorRef.current.innerHTML);
    }
  }, [onChange]);

  const handleFocus = () => { isFocused.current = true; };
  const handleBlur = () => { isFocused.current = false; };

  const insertHeading = (level: number) => execCommand('formatBlock', `h${level}`);
  const insertList = (ordered: boolean) => execCommand(ordered ? 'insertOrderedList' : 'insertUnorderedList');

  const insertLink = () => {
    const url = prompt('لینک را وارد کنید:', 'https://');
    if (url) execCommand('createLink', url);
  };

  const insertImage = () => {
    const url = prompt('آدرس تصویر را وارد کنید:', 'https://');
    if (url) execCommand('insertImage', url);
  };

  const tools = [
    { icon: 'B', title: 'بولد', action: () => execCommand('bold'), className: 'font-bold' },
    { icon: 'I', title: 'ایتالیک', action: () => execCommand('italic'), className: 'italic' },
    { icon: 'U', title: 'زیرخط', action: () => execCommand('underline'), className: 'underline' },
    { type: 'divider' },
    { icon: 'H1', title: 'تیتر ۱', action: () => insertHeading(1), className: 'text-xs font-bold' },
    { icon: 'H2', title: 'تیتر ۲', action: () => insertHeading(2), className: 'text-xs font-bold' },
    { icon: 'H3', title: 'تیتر ۳', action: () => insertHeading(3), className: 'text-xs font-bold' },
    { icon: 'P', title: 'پاراگراف', action: () => execCommand('formatBlock', 'p'), className: 'text-xs' },
    { type: 'divider' },
    { icon: '•', title: 'لیست نقطه‌ای', action: () => insertList(false), className: 'text-lg' },
    { icon: '1.', title: 'لیست شماره‌ای', action: () => insertList(true), className: 'text-xs font-medium' },
    { type: 'divider' },
    { icon: '🔗', title: 'لینک', action: insertLink },
    { icon: '🖼️', title: 'تصویر', action: insertImage },
    { type: 'divider' },
    { icon: '←', title: 'راست‌چین', action: () => execCommand('justifyRight') },
    { icon: '↔', title: 'وسط‌چین', action: () => execCommand('justifyCenter') },
    { icon: '→', title: 'چپ‌چین', action: () => execCommand('justifyLeft') },
    { type: 'divider' },
    { icon: '❝', title: 'نقل قول', action: () => execCommand('formatBlock', 'blockquote') },
    { icon: '—', title: 'خط افقی', action: () => execCommand('insertHorizontalRule') },
  ];

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      <div className="bg-gray-50 border-b border-gray-200 p-2 flex flex-wrap gap-1">
        {tools.map((tool, i) =>
          tool.type === 'divider' ? (
            <div key={i} className="w-px h-6 bg-gray-300 mx-1 self-center" />
          ) : (
            <button
              key={i}
              type="button"
              onClick={tool.action}
              title={tool.title}
              className={`w-8 h-8 flex items-center justify-center rounded hover:bg-gray-200 transition text-gray-700 ${tool.className || ''}`}
            >
              {tool.icon}
            </button>
          )
        )}
      </div>

      <div className="bg-gray-50 border-b border-gray-200 px-2 pb-2 flex items-center gap-2">
        <label className="text-xs text-gray-500">اندازه فونت:</label>
        <select
          onChange={(e) => execCommand('fontSize', e.target.value)}
          className="text-xs px-2 py-1 rounded border border-gray-300 bg-white"
          defaultValue="3"
        >
          <option value="1">خیلی کوچک</option>
          <option value="2">کوچک</option>
          <option value="3">معمولی</option>
          <option value="4">متوسط</option>
          <option value="5">بزرگ</option>
          <option value="6">خیلی بزرگ</option>
          <option value="7">عنوان</option>
        </select>
        <label className="text-xs text-gray-500 mr-3">رنگ متن:</label>
        <input
          type="color"
          onChange={(e) => execCommand('foreColor', e.target.value)}
          className="w-6 h-6 rounded cursor-pointer"
          defaultValue="#000000"
        />
        <label className="text-xs text-gray-500 mr-3">رنگ پس‌زمینه:</label>
        <input
          type="color"
          onChange={(e) => execCommand('hiliteColor', e.target.value)}
          className="w-6 h-6 rounded cursor-pointer"
          defaultValue="#ffffff"
        />
      </div>

      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className="min-h-[300px] p-4 focus:outline-none text-gray-700 leading-8"
        style={{ direction: 'rtl' }}
        data-placeholder={placeholder}
      />

      <style>{`
        [contenteditable]:empty:before {
          content: attr(data-placeholder);
          color: #9ca3af;
          pointer-events: none;
        }
      `}</style>
    </div>
  );
}