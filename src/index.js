import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { createStore, applyMiddleware , compose} from 'redux'
import rootReducer from './store/reducers/rootReducer'
import { Provider ,useSelector} from 'react-redux'
import thunk from 'redux-thunk'
import {createFirestoreInstance, reduxFirestore,getFirestore } from 'redux-firestore'
import { reactReduxFirebase,getFirebase,ReactReduxFirebaseProvider } from 'react-redux-firebase'
import firebaseConfig from './config/fbConfig.js'

import firebase from 'firebase/app'
import { isLoaded } from "react-redux-firebase"


const store = createStore(rootReducer,
  compose(
    applyMiddleware(thunk.withExtraArgument({getFirebase, getFirestore})),
     // redux binding for firebase
     //reactReduxFirebase(firebase, {userProfile: 'users', useFirestoreForProfile: true}),
    reduxFirestore(firebase, firebaseConfig) // redux bindings for firestore
  )
);
const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true
}
const rrfProps = {
  firebase,
  config: rrfConfig,firebaseConfig,
  dispatch: store.dispatch,
  createFirestoreInstance
};

function AuthIsLoaded({ children }) {  
  const auth = useSelector((state) => state.firebase.auth);   if
  (!isLoaded(auth))
      return (
        <span>Loading </span>
      );   
  return children; } 


ReactDOM.render(<Provider store={store}>     
<ReactReduxFirebaseProvider {...rrfProps}>
<AuthIsLoaded>
        <App />
 </AuthIsLoaded>
      </ReactReduxFirebaseProvider>  
</Provider>, document.getElementById('root'));
registerServiceWorker();

