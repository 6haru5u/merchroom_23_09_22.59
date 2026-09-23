// src/context/AccountContext.jsx
import { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { getUserProfile, updateUserProfileData, uploadUserAvatar } from '../data/user';
import { getMyOrders, subscribeToMyOrderEvents } from '../api/orders.api';

const AccountContext = createContext(null);

export const AccountProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadOrders = useCallback(async () => {
    const response = await getMyOrders();
    setOrders(Array.isArray(response.orders) ? response.orders : []);
  }, []);

  useEffect(() => {
    let isMounted = true;
    async function loadAccountData() {
      try {
        const [userData] = await Promise.all([
          getUserProfile(),
        ]);
        const response = await getMyOrders();
        if (isMounted) {
          setProfile(userData);
          setOrders(Array.isArray(response.orders) ? response.orders : []);
        }
      } catch (err) {
        console.error('Failed to load account context data:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    loadAccountData();
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const unsubscribe = subscribeToMyOrderEvents(() => loadOrders().catch(() => {}));
    const fallbackPoll = window.setInterval(() => loadOrders().catch(() => {}), 15000);
    return () => {
      unsubscribe();
      window.clearInterval(fallbackPoll);
    };
  }, [loadOrders]);

  const updateProfile = async (fields) => {
    const updated = await updateUserProfileData(fields);
    setProfile(updated);
    return updated;
  };

  const uploadAvatar = async (file) => {
    const res = await uploadUserAvatar(file);
    setProfile((prev) => ({ ...prev, profilePicture: res.profilePicture }));
    return res.profilePicture;
  };

  const orderCount = useMemo(() => orders.length, [orders]);

  const totalSpent = useMemo(() => {
    return orders
      .filter((order) => order.status === 'delivered')
      .reduce((sum, order) => sum + order.totalAmount, 0);
  }, [orders]);

  return (
    <AccountContext.Provider
      value={{
        profile,
        orders,
        loading,
        updateProfile,
        uploadAvatar,
        orderCount,
        totalSpent,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAccount = () => {
  const context = useContext(AccountContext);
  if (!context) {
    throw new Error('useAccount must be used within an AccountProvider');
  }
  return context;
};
