import React, { useEffect, useState } from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

import authFirebase from "./firebaseConfig";

// Configure FirebaseUI.
const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'popup',
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    "google.com",
      "password",
  ],
  callbacks: {
    // Avoid redirects after sign-in.
    signInSuccessWithAuthResult: () => false,
  },
};

function SignInScreen() {
  const [isSignedIn, setIsSignedIn] = useState(false); // Local signed-in state.

  // Listen to the Firebase Auth state and set the local state.
  useEffect(() => {
    const unregisterAuthObserver = authFirebase.onAuthStateChanged((user: any) => {
      setIsSignedIn(!!user);
    });
    return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
  }, []);

  if (!isSignedIn) {
    return (
      <div>
        <h1>My App</h1>
        <p>Please sign-in:</p>
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={authFirebase} />
      </div>
    );
  }
  // @ts-ignore
  return (
    <div>
      <h1>My App</h1>
      <p>Welcome {authFirebase.currentUser != null ? authFirebase.currentUser.displayName : ""}! You are now signed-in!</p>
      <a onClick={() => authFirebase.signOut()}>Sign-out</a>
    </div>
  );
}

export default SignInScreen;