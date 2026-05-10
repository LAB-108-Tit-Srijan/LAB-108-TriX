import { collection, doc, addDoc, getDoc, getDocs, updateDoc, deleteDoc, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';

const safeQuery = async (fn) => {
  try {
    return await fn();
  } catch (e) {
    console.warn('[propertyService] Firestore error (DB may not be enabled yet):', e.message);
    return [];
  }
};

export const addProperty = async (propertyData) => {
  try {
    const docRef = await addDoc(collection(db, 'properties'), {
      ...propertyData,
      createdAt: new Date().toISOString()
    });
    return docRef.id;
  } catch (error) {
    console.warn('[propertyService] addProperty failed:', error.message);
    throw error;
  }
};

export const getProperties = async () => {
  return safeQuery(async () => {
    const q = query(collection(db, 'properties'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(d => ({ propertyId: d.id, ...d.data() }));
  });
};

export const getHostProperties = async (hostId) => {
  return safeQuery(async () => {
    const q = query(collection(db, 'properties'), where('hostId', '==', hostId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(d => ({ propertyId: d.id, ...d.data() }));
  });
};

export const subscribeToProperties = (callback) => {
  try {
    const q = query(collection(db, 'properties'));
    return onSnapshot(q,
      (snapshot) => {
        const properties = snapshot.docs.map(d => ({ propertyId: d.id, ...d.data() }));
        callback(properties);
      },
      (error) => {
        console.warn('[propertyService] subscribeToProperties error (DB may not be enabled):', error.message);
        callback([]); // return empty array so UI doesn't crash
      }
    );
  } catch (e) {
    console.warn('[propertyService] subscribeToProperties setup failed:', e.message);
    callback([]);
    return () => {};
  }
};

export const subscribeToHostProperties = (hostId, callback) => {
  if (!hostId) return () => {};
  try {
    const q = query(collection(db, 'properties'), where('hostId', '==', hostId));
    return onSnapshot(q,
      (snapshot) => {
        const properties = snapshot.docs.map(d => ({ propertyId: d.id, ...d.data() }));
        callback(properties);
      },
      (error) => {
        console.warn('[propertyService] subscribeToHostProperties error:', error.message);
        callback([]);
      }
    );
  } catch (e) {
    console.warn('[propertyService] subscribeToHostProperties setup failed:', e.message);
    callback([]);
    return () => {};
  }
};
