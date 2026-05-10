import { collection, addDoc, query, where, getDocs, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';

export const createBooking = async (bookingData) => {
  try {
    const docRef = await addDoc(collection(db, 'bookings'), {
      ...bookingData,
      bookingStatus: 'PENDING',
      createdAt: new Date().toISOString()
    });
    return docRef.id;
  } catch (error) {
    throw error;
  }
};

export const getUserBookings = async (userId) => {
  try {
    const q = query(collection(db, 'bookings'), where('userId', '==', userId));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ bookingId: doc.id, ...doc.data() }));
  } catch (error) {
    throw error;
  }
};

export const updateBookingStatus = async (bookingId, status) => {
  try {
    const bookingRef = doc(db, 'bookings', bookingId);
    await updateDoc(bookingRef, { bookingStatus: status });
  } catch (error) {
    throw error;
  }
};

export const subscribeToHostBookings = (hostPropertyIds, callback) => {
  if (!hostPropertyIds || hostPropertyIds.length === 0) return () => {};
  
  const q = query(collection(db, 'bookings'), where('propertyId', 'in', hostPropertyIds));
  return onSnapshot(q, (snapshot) => {
    const bookings = snapshot.docs.map(doc => ({ bookingId: doc.id, ...doc.data() }));
    callback(bookings);
  });
};
