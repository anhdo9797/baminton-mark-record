import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

firebase.initializeApp(FIREBASE_CONFIG);

export const storage = firebase.storage();
export const auth = firebase.auth();
export const firestore = firebase.firestore();

export default firebase;
