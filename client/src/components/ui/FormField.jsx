// src/components/ui/FormField.jsx
// คอมโพเนนต์ช่องกรอกข้อมูล — อ้างอิงสไตล์การ์ด Rounded แบบฟอร์มในรูปตัวอย่าง
export const FormField = ({ label, type = 'text', name, value, onChange, placeholder, isTextarea = false, rows = 3 }) => {
  const inputClasses =
    'w-full px-4 py-3 font-sans text-sm text-gray-900 bg-white border border-gray-200 rounded-xl outline-none focus:border-[#685bc7] focus:ring-2 focus:ring-[#685bc7]/20 transition-all shadow-sm placeholder:text-gray-400';

  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={name}
        className="font-sans font-medium text-xs text-gray-500 uppercase tracking-wider"
      >
        {label}
      </label>
      {isTextarea ? (
        <textarea
          id={name}
          name={name}
          value={value || ''}
          onChange={onChange}
          placeholder={placeholder}
          rows={rows}
          className={`${inputClasses} resize-y`}
        />
      ) : (
        <input
          id={name}
          type={type}
          name={name}
          value={value || ''}
          onChange={onChange}
          placeholder={placeholder}
          className={inputClasses}
        />
      )}
    </div>
  );
};