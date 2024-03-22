import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider, signInWithPopup} from 'firebase/auth';
import {getFirestore, doc, getDoc, setDoc} from 'firebase/firestore';
const firebaseConfig = {
  apiKey: "AIzaSyDn3QJahXoqE33eZD9EtO20O4H3DLxil4s",
  authDomain: "crwn-clothing-db-55adc.firebaseapp.com",
  projectId: "crwn-clothing-db-55adc",
  storageBucket: "crwn-clothing-db-55adc.appspot.com",
  messagingSenderId: "696854925257",
  appId: "1:696854925257:web:6885fc3992ed389bc1e218"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);
    const userSnapshot = await getDoc(userDocRef);

    if(!userSnapshot.exists()){
      const {displayName, email} = userAuth;
      const createdAt = new Date();

      try{
        await setDoc(userDocRef, {
          displayName,
          email,
          createdAt
        });
      } catch(error){
        console.log('error creating the user: ', error.message);
      }
    }

    return userDocRef;
}