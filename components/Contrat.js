import React from 'react'
import style from '../styles/Contrat.module.css'
import Navbar from './Navbar';

function Contrat() {
  return (
    <>
    <Navbar/>
    <div className={style.container}>
      <h1 className={style.head} >Contrats</h1>
    </div>
    </>
  )
}

export default Contrat
