import './App.css';
import Login from './LoginAndSignup/login'
import { useEffect, useState } from 'react';
import  AppRouter  from "./config/router";
// import fire from './firebaseconfig';
import app from 'firebase/app'
import firebase from 'firebase'
// import {fire} from './firebaseconfig'
// if (!app.apps.length) {
// }
import Chathome from './ChatPage/chatHome'
import fire from './config/firebaseconfig'
import { useHistory } from 'react-router-dom';
function App() {
  const history=useHistory();
  const [user,setUser]=useState('');
  const [emailError,setEmailError]=useState('');
  const [hasAccount,setHasAccount]=useState(false);
  const [passwordError,setPasswordError]=useState('');


  
  // const authListner=()=>{
    // firebase.auth().onAuthStateChanged((user)=>{
    //   if(user){
    //     history.push("/Chathome")
    //   }else{
    //     history.push("/")
    //   }
    // })
  // }

  // useEffect(()=>{authListner()},[])
  return (
    <div className="App">
    <AppRouter/>
    </div>
    
  );
}

export default App;
