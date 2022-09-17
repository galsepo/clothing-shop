

import { initializeApp } from 'firebase/app';

import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

import {
    getFirestore, doc, getDoc, setDoc,
} from 'firebase/firestore';



const firebaseConfig = {
    apiKey: "AIzaSyDZew6yUZ7rOTIA_jJ66B3k9gmcByS9_ps",
    authDomain: "crwn-db-wgv.firebaseapp.com",
    projectId: "crwn-db-wgv",
    storageBucket: "crwn-db-wgv.appspot.com",
    messagingSenderId: "832763212493",
    appId: "1:832763212493:web:aab7cd6c2b63c1bbf26f84"
};

const firebaseApp = initializeApp(firebaseConfig);
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
    prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);

export const db = getFirestore();

export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);



export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);
    const userSnapshot = await getDoc(userDocRef);


    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();
        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
            });
        } catch (error) {
            console.log('error creating the user', error.message);
        }
    }

    return userDocRef;
}; 