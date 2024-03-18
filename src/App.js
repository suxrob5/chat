import React, { useState } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

import "./App.css";
import SignIn from "./components/SigIn";
import ChatRoom from "./components/ChatRoom";
import Profile from "./components/Profile";

firebase.initializeApp({
  apiKey: "AIzaSyC33VVQMylEyoZPPvn6sE5IW0J54xf5eDg",
  authDomain: "chat-ae5df.firebaseapp.com",
  projectId: "chat-ae5df",
  storageBucket: "chat-ae5df.appspot.com",
  messagingSenderId: "785362854015",
  appId: "1:785362854015:web:63b9a9f3645c0677df9f4a",
  measurementId: "G-B9LVJMCPRY",
});

const auth = firebase.auth();
const firestore = firebase.firestore();

function App() {
  const [user] = useAuthState(auth);
  return (
    <div className="App">
      <header className="App-header">
        <SignOut />
        <Profile/>
      </header>
      <section>
        {user ? (
          <ChatRoom
            auth={auth}
            firebase={firebase}
            useState={useState}
            firestore={firestore}
            useCollectionData={useCollectionData}
          />
        ) : (
          <SignIn firebase={firebase} auth={auth} />
        )}
      </section>
    </div>
  );
}

const SignOut = () => {
  return (
    auth.currentUser && (
      <button
        className=" rounded-xl font-[600] bg-blue-500 hover:bg-opacity-90"
        onClick={() => {
          // eslint-disable-next-line no-restricted-globals
          const result = confirm("Are you sure?");
          if (result) {
            auth.signOut();
          }
        }}
      >
        Sign Out
      </button>
    )
  );
};

export default App;


