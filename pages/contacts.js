import { getSession, signOut } from 'next-auth/client';
import ContactsList from '../components/contacts-list/contacts-list';
import fs from 'fs';
import path from 'path';

function ContactsPage({ contacts = [], session }) {
  function logoutHandler() {
    signOut();
  }
  return (
    <>
      <div>{session.user.email}</div>
      {session && <button onClick={logoutHandler}>Logout</button>}
      <ContactsList contacts={contacts} />
    </>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  console.log(session);

  const file = path.join('./public', 'users.json');

  let fileContent = fs.readFileSync(file, 'utf8');

  const users = JSON.parse(fileContent);

  const currentUser = users.find((user) => user.email === session.user.email);

  return {
    props: { session, contacts: currentUser.contacts },
  };
}

export default ContactsPage;
