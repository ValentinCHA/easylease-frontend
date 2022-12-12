import Head from 'next/head';
import NewClient from '../components/NewClient';

function NewClientPage() {
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