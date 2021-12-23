import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBJqYaqXoqVEDoawA_BMxKDmLDLcz502BU",
  authDomain: "reactapp-b8d54.firebaseapp.com",
  projectId: "reactapp-b8d54",
  storageBucket: "reactapp-b8d54.appspot.com",
  messagingSenderId: "925632043055",
  appId: "1:925632043055:web:e2c2356e082abc3ef88eda"
};
firebase.initializeApp (firebaseConfig)
firebase.firestore().settings({ timestampsInSnapshots: true });

export default firebase