import React, { useState, useEffect } from "react";
import styles from "../styles/Dashboard.module.css";
import Navbar from "./Navbar";
import Header from "./Header";
import { useSelector } from "react-redux";

import { Doughnut } from "react-chartjs-2";
import { Bar } from "react-chartjs-2";
// eslint-disable-next-line no-unused-vars
import Chart from "chart.js/auto";

function Dashboard() {
  const [datasContrats, setDatasContrats] = useState([]);
  const user = useSelector((state) => state.user.value);

  let BACKEND_ADDRESS = "https://easylease-backend.vercel.app";

  useEffect(() => {
    fetch(`${BACKEND_ADDRESS}/contrat/${user.token}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("DATA FROM DASHBOARD FROM TOKEN CONTRATS", data);
        setDatasContrats(data.userInfos.contrats);
      });
  }, []);

  console.log("DATA CONTRATS =>", datasContrats);
  let CArealise = 0;
  let objCA = 20000000;
  let objMarge = 0.1 * objCA;
  let margeRea = 0;
  if (datasContrats.length > 0) {
    for (let items of datasContrats) {
      margeRea += (items.marge / 100) * items.amount;
      CArealise += items.amount;
    }
  }

  const dataMarge = {
    labels: [
      `Objectif marge : ${objMarge}€`,
      `Marge réalisée : ${margeRea.toFixed(2)}€`,
    ],
    datasets: [
      {
        data: [objMarge, margeRea], // chiffre d'affaires et marge réalisée en euros
        backgroundColor: ["#FF6384", "#36A2EB"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB"],
      },
    ],
  };

  const dataCA = {
    labels: [
      `Objectif CA : ${objCA}€`,
      `CA réalisée : ${CArealise.toFixed(2)}€`,
    ],
    datasets: [
      {
        data: [objCA, CArealise], // chiffre d'affaires et marge réalisée en euros
        backgroundColor: ["#FF6384", "#36A2EB"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB"],
      },
    ],
  };

  const dataBarCa = {
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
    ],
    datasets: [
      {
        label: "Chiffre d'affaires",
        data: [
          400000, 350000, 380000, 410000, 370000, 430000, 390000, 420000,
          450000, 440000, 460000, 430000,
        ],
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

  const optionsBarCa = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            suggestedMax: 500000,
          },
        },
      ],
    },
    annotation: {
      drawTime: "afterDraw", // définit le moment où la ligne sera dessinée
      annotations: [
        {
          type: "line",
          mode: "horizontal",
          scaleID: "y-axis-0",
          value: 450000,
          borderColor: "blue", // couleur de la ligne : bleue
          borderWidth: 2,
          label: {
            content: "Objectif de chiffre d'affaires",
            enabled: true,
            position: "right",
          },
        },
      ],
    },
  };

  console.log("CA", CArealise);
  console.log("MARGE REA", margeRea);
  console.log("OBJ marge", objMarge);

  return (
    <>
      <div className={styles.mainContainer}>
        <Navbar styleDashboard={{ backgroundColor: "#2A9C90" }} />
        <Header name="Dashboard" />
        <div className={styles.container}>
          <div className={styles.allGraphics}>
            <div className={styles.graphic}>
              <Doughnut
                data={dataCA}
                className={styles.diagramme}
                options={{
                  maintainAspectRatio: false,
                  tooltips: {
                    callbacks: {
                      label: function (tooltipItem, data) {
                        let value = data.datasets[0].data[tooltipItem.index];
                        value = value.toString();
                        value = value.split(/(?=(?:...)*$)/);
                        value = value.join(".");
                        return value + " €";
                      },
                    },
                  },
                }}
              />
            </div>
            <div className={styles.graphic}>
              <Doughnut
                data={dataMarge}
                className={styles.diagramme}
                options={{
                  maintainAspectRatio: false,
                  tooltips: {
                    callbacks: {
                      label: function (tooltipItem, data) {
                        let value = data.datasets[0].data[tooltipItem.index];
                        value = value.toString();
                        value = value.split(/(?=(?:...)*$)/);
                        value = value.join(".");
                        return value + " €";
                      },
                    },
                  },
                }}
              />
            </div>
          </div>
          <div className={styles.pourcentageDiag}>
            <div className={styles.left}>
              <span className={styles.pourcentage}>
                <span className={styles.gras}>
                  {((100 * CArealise) / objCA).toFixed(2)}%
                </span>
              </span>
            </div>
            <div className={styles.right}>
              <span className={styles.pourcentage}>
                <span className={styles.gras}>
                  {((100 * margeRea) / objMarge).toFixed(2)}%
                </span>
              </span>
            </div>
          </div>
          <div className={styles.graphicBar}>
            <Bar data={dataBarCa} options={optionsBarCa} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
