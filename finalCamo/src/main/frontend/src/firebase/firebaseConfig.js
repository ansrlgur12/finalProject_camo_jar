import firebase from "firebase/compat/app";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAbESvMrOUkE78Hdrx8ubWNzAYIowfUB_Q",
  authDomain: "camo-123a3.firebaseapp.com",
  projectId: "camo-123a3",
  storageBucket: "camo-123a3.appspot.com",
  messagingSenderId: "44835485207",
  appId: "1:44835485207:web:d5d9664da084f097130e52",
  measurementId: "G-XKVKHXE0QX"
};

 firebase.initializeApp(firebaseConfig);
  export const storage = firebase.storage();