import React from 'react'
import Navbar from './Navbar';
import style from '../styles/ClientProfil.module.css'
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import allClients from '../reducers/allClients';
// import { fa-sharp fa-solid fa-download } from '@fortawesome/free-solid-svg-icons';

function ClientProfil() {

    const user = useSelector((state) => state.user.value);
    const allClients = useSelector((state) => state.allClients.value);

	
    return (
        <>
            <div className={style.mainContainer}>
                <Navbar />
                <div className={style.header}>
                    <h1 className={style.head} >Profil client</h1>
                </div>

                <div className={style.container}>
                    <div className={style.ButtonContainer}>
                        <button className={style.buttonmodifier} onClick={() => ModifClient()}>Modifier</button>
                        <button className={style.buttonsupprimer} onClick={() => SupprimClient()}>Supprimer</button>
                    </div>
                    <div className={style.GridContent}>

                        <div className={style.Infosclient}>
                            {clients}
                            <h2>Informations client : </h2>
                            <ul>
                                <li>Nom entreprise : </li>
                                <li>Interlocuteur : </li><li>Téléphone : </li>
                                <li>Client depuis le : </li>
                                <li>Adresse : </li>
                                <li>Email : </li>
                                <li>Nombre de salariés : </li>
                                <li>Chiffre d'affaires : </li>
                            </ul>
                        </div>
                        <div className={style.RightContent}>
                            {/* <FontAwesomeIcon icon={fa-sharp fa-solid fa-download}/> */}
                            <button className={style.buttonAddDoc} onClick={() => addDocClient()}>Ajouter document</button>
                        </div>
                    </div>


                </div>
            </div>
        </>
    )
}

export default ClientProfil;