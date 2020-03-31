import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const firebase = require('firebase');
require('firebase/firestore');

firebase.initializeApp({
  apiKey: "AIzaSyCv_hyofsLwic95zwY1w0SuuZXJUYKrv1Q",
  authDomain: "evernoteclone-62cb3.firebaseapp.com",
  databaseURL: "https://evernoteclone-62cb3.firebaseio.com",
  projectId: "evernoteclone-62cb3",
  storageBucket: "evernoteclone-62cb3.appspot.com",
  messagingSenderId: "640087558289",
  appId: "1:640087558289:web:f91da8c1576da4c481d730",
  measurementId: "G-FKSDRHKR62"
});

ReactDOM.render(<App />, document.getElementById('evernote-container'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
