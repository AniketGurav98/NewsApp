
// src/environments/environment.ts

export const environment = {
    production: false,
    apiUrl: 'http://localhost:3000',  // Your Node.js server URL
    vapidPublicKey:'BFsVH8U8RZuSbVbs-ZyN0O54QyZ289Puh--YVqDkGxOxyYl3YFwLCojNiac667mQRDLxQrjChFep_22XlVdPo8w',  // Replace with your actual VAPID public key

    useEmulators: true,  // Add this property

    firebaseConfig :{
      apiKey: "AIzaSyCXQHPWAyU_CTdKjTfrAakMElUTa8O7Vmk",
      authDomain: "abvnewsapp.firebaseapp.com",
      projectId: "abvnewsapp",
      storageBucket: "abvnewsapp.appspot.com",
      messagingSenderId: "1094274120060",
      appId: "1:1094274120060:web:be548fe5863852d4988cf9",
      measurementId: "G-WDDHQ4LQCX"
    }
  };
  