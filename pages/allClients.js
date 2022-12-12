import Head from 'next/head';
import AllClients from '../components/AllClients';

function AllClientsPage() {
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