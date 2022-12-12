import React from "react";
import style from "../styles/Contrat.module.css";
import Navbar from "./Navbar";
import { useState, useEffect } from "react";
import { Modal } from "antd";
// import { NoStyleItemContext } from "antd/es/form/context";

function Contrat() {
  const [showModal, setShowModal] = useState(false);

  const data = [
    {
      type: "industriel",
      montant: 100,
      duree: 36,
      debut: 2022,
      fin: 2025,
      vr: 20,
    },
  ];

  const interlocuteur = [
    {
      nom: "wentzel",
      prenom: "nico",
      poste: "DG",
      telephone: "0603953820",
      mail: "nicococo@easymoney.com",
    },
  ];
  // const [dataContrat, setDataContrat] = useState([]);

  // useEffect(() => {
  //   //fetch en base du contrat avec son id stocké dans le reducer
  //   fetch(`http://localhost:3000/contrat/:${id}`)
  //     .then((res) => res.json())
  //     .then((data) => setDataContrat(data));
  // }, []);

  const interlocuteurData = interlocuteur.map((item) => {
    return (
      <div className={style.infoInterlocuteur}>
        <span className={style.texte}>Nom : {item.nom}</span>
        <span className={style.texte}>Prénom : {item.prenom}</span>
        <span className={style.texte}>Poste : {item.poste}</span>
        <span className={style.texte}>Téléphone : {item.telephone}</span>
        <span className={style.texte}>Mail : {item.mail}</span>
      </div>
    );
  });

  const contratData = data.map((item) => {
    return (
      <div className={style.infoContrat}>
        <span className={style.texte}>
          Type d'équipements financés : {item.type}
        </span>
        <span className={style.texte}>Montant financé : {item.montant} </span>
        <span className={style.texte}>
          Durée contractuelle : {item.duree} mois
        </span>
        <span className={style.texte}>Date de démarrage : {item.debut}</span>
        <span className={style.texte}>Date de fin : {item.fin}</span>
        <span className={style.texte}>Valeur résiduelle : {item.vr} %</span>
      </div>
    );
  });

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <div className={style.mainContent}>
        <Navbar />
        <div className={style.header}>
          <h1 className={style.head}>Contrat</h1>
        </div>
        <div className={style.container}>
          <div className={style.SousContainerLeft}>
            <div className={style.interlocuteur}>
              <span>Interlocuteur :</span>
              {interlocuteurData}
            </div>
            <div className={style.contrat}>
              <span>Informations du contrat :</span>
              {contratData}
            </div>
          </div>
          <div className={style.SousContainerRight}>
            <div className={style.buttonContainer}>
              <button className={style.button}>Modifier</button>
              <button className={style.button}>Supprimer</button>
            </div>

            <div className={style.docsContainer}>
              <span>Documents joints : </span>
              {/* <iframe
                src={`${testPdf}#view=fitH`}
                title="testPdf"
                height="100%"
                width="100%"
              /> */}
            </div>

            <div className={style.addDoc}>
              <div className={style.ajoutDoc}>
                <button
                  onClick={() => setShowModal(true)}
                  className={style.button}
                >
                  Ajouter un document
                </button>
              </div>
            </div>
          </div>
          <Modal
            onCancel={() => handleCloseModal()}
            open={showModal}
            footer={null}
          >
            <div className={style.form}>
              <form>
                {" "}
                <label>
                  Ajouter un document:
                  <br />
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    className={style.button}
                  />
                </label>
                <br />{" "}
                <button type="submit" className={style.button}>
                  Ajouter{" "}
                </button>{" "}
              </form>
            </div>
          </Modal>
          ;
        </div>
      </div>
    </>
  );
}

export default Contrat;
