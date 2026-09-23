// src/components/ui/AvatarUploader.jsx
// คอมโพเนนต์อัปโหลดรูปโปรไฟล์ — ดีไซน์ Rounded 2xl minimal ตามแบบ UI
import { useRef } from 'react';

export const AvatarUploader = ({ currentAvatar, onUpload }) => {
  const fileInputRef = useRef(null);

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (file) await onUpload(file);
  };

  return (
    <div className="flex items-center gap-6 p-4 rounded-2xl border border-gray-100 bg-gray-50/70">
      <div className="w-20 h-20 rounded-2xl overflow-hidden border border-gray-200 shrink-0 bg-white shadow-sm">
        <img
          src={currentAvatar || 'https://via.placeholder.com/150'}
          alt="Avatar Preview"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex flex-col gap-1 items-start">
        <h3 className="font-sans font-semibold text-sm text-gray-900">Avatar</h3>
        <span className="text-xs text-gray-500">
          Recommended size: 500x500px.
        </span>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="mt-2 px-4 py-2 border border-gray-200 bg-white text-gray-700 font-sans font-medium text-xs rounded-xl hover:bg-gray-100 shadow-sm transition-all cursor-pointer"
        >
          Upload New
        </button>
      </div>
    </div>
  );
};