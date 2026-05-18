import React, { useContext, useState } from 'react'
import './Navbar.css';
import { assets } from '../../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';

function Navbar({setShowLogin}) {
  const [menu,setMenu]=useState("");
  const {getTotalAmount,token,setToken}=useContext(StoreContext);
  const navigate=useNavigate();

  const LogOut=()=>{
    localStorage.removeItem("token");
    setToken("");
    navigate("/")
}
  return (
    <div className='navbar'>
      <div className="logo-img">
        <Link to='/'><img src={assets.logo} alt="" className="logo" /></Link>
      </div>
        
          <ul className='navbar-menu'>
            <Link to='/' href='' onClick={()=>setMenu("home")} className={menu==="home"?"active":" "}>Home</Link>
            <a href='#explore-menu' onClick={()=>setMenu("menu")} className={menu==="menu"?"active":" "}>Menu</a>
            <a href='#app-download' onClick={()=>setMenu("mobile-app")} className={menu==="mobile-app"?"active":" "}>Mobile App</a>
            <a href='#footer' onClick={()=>setMenu("contact us")} className={menu==="contact us"?"active":" "}>Contact Us</a>
          </ul>
          <div className="navbar-right">
            <img src={assets.search_icon} alt="" />
            <div className="navbar-search-icon">
               <Link to='/cart'> <img src={assets.basket_icon} alt="" /></Link>
                <div className={getTotalAmount()===0?"":"dot"}></div>
            </div>
            {!token?<button className='signBtn' onClick={()=>setShowLogin(true)}>Sign in</button>:<div className="navbar-Profile">
                 <img src={assets.profile_icon} alt="" />
                 <ul className="nav-profile-dropdown">
                  <li onClick={()=>navigate("/myorders")}><img src={assets.bag_icon} alt="" /><p>Orders</p></li>
                  <hr />
                  <li onClick={LogOut}><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
                 </ul>
            </div>}
          </div>
    </div>
  )
}

export default Navbar;