import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyAJ6VTxQo8ArckaJpsL98jBsQeNfnZ_duM",
  authDomain: "ai-companion-1664a.firebaseapp.com",
  projectId: "ai-companion-1664a",
  storageBucket: "ai-companion-1664a.firebasestorage.app",
  messagingSenderId: "934235352997",
  appId: "1:934235352997:web:f429c23697be486435024c",
  measurementId: "G-PZK9GZCL2Z",
  // iOS config
  iosClientId: "934235352997-2detv51i6sg0njugq9tunbqmkn1luhvo.apps.googleusercontent.com",
  iosBundleId: "com.companion.ai"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Initialize Analytics only in web environment
let analytics = null;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}
export { analytics };

export default app;