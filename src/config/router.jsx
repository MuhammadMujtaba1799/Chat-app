import React from "react";
import {BrowserRouter as Router,Route, useHistory} from "react-router-dom";
import Chathome from "../ChatPage/chatHome";
import Chatpage from "../components/chatpage/chatpage";
// import {UserList} from "../components/UsersList/userlist";
import Login from "../LoginAndSignup/login";
import Signup from "../LoginAndSignup/signup"
import fire from "./firebaseconfig";



const AppRouter=()=>{
    const history=useHistory()
    const login=()=>{ fire.auth().onAuthStateChanged(async (user)=>{
        if(user)
        {
            history.push("/Chathome")
        }
    })}
return(
    <Router>
        <Route exact={true} path='/' component={Login}/>
        <Route path='/Signup' component={Signup}/>
        <Route path='/Chathome' component={Chathome} />
        <Route path='/list/:senderid' component={Chatpage}/>
        
    </Router>
)
}
export default AppRouter;