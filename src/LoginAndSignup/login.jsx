import React,{useState,useEffect} from 'react'
import './login.css'
import { useHistory } from "react-router-dom"
import handleLogin from '../App'
import fire  from "../config/firebaseconfig";
import { IsLogedIn } from '../utility/utility';

export const Login =(props)=>{
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const history=useHistory()
    // const {email, setEmail, password, setPassword
    // ,handleSignup,handleLogin,hasAccount, setHasAccount} =props
    IsLogedIn()
    const handleLogin=()=>{
          console.log(email,password)
        fire.auth().signInWithEmailAndPassword(email,password).then((usercredentials)=>{
          console.log(usercredentials.user)
          setEmail("");
          setPassword("");
          history.replace('/Chathome')
        })
        .catch((err)=>{
          switch(err.code){
            case "auth/invalid-email":
            case "auth/user-disabled":
            case "auth/user-not-found":
              alert(err.message)
            //   setEmailError(err.message);
              break;
            case "auth/wrong-password":
            //   setPasswordError(err.message);
              alert(err.message)
    
              break;
    
          }
        })
      }
    return(
        <section className='login'>
            <div className='loginContainer'>
                <label>Email</label>
                <input type="text" autoFocus required value={email} onChange={e=>{setEmail(e.target.value)}}/>
                <label>Password</label>
                <input type="password" autoFocus required value={password} onChange={e=>{setPassword(e.target.value)}}/>
                <div className='btnContainer'>
                    <button onClick={()=>{handleLogin()}}>Sign in</button>
                    <p>Don't have an account <span onClick={()=>{history.push('/Signup')}}>Signup</span></p>                
            </div>
            </div>
          

        </section>
    )

}

export default Login;