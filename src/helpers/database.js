import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDyHCWULdSzwQx3S3XfziVwSk8uwtibJ6E",
  authDomain: "reactcrudapp-e6877.firebaseapp.com",
  projectId: "reactcrudapp-e6877",
  storageBucket: "reactcrudapp-e6877.appspot.com",
  messagingSenderId: "1003866181165",
  appId: "1:1003866181165:web:0ca883f0376de3a428f2a4"
};

// Initialize Firebase
const fire = initializeApp(firebaseConfig);

export default fire;