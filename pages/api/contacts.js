import fs from 'fs';
import path from 'path';
import { nanoid } from 'nanoid';

export default function handler(req, res) {
  const file = path.join('./public', 'users.json');
  let fileContent = fs.readFileSync(file, 'utf8');
  const users = JSON.parse(fileContent);
  const currentUser = users.find((user) => {
    return user.email === JSON.parse(req.body).email;
  });

  const contacts = [...currentUser.contacts];

  const parsedBody = JSON.parse(req.body);

  if (req.method === 'DELETE') {
    const filteredContacts = contacts.filter((contact) => {
      return contact.id !== parsedBody.contact.id;
    });

    currentUser.contacts = filteredContacts;

    fs.writeFileSync(file, JSON.stringify(users));
    return res
      .status(200)
      .json({ message: 'Deleted!', contacts: filteredContacts });
  }

  if (req.method === 'PATCH') {
    const editedContacts = contacts.map((contact) => {
      if (contact.id !== parsedBody.contact.id) {
        return contact;
      }

      return { name: parsedBody.contact.name, id: contact.id };
    });
    currentUser.contacts = editedContacts;
    fs.writeFileSync(file, JSON.stringify(users));

    return res
      .status(200)
      .json({ message: 'Edited!', contacts: editedContacts });
  }

  if (req.method === 'POST') {
    if (!parsedBody.name) {
      return res
        .status(400)
        .json({ message: 'Invalid input', contacts: contacts });
    }
    contacts.push({ name: parsedBody.name, id: nanoid() });
    currentUser.contacts = contacts;
    fs.writeFileSync(file, JSON.stringify(users));
    return res.status(201).json({ message: 'Created!', contacts: contacts });
  }

  return res.status(405);
}
