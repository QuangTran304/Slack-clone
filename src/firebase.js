import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDOlC57ccDf_JPmfi5W_3hj3jllTy7bcxs',
  authDomain: 'slack-clone-a5b2a.firebaseapp.com',
  projectId: 'slack-clone-a5b2a',
  storageBucket: 'slack-clone-a5b2a.appspot.com',
  messagingSenderId: '340064235602',
  appId: '1:340064235602:web:1a5badfc8aa3babe64af8b',
};

initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth();

export { auth, db };
