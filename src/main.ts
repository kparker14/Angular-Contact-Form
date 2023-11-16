import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

  // Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBrAj5kLhpp_Wgqyr7Q7td_e2az0z9LD2c",
  authDomain: "contact-form-44061.firebaseapp.com",
  projectId: "contact-form-44061",
  storageBucket: "contact-form-44061.appspot.com",
  messagingSenderId: "809702907329",
  appId: "1:809702907329:web:d3ed5d639e7533411ea340",
  measurementId: "G-GTPHWK2R17"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);