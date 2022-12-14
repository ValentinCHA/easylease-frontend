import React, { useEffect, useState } from "react";
import style from "../styles/AllContratPage.module.css";
import Navbar from "./Navbar";
import ContratCard from "./ContratCard";
import { addId } from "../reducers/contrat";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

function AllContrat() {
  const [inputValue, setInputValue] = useState("");
  const [dataContrat, setDataContrat] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/contrat/allContrat")
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          // console.log('data find',data.contrat)
          const contrat = data.contrat.map((data, i) => {
            return {
              _id: data._id,
              client: data.client,
              name: data.name,
              type: data.type,
              durée: data.duration,
              montant: data.amount,
              creationDate: data.creationDate,
              date_de_début: data.contratStart,
              date_de_fin: data.contratEnd,
              valeur_résiduel: data.residualValue,
            };
          });
          setDataContrat(contrat);
        }
      });
  }, []);

  const infoContrat = dataContrat
    .filter((data) => {
      if (inputValue == "") {
        return data;
      } else if (
        data.name.toLocaleLowerCase().includes(inputValue.toLocaleLowerCase())
      ) {
        return data;
      }
    })
    .map((data, i) => {
      return <ContratCard key={i} {...data} id={data._id} />;
    });

  return (
    <>
      {/* {/* navbar et header /} */}
      <div className={style.main}>
        <Navbar />
        <div className={style.header}>
          <h1 className={style.head}>Contrat</h1>
        </div>
        <div className={style.container}>
          {/* {/ mon input de recherche /} */}
          <div className={style.search}>
            <input
              className={style.input}onChange={(e) => setInputValue(e.target.value)}type="text" placeholder="  Search contrat....." value={inputValue}
            />
            <FontAwesomeIcon icon={faMagnifyingGlass} className={style.icon} />
          </div>
          {/* {/ span qui affiche le nom du client /} */}
          <span
            style={{paddingLeft: 120, borderBottom: "2px solid rgb(235,239,242)",}}
          >
            Contrats de l’entreprise “Nom du client” :
          </span>
          {/* {/ div qui contiendra tout mes coponents contrat Card /} */}
          <div className={style.containerContratCard}>{infoContrat}</div>
        </div>
        {/* span voir plus */}
        <span
          style={{display: "flex", justifyContent: "center", alignItems: "center", color: "rgb(101,94,255)" ,cursor: "pointer" ,marginTop: -40,}}
        >
          voir plus...
        </span>
      </div>
    </>
  );
}

export default AllContrat;
