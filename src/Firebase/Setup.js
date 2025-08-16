

// Firebase / Setup.js
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyAA8ziQnOIEd7zuhwblu75kbelNbRCTO5E',
  authDomain: 'bharat-worker-ff0c4.firebaseapp.com',
  projectId: 'bharat-worker-ff0c4',
  storageBucket: 'bharat-worker-ff0c4.firebasestorage.app',
  messagingSenderId: '238904276518',
  appId: '1:238904276518:web:647517f8269ab8771718e7',
  measurementId: 'G-M7MZFYCDKC',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app)

// Optional: Connect to Auth emulator during development
// if (process.env.NODE_ENV === 'development') {
//   connectAuthEmulator(auth, 'http://localhost:9099')
// }

export default app
