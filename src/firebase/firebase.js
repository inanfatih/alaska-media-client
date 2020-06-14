import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

export const firebaseConfig = {
  apiKey: 'AIzaSyCjG4fqorKT3uxwOknceTlpTE329WCfxkk',
  authDomain: 'alaska-media.firebaseapp.com',
  databaseURL: 'https://alaska-media.firebaseio.com',
  projectId: 'alaska-media',
  storageBucket: 'alaska-media.appspot.com',
  messagingSenderId: '528347917892',
  appId: '1:528347917892:web:a30d674e96a8ac1e3c5611',
  measurementId: 'G-3S0S7L7K0Z',
};

firebase.initializeApp(firebaseConfig);

//Sayfa acik oldugu surece authorized ediyor
// firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);

export default firebase;
