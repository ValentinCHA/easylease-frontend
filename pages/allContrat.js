const { redirect } = require("../components/isLogged.js");
import Head from 'next/head';
import AllContrat from '../components/AllContrat';


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
