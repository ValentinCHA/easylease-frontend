import React from 'react';
import styles from '../styles/Header.module.css'

function Header(props) {
  return (
    <>
    <div className={styles.header}>
     <h1 className={styles.text}> {props.name}</h1>
    </div>
    </>
  )
}

export default Header