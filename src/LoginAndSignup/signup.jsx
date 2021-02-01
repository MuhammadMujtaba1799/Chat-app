import React,{useState,useEffect} from 'react'
import './login.css'
import { useHistory } from "react-router-dom"
// import handleSignup from "../App"
import firebase from "firebase";

import fire from '../config/firebaseconfig'
import { adduser } from '../utility/utility';

const Signup =()=>{
    const history=useHistory();
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [name,setname]=useState('')

    // useEffect(()=>{
    //   async function checklogin(){
    //     fire.auth().onAuthStateChanged((user)=>{
    //       if(user){
    //         history.push("/Chathome")
    //       }
    //       else{
    //         history.push("/")
    //       }
    //     })
    //   }
    //   checklogin();
    // },[])
    const HandleSignup=(email,password)=>{
    console.log(email,password)
//  useEffect((email,password)=>{
    // async function signup(){
      firebase.auth().createUserWithEmailAndPassword(email,password)
        .then((loginCredentials)=>{
          
          console.log('login successfully  ',loginCredentials.user)
        //   alert("Registered Successfully")
          adduser({Name:name,Email:email,id:""});
          setEmail("");
          setPassword("");
          setname("");
        })
        .catch((err)=>{
          switch(err.code){
      case "auth/email-already-in-use":
      case "auth/invalid-email":
        alert(err.message)
        // setEmailError(err.message);
        break;
      case "auth/weak-password":
        alert(err.message)
        // setPasswordError(err.message);
        break;
    
    }
        })
    // }
    // signup()
//  },[])
 
  }

    return(
        <section className='login'>
            <div className='loginContainer'>
                <label>Username</label>
                <input type="text" autoFocus required value={name} onChange={e=>{setname(e.target.value)}}/>
                <label>Email</label>
                <input type="text" autoFocus required value={email} onChange={e=>{setEmail(e.target.value)}}/>
                <label>Password</label>
                <input type="password" autoFocus required value={password} onChange={e=>{setPassword(e.target.value)}}/>
                <div className='btnContainer'>
                {/* {hasAccount?( */}
                    {/* <>
                    <button onClick={handleLogin}>Sign in</button>
                    <p>Don't have an account <span onClick={()=>{setHasAccount(!hasAccount)}}>Signup</span></p>
                    </> */}
                     {/* ):( */}
                         
                          <button onClick={()=>{HandleSignup(email,password)}}>Sign up</button>
                          <p>Have an account? <span onClick={()=>{history.push("/")}}>Sign in</span></p>
                         
                     {/* ) */}
                    
                {/* } */}
                
            </div>
            </div>
          

        </section>
    )

}

export default Signup;