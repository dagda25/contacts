import { useState } from 'react';
import classes from './new-contact.module.css';

const NewContact = ({ handleAddClick }) => {
  const [newContact, setNewContact] = useState('');
  const onSubmit = (event) => {
    event.preventDefault();
    handleAddClick(newContact);
  };
  return (
    <form className={classes.form} onSubmit={onSubmit}>
      <input
        className={classes.input}
        type="text"
        value={newContact}
        onChange={(e) => {
          setNewContact(e.target.value);
        }}
        required
      />
      <button className={classes.button}>Добавить контакт</button>
    </form>
  );
};

export default NewContact;
