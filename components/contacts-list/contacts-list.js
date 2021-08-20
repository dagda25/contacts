import Contact from '../contact/contact';

const ContactsList = ({
  contacts,
  session,
  handleDeleteClick,
  handleSaveClick,
}) => {
  return (
    <ul>
      {contacts.map((contact) => (
        <Contact
          session={session}
          handleDeleteClick={handleDeleteClick}
          handleSaveClick={handleSaveClick}
          contact={contact}
          key={contact.id}
        />
      ))}
    </ul>
  );
};

export default ContactsList;
