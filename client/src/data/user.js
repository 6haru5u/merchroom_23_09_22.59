// src/data/user.js

/**
 * Mock User Data Source - อิงจาก User.js Mongoose Schema
 */
const USER_STORAGE_KEY = 'merchroom_user_profile';

const DEFAULT_USER = {
  _id: 'usr_65f1a2b3c4d5e6f7a8b9c0d1',
  email: 'kornkanok@merchroom.co.th',
  firstName: 'KORNKANOK',
  lastName: 'THAIHERITAGE',
  phone: '081-234-5678',
  address: '99/9 ถ.สุขุมวิท แขวงคลองเตย เขตคลองเตย กรุงเทพมหานคร 10110',
  interests: ['Pop Culture', 'Vinyl Art Toys', 'Streetwear'],
  paymentMethods: ['VISA ending in 4242', 'PromptPay QR'],
  profilePicture: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
  role: 'customer',
};

function getStoredUser() {
  try {
    const raw = localStorage.getItem(USER_STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    // fallback
  }
  return { ...DEFAULT_USER };
}

let MOCK_USER = getStoredUser();

export const getUserProfile = async () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ ...MOCK_USER }), 200);
  });
};

export const updateUserProfileData = async (updatedFields) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      Object.assign(MOCK_USER, updatedFields);
      try {
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(MOCK_USER));
      } catch (e) {
        console.error(e);
      }
      resolve({ ...MOCK_USER });
    }, 300);
  });
};

export const uploadUserAvatar = async (file) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const mockNewUrl = URL.createObjectURL(file);
      MOCK_USER.profilePicture = mockNewUrl;
      try {
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(MOCK_USER));
      } catch (e) {
        console.error(e);
      }
      resolve({ profilePicture: mockNewUrl });
    }, 500);
  });
};