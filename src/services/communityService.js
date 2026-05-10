import { collection, addDoc, query, orderBy, onSnapshot, doc, updateDoc, increment } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';

export const createPost = async (postData) => {
  try {
    const docRef = await addDoc(collection(db, 'communityPosts'), {
      ...postData,
      likes: 0,
      createdAt: new Date().toISOString()
    });
    return docRef.id;
  } catch (error) {
    console.warn('[communityService] createPost failed:', error.message);
    throw error;
  }
};

export const subscribeToPosts = (callback) => {
  try {
    const q = query(collection(db, 'communityPosts'), orderBy('createdAt', 'desc'));
    return onSnapshot(q,
      (snapshot) => {
        const posts = snapshot.docs.map(d => ({ postId: d.id, ...d.data() }));
        callback(posts);
      },
      (error) => {
        console.warn('[communityService] subscribeToPosts error (DB may not be enabled):', error.message);
        callback([]);
      }
    );
  } catch (e) {
    console.warn('[communityService] subscribeToPosts setup failed:', e.message);
    callback([]);
    return () => {};
  }
};

export const likePost = async (postId) => {
  try {
    const postRef = doc(db, 'communityPosts', postId);
    await updateDoc(postRef, { likes: increment(1) });
  } catch (error) {
    console.warn('[communityService] likePost failed:', error.message);
  }
};
