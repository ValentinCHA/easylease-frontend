import React, { useEffect, useState } from "react";
import style from "../styles/AllClients.module.css";
import Navbar from "./Navbar";
import ClientCard from "./ClientCard";
import { addId } from "../reducers/contrat";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import Header  from './Header'


function AllContrat() {
  const router = useRouter();
  const [inputValue, setInputValue] = useState("");
  const [dataClient, setDataClient] = useState([]);

  const afficheNewClientPage =()=>{
    router.push('/newClient')
  }

  const user = useSelector((state) => state.user.value);

  useEffect(() => {
    fetch(`http://localhost:3000/client/test/${user.token}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        if (data.result) {
          // console.log('data find',data.contrat)
          const client = data.userInfos.clients.map((data, i) => {
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
      <Navbar styleAllClients={{backgroundColor: "rgba(0, 217, 255, 0.383)"}}/>
        <Header name="Clients"/>
        <div className={style.container}>
          {/* {/ mon input de recherche /} */}
          <div className={style.search}>
          <div className={style.boxInput}>

            <input className={style.input} onChange={(e) => setInputValue(e.target.value)} type="text" placeholder="  Search contrat....." value={inputValue} />
            <FontAwesomeIcon icon={faMagnifyingGlass} className={style.icon} />
            </div>

            <button className={style.nouveauContrat} onClick={()=>afficheNewClientPage()}>Nouveau Client</button>

          </div>

          {/* {/ div qui contiendra tout mes coponents contrat Card /} */}
          <div className={style.containerClientCard}>
            {infoClient}
          </div>
        </div>
      </div>
    </>
  );
}

export default AllContrat;
