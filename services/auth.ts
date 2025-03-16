import { 
  signOut as firebaseSignOut,
  GoogleAuthProvider,
  signInWithCredential
} from 'firebase/auth';
import { auth } from '@/lib/firebase';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';

WebBrowser.maybeCompleteAuthSession();

export const useGoogleAuth = () => {
  const [request, response, promptAsync] = Google.useAuthRequest({
    iosClientId: '1:934235352997:android:ab8f28e5515055b635024c',
    androidClientId: "1:934235352997:android:ab8f28e5515055b635024c",
    webClientId: "934235352997-l7hejtsh0emdibtqtcsedltisqmmjgn1.apps.googleusercontent.com", // Updated with the correct web client ID
  });

  return {
    request,
    response,
    promptAsync,
  };
};

export const handleGoogleSignIn = async (response: any) => {
  try {
    const { id_token } = response.params;
    const credential = GoogleAuthProvider.credential(id_token);
    const userCredential = await signInWithCredential(auth, credential);
    return userCredential.user;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const signOut = async () => {
  try {
    await firebaseSignOut(auth);
  } catch (error: any) {
    throw new Error(error.message);
  }
};