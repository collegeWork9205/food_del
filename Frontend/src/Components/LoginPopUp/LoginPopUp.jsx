import React, { useContext, useEffect, useState } from 'react'
import './LoginPopUp.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios'
import {toast} from 'react-toastify'
const LoginPopUp = ({setShowLogin}) => {
    const{ url,token,setToken}=useContext(StoreContext);
    const [currState,setCurrState]=useState("login")
    const [data,setData]=useState({
        name:"",
        email:"",
        password:""
    })
    const onChangeHandler=(event)=>{
         const name=event.target.name;
         const value=event.target.value;
         setData((data)=>({...data,[name]:value}))
    }
    
    const onLogin=async (event)=>{
        event.preventDefault();
        let newUrl=url;
        if(currState=="login"){
            newUrl+="/api/user/login"
        }else{
            newUrl+="/api/user/register"
        }
        const response=await axios.post(newUrl,data);
        if(response.data.success){
           setToken(response.data.token);
           localStorage.setItem("token",response.data.token);
           toast.success("you logged In successfully");
            setShowLogin(false);
        }else{
           toast.error(response.data.message);
        }
    }

  return (
    <div className='login-popup'>
        <form onSubmit={onLogin} action="" className="login-popup-container">
            <div className="login-popup-title">
                <h2>{currState}</h2>
                <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="" />
            </div>
            <div className="login-popup-inputs">
                {currState==="login"?<></>:<input type="text" name='name' value={data.name} onChange={onChangeHandler} placeholder='Enter Your Name' required/>}
                <input type="email" name='email' value={data.email} onChange={onChangeHandler} placeholder='Enter Your Email' required/>
                <input type="password" name='password' value={data.password} onChange={onChangeHandler} placeholder='Enter Your password' required/>
            </div>
            <button type='submit'>{currState==="login"?"Login":"Create Account"}</button>
            <div className="login-popup-condition">
                <input type="checkbox" required/>
                <p>By continuing, i agree to the terms of use & privacy policy.</p>
            </div>
            {currState==="login"
            ?<p>create a new account?<span onClick={()=>setCurrState("signup")}>   click here</span></p>
            :<p>already have an account?<span onClick={()=>setCurrState("login")}>  click here</span></p>
            }
        </form>
    </div>
  )
}

export default LoginPopUp