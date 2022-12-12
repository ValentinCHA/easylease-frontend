import React from 'react'
import Navbar from './Navbar';
import style from '../styles/ClientProfil.module.css'
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { fa-sharp fa-solid fa-download } from '@fortawesome/free-solid-svg-icons';

function ClientProfil() {

    const user = useSelector((state) => state.user.value);

    return (
        <>
            <div className={style.mainContainer}>
                <Navbar />
                <div className={style.header}>
                    <h1 className={style.head} >Client Profil</h1>
                </div>
                <div className={style.ButtonContainer}>
                    <button className={style.buttonmodifier} onClick={() => ModifClient()}>Modifier</button>
                    <button className={style.buttonsupprimer} onClick={() => SupprimClient()}>Supprimer</button>
                </div>
                <div className={style.container}>
                    <div className={style.LeftContent}>
                        <div className={style.Infosclient}>
                            <span>Informations client : </span>

                            <span>Nom entreprise : </span>
                            <span>Client depuis le : </span>
                            <span>Adresse : </span>
                            <span>Nombre de salariés : </span>
                            <span>Chiffre d'affaires : </span>
                        </div>
                    </div>
                    <div className={style.RightContent}>
                        {/* <FontAwesomeIcon icon={fa-sharp fa-solid fa-download}/> */}
                        <button className={style.buttonAddDoc} onClick={() => addDocClient()}>Ajouter document</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ClientProfil