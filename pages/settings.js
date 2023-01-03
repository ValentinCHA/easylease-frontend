const { redirect } = require("../components/isLogged.js");
import Head from 'next/head';
import Settings from '../components/Settings';

function SettingsPage() {
  redirect();
  return (
    <>
      <Head>
        <title>Settings</title>
      </Head>
      <Settings />
    </>
  );
}

export default SettingsPage;