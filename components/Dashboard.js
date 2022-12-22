import React, {useState, useEffect} from 'react';
import styles from '../styles/Dashboard.module.css'
import Navbar from './Navbar';
import Header from './Header';

import { Doughnut } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
// import 'chart.js/dist/Chart.css';


function Dashboard() {

  const [datasContrats, setDatasContrats] = useState([]);

  let BACKEND_ADDRESS = "http://localhost:3000";

  useEffect(() => {
    fetch(`${BACKEND_ADDRESS}/contrat/allContrat`)
    .then(response => response.json())
    .then(data => {
      console.log("DATA FROM DASHBOARD FROM ALL CONTRATS", data);
      setDatasContrats(data.contrat)
    })
}, []);

  console.log("DATA CONTRATS =>", datasContrats);
  let CArealise = 0;
  let objCA = 45000000;
  let objMarge = 0.1 * objCA;
  let margeRea = 0;
  if (datasContrats.length > 0) {
    for (let items of datasContrats) {
      margeRea += ((items.marge/ 100) * items.amount)
      CArealise += items.amount
    }
  }

  
const dataMarge = {
  labels: [`Objectif marge : ${objMarge}€`, `Marge réalisée : ${margeRea.toFixed(2)}€`],
  datasets: [
    {
      data: [objMarge, margeRea],  // chiffre d'affaires et marge réalisée en euros
      backgroundColor: ['#FF6384', '#36A2EB'],
      hoverBackgroundColor: ['#FF6384', '#36A2EB']
    }
  ]
};

const dataCA = {
  labels: [`Objectif CA : ${objCA}€`, `CA réalisée : ${CArealise.toFixed(2)}€`],
  datasets: [
    {
      data: [objCA, CArealise],  // chiffre d'affaires et marge réalisée en euros
      backgroundColor: ['#FF6384', '#36A2EB'],
      hoverBackgroundColor: ['#FF6384', '#36A2EB']
    }
  ]
};

  console.log("CA", CArealise);
  console.log("MARGE REA", margeRea);
  console.log("OBJ marge", objMarge);

  return (
    <div className={styles.mainContainer}>
    <Navbar styleDashboard={{backgroundColor: "2A9C90"}}/>
    <Header name ="Dashboard"/>
    <div className={styles.container}>
      <div className={styles.allGraphics}>
      <div className={styles.graphic}>
      <Doughnut
        data={dataMarge}
        className={styles.diagramme}
        options={{
          maintainAspectRatio: false,
          tooltips: {
            callbacks: {
              label: function(tooltipItem, data) {
                let value = data.datasets[0].data[tooltipItem.index];
                value = value.toString();
                value = value.split(/(?=(?:...)*$)/);
                value = value.join('.');
                return value + ' €';
              }
            }
          }
        }}
      />
      </div>
      <div className={styles.graphic}>
      <Doughnut
        data={dataCA}
        className={styles.diagramme}
        options={{
          maintainAspectRatio: false,
          tooltips: {
            callbacks: {
              label: function(tooltipItem, data) {
                let value = data.datasets[0].data[tooltipItem.index];
                value = value.toString();
                value = value.split(/(?=(?:...)*$)/);
                value = value.join('.');
                return value + ' €';
              }
            }
          }
        }}
      />
      </div>
      </div>
      <div className={styles.pourcentageDiag}>
        <div className={styles.left}>
          <span className={styles.pourcentage}>Le CA réalisée est de : <span className={styles.gras}>{(100 * CArealise/objCA).toFixed(2)}%</span> sur l'objectif total</span>
        </div>
        <div className={styles.right}>
          <span className={styles.pourcentage}>La marge réalisée est de : <span className={styles.gras}>{(100 * margeRea/objMarge).toFixed(2)}%</span> sur l'objectif total</span>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Dashboard;
