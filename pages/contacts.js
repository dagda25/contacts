import { getSession } from 'next-auth/client';
import ContactsList from '../components/contacts-list/contacts-list';

function ContactsPage() {
  return <ContactsList />;
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

  const contacts = [
    { id: 1, name: '111' },
    { id: 2, name: '222' },
    { id: 3, name: '333' },
  ];

  return {
    props: { session, contacts },
  };
}

export default ContactsPage;
