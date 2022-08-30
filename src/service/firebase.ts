import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

import { getFirestore, FieldValue, increment } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import firebase from 'firebase/app';

import 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBHyVa-lOBHM9m1O6oCm7IxABOz6H91T1c',
  authDomain: 'mindnotev2.firebaseapp.com',
  projectId: 'mindnotev2',
  storageBucket: 'mindnotev2.appspot.com',
  messagingSenderId: '914913134285',
  appId: '1:914913134285:web:6ed16ce46c7a5850334b84',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const dbService = getFirestore(app);
export const incre = increment(1);
export const storage = getStorage(app);
