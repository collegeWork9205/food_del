import React from 'react'
import headerImg from "../../assets/header_img.png";

import './Header.css'
const Header = () => {
  return (
    <div className='header'style={{
        backgroundImage: `url(${headerImg})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}>
        <div className="header-content">
            <h2>Order your Favourite Food Here</h2>
            <p>Choose from devices menu featuring a detectable array of dishes crafted with the finest ingrediants and culinary expertise our mission is to satisfy your cravings and elevate your dining experiance,one delicious meals at a time</p>
            <a href="#explore-menu"><button>View Menu</button></a>
        </div>
    </div>
  )
}

export default Header
