// Import the functions you need from the SDKs you need
const firebase = require("firebase/app");
const auth = require("firebase/auth");

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDfjkH0RspPPEb3OBQs0emN1yZgSb-LDrA",
  authDomain: "blue-ocean-b857a.firebaseapp.com",
  projectId: "blue-ocean-b857a",
  storageBucket: "blue-ocean-b857a.appspot.com",
  messagingSenderId: "226119114824",
  appId: "1:226119114824:web:2b3e396931470d5e8ef87d",
  measurementId: "${config.measurementId}",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export default { app };