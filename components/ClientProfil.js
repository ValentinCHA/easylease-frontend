import React from "react";
import Navbar from "./Navbar";
import style from "../styles/ClientProfil.module.css";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { Modal } from "antd";
import Header from "./Header";
import styles from "../styles/Settings.module.css"
Header;

function ClientProfil() {
  const router = useRouter();
  console.log("log du query", router.query);
  const [addDocModal, setaddDocModal] = useState(false);
  const [successModifModal, setSuccesModifModal] = useState(false);
  const [errorModifModal, setErrorModifModal] = useState(false);
  const [successDeleteModal, setSuccesDeleteModal] = useState(false);
  const [errorDeleteModal, setErrorDeleteModal] = useState(false);
  const [name, setname] = useState("");
  const [clientBirth, setclientBirth] = useState("");
  const [address, setaddress] = useState("");
  const [numberOfEmployees, setnumberOfEmployees] = useState("");
  const [chiffre, setchiffre] = useState("");
  const [interlocutor, setinterlocutor] = useState("");
  const [contrat, setContrat] = useState("");
  const [handleBeforeDeleteModal, setHandleBeforeDeleteModal] = useState(false);

  const backend_adress = "https://easylease-backend.vercel.app";

  const clientBirthDate = new Date(clientBirth);
  const clientBirthDateFormated = clientBirthDate.toLocaleDateString();

  const idClient = useSelector((state) => state.client.value);

  useEffect(() => {
    fetch(`${backend_adress}/client/id/${idClient._id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("le data contrat", data.client.contrats);
        if (data.result) {
          console.log("dataaaaaaaa", data);
          setname(data.client.name);
          setaddress(data.client.address);
          setnumberOfEmployees(data.client.numberOfEmployees);
          setclientBirth(data.client.clientBirth);
          setchiffre(data.client.chiffre);
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
  }, []);

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
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("data", data);

        if (data.result) {
          setname(data.client.name);
          setaddress(data.client.address);
          setnumberOfEmployees(data.client.numberOfEmployees);
          setclientBirth(data.client.clientBirth);
          setchiffre(data.client.chiffre);
          if (!Array.isArray(data.client.interlocutor)) {
            setinterlocutor([]);
          } else {
            setinterlocutor(data.client.interlocutor);
          }
          setSuccesModifModal(true);
        } else {
          setErrorModifModal(false);
        }
      });
  };

  const SupprimClient = () => {
    fetch(`${backend_adress}/client/delete/${idClient._id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("DATA FROM DELETE CLIENT", data.result);
        if (data.result) {
          setSuccesDeleteModal(true);
        } else {
          console.log("echec");
          setErrorDeleteModal(true);
        }
      });
  };

  const handleModal = () => {
    setaddDocModal(false);
  };

  const handleDeleteModal = () => {
    setSuccesDeleteModal(false);
    router.push("/allClients");
  };

  const handleCloseModal = () => {
    setSuccesModifModal(false);
    setaddDocModal(false);
  };

  console.log("inter", interlocutor);

  let interlocutorData;
  console.log("Infos interlocuteur =>", interlocutor);
  if (interlocutor) {
    interlocutorData = interlocutor.map((data, i) => (
      <li key={i}>
        Interlocuteur {i + 1} : {data.firstname} {data.name}
      </li>
    ));
  }
  let contratData;

  if (contrat) {
    contratData = contrat.map((data, i) => (
      <li key={i}>
        Contrat {i + 1} : Nom: {data.name}{" "}
      </li>
    ));
  }

  return (
    <>
      <div className={style.mainContainer}>
        <Navbar styleAllClients={{ backgroundColor: "#2A9C90" }} />
        <Header name={name} />
        <div className={style.container}>
          <div className={style.GridParent}>
            <div className={style.GridContent}>
              <div className={style.Infosclient}>
                <h2>Informations client :</h2>
                <ul>
                  <li>Nom entreprise : {name} </li>
                  <li>Client depuis le : {clientBirthDateFormated} </li>
                  <li>Adresse : {address} </li>
                  <li>Nombre de salariés : {numberOfEmployees} </li>
                  <li>Chiffre d'affaires : {chiffre} </li>
                  {interlocutorData}
                </ul>
                <div className={style.buttoncontainer}>
                  <button
                    className={style.buttonModal}
                    onClick={() => setaddDocModal(true)}
                  >
                    Modifier
                  </button>
                  <button
                    className={style.buttonModal}
                    onClick={() =>  setHandleBeforeDeleteModal(true)}
                  >
                    Supprimer
                  </button>
                </div>
              </div>
              <div className={style.docsContainer}>
                <h3>Documents joints : </h3>
                {contratData}
                {/* <button
                  className={style.buttonModal}
                  onClick={() => handleCloseModal()}
                >
                  Ajouter un document
                </button> */}
              </div>
            </div>
            {/* <div className={style.ButtonContainer}></div> */}
          </div>
        </div>
      </div>
      <Modal className={style.modalUpdateClient} onCancel={() => handleModal()} open={addDocModal} footer={null}>
        <div>
          <div className="modal-modifier">
            <p>Nom entreprise : </p>
            <input
              type="text"
              placeholder="Nom entreprise"
              value={name}
              onChange={(e) => setname(e.target.value)}
            />
          </div>
          <div className="modal-modifier">
          <p>Ancienneté du client : </p>
            <input
              type="text"
              placeholder="ancienneté"
              value={clientBirth}
              onChange={(e) => setclientBirth(e.target.value)}
            />
          </div>
          <div className="modal-modifier">
          <p>Adresse : </p>
            <input
              type="text"
              placeholder="addresse"
              value={address}
              onChange={(e) => setaddress(e.target.value)}
            />
          </div>
          <div className="modal-modifier">
          <p>Nombre d'employés : </p>
            <input
              type="text"
              placeholder="nombre d'employés"
              value={numberOfEmployees}
              onChange={(e) => setnumberOfEmployees(e.target.value)}
            />
          </div>
          <div className="modal-modifier">
          <p>Chiffre d'affaires : </p>
            <input
              type="text"
              placeholder="CA"
              value={chiffre}
              onChange={(e) => setchiffre(e.target.value)}
            />
          </div>
        </div>
        <div className={style.form}>
          <div>
            <label
              htmlFor="filePicker"
              className={style.customFileUpload + " " + style.button}
            ></label>
            <br />
            <button
              className={style.buttonModif}
              onClick={() => handleSubmit()}
            >
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
          ✅ Client modifié ! ✅
        </p>
      </Modal>
      <Modal
        onCancel={() => handleCloseModal()}
        open={errorModifModal}
        footer={null}
      >
        <p style={{ fontSize: 18, textAlign: "center" }}>
          ❌ Erreur client non modifié ! ❌
        </p>
      </Modal>
      <Modal
        onCancel={() => handleDeleteModal()}
        open={successDeleteModal}
        footer={null}
      >
        <p style={{ fontSize: 18, textAlign: "center" }}>
          ✅ Client supprimé ! ✅
        </p>
      </Modal>
      <Modal
        onCancel={() => setErrorDeleteModal(false)}
        open={errorDeleteModal}
        footer={null}
      >
        <p style={{ fontSize: 18, textAlign: "center" }}>
          ❌ Erreur client non suprimé car il dispose de contrat(s) ou de scenario(s) à son nom ! ❌
        </p>
        <p style={{ fontSize: 18, textAlign: "center" }}>
          Veuillez les supprimer avant de réessayer. 
        </p>
      </Modal>
      <Modal footer={null} open={handleBeforeDeleteModal} onCancel={() => setHandleBeforeDeleteModal(false)}>
                <div className={styles.modalContainer}>
                  <span className={styles.paragraphe}>Etes vous sur de vouloir supprimer ce client ?</span>
                  <div className={styles.buttonsConfirmation}>
                  <button
                    className={styles.button + " " + styles.deleteAccount}
                    onClick={() => SupprimClient()}
                  >
                    Oui
                  </button>
                  <button
                    className={styles.button + " " + styles.right}
                    onClick={() => setHandleBeforeDeleteModal(false)}
                  >
                    Non
                  </button>
                  </div>
                </div>
              </Modal>
    </>
  );
}

export default ClientProfil;
