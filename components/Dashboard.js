import React from 'react'
import style from '../styles/Dashboard.module.css'
import Navbar from './Navbar';

function Dashboard() {
  return (
    <>
    <Navbar styleDashboard={{backgroundColor: "rgba(0, 217, 255, 0.383)"}}/>
    <div className={style.header}>
      <h1 className={style.head} >Dashboard</h1>
    </div>
    <div className={style.container}>
        
    </div>
    </>
  )
}

export default Dashboard