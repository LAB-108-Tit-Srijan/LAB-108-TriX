import { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

// Demo users for quick hackathon demo — NO Firebase needed
const DEMO_USERS = {
  USER: {
    uid: 'demo_user_001',
    email: 'traveler@tripov.com',
    displayName: 'Arjun Mehta',
    photoURL: 'https://i.pravatar.cc/150?img=11',
    isDemo: true,
  },
  HOST: {
    uid: 'demo_host_001',
    email: 'host@tripov.com',
    displayName: 'Priya Sharma',
    photoURL: 'https://i.pravatar.cc/150?img=5',
    isDemo: true,
  }
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if a demo session is active
    const demoRole = sessionStorage.getItem('tripov_demo_role');
    if (demoRole && DEMO_USERS[demoRole]) {
      setCurrentUser(DEMO_USERS[demoRole]);
      setUserRole(demoRole);
      setLoading(false);
      return;
    }

    // Real Firebase auth — wrap in try/catch so Firestore errors don't crash the app
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        try {
          // Dynamic import to avoid crashing if Firestore is not yet enabled
          const { getUserRole } = await import('../firebase/auth');
          const role = await getUserRole(user.uid);
          setUserRole(role || 'USER');
        } catch (e) {
          console.warn('Could not fetch user role from Firestore:', e.message);
          setUserRole('USER'); // fallback
        }
      } else {
        setUserRole(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // Demo login — sets session and state instantly
  const demoLogin = (role) => {
    const demoUser = DEMO_USERS[role];
    if (!demoUser) return;
    sessionStorage.setItem('tripov_demo_role', role);
    setCurrentUser(demoUser);
    setUserRole(role);
  };

  // Demo logout
  const demoLogout = () => {
    sessionStorage.removeItem('tripov_demo_role');
    setCurrentUser(null);
    setUserRole(null);
  };

  const value = {
    currentUser,
    userRole,
    loading,
    demoLogin,
    demoLogout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
