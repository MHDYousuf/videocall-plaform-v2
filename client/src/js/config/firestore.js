/* eslint-disable linebreak-style */
/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable comma-dangle */
/* eslint-disable no-confusing-arrow */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable quotes */
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/database";

const app = firebase.initializeApp({
  apiKey: "AIzaSyCLjyUNjk2KKlfng0ePiNo1AP1GBFPQcgM",
  authDomain: "videocall-platform.firebaseapp.com",
  databaseURL: "https://videocall-platform.firebaseio.com",
  projectId: "videocall-platform",
  storageBucket: "videocall-platform.appspot.com",
  messagingSenderId: "671363562277",
  appId: "1:671363562277:web:a168e1dcd32bdda234f8cc",
  measurementId: "G-KFD03P9ST2",
});

export const db = app.firestore();

export default app;
