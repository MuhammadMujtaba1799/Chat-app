import React, { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import './chatHome.css'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {Header} from "../components/header";
import fire from '../config/firebaseconfig';
import UserList from '../components/UsersList/userlist';
import Chatpage from '../components/chatpage/chatpage';
const Chathome=()=>{
const [name,setName]=useState("")
fire.auth().onAuthStateChanged(async(user)=>{
    var db=fire.firestore()
    if(user)
    {
        db.collection("Users")
        .where("id","==",user.uid)
        .get()
        .then((querysnapshot)=>{
            querysnapshot.forEach((docs)=>{
                console.log(docs.data().Name)
                setName(docs.data().Name)
            })
        })
    }
})
return(
    <div style={{display:"block",flexFlow:"column"}}>
        <div><Header name={name}/></div>
        <div className="row m-2">
            <div className="col-12 " style={{width:"100px"}}><UserList/></div>
            {/* <div className="col-7" style={{}}><Chatpage/></div> */}
        </div>
    </div>

 
//     <div className="container">
//   <div className="ccccc row align-items-start">
//     <div className="col-3">
//       One of three columns
//     </div>
//     <div className="col-3">
//       One of three columns
//     </div>
//     <div className="col-3">
//       One of three columns
//     </div>
//   </div>
//   </div>




    // <div className="container" >
    //     <div className='bg-primary header row'>
    //     {/* bg-primary' */}
    //         <div className="col">Hello</div>
    //         <div className="col">hi</div>
    //     </div>
        
    // </div>
)
}
export default Chathome
