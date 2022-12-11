import React, {useState} from "react";
import styles from "../styles/Login.module.css";
import { Button, Modal } from 'antd';

function Login() {

    let url="https://google.com";
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [firstPassword, setFirstPassword] = useState('');
    const [firstLogin, setFirstLogin] = useState('');
    const [firstLoginModal, setFirstLoginModal] = useState(false);
    const [firstLoginModalUser, setFirstLoginModalUser] = useState(false);
    const [forgetPasswordModal, setForgetPasswordModal] = useState(false);

    let isAdmin = true;

    console.log("USERNAME =>", username);
    console.log("PASSWORD =>", password);

    const handleFirstLogin = () => {
        console.log("Click Première connexion");
        if (isAdmin) {
            setFirstLoginModal(true);
            console.log("MODAL ?", firstLoginModal);
            return
        }
        setFirstLoginModalUser(true);
    };

    const handleCancelFirstLogin = () => {
        setFirstLoginModal(false);
        setFirstLoginModalUser(false);
      };

     const handleCancelForgetPassword = () => {
        setForgetPasswordModal(false);
     }


    const handleForgotPassword = () => {
        console.log("Click mdp oublié");
        setForgetPasswordModal(true);
    };

    const handleSubmit = () => {
        console.log("Click on submit");
    };

    const handleSignUpSubmit = () => {
        console.log("Sign Up Submit");
    };

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
            <input type="text" className={styles.input} onChange={(e) => setUsername(e.target.value)} value={username} placeholder="E-mail" />
            <span className={styles.links + ' ' + styles.first} onClick={() => handleFirstLogin()}>Première connexion ?</span>
            <span className={styles.desc + ' ' + styles.mdp}>Mot de passe :</span>
            <input type="password" className={styles.input} onChange={(e) => setPassword(e.target.value)} value={password} placeholder="Mot de passe" />
            <span className={styles.links} onClick={() => handleForgotPassword()}>Mot de passe oublié ?</span>
            <button className={styles.button} onClick={() => handleSubmit()}>Connexion</button>
        </div>
        <a href={url} target="_blank" className={styles.textContent}>Conditions d'utilisation</a>
        </div>
        <img
          className={styles.imgRight}
          src="/droiteaccueil.png"
          alt="Logo droite"
        />

        <Modal onCancel={() => handleCancelFirstLogin()} open={firstLoginModal} footer={null}>
            <div className={styles.loginBoxModal}>
            <h2 className={styles.title}>Bienvenue chez EasyLease</h2>
            <span className={styles.desc + ' ' + styles.descModal}>Nouvel identifiant / e-mail :</span>
            <input type="text" className={styles.input + ' ' + styles.inputModal} onChange={(e) => setFirstLogin(e.target.value)} value={firstLogin} placeholder="E-mail" />
            <span className={styles.desc + ' ' + styles.mdpModal + ' ' + styles.descModal}>Nouveau mot de passe :</span>
            <input type="password" className={styles.input} onChange={(e) => setFirstPassword(e.target.value)} value={firstPassword} placeholder="Mot de passe" />
            <button className={styles.button + ' ' + styles.modalBtn} onClick={() => handleSignUpSubmit()}>Création de compte</button>
            </div>
        </Modal>

        <Modal onCancel={() => handleCancelFirstLogin()} open={firstLoginModalUser} footer={null}>
            <p style={{fontSize: 18, textAlign: 'center'}}>Vous n'êtes pas l'administrateur vous ne pouvez pas vous créer de compte. Veuillez contacter l'administrateur !</p>
        </Modal>

        <Modal onCancel={() => handleCancelForgetPassword()} open={forgetPasswordModal} footer={null}>
            <p style={{fontSize: 18, textAlign: 'center'}}>Merci de contacter l'administrateur en charge de votre compte !</p>
        </Modal>
      </div>
    </>
  );
}

export default Login;
