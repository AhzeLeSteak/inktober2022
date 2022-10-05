import {initializeApp} from "firebase/app";
import {getFirestore} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyB0CjwTzSfb0EXmioQqlQ_PBhjK_2FEg0s",
    authDomain: "inktober2022-ad57f.firebaseapp.com",
    projectId: "inktober2022-ad57f",
    storageBucket: "inktober2022-ad57f.appspot.com",
    messagingSenderId: "803386619512",
    appId: "1:803386619512:web:494fc0fb35eb29f88b9f8d",
    measurementId: "G-KR9WVWSVDE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestoreApp = () => getFirestore(app);