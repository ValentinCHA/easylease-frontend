const { redirect } = require("../components/isLogged.js");
import Head from 'next/head';
import Login from '../components/Login';

function LoginPage() {
  redirect();
  return (
    <>
      <Head>
        <title>Login / EasyLease</title>
      </Head>
      <Login />
    </>
  );
}

export default LoginPage;
