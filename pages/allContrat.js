import Head from 'next/head';
import AllContrat from '../components/AllContrat';
const { redirect } = require("../components/isLogged.js");


function AllContratPage() {
  redirect();
  return (
    <>
      <Head>
        <title>Contrat / EasyLease</title>
      </Head>
      <AllContrat />
    </>
  );
}

export default AllContratPage;
