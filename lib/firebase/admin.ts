import "server-only";

import { App, cert, getApp, getApps, initializeApp } from "firebase-admin/app";
import { Auth, getAuth } from "firebase-admin/auth";

type AdminConfig = {
  projectId: string;
  clientEmail: string;
  privateKey: string;
};

function readRequiredServerEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required server Firebase environment variable: ${name}`);
  }
  return value;
}

function getAdminConfig(): AdminConfig {
  return {
    projectId: readRequiredServerEnv("FIREBASE_PROJECT_ID"),
    clientEmail: readRequiredServerEnv("FIREBASE_CLIENT_EMAIL"),
    privateKey: readRequiredServerEnv("FIREBASE_PRIVATE_KEY").replace(/\\n/g, "\n"),
  };
}

function getFirebaseAdminApp(): App {
  if (getApps().length > 0) return getApp();

  const config = getAdminConfig();
  return initializeApp({
    credential: cert({
      projectId: config.projectId,
      clientEmail: config.clientEmail,
      privateKey: config.privateKey,
    }),
  });
}

export function getFirebaseAdminAuth(): Auth {
  return getAuth(getFirebaseAdminApp());
}
