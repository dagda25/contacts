import Contact from '../contact/contact';

const ContactsList = ({ contacts }) => {
  return (
    <ul>
      {contacts.map((contact) => (
        <Contact contact={contact} key={contact.id} />
      ))}
    </ul>
  );
};

export default ContactsList;
