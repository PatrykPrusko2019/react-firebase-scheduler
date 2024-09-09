import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBKhocIQs0VR896YPyN5aHAaZpRbupYKNg",
    authDomain: "react-scheduler-app-abbad.firebaseapp.com",
    projectId: "react-scheduler-app-abbad",
    storageBucket: "react-scheduler-app-abbad.appspot.com",
    messagingSenderId: "1049333787439",
    appId: "1:1049333787439:web:54c3c341ebcc1b6979cfda",
    measurementId: "G-PJ897T7G2V"
  };

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };