import { useState } from 'react';
import classes from './new-contact.module.css';

const NewContact = ({ handleAddClick }) => {
  const [newContact, setNewContact] = useState('');
  return (
    <div className={classes.form}>
      <input
        className={classes.input}
        type="text"
        value={newContact}
        onChange={(e) => {
          setNewContact(e.target.value);
        }}
      />
      <button
        className={classes.button}
        onClick={() => handleAddClick(newContact)}
      >
        Добавить контакт
      </button>
    </div>
  );
};

export default NewContact;
