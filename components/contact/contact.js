import { useState } from 'react';
import classes from './contact.module.css';

const Contact = ({ contact, handleSaveClick, handleDeleteClick }) => {
  const [editable, setEditable] = useState(false);

  const [name, setName] = useState(contact.name);

  const handleEditClick = async () => {
    setEditable(true);
  };

  const onSave = () => {
    setEditable(false);
    handleSaveClick({ name, id: contact.id });
  };

  return (
    <>
      <li className={classes.contact}>
        {editable ? (
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
            className={classes.input}
          />
        ) : (
          <span className={classes.name}>{name}</span>
        )}
        <div className={classes.buttons}>
          {editable ? (
            <button onClick={onSave} className={classes.button}>
              Сохранить
            </button>
          ) : (
            <button onClick={handleEditClick} className={classes.button}>
              Редактировать
            </button>
          )}
          <button
            onClick={() => handleDeleteClick(contact)}
            className={classes.button}
          >
            Удалить
          </button>
        </div>
      </li>
    </>
  );
};
export default Contact;
