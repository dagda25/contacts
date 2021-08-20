import { getSession, signOut } from 'next-auth/client';
import ContactsList from '../components/contacts-list/contacts-list';
import fs from 'fs';
import path from 'path';
import { useState } from 'react';

function ContactsPage({ contacts = [], session }) {
  const [data, setData] = useState(contacts);
  function logoutHandler() {
    signOut();
  }
  const handleDeleteClick = async (contact) => {
    console.log(contact);
    await fetch('/api/contacts', {
      method: 'DELETE',
      body: JSON.stringify({ contact, email: session.user.email }),
    });
    setData(() => {
      return data.filter((c) => {
        return c.id !== contact.id;
      });
    });
  };

  const handleSaveClick = async () => {
    setEditable(false);
    await fetch('/api/contacts', {
      method: 'PATCH',
      body: JSON.stringify(...contact),
    });
  };
  return (
    <>
      <div>{session.user.email}</div>
      {session && <button onClick={logoutHandler}>Logout</button>}
      <ContactsList
        handleDeleteClick={handleDeleteClick}
        handleSaveClick={handleSaveClick}
        contacts={data}
        session={session}
      />
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
    props: { session, contacts: currentUser?.contacts || [] },
  };
}

export default ContactsPage;
