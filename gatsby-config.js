/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */

require('dotenv').config();
// require("dotenv").config({
//   path: `.env`,
// })
module.exports = {
  pathPrefix: `/`,
  /* Your site config here */
  plugins: [
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,  
    {
      resolve: "gatsby-plugin-firebase",
      options: {
        credentials: {
          apiKey: process.env.FIREBASE_API_KEY,
          authDomain: process.env.FIREBASE_AUTH_DOMAIN,
          // databaseURL: process.env.FIREBASE_DATABASE_URL,
          projectId: process.env.FIREBASE_PROJECT_ID,
          storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
          messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
          appId: process.env.FIREBASE_APP_ID,
          // apiKey: "AIzaSyBllQQ4LinWTpPLTSWet_vJMTBrHQtEink",
          // authDomain: "keywe-app.firebaseapp.com",
          // // databaseURL: process.env.FIREBASE_DATABASE_URL,
          // projectId: "keywe-app",
          // storageBucket: "keywe-app.appspot.com",
          // messagingSenderId: "781921767901",
          // appId: "1:781921767901:web:efb0c0d7265b3863082634",
          // measurementId: "G-E78RFT9Q2J"
        },
        features: {
          auth: true,
          database: false,
          firestore: false,
          storage: false,
          messaging: true,
          functions: false,
          performance: true,
        },
      }
    },
    // {
    //   resolve: `gatsby-plugin-firebase-messaging`,
    //   options: {
    //     //required unless removeFirebaseServiceWorker == true
    //     config: { 
    //       apiKey: process.env.FIREBASE_API_KEY,
    //       appId: process.env.FIREBASE_APP_ID,
    //       messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    //       projectId: process.env.FIREBASE_PROJECT_ID,
    //     },
    //     //optionally override the firebase version used by the service worker
    //     firebaseVersion: '7.24.0', //e.g., '8.1.1'
    //     //optionally disables development service worker
    //     disableDevelopment: false, 
    //     //optionally tells plugin to help unregistering/removing service worker
    //     removeFirebaseServiceWorker: false,
    //   },
    // },
  ],
}
