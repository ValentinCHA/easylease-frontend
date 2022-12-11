import React from 'react'
import style from '../styles/Navbar.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserTie } from '@fortawesome/free-solid-svg-icons'


function Navbar() {
  return (
    <div className={style.container}>
      <div className={style.navbar}>
        <img src='logo.png' className={style.logo}/>
            <div className={style.account} >
                <FontAwesomeIcon icon={faUserTie} className={style.icon} />
                    <div className={style.infoUser}>
                        <span>Jhon Doe</span>
                        <span>JhonDoe@gmail.com</span>
                    </div>
            </div>
      </div>
    </div>
  )
}

export default Navbar
