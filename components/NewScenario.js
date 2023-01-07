/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import style from "../styles/NewScenario.module.css";
import styles from "../styles/Settings.module.css"
import { Modal } from "antd";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { addId } from "../reducers/scenario";
import Header from "./Header";
import { Line } from "react-chartjs-2";
import { removeId } from "../reducers/scenario";
import {
  CategoryScale,
  LinearScale,
  ArcElement,
  PointElement,
  LineElement,
} from "chart.js";
import { Chart } from "chart.js";
Chart.register(
  CategoryScale,
  LinearScale,
  ArcElement,
  PointElement,
  LineElement
);

const dataGraphique = {
  labels: [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
    "Janvier",
    "Février",
    "Mars",
  ],
  datasets: [
    {
      label: "Valeur en euros",
      data: [
        100000, 85000, 72250, 61962.5, 53165.625, 45641.40625, 39312.203125,
        33866.671875, 29148.9453125, 25079.21875, 21491.171875,
        18368.5478515625, 10000, 5000, 0,
      ],
      backgroundColor: "rgba(255, 99, 132, 0.2)",
      borderColor: "rgba(255, 99, 132, 1)",
      borderWidth: 1,
      pointBackgroundColor: "#fff",
      pointBorderColor: "rgba(255, 99, 132, 1)",
      pointHoverBackgroundColor: "rgba(255, 99, 132, 1)",
      pointHoverBorderColor: "rgba(255, 99, 132, 1)",
    },
    {
      label: "Ligne horizontale",
      data: [
        20000, 20000, 20000, 20000, 20000, 20000, 20000, 20000, 20000, 20000,
        20000, 20000, 20000, 20000, 20000,
      ],
      borderColor: "green",
      borderWidth: 2,
      pointRadius: 0,
      fill: false,
    },
  ],
};

const optionsGraphique = {
  responsive: true,
  maintainAspectRatio: false,
  //   scales: {
  //     xAxes: [{
  //       type: 'time',
  //       time: {
  //         unit: 'month',
  //       },
  //     }],
  //     yAxes: [{
  //       ticks: {
  //         beginAtZero: true,
  //       },
  //       gridLines: {
  //         drawOnChartArea: false,
  //       },
  //       scaleLabel: {
  //         display: true,
  //         labelString: 'Valeur en euros',
  //       },
  //       scaleOverride: true,
  //       scaleSteps: 8,
  //       scaleStepWidth: 10000,
  //       scaleStartValue: 0,
  //     }],
  //   },
};

function NewScenario() {
  const dispatch = useDispatch();
  const router = useRouter();
  const date = new Date();

  const idScenario = useSelector((state) => state.scenario.value);
  const user = useSelector((state) => state.user.value);

  // const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;

  let BACKEND_ADDRESS = "https://easylease-backend.vercel.app";
  const [selectionClient, setSelectionClient] = useState("");
  const [clientFromCard, setClientFromCard] = useState("");
  const [creationDate, setCreationDate] = useState(
    date.toISOString().substring(0, 10)
  );
  const [scenarioName, setScenarioName] = useState("");
  const [equipementType, setEquipementType] = useState("");
  const [locationDuration, setLocationDuration] = useState("");
  const [amountFinance, setAmountFinance] = useState("");
  const [startDateLocation, setStartDateLocation] = useState("");
  const [endDateLocation, setEndDateLocation] = useState("");
  const [residualValue, setResidualValue] = useState("");
  const [margeValue, setMargeValue] = useState("");

  const [oldScenario, setOldScenario] = useState(false);
  const [modalSaveSuccess, setModalSaveSuccess] = useState(false);

  const [modalSaveFailed, setModalSaveFailed] = useState(false);
  const [modalDeleteSuccess, setModalDeleteSuccess] = useState(false);
  const [modalDeleteFailed, setModalDeleteFailed] = useState(false);
  const [modalModifierFailed, setModalModifierFailed] = useState(false);
  const [modalModifierSuccess, setModalModifierSuccess] = useState(false);
  const [modalSubmitSuccess, setModalSubmitSuccess] = useState(false);
  const [modalSubmitFailed, setModalSubmitFailed] = useState(false);
  const [clientList, setClientList] = useState([]);
  const [oneClient, setOneClient] = useState([]);
  const [selectionInterlocuteur, setSelectionInterlocuteur] = useState({});
  const [selectClientById, setSelectClientById] = useState("");
  const [clientNameFromFetch, setClientNameFromFetch] = useState("");
  const [deleteBtn, setDeleteBtn] = useState(false);
  const [modalSaveInterloc, setModalSaveInterloc] = useState(false);
  const [interlocFilter, setInterlocFilter] = useState([]);
  const [modalInterlocError, setModalInterlocError] = useState(false);
  const [addInterlocutorModal, setAddInterlocutorModal] = useState(false);

  const [interlocName, setInterlocName] = useState("");
  const [phoneNumber, setPhoneNumer] = useState("");
  const [interlocFirstName, setInterlocFirstname] = useState("");
  const [interlocMail, setInterlocMail] = useState("");
  const [interlocJob, setInterlocJob] = useState("");

  const [addInterlocutorSucccess, setAddInterlocutorSuccess] = useState(false);
  const [addInterlocutorFailed, setAddInterlocutorFailed] = useState(false);

  const [handleBeforeDeleteModal, setHandleBeforeDeleteModal] = useState(false);

  // console.log(idScenario)
  // Check si le scenario est déja enregistrer en BDD//

  useEffect(() => {
    if (selectionClient) {
      fetch(`${BACKEND_ADDRESS}/client/${selectionClient}`)
        .then((response) => response.json())
        .then((data) => {
          setOneClient([data.client]);
          setSelectClientById(data.client._id);
          setClientNameFromFetch(data.client.name);
          setInterlocFilter([]);
        });
    }
  }, [selectionClient, deleteBtn]);

  // console.log("ONE CLIENT =>", oneClient);

  useEffect(() => {
    if (!idScenario._id) {
      fetch(`${BACKEND_ADDRESS}/client/test/${user.token}`)
        .then((response) => response.json())
        .then((data) => {
          //console.log("Liste des clients", data.clients);
          setClientList(data.clientsInfos.clients);
        });
    }
    if (idScenario._id) {
      fetch(`${BACKEND_ADDRESS}/scenary/${idScenario._id}`)
        .then((response) => response.json())
        .then((data) => {
          console.log("DATA SCENARIO !!!!!!!!!!!", data);
          if (data.result) {
            console.log(data);
            setOldScenario(data.result);
            fetch(`${BACKEND_ADDRESS}/client/id/${data.scenary.client}`)
              .then((response) => response.json())
              .then((data) => {
                // console.log("DATA 2 EME FETCH", data);
                setClientFromCard(data.client.name);
                setOneClient([data.client]);
              });
            setSelectClientById(data.scenary.client);
            setCreationDate(data.scenary.creationDate.slice(0, 10));
            setScenarioName(data.scenary.name);
            setEquipementType(data.scenary.type);
            setLocationDuration(data.scenary.duration);
            setAmountFinance(data.scenary.amount);
            setStartDateLocation(data.scenary.contratStart.slice(0, 10));
            setEndDateLocation(data.scenary.contratEnd.slice(0, 10));
            setResidualValue(data.scenary.residualValue);
            setMargeValue(data.scenary.marge);
          }
        });
    }
  }, [deleteBtn]);
  // console.log("ID SCENARIO.ID" , idScenario._id);
  // console.log("START DATE =>", startDateLocation);
  // console.log("CLIENT SELECTION =>", selectionClient);
  // console.log("CLIENT LIST", clientList);

  const modification = () => {
    // console.log("Click modification");
    fetch(`${BACKEND_ADDRESS}/scenary/update/${idScenario._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        client: selectClientById,
        name: scenarioName,
        type: equipementType,
        duration: locationDuration,
        amount: amountFinance,
        creationDate: creationDate,
        contratStart: startDateLocation,
        contratEnd: endDateLocation,
        residualValue: residualValue,
        links: "TEST",
        marge: margeValue,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          setModalModifierSuccess(true);
        } else {
          // console.log("DATA PUT=>", data);
          setModalModifierFailed(true);
        }
      });
  };

  const deletion = () => {
    // console.log("Click delete");
    fetch(`${BACKEND_ADDRESS}/scenary/${idScenario._id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          setHandleBeforeDeleteModal(false)
          setModalDeleteSuccess(true);
          setOldScenario(false);
          setCreationDate(date.toISOString().substring(0, 10));
          setScenarioName("");
          setEquipementType("");
          setLocationDuration("");
          setAmountFinance("");
          setStartDateLocation("");
          setEndDateLocation("");
          setResidualValue("");
          setMargeValue("");
        } else {
          setModalDeleteFailed(true);
        }
        // console.log(data);
      });
  };

  const save = () => {
    // console.log("Click enregistrer");
    fetch(`${BACKEND_ADDRESS}/scenary/new/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        client: selectClientById,
        name: scenarioName,
        type: equipementType,
        duration: locationDuration,
        amount: amountFinance,
        creationDate: creationDate,
        contratStart: startDateLocation,
        contratEnd: endDateLocation,
        residualValue: residualValue,
        links: "TEST",
        marge: margeValue,
        token: user.token,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          dispatch(addId(data.infosScenario));
          setModalSaveSuccess(true);
          setOldScenario(true);
          setSelectionClient("");
          setInterval(() => {
            window.location.assign('/allScenario');
          }, 900)
        } else {
          // console.log("DATA =>", data);
          setModalSaveFailed(true);
        }
      });
  };

  // console.log("ID SCENARIO FROM NEW SCENARIO", idScenario);
  // console.log("SELECT CLIENT BY ID", selectClientById);
  // console.log("SCENARIO NAME +>>>>>>>>>>>>>", scenarioName);
  // console.log("SELECTION INTERLOC", selectionInterlocuteur);

  const beforeSubmit = () => {
    setModalSaveInterloc(true);
  };

  const submit = () => {
    if (interlocFilter) {
      if (interlocFilter.length <= 0) {
        setModalInterlocError(true);
        return;
      }
    }
    fetch(`${BACKEND_ADDRESS}/contrat/addContrat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        client: selectClientById,
        name: scenarioName,
        interlocutor: interlocFilter[0]._id,
        type: equipementType,
        duration: locationDuration,
        amount: amountFinance,
        creationDate: creationDate,
        contratStart: startDateLocation,
        contratEnd: endDateLocation,
        residualValue: residualValue,
        links: "TEST",
        marge: margeValue,
        token: user.token,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.result) {
          setModalSaveInterloc(false);
          setModalSubmitSuccess(true);
          setOldScenario(false);
          setSelectionClient("");
          setCreationDate(date.toISOString().substring(0, 10));
          setScenarioName("");
          setEquipementType("");
          setLocationDuration("");
          setAmountFinance("");
          setStartDateLocation("");
          setEndDateLocation("");
          setResidualValue("");
          setMargeValue("");
          //   setTimeout(function(){
          //     router.push('/scenario')
          // },1000);
          if (idScenario._id) {
            fetch(`${BACKEND_ADDRESS}/scenary/${idScenario._id}`, {
              method: "DELETE",
            });
          }
        } else {
          // console.log("DATA ERROR ???", data);
          setModalSubmitFailed(true);
        }
      });
  };

  const cancelModal = () => {
    setModalSaveSuccess(false);
    setModalSaveFailed(false);
    setModalDeleteFailed(false);
    setModalModifierFailed(false);
    setModalModifierSuccess(false);
    setModalSubmitFailed(false);
    setModalSaveInterloc(false);
  };

  const handleOkContrat = () => {
    setModalSubmitSuccess(false);
    router.push("/allContrat");
  };

  const handleSaveScenario = () => {
    setModalSaveSuccess(false);
  };

  const handleDeleteOk = () => {
    setModalDeleteSuccess(false);
    setDeleteBtn(!deleteBtn);
    dispatch(removeId());
  };

  const returnScenario = () => {
    router.push("/allScenario");
  };

  let header;
  if (oldScenario) {
    header = `Nom du scénario : ${scenarioName}`;
  } else {
    header = "Nouveau Scénario";
  }
  // console.log("SECNARIO NAME", scenarioName);
  let clientsListDeroulante;
  if (clientList) {
    clientsListDeroulante = clientList.map((data, i) => {
      return <option key={i}>{data.name}</option>;
    });
  }

  let interlocutorListDeroulante;

  if (oneClient) {
    for (let clients of oneClient) {
      // console.log("ONE CLIENT FOR", clients.interlocutor);
      interlocutorListDeroulante = clients.interlocutor.map((data, i) => {
        return <option key={i}>{data.name}</option>;
      });
    }
  }

  const handleCancelModalInterloc = () => {
    setSelectionInterlocuteur("");
    setModalSaveInterloc(false);
  };

  useEffect(() => {
    setInterlocFilter(
      oneClient[0]
        ? oneClient[0].interlocutor.filter(
            (e) => e.name === selectionInterlocuteur
          )
        : null
    );
  }, [selectionInterlocuteur]);

  //   console.log("INTERLOC FILTER =>", interlocFilter);

  // console.log("creation date", creationDate);
  // console.log("Client selectionné =>", selectionClient);

  const addInterlocutor = () => {
    setModalSaveInterloc(false);
    setAddInterlocutorModal(true);
  };

  const interlocutorModal = () => {
    setAddInterlocutorModal(false);
    setModalSaveInterloc(true);
  };

  const saveInterlocuteur = () => {
    fetch(`${BACKEND_ADDRESS}/client/addInterlocutor`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        client: selectClientById,
        name: interlocName,
        firstname: interlocFirstName,
        phone: phoneNumber,
        poste: interlocJob,
        email: interlocMail,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          setDeleteBtn(!deleteBtn);
          setAddInterlocutorSuccess(true);
          setAddInterlocutorModal(false);
        } else {
          setAddInterlocutorFailed(true);
        }
      });
  };

  // console.log("ID SCENARIO", idScenario._id);

  const closeModalInterlocuteurSuccess = () => {
    setModalSaveInterloc(true);
    setAddInterlocutorSuccess(false);
  };

  const closeModalInterlocuteurFailed = () => {
    setModalSaveInterloc(true);
    setAddInterlocutorFailed(false);
  };

  const beforeDeletion = () => {
    setHandleBeforeDeleteModal(true);
  }

  return (
    <>
      <div className={style.mainContainer}>
        <Navbar styleScenario={{ backgroundColor: "#2A9C90" }} />
        <Header name={header} />
        <div className={style.container}>
          <div className={style.leftSection}>
            {oldScenario && (
              <p className={style.nomClient}>
                Nom du client :{" "}
                {clientNameFromFetch !== ""
                  ? `${clientNameFromFetch}`
                  : `${clientFromCard}`}
              </p>
            )}
            {!oldScenario && <p className={style.para}>Nom du client : </p>}
            {!oldScenario && (
              <select
                className={style.input}
                onChange={(e) => setSelectionClient(e.target.value)}
                value={selectionClient}
                defaultValue
              >
                <option value="" disabled selected hidden>
                  Choisisez un client
                </option>
                {clientsListDeroulante}
              </select>
            )}
            <p className={style.para}>Date de création :</p>
            <input
              className={style.input}
              type="date"
              onChange={(e) => setCreationDate(e.target.value)}
              value={creationDate}
            />
            <p className={style.para}>Nom du scénario :</p>
            <input
              type="text"
              className={style.input}
              onChange={(e) => setScenarioName(e.target.value)}
              value={scenarioName}
              placeholder="Nom du scénario"
            />
            <p className={style.para}>Type d'équipement :</p>
            <select
              className={style.input}
              onChange={(e) => setEquipementType(e.target.value)}
              value={equipementType}
            >
              <option value="" disabled selected hidden>
                Choisisez un equipement
              </option>
              <option>Luminaires</option>
              <option>Informatique</option>
              <option>Automobile</option>
            </select>
            <p className={style.para + " " + style.trois}>Durée (mois) :</p>
            <select
              className={style.input}
              onChange={(e) => setLocationDuration(e.target.value)}
              value={locationDuration}
            >
              <option value="" disabled selected hidden>
                Choisisez une durée de location
              </option>
              <option>12</option>
              <option>24</option>
              <option>36</option>
              <option>48</option>
              <option>60</option>
              <option>72</option>
              <option>84</option>
              <option>96</option>
            </select>
            <p className={style.para}>Montant financé (€) :</p>
            <input
              type="text"
              className={style.input}
              onChange={(e) => setAmountFinance(e.target.value)}
              value={amountFinance}
              placeholder="Montant financé (€)"
            />
            <p className={style.para}>Marge (%) :</p>
            <input
              type="text"
              className={style.input}
              onChange={(e) => setMargeValue(e.target.value)}
              value={margeValue}
              placeholder="Marge (%)"
            />
            <p className={style.para + " " + style.un}>Date de début :</p>
            <input
              className={style.input}
              type="date"
              onChange={(e) => setStartDateLocation(e.target.value)}
              value={startDateLocation}
            />
            <p className={style.para + " " + style.de}>Date de fin :</p>
            <input
              className={style.input}
              type="date"
              onChange={(e) => setEndDateLocation(e.target.value)}
              value={endDateLocation}
            />
            <p className={style.para}>Valeur résiduelle :</p>
            <select
              className={style.input}
              onChange={(e) => setResidualValue(e.target.value)}
              value={residualValue}
            >
              <option value="" disabled selected hidden>
                Choisisez une valeur résiduelle
              </option>
              <option>5</option>
              <option>10</option>
              <option>15</option>
              <option>20</option>
              <option>25</option>
              <option>30</option>
            </select>
          </div>
          <div className={style.rightSection}>
            <div className={style.buttonsTop}>
              {oldScenario && (
                <button className={style.button} onClick={() => modification()}>
                  Modifier
                </button>
              )}
              {oldScenario && (
                <button className={style.button} onClick={() => beforeDeletion()}>
                  Supprimer
                </button>
              )}
              {!oldScenario && (
                <button className={style.button} onClick={() => save()}>
                  Enregistrer
                </button>
              )}
            </div>
            <div className={style.graphic}>
              {dataGraphique && (
                <Line data={dataGraphique} options={optionsGraphique} />
              )}
            </div>
            <div className={style.buttonBottom}>
              <button
                className={style.button + " " + style.bottomBtn}
                onClick={() => beforeSubmit()}
              >
                Valider ce scénario en contrat
              </button>
            </div>
          </div>
          <Modal
            onCancel={() => handleSaveScenario()}
            open={modalSaveSuccess}
            footer={null}
            className={style.modalSuccess}
          >
            <p
              style={{ fontSize: 22, textAlign: "center" }}
              className={style.modalSave}
            >
              ✅ Scénario eneregistré ! ✅
            </p>
            <p
              style={{ fontSize: 22, textAlign: "center" }}
              className={style.modalSave}
            >
              Redirection en cours ...
            </p>
            <div className={style.divSaveBtnModal}>
              {/* <button
                className={style.button + " " + style.scenarioBtnModal}
                onClick={() => returnScenario()}
              >
                Retourner sur la page scenarios
              </button> */}
            </div>
          </Modal>
          <Modal
            onCancel={() => handleCancelModalInterloc()}
            open={modalSaveInterloc}
            footer={null}
            className={style.modalSuccess}
          >
            <p style={{ fontSize: 18, textAlign: "center" }}>
              Merci de choisir un interlocuteur pour ce scénario :
            </p>
            <select
              className={style.input + " " + style.inputModalInterlocuteur}
              onChange={(e) => setSelectionInterlocuteur(e.target.value)}
              value={selectionInterlocuteur}
              defaultValue
            >
              <option value="" selected hidden>
                Choisisez un interlocuteur
              </option>
              {interlocutorListDeroulante}
            </select>
            <p
              style={{ fontSize: 17, textAlign: "center" }}
              className={style.interlocModal}
            >
              L'interlocuteur n'est pas dans la liste ?{" "}
            </p>
            <div className={style.divSaveBtnModal}>
              <button
                className={style.button + " " + style.scenarioBtnModal}
                onClick={() => addInterlocutor()}
              >
                Ajout interlocuteur
              </button>
              <button
                className={style.button + " " + style.scenarioBtnModal}
                onClick={() => submit()}
              >
                Valider le scenario !
              </button>
            </div>
          </Modal>
          <Modal
            onCancel={() => interlocutorModal(false)}
            open={addInterlocutorModal}
            footer={null}
          >
            <div className={style.modalInterContainer}>
              <span className={style.textInterModal}>
                Nouvel Interlocuteur contrat :{" "}
              </span>
              <br />
              <div className={style.InputNewInterlocutorContainer}>
                <input
                  className={style.input + " " + style.inputInterloc}
                  placeholder="Nom"
                  type="text"
                  onChange={(e) => setInterlocName(e.target.value)}
                  value={interlocName}
                ></input>
                <br />
                <input
                  className={style.input + " " + style.inputInterloc}
                  placeholder="Prénom"
                  type="text"
                  onChange={(e) => setInterlocFirstname(e.target.value)}
                  value={interlocFirstName}
                ></input>
                <br />
                <input
                  className={style.input + " " + style.inputInterloc}
                  placeholder="Poste"
                  type="text"
                  onChange={(e) => setInterlocJob(e.target.value)}
                  value={interlocJob}
                ></input>
                <br />
                <input
                  className={style.input + " " + style.inputInterloc}
                  placeholder="Numéro de téléphone"
                  type="text"
                  onChange={(e) => setPhoneNumer(e.target.value)}
                  value={phoneNumber}
                ></input>
                <br />
                <input
                  className={style.input + " " + style.inputInterloc}
                  placeholder="Email"
                  type="text"
                  onChange={(e) => setInterlocMail(e.target.value)}
                  value={interlocMail}
                ></input>
                <br />
                <div>
                  <button
                    className={style.button + " " + style.btnInterModal}
                    onClick={() => saveInterlocuteur()}
                  >
                    Enregistrer
                  </button>
                </div>
              </div>
            </div>
          </Modal>
          <Modal
            onCancel={() => cancelModal()}
            open={modalSaveFailed}
            footer={null}
          >
            <p style={{ fontSize: 18, textAlign: "center" }}>
              ❌ Merci de remplir tous les champs ! ❌
            </p>
          </Modal>
          <Modal
            onCancel={() => handleDeleteOk()}
            open={modalDeleteSuccess}
            footer={null}
          >
            <p style={{ fontSize: 18, textAlign: "center" }}>
              ✅ Scenario supprimé ! ✅
            </p>
          </Modal>
          <Modal
            onCancel={() => cancelModal()}
            open={modalDeleteFailed}
            footer={null}
          >
            <p style={{ fontSize: 18, textAlign: "center" }}>
              ❌ Scenario non supprimé ! ❌
            </p>
          </Modal>
          <Modal
            onCancel={() => cancelModal()}
            open={modalModifierSuccess}
            footer={null}
          >
            <p style={{ fontSize: 18, textAlign: "center" }}>
              ✅ Scenario modifié ! ✅
            </p>
          </Modal>
          <Modal
            onCancel={() => cancelModal()}
            open={modalModifierFailed}
            footer={null}
          >
            <p style={{ fontSize: 18, textAlign: "center" }}>
              ❌ Scenario non modifié ! ❌
            </p>
          </Modal>
          <Modal
            onCancel={() => handleOkContrat()}
            open={modalSubmitSuccess}
            footer={null}
          >
            <p style={{ fontSize: 18, textAlign: "center" }}>
              ✅ Scenario validé et transformé en contrat ! ✅
            </p>
          </Modal>
          <Modal
            onCancel={() => cancelModal()}
            open={modalSubmitFailed}
            footer={null}
          >
            <p style={{ fontSize: 18, textAlign: "center" }}>
              ❌ Echec de la transformation en contrat ! ❌
            </p>
          </Modal>
          <Modal
            onCancel={() => setModalInterlocError(false)}
            open={modalInterlocError}
            footer={null}
          >
            <p style={{ fontSize: 18, textAlign: "center" }}>
              ❌ Vous n'avez pas choisi d'interlocuteur ! ❌
            </p>
          </Modal>
          <Modal
            onCancel={() => closeModalInterlocuteurFailed(false)}
            open={addInterlocutorFailed}
            footer={null}
          >
            <p style={{ fontSize: 18, textAlign: "center" }}>
              ❌ L'ajout à échoué ! ❌
            </p>
          </Modal>
          <Modal
            onCancel={() => closeModalInterlocuteurSuccess()}
            open={addInterlocutorSucccess}
            footer={null}
          >
            <p style={{ fontSize: 18, textAlign: "center" }}>
              ✅ Interlocuteur ajouté ! ✅
            </p>
          </Modal>
          <Modal footer={null} open={handleBeforeDeleteModal} onCancel={() => setHandleBeforeDeleteModal(false)}>
                <div className={styles.modalContainer}>
                  <span className={styles.paragraphe}>Etes vous sur de vouloir supprimer ce scénario ?</span>
                  <div className={styles.buttonsConfirmation}>
                  <button
                    className={styles.button + " " + styles.deleteAccount}
                    onClick={() => deletion()}
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
        </div>
      </div>
    </>
  );
}

export default NewScenario;
