import firebase from 'firebase/app';
import 'firebase/storage';

 var firebaseConfig = {
    apiKey: "AIzaSyBYiS27RlqCO3YuciSqYmDtOyl9pXmP7Rc",
    authDomain: "prepare-730d1.firebaseapp.com",
    databaseURL: "https://prepare-730d1.firebaseio.com",
    projectId: "prepare-730d1",
    storageBucket: "prepare-730d1.appspot.com",
    messagingSenderId: "258115722630",
    appId: "1:258115722630:web:d73517c87b59a1c87ea007",
    measurementId: "G-MG574W44JZ"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
//analytics is optional for this tutoral 
//   firebase.analytics();


  const storage = firebase.storage()
  export  {
   storage, firebase as default
 }