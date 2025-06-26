import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDAZ3Z--CKixXAYOpO9e9etAEur3_7Q4SU",
  authDomain: "drivingschoolsite-3dfe8.firebaseapp.com",
  projectId: "drivingschoolsite-3dfe8",
  storageBucket: "drivingschoolsite-3dfe8.firebasestorage.app",
  messagingSenderId: "883566072406",
  appId: "1:883566072406:web:b890c8d29cb177931621f7",
  measurementId: "G-MCVZ4HBBR5"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);