import { useState } from 'react';

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
          <button onClick={onSave}>Сохранить</button>
        ) : (
          <button onClick={handleEditClick}>Редактировать</button>
        )}
        <button onClick={() => handleDeleteClick(contact)}>Удалить</button>
      </li>
    </>
  );
};
export default Contact;
