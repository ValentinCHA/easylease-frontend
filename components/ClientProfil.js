import React from 'react'
import Navbar from './Navbar';
import style from '../styles/ClientProfil.module.css'
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { fa-sharp fa-solid fa-download } from '@fortawesome/free-solid-svg-icons';

function ClientProfil() {

    const user = useSelector((state) => state.user.value);
    const [addClient, setAddClient] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/client/test')
            .then(response => response.json())
            .then(data => {
                setAddClient(data.clients[{}]);
                setAddClient(data.clients.filter((data, i) => i > 0));
            });
    }, []);

    const clients = addClient.map((data, i) => {
        const addingClient = users.some(user => user.token === data.token);
        return <Client key={i} {...data} addingClient={addingClient}/>;
    });

    return (
        <>
            <div className={style.mainContainer}>
                <Navbar />
                <div className={style.header}>
                    <h1 className={style.head} >Profil client</h1>
                </div>

                <div className={style.container}>
                <button className={style.buttontestadd} onClick={() => addClient()}>add</button>

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