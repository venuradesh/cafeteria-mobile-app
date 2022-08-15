import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
    apiKey: "AIzaSyD2WA0DbmZDe6-i8RstD9YQcRh6xB-0Yb8",

    authDomain: "cafeteria-mobile-app.firebaseapp.com",
  
    projectId: "cafeteria-mobile-app",
  
    storageBucket: "cafeteria-mobile-app.appspot.com",
  
    messagingSenderId: "334531816276",
  
    appId: "1:334531816276:web:37c29bd245e9ffc2e476c1"
  
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export { db }
