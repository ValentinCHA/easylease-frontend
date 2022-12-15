import React, { useEffect, useState } from "react";
import style from "../styles/AllClients.module.css";
import Navbar from "./Navbar";
import ClientCard from "./ClientCard";
import { addId } from "../reducers/contrat";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";

function AllContrat() {
  const [inputValue, setInputValue] = useState("");
  const [dataClient, setDataClient] = useState([]);

  const user = useSelector((state) => state.user.value);

  useEffect(() => {
    fetch(`http://localhost:3000/client/test/${user.token}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          // console.log('data find',data.contrat)
          const client = data.clientsInfos.map((data, i) => {
            return {
              _id: data._id,
              name: data.name,
              address: data.address,
              numberOfEmployees: data.numberOfEmployees,
              clientBirth: data.clientBirth,
              chiffre: data.chiffre,

            };
          });
          setDataClient(client);
        }
      });
  }, []);

  const infoClient = dataClient.filter((data) => {
    if (inputValue == "") {
      return data;
    } else if (
      data.name.toLocaleLowerCase().includes(inputValue.toLocaleLowerCase())
    ) {
      return data;
    }
  })
    .map((data, i) => {
      return <ClientCard key={i} {...data} id={data._id} />;
    });

  return (
    <>
      {/* {/* navbar et header /} */}
      <div className={style.main}>
        <Navbar />
        <div className={style.header}>
          <h1 className={style.head}>AllClients</h1>
        </div>
        <div className={style.container}>
          {/* {/ mon input de recherche /} */}
          <div className={style.search}>
            <input className={style.input} onChange={(e) => setInputValue(e.target.value)} type="text" placeholder="  Search contrat....." value={inputValue} />
            <FontAwesomeIcon icon={faMagnifyingGlass} className={style.icon} />
          </div>
          {/* {/ span qui affiche le nom du client /} */}
          <span
            style={{ paddingLeft: 120, borderBottom: "2px solid rgb(235,239,242)" }}>Contrats de l’entreprise “Nom du client” :</span>
          {/* {/ div qui contiendra tout mes coponents contrat Card /} */}
          <div className={style.containerClientCard}>{infoClient}</div>
        </div>
        {/* span voir plus */}
        <span
          style={{ display: "flex", justifyContent: "center", alignItems: "center", color: "rgb(101,94,255)", cursor: "pointer", marginTop: -40, }}>voir plus...</span>
      </div>
    </>
  );
}

export default AllContrat;
