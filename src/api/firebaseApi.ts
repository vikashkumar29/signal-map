// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCYWcJm7dVn620iavyD0-I5HIWZcLpQTVM',
  authDomain: 'signal-map-549f9.firebaseapp.com',
  projectId: 'signal-map-549f9',
  storageBucket: 'signal-map-549f9.firebasestorage.app',
  messagingSenderId: '1062740783947',
  appId: '1:1062740783947:web:5f9553b74539348d8c6ece',
  measurementId: 'G-1ZNX1BWDY7'
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const firestore = getFirestore(app);