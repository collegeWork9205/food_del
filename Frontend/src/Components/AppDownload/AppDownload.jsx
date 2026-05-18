import React from 'react'
import './AppDownload.css'
import { assets } from '../../assets/assets'
export const AppDownload = () => {
  return (
    <div className='app-download' id='app-download'>
        <p>For Better Experience Download<br/><b>Tomato App</b></p>
        <div className="app-download-platform">
            <img src={assets.play_store} alt="" />
            <img src={assets.app_store} alt="" />
        </div>

    </div>
  )
}
