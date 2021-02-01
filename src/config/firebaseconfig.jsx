import app from 'firebase/app'
// import firebase from 'firebase'
var firebaseConfig = {
  apiKey: "AIzaSyCxYgvy4RF2c51vN-tHe8E3wACT0N0kx_o",
  authDomain: "fireappl-ea3f5.firebaseapp.com",
  databaseURL: "https://fireappl-ea3f5.firebaseio.com",
  projectId: "fireappl-ea3f5",
  storageBucket: "fireappl-ea3f5.appspot.com",
  messagingSenderId: "942013082829",
  appId: "1:942013082829:web:19c8c918e20bab46600d84",
  measurementId: "G-GF4Y2X68LG"
};

  // Initialize Firebase
  var fire=app.initializeApp(firebaseConfig);

  export default fire;
