// pages/Account/ProfileSettings.jsx
// หน้าตั้งค่าโปรไฟล์ — การ์ดสีขาวขอบมน Rounded 2xl อ้างอิงตามดีไซน์ UI ในรูป
import { useState, useEffect } from 'react';
import { useAccount } from '../../src/context/AccountContext';
import { AvatarUploader } from '../../src/components/ui/AvatarUploader';
import { FormField } from '../../src/components/ui/FormField';

export default function ProfileSettings() {
  const { profile, updateProfile, uploadAvatar, loading } = useAccount();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    defaultPayment: 'credit_card',
  });

  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    if (profile) {
      setFormData({
        firstName: profile.firstName || '',
        lastName: profile.lastName || '',
        email: profile.email || '',
        phone: profile.phone || '',
        address: profile.address || '',
        defaultPayment: profile.defaultPayment || 'credit_card',
      });
    }
  }, [profile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateProfile(formData);
      setSuccessMsg('Profile updated successfully!');
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    if (profile) {
      setFormData({
        firstName: profile.firstName || '',
        lastName: profile.lastName || '',
        email: profile.email || '',
        phone: profile.phone || '',
        address: profile.address || '',
        defaultPayment: profile.defaultPayment || 'credit_card',
      });
    }
  };

  if (loading) return <div className="p-8 font-sans text-sm text-gray-500">Loading profile...</div>;

  const paymentOptions = [
    { key: 'credit_card', label: 'Credit Card', icon: (
      <svg className="size-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <rect x="2" y="5" width="20" height="14" rx="2" />
        <path d="M2 10h20" />
      </svg>
    )},
    { key: 'promptpay', label: 'PromptPay', icon: (
      <svg className="size-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11M8 14v3M12 14v3M16 14v3" />
      </svg>
    )},
  ];

  return (
    <div className="bg-white rounded-2xl border border-gray-200/80 p-6 sm:p-8 shadow-sm">
      <h2 className="font-sans font-bold text-xl text-gray-900 mb-6">
        Profile Settings
      </h2>

      {successMsg && (
        <div className="bg-emerald-50 text-emerald-700 font-sans font-medium text-sm px-4 py-3 mb-6 rounded-xl border border-emerald-200">
          {successMsg}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {/* Avatar Section */}
        <AvatarUploader
          currentAvatar={profile?.profilePicture}
          onUpload={uploadAvatar}
        />

        {/* Full Name & Email */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <FormField
            label="Full Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="Niran Sukhavaha"
          />
          <FormField
            label="Email Address"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="niran.s@example.com"
          />
        </div>

        {/* Phone */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <FormField
            label="Phone Number"
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+66 81 234 5678"
          />
        </div>

        {/* Shipping Address */}
        <FormField
          label="Shipping Address"
          name="address"
          isTextarea={true}
          rows={3}
          value={formData.address}
          onChange={handleChange}
          placeholder="123 Sukhumvit Road, Khlong Toei, Bangkok 10110, Thailand"
        />

        {/* Default Payment Channel */}
        <div className="flex flex-col gap-3 pt-2">
          <label className="font-sans font-medium text-xs text-gray-500 uppercase tracking-wider">
            Default Payment Channel
          </label>
          <div className="flex gap-3">
            {paymentOptions.map((opt) => (
              <button
                key={opt.key}
                type="button"
                onClick={() => setFormData((prev) => ({ ...prev, defaultPayment: opt.key }))}
                className={`flex items-center gap-2.5 px-5 py-3 rounded-xl border text-sm font-sans font-semibold transition-all cursor-pointer ${
                  formData.defaultPayment === opt.key
                    ? 'border-[#685bc7] text-[#685bc7] bg-purple-50/30 ring-1 ring-[#685bc7]'
                    : 'border-gray-200 text-gray-600 bg-white hover:border-gray-300'
                }`}
              >
                {opt.icon}
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
          <button
            type="button"
            onClick={handleCancel}
            className="px-6 py-2.5 border border-gray-200 text-gray-700 bg-white rounded-xl font-sans font-medium text-sm hover:bg-gray-50 transition-all cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="px-7 py-2.5 bg-[#ff5b30] hover:bg-[#e04820] text-white rounded-xl font-sans font-semibold text-sm shadow-sm transition-all cursor-pointer disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
}