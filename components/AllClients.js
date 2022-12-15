import React from 'react'
import Navbar from './Navbar';
import style from '../styles/AllClients.module.css'
import ClientCard from './ClientCard'
import { useDispatch, useSelector } from 'react-redux';


function AllClients(props) {

  const user = useSelector((state) => state.user.value);

  const dispatch = useDispatch();

  if (!user.token) {
    return;
  }

  fetch(`http://localhost:3000/users/test/${user.token}`)
    .then(response => response.json())
    .then(data => {
      if (data.result && data.client) {
        if (props.isClient) {
          dispatch(removeclient(props));
        } else {
          dispatch(addClient(props));
        }
      }
    });


return (
  <>
    <Navbar />
    <div className={style.header}>
      <button className={style.buttontestadd} onClick={() => handleClientClick()}>add</button>

      <h1 className={style.head} >All Clients</h1>
    </div>
    <div className={style.container}>

    </div>
  </>
)
}

export default AllClients;