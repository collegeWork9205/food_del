import React from 'react'
import './footer.css'
import { assets } from '../../assets/assets'
const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className="footer-content">
            <div className="footer-content-left">
                <img src={assets.logo} alt="" />
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia totam quae magnam asperiores alias voluptas sit nulla autem, in doloremque possimus consectetur quo officia unde dolorum aliquam, pariatur veritatis esse?</p>
                <div className="footer-social-icon">
                    <img src={assets.facebook_icon} alt="" />
                    <img src={assets.twitter_icon} alt="" />
                    <img src={assets.linkedin_icon} alt="" />
                </div>
            </div>
            <div className="footer-content-center">
                <h2>Company</h2>
                <ul>
                    <li>Home</li>
                    <li>About Us</li>
                    <li>Delivery</li>
                    <li>Privacy Policy</li>
                </ul>
            </div>
            <div className="footer-content-right">
                <h2>Get In Touch</h2>
                <ul>
                    <li>+91-9205497292</li>
                    <li>contactZaikaNation@.com</li>
                </ul>
            </div>
        </div>
        <hr />
        <p className='footer-copyright'>CopyRight 2026 © Tomato.com-All Right Reserved</p>
    </div>
  )
}

export default Footer