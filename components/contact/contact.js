import { useState } from 'react';

const Contact = ({ contact, handleSaveClick, handleDeleteClick }) => {
  const [editable, setEditable] = useState(false);
  const [name, setName] = useState(contact.name);

  const handleEditClick = async () => {
    setEditable(true);
  };

  return (
    <>
      <li>
        {editable ? (
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        ) : (
          <span>{name}</span>
        )}
        {editable ? (
          <button onClick={handleSaveClick}>Сохранить</button>
        ) : (
          <button onClick={handleEditClick}>Редактировать</button>
        )}
        <button onClick={() => handleDeleteClick(contact)}>Удалить</button>
      </li>
    </>
  );
};
export default Contact;
