import React, {useState} from "react";
import Image from "next/image";
import styles from "../styles/Login.module.css";

function Login() {

    let url="https://google.com";
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    console.log("USERNAME =>", username);
    console.log("PASSWORD =>", password);

    const handleFirstLogin = () => {
        console.log("Click Première connexion");
    };

    const handleForgotPassword = () => {
        console.log("Click mdp oublié");
    };

    const handleSubmit = () => {
        console.log("Click on submit");
    }

  return (
    <>
      <div className={styles.mainSection}>
        <img
          className={styles.imgLeft}
          src="/gaucheaccueil.png"
          alt="Logo gauche"
        />
        <div className={styles.loginContainer}>
        <img className={styles.logo} src="/E.png" alt="Logo EasyLease" />
        <div className={styles.loginBox}>
            <h2 className={styles.title}>Connectez vous à votre espace</h2>
            <span className={styles.desc}>Identifiant / e-mail :</span>
            <input type="text" className={styles.input} onChange={(e) => setUsername(e.target.value)} value={username} placeholder="Username" />
            <span className={styles.links + ' ' + styles.first} onClick={() => handleFirstLogin()}>Première connexion ?</span>
            <span className={styles.desc + ' ' + styles.mdp}>Mot de passe :</span>
            <input type="password" className={styles.input} onChange={(e) => setPassword(e.target.value)} value={password} placeholder="Password" />
            <span className={styles.links} onClick={() => handleForgotPassword()}>Mot de passe oublié ?</span>
            <button className={styles.button} onClick={() => handleSubmit()}>Connection</button>
        </div>
        <a href={url} target="_blank" className={styles.textContent}>Conditions d'utilisation</a>
        </div>
        <img
          className={styles.imgRight}
          src="/droiteaccueil.png"
          alt="Logo droite"
        />
      </div>
    </>
  );
}

export default Login;
