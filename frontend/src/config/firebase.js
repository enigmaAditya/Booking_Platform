import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAJSgqZE1EteO049z7jT7YN0SOAUGk3Nds",
  authDomain: "booking-platform-c7fea.firebaseapp.com",
  projectId: "booking-platform-c7fea",
  storageBucket: "booking-platform-c7fea.firebasestorage.app",
  messagingSenderId: "578504626643",
  appId: "1:578504626643:web:e051de109e2ee772c9df26"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
