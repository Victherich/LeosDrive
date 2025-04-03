// import { initializeApp } from "firebase/app";
// import { getDatabase, ref, set, push, onValue } from "firebase/database";

// const firebaseConfig = {
//   apiKey: "YOUR_API_KEY",
//   authDomain: "YOUR_AUTH_DOMAIN",
//   databaseURL: "YOUR_DATABASE_URL",
//   projectId: "YOUR_PROJECT_ID",
//   storageBucket: "YOUR_STORAGE_BUCKET",
//   messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
//   appId: "YOUR_APP_ID"
// };

// const app = initializeApp(firebaseConfig);
// const database = getDatabase(app);

// export { database, ref, set, push, onValue };











// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyBrIZfr1i9WxlRB-lDH003Sq6VPNiqzE0U",
//   authDomain: "taxi1-app.firebaseapp.com",
//   databaseURL: "https://taxi1-app-default-rtdb.firebaseio.com",
//   projectId: "taxi1-app",
//   storageBucket: "taxi1-app.firebasestorage.app",
//   messagingSenderId: "822983844983",
//   appId: "1:822983844983:web:491814ac490e8296c11272",
//   measurementId: "G-H5DXC532NK"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);



import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBrIZfr1i9WxlRB-lDH003Sq6VPNiqzE0U",
  authDomain: "taxi1-app.firebaseapp.com",
  databaseURL: "https://taxi1-app-default-rtdb.firebaseio.com",
  projectId: "taxi1-app",
  storageBucket: "taxi1-app.appspot.com",
  messagingSenderId: "822983844983",
  appId: "1:822983844983:web:491814ac490e8296c11272",
  measurementId: "G-H5DXC532NK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app); // Get Realtime Database instance

export { database };
