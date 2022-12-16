// Plan d'action pour Nico :
// - route PUT  sur l'interlocuteur du contrat
// - route PUT sur le contrat pour le modifier
// - route DELETE pour supprimer le contrat
// - route PUT pour mette à jour le link du document asscocié au contrat

import React from "react";
import style from "../styles/Contrat.module.css";
import Navbar from "./Navbar";
import { useState, useEffect, useRef } from "react";
import { Modal } from "antd";
import { useSelector } from "react-redux";
import { addId } from "../reducers/contrat";

function Contrat() {
  // état pour montrer la modal
  const [showModalDoc, setShowModalDoc] = useState(false);
  const [showModalInterlocuteur, setShowModalInterlocuteur] = useState(false);
  const [interlocName, setInterlocName] = useState("");
  const [phoneNumber, setPhoneNumer] = useState("");
  const [interlocFirstName, setInterlocFirstname] = useState("");
  const [interlocMail, setInterlocMail] = useState("");
  const [interlocJob, setInterlocJob] = useState("");

  const idContrat = useSelector((state) => state.contrat.value);
  // état pour stocker les datas du contrat récupérer (À ACTIVER LORSQUE LE BACK SERA PRÊT)
  const [dataContrat, setDataContrat] = useState([]);
  const [interlocutorExist, setInterlocutorExist] = useState(false);
  const [dataInterlocuteur, setDataInterlocuteur] = useState([]);
  const [modalSubmitSuccess, setModalSubmitSuccess] = useState(false);

  // Adresse du backend
  const BACKEND_ADDRESS = "http://localhost:3000";

  // état pour récupérer la valeur de l'inputDoc
  const [inputValue, setInputValue] = useState("");

  console.log("idContrat", idContrat);
  console.log("dataInterlocuteur", dataInterlocuteur);
  console.log("dataContrat", dataContrat);

  useEffect(() => {
    //fetch en base du contrat avec son id stocké dans le reducer
    fetch(`http://localhost:3000/contrat/${idContrat._id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("DATA FETCH INITIALISATION =>", data);
        setDataContrat([data.contrat]);
        setDataInterlocuteur([data.contrat.interlocutor]);
      });
  }, []);

  const saveInterlocuteur = () => {
    fetch(`${BACKEND_ADDRESS}/interlocutor/addInterlocuteur`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: interlocName,
        firstname: interlocFirstName,
        poste: interlocJob,
        tel: phoneNumber,
        email: interlocMail,
        client: dataContrat[0].client,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("DATA POST - ADD INTERLOCUTEUR =>", data);
        if (data.result) {
          setDataInterlocuteur([data.newInterlocutor]);
          setInterlocutorExist(true);
          setModalSubmitSuccess(true);
          setInterlocName("");
          setPhoneNumer("");
          setInterlocFirstname("");
          setInterlocMail("");
          setInterlocJob("");
        } else {
          console.log("post new interlocuteur failed");
        }
      });
  };

  const contratData = dataContrat.map((item, i) => {
    console.log("MAP sur dataContrat", item);
    const contratStart = new Date(item.contratStart);
    const contratStartFormattedDate = contratStart.toLocaleDateString();
    const contratEnd = new Date(item.contratEnd);
    const contratEndFormattedDate = contratEnd.toLocaleDateString();

    return (
      <div className={style.data} key={i}>
        <span className={style.texte}>
          Type d'équipements financés : {item.type}
        </span>
        <span className={style.texte}>Montant financé : {item.amount} €</span>
        <span className={style.texte}>
          Durée contractuelle : {item.duration} mois
        </span>
        <span className={style.texte}>
          Date de démarrage : {contratStartFormattedDate}
        </span>
        <span className={style.texte}>
          Date de fin : {contratEndFormattedDate}
        </span>
        <span className={style.texte}>
          Valeur résiduelle : {item.residualValue} %
        </span>
      </div>
    );
  });

  const interlocuteurData = dataInterlocuteur.map((item, i) => {
    console.log("MAP sur dataInterlocuteur", item);
    // à compléter avec les interlocuteurs
    return (
      <div className={style.data} key={i}>
        <span className={style.texte}>Nom : {item.name}</span>
        <span className={style.texte}>Prénom : {item.firstname}</span>
        <span className={style.texte}>Poste : {item.poste}</span>
        <span className={style.texte}>Téléphone : {item.tel}</span>
        <span className={style.texte}>Mail : {item.email}</span>
      </div>
    );
  });

  const handleCloseModal = () => {
    setShowModalDoc(false);
    setShowModalInterlocuteur(false);
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
          <h1 className={style.head}>Contrat : {idContrat.name} </h1>
        </div>
        <div className={style.container}>
          <div className={style.SousContainerLeft}>
            <div className={style.boxData + " " + style.boxData1}>
              <span className={style.titreBoxData}>
                Informations du contrat :
              </span>
              <div className={style.contenuBoxData}>{contratData}</div>
            </div>
            <div className={style.boxData + " " + style.boxData}>
              <span className={style.titreBoxData}>
                Interlocuteur du contrat :
              </span>
              <div className={style.contenuBoxData}>{interlocuteurData}</div>
            </div>
            <div className={style.boxData + " " + style.boxData3}>
              <div className={style.contenuBoxData}>
                <button
                  className={style.button}
                  onClick={() => setShowModalInterlocuteur(true)}
                >
                  Modifier l'interlocuteur
                </button>
              </div>
            </div>
          </div>
          <div className={style.SousContainerRight}>
            <div className={style.boxData + " " + style.boxData4}>
              <div className={style.contenuBoxData}>
                <button className={style.button}>Modifier</button>

                <button className={style.button}>Supprimer</button>
              </div>
            </div>

            <div className={style.boxData + " " + style.boxData5}>
              <span className={style.titreBoxData}>Documents joints : </span>
              <div className={style.contenuBoxData}>
                <img
                  src="/faux-contrat.webp"
                  alt="Image contrat"
                  width="200px"
                  height="200px"
                />
              </div>

              {/* <iframe
                src={`${testPdf}#view=fitH`}
                title="testPdf"
                height="100%"
                width="100%"
              /> */}
            </div>

            <div className={style.boxData + " " + style.boxData6}>
              <div className={style.contenuBoxData}>
                <div>
                  <button
                    onClick={() => setShowModalDoc(true)}
                    className={style.button}
                  >
                    Ajouter un document
                  </button>
                </div>
              </div>
            </div>
          </div>
          <Modal
            onCancel={() => handleCloseModal()}
            open={showModalInterlocuteur}
            footer={null}
          >
            <span>Nouvel Interlocuteur du contrat : </span>
            <div className={style.newInterlocutorContainer}>
              <br />
              <div className={style.InputNewInterlocutorContainer}>
                <input
                  className={style.inputNewInterlocuteur}
                  placeholder="Nom"
                  type="text"
                  onChange={(e) => setInterlocName(e.target.value)}
                  value={interlocName}
                ></input>
                <br />
                <input
                  className={style.inputNewInterlocuteur}
                  placeholder="Prénom"
                  type="text"
                  onChange={(e) => setInterlocFirstname(e.target.value)}
                  value={interlocFirstName}
                ></input>
                <br />
                <input
                  className={style.inputNewInterlocuteur}
                  placeholder="Poste"
                  type="text"
                  onChange={(e) => setInterlocJob(e.target.value)}
                  value={interlocJob}
                ></input>
                <br />
                <input
                  className={style.inputNewInterlocuteur}
                  placeholder="Numéro de téléphone"
                  type="text"
                  onChange={(e) => setPhoneNumer(e.target.value)}
                  value={phoneNumber}
                ></input>
                <br />
                <input
                  className={style.inputNewInterlocuteur}
                  placeholder="Email"
                  type="text"
                  onChange={(e) => setInterlocMail(e.target.value)}
                  value={interlocMail}
                ></input>
                <br />
                <div>
                  <button
                    className={style.button}
                    onClick={() => saveInterlocuteur()}
                  >
                    Enregistrer
                  </button>
                </div>
              </div>
            </div>
          </Modal>
          <Modal
            onCancel={() => handleCloseModal()}
            open={showModalDoc}
            footer={null}
          >
            <div className={style.form}>
              <form>
                <label
                  htmlFor="filePicker"
                  className={style.customFileUpload + " " + style.button}
                >
                  Sélectionner un document
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
                  className={style.customFileUpload + " " + style.button}
                  onClick={() => handleSubmit()}
                >
                  Ajouter
                </button>
              </form>
            </div>
          </Modal>
        </div>
      </div>
    </>
  );
}

export default Contrat;

// Plan d'action pour Nico :
// Bouton modifier l'interloc
// - fait :  POST Interloc pour ajout d'un new interloc en db
// à faire : PUT Contrat pour modifier interloc contrat
// à faire : POST Client pour ajouter interlocuteur

// - route PUT Contrat pour le modifier
// - route DELETE Contrat pour supprimer le contrat
// - route PUT Contrat pour mette à jour le link
