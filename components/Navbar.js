import React, { useDebugValue } from 'react'
import style from '../styles/Navbar.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserTie } from '@fortawesome/free-solid-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faRectangleList } from '@fortawesome/free-solid-svg-icons'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { faChartSimple } from '@fortawesome/free-solid-svg-icons'
import { faDiagramNext } from '@fortawesome/free-solid-svg-icons'
import { faEllipsis } from '@fortawesome/free-solid-svg-icons'
import { faXmark } from '@fortawesome/free-solid-svg-icons'



import {useRouter} from 'next/router'
import { useDispatch } from 'react-redux'
import {logout} from '../reducers/user'

function Navbar() {

    const router = useRouter();
    const dispatch = useDispatch()

    const handleLogout =()=>{
        dispatch(logout())
        router.push('/login')
    }

//bienvenue
  return (
    <div className={style.container}>
      <div className={style.navbar}>
        <img src='logo.png' className={style.logo}/>
            <div className={style.accountBox} >
                <FontAwesomeIcon icon={faUserTie} className={style.avatar} />
                    <div className={style.infoUser}>
                        <span className={style.name} >Jhon Doe</span>
                        <span className={style.emailSize}>JhonDoe@gmail.com</span>
                    </div>
            </div>
            <div className={style.nav}>
                <div className={style.navigation}  >
                    <span><FontAwesomeIcon icon={faChartSimple} className={style.spaceIcon} />Dashboard</span>
                </div>
                <div className={style.navigation}>
                    <span><FontAwesomeIcon icon={faDiagramNext} className={style.spaceIcon} />Scénario</span>
                </div>
                <div className={style.navigation}>
                    <span><FontAwesomeIcon icon={faEnvelope} className={style.spaceIcon} />Client</span>
                </div>
                <div className={style.navigation}>
                    <span><FontAwesomeIcon icon={faUser} className={style.spaceIcon} />Contacts</span>
                </div>
            </div>
            <div className={style.secondNav}>
                <div className={style.navigation}>
                    <span><FontAwesomeIcon icon={faEllipsis} className={style.spaceIcon} />Settings</span>
                </div>
                <div className={style.footerNav}>
                    <span onClick={()=>handleLogout()} className={style.fonsize} ><FontAwesomeIcon icon={faXmark} className={style.spaceIcon} />Logout</span>
                    <span className={style.fonsize}><FontAwesomeIcon icon={faArrowLeft} className={style.spaceIconLogout} />Toogle SideBar</span>
                </div>
            </div>
      </div>
    </div>
  )
}

export default Navbar
