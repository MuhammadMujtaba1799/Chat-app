import { useHistory } from "react-router-dom"
import fire from "../config/firebaseconfig"



export const Header=(props)=>{
    const {name}=props
    const history=useHistory();
    console.log('header props==>',name)
    return(
        <div className='container-fluid pl-4'>
            <div className='row' style={{flexDirection:"row"}}>
            <div className='nameTag col-9' style={{backgroundColor:"#603bbb",borderRadius:"5px", color:"white"}}><h4>Welcome {name}</h4></div>
            <div className='col-3'>
            <button className='bg-primary btn' onClick={()=>{
                fire.auth().signOut()
                history.replace('/')
            }}><h6>Logout</h6></button>
        </div>
    </div>
</div>
    )
}
export default Header