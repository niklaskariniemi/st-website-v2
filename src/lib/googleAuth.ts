import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  User,
  Auth,
} from 'firebase/auth';
import baseFirebaseConfig from '../../firebase-applet-config.json';

export const SCOPES = [
  'https://www.googleapis.com/auth/spreadsheets',
  'https://www.googleapis.com/auth/drive.file',
];

let appInstance: FirebaseApp | null = null;
let authInstance: Auth | null = null;
let providerInstance: GoogleAuthProvider | null = null;
let initPromise: Promise<Auth> | null = null;

let isSigningIn = false;
let cachedAccessToken: string | null = null;

/**
 * Ensures Firebase is initialized using the secret API key fetched securely
 * from the server-side environment endpoint /api/firebase-config, or client env.
 */
async function getAuthClient(): Promise<{ auth: Auth; provider: GoogleAuthProvider }> {
  if (authInstance && providerInstance) {
    return { auth: authInstance, provider: providerInstance };
  }

  if (!initPromise) {
    initPromise = (async () => {
      let finalConfig = { ...baseFirebaseConfig };

      // If apiKey is not in the client bundle, fetch from the server endpoint
      if (!finalConfig.apiKey) {
        try {
          const res = await fetch('/api/firebase-config');
          if (res.ok) {
            const serverConfig = await res.json();
            finalConfig = { ...finalConfig, ...serverConfig };
          }
        } catch (err) {
          console.warn('Could not retrieve server-side Firebase config:', err);
        }
      }

      // Check VITE env as additional client-side override if defined
      if (!finalConfig.apiKey && (import.meta as any).env?.VITE_FIREBASE_API_KEY) {
        finalConfig.apiKey = (import.meta as any).env.VITE_FIREBASE_API_KEY;
      }

      if (getApps().length === 0) {
        appInstance = initializeApp(finalConfig);
      } else {
        appInstance = getApp();
      }

      authInstance = getAuth(appInstance);
      providerInstance = new GoogleAuthProvider();
      SCOPES.forEach((scope) => providerInstance!.addScope(scope));

      return authInstance;
    })();
  }

  await initPromise;
  return { auth: authInstance!, provider: providerInstance! };
}

export const initAuth = (
  onAuthSuccess?: (user: User, token: string) => void,
  onAuthFailure?: () => void
) => {
  let unsubscribe: (() => void) | null = null;

  getAuthClient()
    .then(({ auth }) => {
      unsubscribe = onAuthStateChanged(auth, async (user: User | null) => {
        if (user) {
          if (cachedAccessToken) {
            if (onAuthSuccess) onAuthSuccess(user, cachedAccessToken);
          } else if (!isSigningIn) {
            cachedAccessToken = null;
            if (onAuthFailure) onAuthFailure();
          }
        } else {
          cachedAccessToken = null;
          if (onAuthFailure) onAuthFailure();
        }
      });
    })
    .catch((err) => {
      console.warn('initAuth initialization error:', err);
      if (onAuthFailure) onAuthFailure();
    });

  return () => {
    if (unsubscribe) unsubscribe();
  };
};

export const googleSignIn = async (): Promise<{ user: User; accessToken: string } | null> => {
  try {
    isSigningIn = true;
    const { auth, provider } = await getAuthClient();
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    if (!credential?.accessToken) {
      throw new Error('Failed to obtain Google OAuth access token');
    }

    cachedAccessToken = credential.accessToken;
    return { user: result.user, accessToken: cachedAccessToken };
  } catch (error: any) {
    console.error('Google Sign-In Error:', error);
    throw error;
  } finally {
    isSigningIn = false;
  }
};

export const getAccessToken = async (): Promise<string | null> => {
  return cachedAccessToken;
};

export const setCachedAccessToken = (token: string | null) => {
  cachedAccessToken = token;
};

export const logout = async () => {
  try {
    const { auth } = await getAuthClient();
    await auth.signOut();
  } catch (err) {
    console.warn('Logout error:', err);
  } finally {
    cachedAccessToken = null;
  }
};
