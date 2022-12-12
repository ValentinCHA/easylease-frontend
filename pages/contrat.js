import Head from 'next/head';
import Contacts from '../components/Contrat';

function ContactsPage() {
  return (
    <>
      <Head>
        <title>Contact / EasyLease</title>
      </Head>
      <Contacts />
    </>
  );
}

export default ContactsPage;