
import React from 'react'
import Navbar from './Navbar';
import style from '../styles/ClientProfil.module.css'
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import client from '../reducers/client';
import { useRouter } from 'next/router'
import { Modal } from "antd";
import Header from "./Header";
Header

function ClientProfil() {
    const router = useRouter()
    console.log('log du query', router.query);
    const [addDocModal, setaddDocModal] = useState(false);
    const [successModifModal, setSuccesModifModal] = useState(false);
    const [errorModifModal, setErrorModifModal] = useState(false);
    const [successDeleteModal, setSuccesDeleteModal] = useState(false);
    const [errorDeleteModal, setErrorDeleteModal] = useState(false);
    const [dataInterlocutor, setDataInterlocutor] = useState([]);
    const [name, setname] = useState("");
    const [clientBirth, setclientBirth] = useState("");
    const [address, setaddress] = useState("");
    const [numberOfEmployees, setnumberOfEmployees] = useState("");
    const [chiffre, setchiffre] = useState("");
    const [interlocutor, setinterlocutor] = useState("");
    const [contrat, setContrat] = useState("");
    const backend_adress = "http://localhost:3000"

    const idClient = useSelector((state) => state.client.value)

    useEffect(() => {

        fetch(`${backend_adress}/client/id/${idClient._id}`)
            .then(res => res.json())
            .then((data) => {
                console.log('le data contrat',data.client.contrats)
                if (data.result) {
                    console.log('dataaaaaaaa',data);
                    setname(data.client.name)
                    setaddress(data.client.address)
                    setnumberOfEmployees(data.client.numberOfEmployees)
                    setclientBirth(data.client.clientBirth)
                    setchiffre(data.client.chiffre)
                    if (!Array.isArray(data.client.interlocutor)) {
                        setinterlocutor([]);
                      } else {
                        setinterlocutor(data.client.interlocutor);
                      }
                    if (!Array.isArray(data.client.contrats)) {
                        setContrat([]);
                      } else {
                        setContrat(data.client.contrats);
                      }
                    }
                  });
    }, [])

    const handleSubmit = () => {
        fetch(`${backend_adress}/client/update/${idClient._id}`, {

            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: name,
                address: address,
                numberOfEmployees: numberOfEmployees,
                clientBirth: clientBirth,
                chiffre: chiffre,
                interlocutor: interlocutor,

            })
        }).then(res => res.json())
            .then(data => {
                console.log("data", data)

                if (data.result) {
                    setname(data.client.name)
                    setaddress(data.client.address)
                    setnumberOfEmployees(data.client.numberOfEmployees)
                    setclientBirth(data.client.clientBirth)
                    setchiffre(data.client.chiffre)
                    if (!Array.isArray(data.client.interlocutor)) {
                        setinterlocutor([]);
                    } else {
                      setinterlocutor(data.client.interlocutor);
                    }
                    setSuccesModifModal(true);

                } else {

                    setErrorModifModal(false);

                }
            })
    }

    const SupprimClient = () => {

        fetch(`${backend_adress}/client/delete/${idClient._id}`, {

            method: "DELETE"
        }).then(res => res.json())
            .then(data => {
                if (data.result) {

                    setSuccesDeleteModal(true);

                } else {
                    console.log("echec")
                    setErrorDeleteModal(false);
                }
            })
    }

    const handleModal = () => {
        setaddDocModal(false);

    };

    const handleDeleteModal = () => {
        setSuccesDeleteModal(false);
        router.push("/allClients")

    };

    const handleCloseModal = () => {
        setSuccesModifModal(false);
        setaddDocModal(false);

    };
console.log("inter",interlocutor)

let interlocutorData 

if(interlocutor){
    interlocutorData = interlocutor.map((data, i) => (
        <li key={i}>Interlocuteur {i+1} : Nom: {data.name} / Email: {data.email} </li>
    
      ));
    }
let contratData 

if(contrat){
    contratData = contrat.map((data, i) => (
        <li key={i}>Contrat {i+1} : Nom: {data.name} </li>
    
      ));
    }

    console.log('console contrat en brrrr',contrat)
    return (
        <>
            <div className={style.mainContainer}>
                <Navbar />
                <div className={style.header}>
                    <h1 className={style.head} >Profil client : {name} </h1>
                </div>
                <div className={style.container}>
                    <div className={style.GridParent}>
                        <div className={style.GridContent}>
                            <div className={style.Infosclient}>
                                <h2>Informations client :</h2>
                                <ul>
                                    <li>Nom entreprise : {name} </li>
                                    <li>Client depuis le : {clientBirth} </li>
                                    <li>Adresse : {address} </li>
                                    <li>Nombre de salariés : {numberOfEmployees} </li>
                                    <li>Chiffre d'affaires : {chiffre} </li>
                                    {interlocutorData}
                
                                </ul>
                            </div>
                            <div className={style.docsContainer}>
                                <h3>Documents joints : </h3>
                                {contratData}
                                
                            </div>
                        </div>
                        <div className={style.ButtonContainer}>
                            <button className={style.buttonModal} onClick={() => setaddDocModal(true)}>Modifier</button>
                            <button className={style.buttonModal} onClick={() => SupprimClient()}>Supprimer</button>
                            <button className={style.buttonModal} onClick={() => handleCloseModal()}>
                                Ajouter un document
                            </button>

                        </div>
                    </div>
                </div>
            </div>
            <Modal onCancel={() => handleModal()} open={addDocModal} footer={null}>
                <div>
                    <div className="modal-modifier">
                        <input type="text" placeholder="Nom entreprise" value={name} onChange={(e) => setname(e.target.value)} />
                    </div>
                    <div className="modal-modifier">
                        <input type="text" placeholder="ancienneté" value={clientBirth} onChange={(e) => setclientBirth(e.target.value)} />
                    </div>
                    <div className="modal-modifier">
                        <input type="text" placeholder="addresse" value={address} onChange={(e) => setaddress(e.target.value)} />
                    </div>
                    <div className="modal-modifier">
                        <input type="text" placeholder="nombre d'employés" value={numberOfEmployees} onChange={(e) => setnumberOfEmployees(e.target.value)} />
                    </div>
                    <div className="modal-modifier">
                        <input type="text" placeholder="CA" value={chiffre} onChange={(e) => setchiffre(e.target.value)} />
                    </div>
                </div>
                <div className={style.form}>
                    <div>
                        <label
                            htmlFor="filePicker"
                            className={style.customFileUpload + " " + style.button}>
                        </label>
                        <br />
                        <button
                            className={style.buttonModif} onClick={() => handleSubmit()}>
                            Modifier
                        </button>
                    </div>
                </div>
            </Modal>
            <Modal
                onCancel={() => handleCloseModal()}
                open={successModifModal}
                footer={null}
            >
                <p style={{ fontSize: 18, textAlign: "center" }}>
                    ✅ client modifié ! ✅
                </p>
            </Modal>
            <Modal
                onCancel={() => handleCloseModal()}
                open={errorModifModal}
                footer={null}
            >
                <p style={{ fontSize: 18, textAlign: "center" }}>
                    ❌ erreur client non modifié ! ❌
                </p>
            </Modal>
            <Modal
                onCancel={() => handleDeleteModal()}
                open={successDeleteModal}
                footer={null}
            >
                <p style={{ fontSize: 18, textAlign: "center" }}>
                    ✅ client supprimé ! ✅
                </p>
            </Modal>
            <Modal
                onCancel={() => handleCloseModal()}
                open={errorDeleteModal}
                footer={null}
            >
                <p style={{ fontSize: 18, textAlign: "center" }}>
                    ❌ erreur client non suprimé ! ❌
                </p>
            </Modal>
        </>
    )
}

export default ClientProfil;

