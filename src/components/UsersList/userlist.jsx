import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import fire from "../../config/firebaseconfig";
import Chatpage from "../chatpage/chatpage";



export const UserList=()=>{
    const [userlist,setUserList]=useState([])
    const history=useHistory();
    let db=fire.firestore();
    let userdata=[]
    useEffect(()=>{
        fire.auth().onAuthStateChanged(async (user)=>{
            if(user){
                db.collection('Users').get().then((querysnapshot)=>{
                    querysnapshot.forEach((docs)=>{
                        if(docs.data().id !== user.uid){
                            userdata.push({Name:docs.data().Name,id:docs.data().id,Email:docs.data().Email})
                        }
                    })
                    setUserList(userdata)
                })
            }
            console.log("Userdata=========>",userdata)
            return userdata
        })
    },[])
    const chatpage=(id)=>{
        history.push("/list/"+id)
    }

    return(
        <div>
       {
           userlist.map((user,key)=>(
               <ul key={key}>
         <div onClick={()=>{chatpage(user.id)}} className='row' style={{cursor:"pointer",display:'block',borderColor:"grey", borderStyle:"solid"}}>
            <div className="col-md bg-gradient bg-secondary" style={{color:"white",fontFamily:"cursive"}} >
                {user.Name}
            </div>
            <div className="col-md">message</div>
        </div>
         </ul> 
           ))
       }     
         {/* <li>
         <div className='dddd row' style={{display:'block',borderColor:"grey", borderStyle:"solid",borderRadius:"5cm"}}>
            <div className="bg-gradient bg-secondary" style={{color:"white",fontFamily:"cursive"}} >
                name
            </div>
            <div>message</div>
        </div>
         </li> */}
        </div>
        
    )
}
export default UserList;