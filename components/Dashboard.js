import React from 'react'
import style from '../styles/Dashboard.module.css'
import Navbar from './Navbar';

function Dashboard() {
  return (
    <>
    <Navbar/>
    <div className={style.header}>
      <h1 className={style.head} >Dashboard</h1>
    </div>
    <div className={style.container}>
        
    </div>
    </>
  )
}

export default Dashboard