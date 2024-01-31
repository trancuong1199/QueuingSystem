import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: 'AIzaSyD1DBj3wuySD9WJ3Jae6cGl96PdskABAVQ',
    authDomain: 'dataintern-23ef3.firebaseapp.com',
    databaseURL: 'https://dataintern-23ef3-default-rtdb.firebaseio.com',
    projectId: 'dataintern-23ef3',
    storageBucket: 'dataintern-23ef3.appspot.com',
    messagingSenderId: '1004763419203',
    appId: '1:1004763419203:web:c094bf196d71a54f6dfaf6',
    measurementId: 'G-PHEVKRPP2Q',
};

const app = initializeApp(firebaseConfig);

export default getFirestore();
export const auth = getAuth(app);
