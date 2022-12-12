import React from 'react'
import Navbar from './Navbar';
import style from '../styles/AllClients.module.css'
import ClientCard from './ClientCard'

function AllClients() {
  return (
    <>
    <Navbar/>
    <div className={style.header}>
      <h1 className={style.head} >All Clients</h1>
    </div>
    <div className={style.container}>
        
    </div>
    </>
  )
}

export default AllClients