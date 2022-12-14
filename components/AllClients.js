import Navbar from './Navbar';
import style from '../styles/AllClients.module.css'
import ClientCard from './ClientCard'
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from "react";


function AllClients() {

  const [dataClient, setDataClient] = useState([]);
  const user = useSelector((state) => state.user.value);

  useEffect(() => {
    fetch(`http://localhost:3000/client/test/${user.token}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {

          setDataClient(data.clientsInfos);
        }
      });
  }, []);

  function clientsInfos(client) {
    console.log(client);
  }

  return (

    <>
      <Navbar />
      <div className={style.header}>
        <h1 className={style.head} >All Clients</h1>
      </div>
      <div className={style.container}>{dataClient.map((client, i) => {

        return (
          <button className={style.buttonTest}
            onClick={() => clientsInfos(client)}>client {i}</button>
        )
      })}
      </div>
    </>
  )
}

export default AllClients;