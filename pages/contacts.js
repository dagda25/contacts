import { getSession, signOut } from 'next-auth/client';
import ContactsList from '../components/contacts-list/contacts-list';
import fs from 'fs';
import path from 'path';
import { useState } from 'react';
import Header from '../components/header/header';
import NewContact from '../components/new-contact/new-contact';
import Error from '../components/error/error';

function ContactsPage({ contacts = [], session }) {
  const [data, setData] = useState(contacts);
  const [error, setError] = useState(false);

  function logoutHandler() {
    signOut();
  }
  const handleDeleteClick = async (contact) => {
    setError(false);
    try {
      const result = await fetch('/api/contacts', {
        method: 'DELETE',
        body: JSON.stringify({ contact, email: session.user.email }),
      });
      if (!result.ok) {
        throw new Error();
      }
      const json = await result.json();
      setData(json.contacts);
    } catch {
      setError(true);
    }
  };

  const handleSaveClick = async (contact) => {
    setError(false);
    try {
      const result = await fetch('/api/contacts', {
        method: 'PATCH',
        body: JSON.stringify({ contact, email: session.user.email }),
      });
      if (!result.ok) {
        throw new Error();
      }
      const json = await result.json();
      setData(json.contacts);
    } catch {
      setError(true);
    }
  };

  const handleAddClick = async (newContact) => {
    setError(false);
    try {
      const result = await fetch('/api/contacts', {
        method: 'POST',
        body: JSON.stringify({ name: newContact, email: session.user.email }),
      });
      if (!result.ok) {
        throw new Error();
      }
      const json = await result.json();
      setData(json.contacts);
    } catch {
      setError(true);
    }
  };
  return (
    <>
      <Header session={session} onLogout={logoutHandler} />
      <ContactsList
        handleDeleteClick={handleDeleteClick}
        handleSaveClick={handleSaveClick}
        contacts={data}
        session={session}
      />
      <NewContact handleAddClick={handleAddClick} />
      {error && <Error text="Произошла ошибка! Попробуйте снова." />}
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

  const file = path.join('./public', 'users.json');

  let fileContent = fs.readFileSync(file, 'utf8');

  const users = JSON.parse(fileContent);

  const currentUser = users.find((user) => user.email === session.user.email);

  return {
    props: { session, contacts: currentUser?.contacts || [] },
  };
}

export default ContactsPage;
