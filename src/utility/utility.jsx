import { useEffect } from 'react'
// import fire from '../config/firebaseconfig'
import firebase from "firebase";
import { useHistory } from "react-router-dom";
import fire from '../config/firebaseconfig';


export const IsLogedIn = () => {
  const history = useHistory();

  useEffect(() => {
    async function FetchData() {
      await firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          history.replace('/Chathome')
        } else {
          history.replace("/");
        }
      });
    }
    FetchData();
  }, []);

}

export const adduser=(User)=>{
  console.log('====>',User.uid)
  fire.auth().onAuthStateChanged(async (user)=>{
    if(user){
      User.id=user.uid
      console.log('=====================>', User)
      var db=fire.firestore();
      db.collection('Users').doc(user.uid).set(User)
    }
  })
  


}
// export const HandleSignup=(email,password)=>{
//     console.log(email,password)
//  useEffect((email,password)=>{
//     // async function signup(){
//       firebase.auth().createUserWithEmailAndPassword(email,password)
//         .then((loginCredentials)=>{
          
//           console.log('login successfully  ',loginCredentials.user)
//         })
//         .catch((err)=>{
//           switch(err.code){
//       case "auth/email-already-in-use":
//       case "auth/invalid-email":
//         alert(err.message)
//         // setEmailError(err.message);
//         break;
//       case "auth/weak-password":
//         alert(err.message)
//         // setPasswordError(err.message);
//         break;
    
//     }
//         })
//     // }
//     // signup()
//  },[])
 
//   }

//   // export default handleSignup;