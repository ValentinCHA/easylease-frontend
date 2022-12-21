import React from "react";
import Navbar from "./Navbar";
import style from "../styles/ClientProfil.module.css";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import client from "../reducers/client";
import { useRouter } from "next/router";
import { Modal } from "antd";
import Header from "./Header";
Header

function ClientProfil() {
  const router = useRouter();
  console.log("log du query", router.query);
  const [addDocModal, setaddDocModal] = useState(false);
  const [name, setname] = useState(router.query.name);
  const [clientBirth, setclientBirth] = useState(router.query.clientBirth);
  const [address, setaddress] = useState(router.query.address);
  const [numberOfEmployees, setnumberOfEmployees] = useState(
    router.query.numberOfEmployees
  );
  const [chiffre, setchiffre] = useState(router.query.chiffre);
  const [interlocutor, setinterlocutor] = useState(router.query.interlocutor);

  // function handleSubmit(params) {
  //    fetch.........qui va PUT les modif dans le back pour client**********
  // }
  // faire route delete*****
  // ajouter document******
  // modifier le modele du client en ajoutant un link comme dans le modele contrat

  const handleModal = () => {
    setaddDocModal(false);
  };
  return (
    <>
      <div className={style.mainContainer}>
        <Navbar />
        <Header name="Profil Client"/>
        <div className={style.container}>
          <div className={style.GridParent}>
            <div className={style.GridContent}>
              <div className={style.Infosclient}>
                <h2>Informations client : </h2>
                <ul>
                  <li>Nom entreprise : {router.query.name}</li>
                  <li>Client depuis le : {router.query.clientBirth}</li>
                  <li>Adresse : {router.query.address}</li>
                  <li>
                    Nombre de salariés : {router.query.numberOfEmployees}{" "}
                  </li>
                  <li>Chiffre d'affaires : {router.query.chiffre} </li>
                  <li>Interlocuteur : {router.query.interlocutor} </li>
                </ul>
                <button
                  className={style.buttonmodifier}
                  onClick={() => setaddDocModal(true)}
                >
                  Modifier
                </button>
                <button
                  className={style.buttonsupprimer}
                  onClick={() => SupprimClient()}
                >
                  Supprimer
                </button>
              </div>
              <div className={style.docsContainer}>
                <h3>Documents joints : </h3>
                <button
                  className={style.buttonModal}
                  onClick={() => modifClient()}
                >
                  Ajouter un document
                </button>
              </div>
            </div>
            <div className={style.ButtonContainer}></div>
          </div>
        </div>
      </div>
      <Modal onCancel={() => handleModal()} open={addDocModal} footer={null}>
        <form>
          <div className="modal-modifier">
            <input
              type="text"
              placeholder="Nom entreprise"
              value={name}
              onChange={(e) => setname(e.target.value)}
            />
          </div>
          <div className="modal-modifier">
            <input
              type="text"
              placeholder="ancienneté"
              value={clientBirth}
              onChange={(e) => setclientBirth(e.target.value)}
            />
          </div>
          <div className="modal-modifier">
            <input
              type="text"
              placeholder="addresse"
              value={address}
              onChange={(e) => setaddress(e.target.value)}
            />
          </div>
          <div className="modal-modifier">
            <input
              type="text"
              placeholder="nombre d'employés"
              value={numberOfEmployees}
              onChange={(e) => setnumberOfEmployees(e.target.value)}
            />
          </div>
          <div className="modal-modifier">
            <input
              type="text"
              placeholder="CA"
              value={chiffre}
              onChange={(e) => setchiffre(e.target.value)}
            />
          </div>
          <div className="modal-modifier">
            <input
              type="text"
              placeholder="interlocuteur"
              value={interlocutor}
              onChange={(e) => setinterlocutor(e.target.value)}
            />
          </div>
        </form>
        <div className={style.form}>
          <form>
            <label
              htmlFor="filePicker"
              className={style.customFileUpload + " " + style.button}
            ></label>
            <br />
            <button
              type="submit"
              className={style.buttonModif}
              onClick={() => handleSubmit()}
            >
              Modifier
            </button>
          </form>
        </div>
      </Modal>
    </>
  );
}

export default ClientProfil;
