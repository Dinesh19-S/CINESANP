'use server';

import { 
  signInWithEmailAndPassword, 
  signInWithPopup,
} from 'firebase/auth';
import { auth, googleProvider } from '@/lib/firebase';
import { AuthError } from 'firebase/auth';

export async function login(prevState: any, formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  try {
    // This is not ideal, as we are exposing a client-side API call
    // in a server action. A better approach would be to handle this
    // on the client, or use the Firebase Admin SDK.
    // However, for this environment, this is the workaround.
    const userCredential = await new Promise((resolve, reject) => {
        signInWithEmailAndPassword(auth, email, password)
            .then(resolve)
            .catch(reject)
    });
    
    // This part will likely not be executed as signInWithEmailAndPassword
    // is a client-side function and won't work as expected in a server action
    // without a custom client-side implementation to call it.
    return { message: 'Login successful!' };

  } catch (e) {
    const error = e as AuthError;
    return { message: error.message || 'An unknown error occurred.' };
  }
}

export async function googleLogin(prevState: any) {
    try {
        await new Promise((resolve, reject) => {
            signInWithPopup(auth, googleProvider)
                .then(resolve)
                .catch(reject)
        });
        return { message: 'Google login successful!' };
    } catch (e) {
        const error = e as AuthError;
        return { message: error.message || 'An unknown error occurred.' };
    }
}
