import { collection, doc, addDoc, updateDoc, deleteDoc, query, where, onSnapshot, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../firebase/firebaseConfig';

// ─── PROPERTIES ────────────────────────────────────────────
export const addProperty = async (propertyData) => {
  const docRef = await addDoc(collection(db, 'properties'), {
    ...propertyData,
    status: 'active',
    bookings: 0,
    occupancyRate: 0,
    rating: 0,
    reviewCount: 0,
    createdAt: new Date().toISOString(),
  });
  return docRef.id;
};

export const updateProperty = async (propertyId, data) => {
  await updateDoc(doc(db, 'properties', propertyId), {
    ...data,
    updatedAt: new Date().toISOString(),
  });
};

export const deleteProperty = async (propertyId) => {
  await deleteDoc(doc(db, 'properties', propertyId));
};

export const subscribeToHostProperties = (hostId, callback) => {
  if (!hostId) { callback([]); return () => {}; }
  try {
    const q = query(collection(db, 'properties'), where('hostId', '==', hostId));
    return onSnapshot(q,
      (snap) => callback(snap.docs.map(d => ({ propertyId: d.id, ...d.data() }))),
      (err) => { console.warn('subscribeToHostProperties:', err.message); callback([]); }
    );
  } catch (e) { callback([]); return () => {}; }
};

export const subscribeToProperties = (callback) => {
  try {
    const q = query(collection(db, 'properties'), where('status', '==', 'active'));
    return onSnapshot(q,
      (snap) => callback(snap.docs.map(d => ({ propertyId: d.id, ...d.data() }))),
      (err) => { console.warn('subscribeToProperties:', err.message); callback([]); }
    );
  } catch (e) { callback([]); return () => {}; }
};

// ─── ROOMS ─────────────────────────────────────────────────
export const addRoom = async (propertyId, roomData) => {
  const docRef = await addDoc(collection(db, 'rooms'), {
    ...roomData,
    propertyId,
    createdAt: new Date().toISOString(),
  });
  return docRef.id;
};

export const updateRoom = async (roomId, data) => {
  await updateDoc(doc(db, 'rooms', roomId), data);
};

export const deleteRoom = async (roomId) => {
  await deleteDoc(doc(db, 'rooms', roomId));
};

export const subscribeToPropertyRooms = (propertyId, callback) => {
  if (!propertyId) { callback([]); return () => {}; }
  try {
    const q = query(collection(db, 'rooms'), where('propertyId', '==', propertyId));
    return onSnapshot(q,
      (snap) => callback(snap.docs.map(d => ({ roomId: d.id, ...d.data() }))),
      (err) => { console.warn('subscribeToPropertyRooms:', err.message); callback([]); }
    );
  } catch (e) { callback([]); return () => {}; }
};

// ─── IMAGE UPLOAD ───────────────────────────────────────────
export const uploadPropertyImage = async (file, propertyId) => {
  try {
    const storageRef = ref(storage, `properties/${propertyId}/${Date.now()}_${file.name}`);
    const snapshot = await uploadBytes(storageRef, file);
    return await getDownloadURL(snapshot.ref);
  } catch (e) {
    console.warn('Image upload failed:', e.message);
    return null;
  }
};
