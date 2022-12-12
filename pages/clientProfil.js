import Head from 'next/head';
import ClientProfil from '../components/ClientProfil';

function clientProfilPage() {

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