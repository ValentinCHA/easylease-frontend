import React, { useEffect, useState } from "react";
import style from "../styles/NewClient.module.css";
import Navbar from "./Navbar";
import { addInterlocutor } from "../reducers/user";
import { useDispatch, useSelector } from "react-redux";


function NewClient() {
  // Définir l'état local pour les champs de formulaire
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  console.log(user);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [chiffreAffaire, setChiffreAffaire] = useState("");
  const [interlocName, setInterlocName] = useState("");
  const [phoneNumber, setPhoneNumer] = useState("");
  const [interlocFirstName, setInterlocFirstname] = useState("");
  const [interlocMail, setInterlocMail] = useState("");
  const [interlocJob, setInterlocJob] = useState("");
  const interlocutors = user.interlocutors;
  
  const dropDownInterlocutors = interlocutors.map((e) =>{
    return <li>{e}</li>
  });


  const handleNewInterlocutorSubmit = () =>{
    dispatch(addInterlocutor(
      interlocFirstName + "" + interlocName + "" + "("+interlocJob+ ")" + " " + phoneNumber
    ));
    setPhoneNumer("");
    setInterlocFirstname("");
    setInterlocMail("");
    setInterlocJob("")
  }

  

  return (
    <div className={style.maincontainer}>
      <Navbar />
      <div className={style.header}>
        <h1 className={style.head}>New Client</h1>
      </div>
      <div className={style.container}>
        <div className={style.form}>
          <div className={style.newClientContainer}>
            <span>Création de client</span>
            <div className={style.formContainer}>
              <input
                className={style.input + " " + style.inputNewClient}
                placeholder="Nom"
                type="text"
                onChange={(e) => setName(e.target.value)}
                value={name}
              ></input>
              <input
                className={style.input + " " + style.inputNewClient}
                placeholder="Address"
                type="text"
                onChange={(e) => setAddress(e.target.value)}
                value={address}
              ></input>
              <input
                className={style.input + " " + style.inputNewClient}
                placeholder="Chiffre d'affaires"
                type="text"
                onChange={(e) => setChiffreAffaire(e.target.value)}
                value={chiffreAffaire}
              ></input>
              <form >
                <label for="cars">Nombre d'employés :</label>
                <select className={style.dropdownform}>
                  <option value="1 à 20">1 à 20</option>
                  <option value="20 à 100">20 à 100</option>
                  <option value="100 à 1000">100 à 1000</option>
                </select>
              </form>
              <form >
                <label for="interlocutors">Interlocuteurs: </label>
                <select className={style.dropdownform}>
                  <option value="Paul Dupont">Paul Dupont</option>

                </select>
              </form>
              <ul className={style.interlocutorsListContainer}>
              {dropDownInterlocutors}
              </ul>
            </div>
          </div>
          <div className={style.newInterlocutorContainer}>
            <span>Interlocuteur : </span>
            <input
              className={style.input + " " + style.inputNewInterlocutor}
              placeholder="Numéro de téléphone"
              type="text"
              onChange={(e) => setPhoneNumer(e.target.value)}
              value={phoneNumber}
            ></input>
            <input
              className={style.input + " " + style.inputNewInterlocutor}
              placeholder="Nom"
              type="text"
              onChange={(e) => setInterlocName(e.target.value)}
              value={interlocName}
            ></input>
            <input
              className={style.input + " " + style.inputNewInterlocutor}
              placeholder="Prénom"
              type="text"
              onChange={(e) => setInterlocFirstname(e.target.value)}
              value={interlocFirstName}
            ></input>
            <input
              className={style.input + " " + style.inputNewInterlocutor}
              placeholder="Email"
              type="text"
              onChange={(e) => setInterlocMail(e.target.value)}
              value={interlocMail}
            ></input>
            <input
              className={style.input + " " + style.inputNewInterlocutor}
              placeholder="Poste"
              type="text"
              onChange={(e) => setInterlocJob(e.target.value)}
              value={interlocJob}
            ></input>
            <button
              className={style.button}
              onClick={() => handleNewInterlocutorSubmit()}
            >
              Ajout Interlocuteur
            </button>
          </div>
          <div className={style.buttonNewClientContainer}></div>
        </div>
        <button
          className={style.button}
          onClick={() => handleNewClientSubmit()}
        >
          Création du client
        </button>
      </div>
    </div>
  );
}

export default NewClient;
