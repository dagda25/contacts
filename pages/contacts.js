import { getSession, signOut } from 'next-auth/client';
import ContactsList from '../components/contacts-list/contacts-list';
import fs from 'fs';
import path from 'path';
import { useState } from 'react';

function ContactsPage({ contacts = [], session }) {
  const [data, setData] = useState(contacts);
  const [newContact, setNewContact] = useState('');

  function logoutHandler() {
    signOut();
  }
  const handleDeleteClick = async (contact) => {
    const result = await fetch('/api/contacts', {
      method: 'DELETE',
      body: JSON.stringify({ contact, email: session.user.email }),
    });

    const json = await result.json();
    setData(json.contacts);
  };

  const handleSaveClick = async (contact) => {
    const result = await fetch('/api/contacts', {
      method: 'PATCH',
      body: JSON.stringify({ contact, email: session.user.email }),
    });

    const json = await result.json();
    setData(json.contacts);
  };

  const handleAddClick = async () => {
    const result = await fetch('/api/contacts', {
      method: 'POST',
      body: JSON.stringify({ name: newContact, email: session.user.email }),
    });
    const json = await result.json();
    setData(json.contacts);
  };
  return (
    <>
      <div>{session.user.email}</div>
      {session && <button onClick={logoutHandler}>Logout</button>}
      <div>
        <input
          type="text"
          value={newContact}
          onChange={(e) => {
            setNewContact(e.target.value);
          }}
        />
        <button onClick={handleAddClick}>Добавить контакт</button>
      </div>
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

  const file = path.join('./public', 'users.json');

  let fileContent = fs.readFileSync(file, 'utf8');

  const users = JSON.parse(fileContent);

  const currentUser = users.find((user) => user.email === session.user.email);

  return {
    props: { session, contacts: currentUser?.contacts || [] },
  };
}

export default ContactsPage;
