import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

export const firebaseConfig = {
  apiKey: 'AIzaSyDGzbmuSjF9kIwh1YVe93KA2mdNZfYaXqk',
  authDomain: 'kanata-production.firebaseapp.com',
  databaseURL: 'https://kanata-production.firebaseio.com',
  projectId: 'kanata-production',
  storageBucket: 'kanata-production.appspot.com',
  messagingSenderId: '991649640183',
  appId: '1:991649640183:web:ea404333a1acd4e100edf2',
  measurementId: 'G-K1QFNEWD7B',
};

firebase.initializeApp(firebaseConfig);

//Sayfa acik oldugu surece authorized ediyor
// firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);

export default firebase;
