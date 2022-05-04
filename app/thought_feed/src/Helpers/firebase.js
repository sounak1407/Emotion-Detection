import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"

//firestore setup and keys

const firebaseConfig = {
  apiKey: "AIzaSyCGhzzNQZb5OhxW7SipkU8ZQs-RlLXX3V4",
  authDomain: "thoughtfeed-6da4a.firebaseapp.com",
  projectId: "thoughtfeed-6da4a",
  storageBucket: "thoughtfeed-6da4a.appspot.com",
  messagingSenderId: "1055394170203",
  appId: "1:1055394170203:web:cb5b4afd49eb418c7d467e"
};

const firebaseApp = initializeApp(firebaseConfig);

export default getFirestore();