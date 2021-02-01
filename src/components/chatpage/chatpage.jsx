import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import fire from "../../config/firebaseconfig";
import firestore from "firebase/app"
// import app, { firestore } from "firestore";
import firebase from "firebase";



const Chatpage=(props)=>{
    // const [senderId,setSenderId]=useState("")
    // console.log("Mu props==============>", props)
    const [messagesList,setMessagesList]=useState([])
    const [message,setMessage]=useState("")
    const [senderName,setSenderName]=useState("");
    const {senderid}=useParams();
    const [chatId,setChatId]=useState("");
    const [receiverId,setReceiverId]=useState("");
    const [receiverName,setReceiverName]=useState("");
    console.log("id==>",senderid)

    
    console.log("receiverId",receiverId)
    var db=fire.firestore()

    useEffect(()=>{
     db.collection("Users").doc(senderid).get().then((doc)=>{
        setSenderName(doc.data().Name);
        console.log(senderName)
    })
    },[senderid])
    useEffect(()=>{
        fire.auth().onAuthStateChanged(async(user)=>{
            if(user){
                setReceiverId(user.uid)
                db.collection("Users").doc(user.uid).get().then((doc)=>{
                    console.log(doc.data().Name)
                    setReceiverName(doc.data().Name);
                    console.log(receiverName)
                })
            }
        })

        if (receiverId > senderid) {
            setChatId(senderid + receiverId);
          } else {
            setChatId(receiverId + senderid);
          }
    },[senderid,receiverId])
    useEffect(() => {
        async function fetchData() {
          if(chatId){
            await db
            .collection("Chats")
            .doc(chatId)
            .collection("Messages")
            .orderBy("timestamp", "asc")
            .onSnapshot(function (doc) {
              var messages = [];
              doc.forEach((docs) => {
                messages.push({
                  messageContent: docs.data().messageContent,
                  senderId: docs.data().senderId,
                  timestamp: docs.data().timestamp,
                });
              });
              setMessagesList(messages);
            });
          console.log(messagesList,"chatid ",chatId)
          }
        }
        fetchData();
      }, [chatId]);
    const createChat=(senderid,senderName,receiverId,receiverName,chatId,message)=>{
        const now = new Date();
        console.log(message)
        let createChatParameters = {
            participantIds: [receiverId, senderid],
            participants: [
              {
                name: senderName,
                uid: senderid,
              },
              {
                name: receiverName,
                uid: receiverId,
              },
            ],
          }
          const newMessage={
              messageContent:message,
              senderId:receiverId,
              timestamp: firebase.firestore.Timestamp.fromDate(now)
          }
          db.collection("Chats").get().then((docs)=>{
              docs.forEach((doc)=>{
                  if(chatId===doc.id){
                    db.collection("Chats").doc(chatId).collection("Messages").add(newMessage)
                  }
                  else{
                      console.log("no")
                      db.collection("Chats").doc(chatId).set(createChatParameters)
                  }
              })
          })
      
    }
    console.log("========================================================>",messagesList)
return(
    <div className="container-fluid" >
        <div className="row ">
            <div  className="col-12 bg-primary" style={{width:"100%"}}><h4>{senderName}</h4></div>
        </div>
        <div className="row">
            <div className="col-12">
            {
           messagesList.map((messages,key)=>(
            <ul key={key} className="list-group" >
              {messages.senderId==receiverId?
            <li class="list-group-item"  style={{textAlign: "end",backgroundColor:"#6698FF"}}> <p></p> <p style={{backgroundColor:"#6698FF"}}>{messages.messageContent}</p> 
            </li>:
            <li class="list-group-item"  style={{textAlign: "start",backgroundColor:"#82CAFA"}}><p style={{fontSize:"10px"}}>{senderName}</p>{messages.messageContent}</li>
              }
          {/* <li class="list-group-item" style={{textAlign:"center"}}>{messages.messageContent}</li> */}

          

          </ul>
        //        <ul key={key}>
        //  <div className='row' style={{display:'block', borderStyle:"solid"}}>
        //     {/* <div className="col-md bg-gradient bg-secondary" style={{color:"white",fontFamily:"cursive"}} >
        //         {user.Name}
        //     </div> */}
        //     <div className="col-md">{messages.messageContent}</div>
        // </div>
        //  </ul> 
           ))
       }
                {/* {messagesList.map((messages,key)=>{
                    <ul key={key}>
                         color={message.senderId === receiverId ? "secondary" : "primary"}
                        <div>{messages.messageContent}</div>
                    </ul>
                })} */}
            </div>
        </div>
        {/* <div className="row" style={{position:"relative",marginTop:"180px", justifyContent:"flex-end",display:"flex"}}>
        <div className="col-md input-group mb-3">
        <input type="text" class="form-control" placeholder="Enter Message" aria-label="Recipient's username" aria-describedby="button-addon2" style={{width:""}}/>
        <button class="btn btn-outline-primary" type="button" id="button-addon2">Send</button>
</div>
        </div> */}
        <div style={{height:"100%"}}></div>
        <div className="row" style={{position:"absolute",width:"100%",bottom:"40px"}}>
            <div className="col-12">
                <input value={message} onChange={(e)=>{setMessage(e.target.value)}} type="text" placeholder="Enter Message" style={{width:"100%", height:"100%"}}/>
             <button  onClick={()=>{createChat(senderid,senderName,receiverId,receiverName,chatId,message)}} className="btn btn-outline-primary" type="button" id="button-addon2">Button</button>
            </div>
        </div>

    </div>
)
}
export default Chatpage