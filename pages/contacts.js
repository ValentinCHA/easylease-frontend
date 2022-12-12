import Head from 'next/head';
import Contacts from '../components/Contacts';

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