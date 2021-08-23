import Contact from '../contact/contact';
import classes from './contacts-list.module.css';

const ContactsList = ({
  contacts,
  session,
  handleDeleteClick,
  handleSaveClick,
}) => {
  return contacts.length ? (
    <>
      <h2 className={classes.title}>Контакты</h2>
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
    </>
  ) : (
    <h2 className={classes.title}>Список контактов пуст</h2>
  );
};

export default ContactsList;
