import {initializeApp} from 'firebase/app';
import {getAuth, onAuthStateChanged} from 'firebase/auth';
import { getFirestore} from 'firebase/firestore';

const firebaseApp = initializeApp({
  apiKey: "AIzaSyDUstgugh4a43pUGz8kKsLWhVhUc50FGV0",
  authDomain: "alarmas-transnoa.firebaseapp.com",
  projectId: "alarmas-transnoa",
  storageBucket: "alarmas-transnoa.appspot.com",
  messagingSenderId: "706571422448",
  appId: "1:706571422448:web:f8023ed23b3f413f9dd035",
});

const auth =getAuth(firebaseApp);

export const db = getFirestore(firebaseApp);






// detect auth state.
onAuthStateChanged(auth,user =>{
  if(user!== null){
    console.log("Usuaria logeado");
  }else{
    console.log('no user');
  }
});





