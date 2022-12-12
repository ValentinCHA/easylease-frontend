import Head from 'next/head';
import Client from '../components/Clients';

function ClientPage() {
  return (
    <>
      <Head>
        <title>Client / EasyLease</title>
      </Head>
      <Client />
    </>
  );
}

export default ClientPage;