import { useState, useEffect } from "react";
import "firebase/auth";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signInAnonymously,
} from "firebase/auth";

import "./App.css";

function App() {
  const [auth, setAuth] = useState();
  const [provider, setProvider] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  useEffect(() => {
    const app = initializeApp(firebaseConfig);
    const provider = new GoogleAuthProvider();
    setProvider(provider);
    setAuth(getAuth(app));
  }, []);

  const firebaseConfig = {
    apiKey: import.meta.env.VITE_APIKEY,
    authDomain: import.meta.env.VITE_AUTHDOMAIN,
    projectId: import.meta.env.VITE_PROJECTID,
    storageBucket: import.meta.env.VITE_STORAGEBUCKET,
    messagingSenderId: import.meta.env.VITE_SENDERID,
    appId: import.meta.env.VITE_APPID,
    measurementId: import.meta.env.VITE_MEASUREMENTID,
  };

  const newUser = () => {
    console.log(email, password);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error);
        // ..
      });
  };

  const anonymousSignIn = () => {
    signInAnonymously(auth)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ...
      });
  };

  const googleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log(user);
        console.log(token);
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  const handleEmail = (e) => {
    console.log(e.target.value);
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    console.log(e.target.value);
    setPassword(e.target.value);
  };
  return (
    <div className="bg-black w-screen h-screen py-12 px-8">
      <div className="flex flex-col items-center">
        <h1 className="font-bold text-slate-50 text-3xl mb-4">Email Sign Up</h1>
        <input
          placeholder="Email"
          className="mb-4 bg-black outline-gray-700 outline py-2 px-2 min-w-[460px] text-slate-50"
          onChange={(e) => handleEmail(e)}
        />
        <input
          placeholder="password"
          type="password"
          className="mb-4 bg-black outline-gray-700 outline py-2 px-2 min-w-[460px] text-slate-50"
          onChange={(e) => handlePassword(e)}
        />
        <button
          className="bg-gray-300 px-4 py-2 rounded-full"
          onClick={newUser}
        >
          Sign Up
        </button>
      </div>
      <div className="flex flex-col mt-4 items-center">
        <button
          className="bg-gray-300 px-4 py-2 rounded-full"
          onClick={googleSignIn}
        >
          Google Sign In
        </button>
        
      </div>
      <div className="flex flex-col mt-4 items-center">
        <button
          className="bg-gray-300 px-4 py-2 rounded-full"
          onClick={anonymousSignIn}
        >
          Google Sign In
        </button>
    </div>
  );
}

export default App;
