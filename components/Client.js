import React from 'react'
import style from '../styles/Client.module.css'
import Navbar from './Navbar';

function Client() {
  return (
    <>
    <Navbar/>
    <div className={style.header}>
      <h1 className={style.head} >Client</h1>
    </div>
    <div className={style.container}>
        
    </div>
    </>
  )
}

export default Client