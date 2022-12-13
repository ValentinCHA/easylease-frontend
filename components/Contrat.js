import React from "react";
import style from "../styles/Contrat.module.css";
import Navbar from "./Navbar";
import { useState, useEffect, useRef } from "react";
import { Modal } from "antd";
import { useSelector } from "react-redux";
import { addId } from "../reducers/contrat";

function Contrat() {
  // état pour montrer la modal
  const [showModal, setShowModal] = useState(false);
  const idContrat = useSelector((state) => state.contrat.value);
  // état pour stocker les datas du contrat récupérer (À ACTIVER LORSQUE LE BACK SERA PRÊT)
  const [dataContrat, setDataContrat] = useState([]);
  const [dataInterlocuteur, setDataInterlocuteur] = useState([]);

  // Adresse du backend
  const BACKEND_ADDRESS = "http://localhost:3000";

  // état pour récupérer la valeur de l'inputDoc
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    //fetch en base du contrat avec son id stocké dans le reducer
    fetch(`http://localhost:3000/contrat/contrat/${idContrat}`)
      .then((res) => res.json())
      .then((data) => setDataContrat([data.contrat]));
  }, []);

  // const interlocuteurData = dataInterlocuteur.contrat.map((item) => {
  //   return (
  //     <div className={style.infoInterlocuteur}>
  //       <span className={style.texte}>Nom : {item.nom}</span>
  //       <span className={style.texte}>Prénom : {item.prenom}</span>
  //       <span className={style.texte}>Poste : {item.poste}</span>
  //       <span className={style.texte}>Téléphone : {item.telephone}</span>
  //       <span className={style.texte}>Mail : {item.mail}</span>
  //     </div>
  //   );
  // });

  console.log(dataContrat);

  const contratData = dataContrat.map((item, i) => {
    return (
      <div className={style.infoContrat}>
        <span className={style.texte}>
          Type d'équipements financés : {item.type}
        </span>
        <span className={style.texte}>Montant financé : {item.amount} </span>
        <span className={style.texte}>
          Durée contractuelle : {item.duration} mois
        </span>
        <span className={style.texte}>
          Date de démarrage : {item.contratStart}
        </span>
        <span className={style.texte}>Date de fin : {item.contratEnd}</span>
        <span className={style.texte}>
          Valeur résiduelle : {item.residualValue} %
        </span>
      </div>
    );
  });

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };
  const handleSubmit = () => {
    // requete POST qui doit enregistrer le PDF dans la DB du contrat du client
    // fetch(`${BACKEND_ADDRESS}/`, {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ document: document }),
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     data.result;
    //   });
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
              {/* {interlocuteurData} */}
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
                <label
                  htmlFor="filePicker"
                  className={style.customFileUpload + " " + style.button}
                >
                  Ajouter un document
                </label>
                {inputValue}
                <br />
                <input
                  className={style.fileUpload}
                  type="file"
                  id="filePicker"
                  onChange={handleChange}
                  value={inputValue}
                />
                <br />
                <button
                  type="submit"
                  className={style.button}
                  onClick={() => handleSubmit()}
                >
                  Ajouter
                </button>
              </form>
            </div>
          </Modal>
          ;
        </div>
      </div>
    </>
  );
}

//test

export default Contrat;
