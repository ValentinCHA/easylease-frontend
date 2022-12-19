import React from 'react'
import style from '../styles/Dashboard.module.css'
import Navbar from './Navbar';
import Header from './Header'

function Dashboard() {
  return (
    <>
    <Navbar styleDashboard={{backgroundColor: "rgba(0, 217, 255, 0.383)"}}/>
    <Header name ="Dashboard"/>
    <div className={style.container}>
      <div className={style.graphic}>
      <img
        className={style.img}
        src="/graphic.png"
        alt="Graphique temporaire"
      />
      </div>
    </div>
    </>
  )
}

export default Dashboard