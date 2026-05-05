"use client";

import { FirebaseApp, getApp, getApps, initializeApp } from "firebase/app";
import { Auth, getAuth, GoogleAuthProvider } from "firebase/auth";

type ClientFirebaseConfig = {
  apiKey: string;
  authDomain: string;
  projectId: string;
  appId: string;
};

function getClientFirebaseConfig(): ClientFirebaseConfig {
  const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
  const authDomain = process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN;
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  const appId = process.env.NEXT_PUBLIC_FIREBASE_APP_ID;

  if (!apiKey) {
    throw new Error("Missing required public Firebase environment variable: NEXT_PUBLIC_FIREBASE_API_KEY");
  }
  if (!authDomain) {
    throw new Error("Missing required public Firebase environment variable: NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN");
  }
  if (!projectId) {
    throw new Error("Missing required public Firebase environment variable: NEXT_PUBLIC_FIREBASE_PROJECT_ID");
  }
  if (!appId) {
    throw new Error("Missing required public Firebase environment variable: NEXT_PUBLIC_FIREBASE_APP_ID");
  }

  return {
    apiKey,
    authDomain,
    projectId,
    appId,
  };
}

function getFirebaseApp(): FirebaseApp {
  if (getApps().length > 0) return getApp();
  return initializeApp(getClientFirebaseConfig());
}

export function getFirebaseAuth(): Auth {
  return getAuth(getFirebaseApp());
}

export const googleAuthProvider = new GoogleAuthProvider();
