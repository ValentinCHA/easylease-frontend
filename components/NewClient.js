import React from 'react'
import style from '../styles/NewClient.module.css'
import Navbar from './Navbar';

function NewClient() {
  return (
    <>
    <Navbar/>
    <div className={style.header}>
      <h1 className={style.head} >New Client</h1>
    </div>
    <div className={style.container}>
        
    </div>
    </>
  )
}

export default NewClient