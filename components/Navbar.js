import React, { useDebugValue } from 'react'
import style from '../styles/Navbar.module.css'
import { useSelector } from 'react-redux';


//import des icon de la navbar
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faUserTie } from '@fortawesome/free-solid-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { faChartSimple } from '@fortawesome/free-solid-svg-icons'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { faGear } from '@fortawesome/free-solid-svg-icons';
import {faFileInvoiceDollar} from '@fortawesome/free-solid-svg-icons';
import {faHistory} from '@fortawesome/free-solid-svg-icons';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { faUserTag } from '@fortawesome/free-solid-svg-icons';
//import {use router} qui permet de changer de router 
import {useRouter} from 'next/router'
//import dispatch qui permet de d'activer les fonctions de mon reducer
import { useDispatch } from 'react-redux'
// fonction de mon fichier reducer/user
import user, {logout} from '../reducers/user'

function Navbar(props) {

    const user = useSelector((state) => state.user.value);

    // declaration de useRouter dans une const router
    const router = useRouter();
    // declaration du dispatch dans une const dispatch
    const dispatch = useDispatch()

    // fonction qui active {logout} et qui me renvoie vers ma page login
    const handleLogout =()=>{
        dispatch(logout())
        router.push('/login')
    }

    const navContrat=()=>{
        router.push('/allContrat')
    }
    const navClient=()=>{
        router.push('/allClients')
    }
    const navScenario=()=>{
        router.push('/allScenario')
    }
    const navDashboard=()=>{
        router.push('/dashboard')
    }
    const navSettings=()=>{
        router.push('/settings')
    }

  return (
    // toute ma navbar 
    <div className={style.container}>
        {/* taille de ma 1er navBar */}
      <div className={style.firstNavbar}>
        {/* logo navbar */}
        <img src='logov2transparent.png' className={style.logo}/>
        {/* boite avec les infos du users */}
            <div className={style.accountBox} >
                <img src='freckled-profile-908x1024.png' className={style.logo}/>
                    <div className={style.infoUser}>
                        <span className={style.name} >{user.name}</span>
                        <span className={style.emailSize}>{user.email}</span>
                    </div>
            </div>
            {/* toutes mes icons qui vont permettre de naviguer de page en page */}
            <div className={style.spaceDiv}>
            <div className={style.navigationPage}>
                {/* espace entre chaque box */}
                <div className={style.BoxSpan} style={props.styleDashboard} onClick={()=>navDashboard()} >
                    <span className={style.textStyle}><FontAwesomeIcon icon={faChartSimple} className={style.spaceIconSpan} />Dashboard</span> {/* espace entre l'icon et le text */}
                </div>
                <div className={style.BoxSpan } style={props.styleScenario} onClick={()=>navScenario()} >
                    <span className={style.textStyle}><FontAwesomeIcon icon={faHistory} className={style.spaceIconSpan} />Scénarios</span>
                </div>
                <div className={style.BoxSpan} style={props.styleAllContrats} onClick={()=>navContrat()} >
                    <span className={style.textStyle}><FontAwesomeIcon icon={faFileInvoiceDollar} className={style.spaceIconSpan} />Contrats</span>
                </div>
                <div className={style.BoxSpan} style={props.styleAllClients} onClick={()=>navClient()}>
                    <span className={style.textStyle}><FontAwesomeIcon icon={faUserTag} className={style.spaceIconSpan} />Clients</span>
                </div>
                <div className={style.BoxSpan} style={props.styleSettings} onClick={()=>navSettings()}>
                    <span><FontAwesomeIcon icon={faGear} className={style.spaceIconSpan} />Options</span>
                </div>
            </div>
            {/* taille de ma 2e navBar */}
            <div className={style.secondNav}>
                <div className={style.BoxSpan} onClick={()=>handleLogout()}>
                    <span  className={style.boxSpan} ><FontAwesomeIcon icon={faSignOutAlt} className={style.spaceIconSpan} />Déconnexion</span>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
