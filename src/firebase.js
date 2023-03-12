import { initializeApp } from "firebase/app";
import {getStorage} from 'firebase/storage'
import { getFirestore } from "firebase/firestore";



const firebaseConfig = {
    apiKey: process.env.REACT_APP_PIZZA,
    authDomain: process.env.REACT_APP_DOM,
    projectId: process.env.REACT_APP_PROJECT_ID ,
    storageBucket: process.env.REACT_APP_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESS_SEN_ID,
    appId: process.env.REACT_APP_APP_ID
  };

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app)