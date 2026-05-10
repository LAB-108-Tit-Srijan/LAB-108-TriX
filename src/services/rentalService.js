import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  query, 
  where, 
  onSnapshot,
  getDocs,
  serverTimestamp 
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../firebase/firebaseConfig';

const RENTALS_COLLECTION = 'rentals';

export const subscribeToHostRentals = (hostId, callback) => {
  const q = query(
    collection(db, RENTALS_COLLECTION),
    where('hostId', '==', hostId)
  );

  return onSnapshot(q, (snapshot) => {
    const rentals = snapshot.docs.map(doc => ({
      rentalId: doc.id,
      ...doc.data()
    }));
    callback(rentals);
  });
};

export const uploadRentalImage = async (file, hostId) => {
  if (!file) return null;
  const storageRef = ref(storage, `rentals/${hostId}/${Date.now()}_${file.name}`);
  const snapshot = await uploadBytes(storageRef, file);
  return await getDownloadURL(snapshot.ref);
};

export const addRental = async (rentalData) => {
  try {
    const docRef = await addDoc(collection(db, RENTALS_COLLECTION), {
      ...rentalData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    return docRef.id;
  } catch (error) {
    console.error("Error adding rental: ", error);
    throw error;
  }
};


export const updateRental = async (rentalId, rentalData) => {
  try {
    const rentalRef = doc(db, RENTALS_COLLECTION, rentalId);
    await updateDoc(rentalRef, {
      ...rentalData,
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    console.error("Error updating rental: ", error);
    throw error;
  }
};

export const deleteRental = async (rentalId) => {
  try {
    const rentalRef = doc(db, RENTALS_COLLECTION, rentalId);
    await deleteDoc(rentalRef);
  } catch (error) {
    console.error("Error deleting rental: ", error);
    throw error;
  }
};

export const getRentalsByCategory = async (category) => {
  try {
    const q = category === 'All' 
      ? query(collection(db, RENTALS_COLLECTION))
      : query(collection(db, RENTALS_COLLECTION), where('category', '==', category));
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      rentalId: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error("Error fetching rentals: ", error);
    throw error;
  }
};
