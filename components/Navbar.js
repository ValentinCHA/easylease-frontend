import React, { useDebugValue } from 'react'
import style from '../styles/Navbar.module.css'
import { useSelector } from 'react-redux';


//import des icon de la navbar
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserTie } from '@fortawesome/free-solid-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { faChartSimple } from '@fortawesome/free-solid-svg-icons'
import { faDiagramNext } from '@fortawesome/free-solid-svg-icons'
import { faEllipsis } from '@fortawesome/free-solid-svg-icons'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

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

  return (
    // toute ma navbar 
    <div className={style.container}>
        {/* taille de ma 1er navBar */}
      <div className={style.firstNavbar}>
        {/* logo navbar */}
        <img src='logo.png' className={style.logo}/>
        {/* boite avec les infos du users */}
            <div className={style.accountBox} >
                <FontAwesomeIcon icon={faUserTie} className={style.avatar} />
                    <div className={style.infoUser}>
                        <span className={style.name} >{user.name}</span>
                        <span className={style.emailSize}>{user.email}</span>
                    </div>
            </div>
            {/* toutes mes icons qui vont permettre de naviguer de page en page */}
            <div className={style.navigationPage}>
                {/* espace entre chaque box */}
                <div className={style.BoxSpan} style={props.styleDashboard} onClick={()=>navDashboard()} >
                    <span className={style.textStyle}><FontAwesomeIcon icon={faChartSimple} className={style.spaceIconSpan} />Dashboard</span> {/* espace entre l'icon et le text */}
                </div>
                <div className={style.BoxSpan } style={props.styleScenario} onClick={()=>navScenario()} >
                    <span className={style.textStyle}><FontAwesomeIcon icon={faDiagramNext} className={style.spaceIconSpan} />Scénarios</span>
                </div>
                <div className={style.BoxSpan} style={props.styleAllClients} onClick={()=>navClient()}>
                    <span className={style.textStyle}><FontAwesomeIcon icon={faEnvelope} className={style.spaceIconSpan} />Clients</span>
                </div>
                <div className={style.BoxSpan} style={props.styleAllContrats} onClick={()=>navContrat()} >
                    <span className={style.textStyle}><FontAwesomeIcon icon={faUser} className={style.spaceIconSpan} />Contrats</span>
                </div>
            </div>
            {/* taille de ma 2e navBar */}
            <div className={style.secondNav}>
                <div className={style.BoxSpan}>
                    <span><FontAwesomeIcon icon={faEllipsis} className={style.spaceIconSpan} />Settings</span>
                </div>
                <div className={style.footerNav}>
                    <span onClick={()=>handleLogout()} className={style.boxSpan} ><FontAwesomeIcon icon={faXmark} className={style.spaceIconSpan} />Logout</span>
                    <span className={style.boxSpan}><FontAwesomeIcon icon={faArrowLeft} className={style.spaceIconLogout} />Toogle SideBar</span>
                </div>
            </div>
      </div>
    </div>
  )
}

export default Navbar
