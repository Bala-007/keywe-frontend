// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
    apiKey: "AIzaSyBllQQ4LinWTpPLTSWet_vJMTBrHQtEink",
    authDomain: "keywe-app.firebaseapp.com",
    // databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: "keywe-app",
    storageBucket: "keywe-app.appspot.com",
    messagingSenderId: "781921767901",
    appId: "1:781921767901:web:efb0c0d7265b3863082634",
    measurementId: "G-E78RFT9Q2J"
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();
