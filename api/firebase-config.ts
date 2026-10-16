import type { Request, Response } from 'express';

/**
 * GET /api/firebase-config
 *
 * Securely returns Firebase client configuration, injecting the secret
 * FIREBASE_API_KEY and GA measurement ID from environment variables at runtime.
 */
export async function handleFirebaseConfig(_req: Request, res: Response) {
  res.setHeader('Content-Type', 'application/json');

  const apiKey =
    process.env.FIREBASE_API_KEY ||
    process.env.VITE_FIREBASE_API_KEY ||
    '';

  const measurementId =
    process.env.VITE_GA_MEASUREMENT_ID ||
    process.env.GA_MEASUREMENT_ID ||
    '';

  return res.status(200).json({
    projectId: process.env.FIREBASE_PROJECT_ID,
    appId: process.env.FIREBASE_APP_ID,
    apiKey,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    measurementId,
    oAuthClientId: process.env.FIREBASE_OAUTH_CLIENT_ID,
  });
}

export default handleFirebaseConfig;
