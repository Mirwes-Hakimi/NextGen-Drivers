import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBJN8O9ytaBwJbSuMplH5S_MxmgdrEt_xE",
  authDomain: "best-driving-school-e6149.firebaseapp.com",
  projectId: "best-driving-school-e6149",
  storageBucket: "best-driving-school-e6149.firebasestorage.app",
  messagingSenderId: "125616069253",
  appId: "1:125616069253:web:cfce4095eb827167dde7ec",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);