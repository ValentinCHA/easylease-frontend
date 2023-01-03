const { redirect } = require("../components/isLogged.js");
import Head from 'next/head';
import ClientProfil from '../components/ClientProfil';

function clientProfilPage() {
redirect();
  return (
    <>
      <Head>
        <title>clientProfil / EasyLease</title>
      </Head>
      <ClientProfil />
    </>
  );
}

export default clientProfilPage;