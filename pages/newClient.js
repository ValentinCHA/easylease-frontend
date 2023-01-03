const { redirect } = require("../components/isLogged.js");
import Head from 'next/head';
import NewClient from '../components/NewClient';

function NewClientPage() {
  redirect();
  return (
    <>
      <Head>
        <title>Nouveau Client / EasyLease</title>
      </Head>
 
      <NewClient />
    </>
  );
}

export default NewClientPage;