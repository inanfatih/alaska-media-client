import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

export const firebaseConfig = {
  apiKey: "AIzaSyBD5BQpfgGCcIi2Ko_2OQcZqbDT3DipFWE",
  authDomain: "dream-pictures-ca.firebaseapp.com",
  projectId: "dream-pictures-ca",
  databaseURL: 'https://dream-picture-ca.firebaseio.com',
  storageBucket: "dream-pictures-ca.appspot.com",
  messagingSenderId: "102893524611",
  appId: "1:102893524611:web:6f3b7f33e02f89e490adb6",
  measurementId: "G-GB7S4EKXGH" 
};

firebase.initializeApp(firebaseConfig);

//Sayfa acik oldugu surece authorized ediyor
// firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);

export default firebase;
