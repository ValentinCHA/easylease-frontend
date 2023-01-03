const { redirect } = require("../components/isLogged.js");
import Head from 'next/head';
import AllClients from '../components/AllClients';


function AllClientsPage() {
  redirect();
  return (
    <>
      <Head>
        <title>AllClients / EasyLease</title>
      </Head>
      <AllClients />
    </>
  );
}

export default AllClientsPage;