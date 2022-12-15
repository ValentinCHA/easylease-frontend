import React from 'react'
import Navbar from './Navbar';
import style from '../styles/ClientProfil.module.css'
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import client from '../reducers/client';
import { useRouter } from 'next/router'
// import { fa-sharp fa-solid fa-download } from '@fortawesome/free-solid-svg-icons';

function ClientProfil() {
    const router = useRouter()
    console.log('log du query', router.query);

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
                            <h2>Informations client : </h2>
                            <ul>
                                <li>Nom entreprise : {router.query.name}</li>
                                <li>Client depuis le : {router.query.clientBirth}</li>
                                <li>Adresse : {router.query.address}</li>
                                <li>Nombre de salariés : {router.query.numberOfEmployees} </li>
                                <li>Chiffre d'affaires : {router.query.chiffre} </li>
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