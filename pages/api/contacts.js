import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const file = path.join('./public', 'users.json');
  let fileContent = fs.readFileSync(file, 'utf8');
  const users = JSON.parse(fileContent);

  if (req.method === 'DELETE') {
    const currentUser = users.find((user) => {
      return user.email === JSON.parse(req.body).email;
    });

    const contacts = [...currentUser.contacts];

    const filteredContacts = contacts.filter((contact) => {
      return contact.id === JSON.parse(req.body).id;
    });
    currentUser.contacts = filteredContacts;

    fs.writeFileSync(file, JSON.stringify(users));
    return res.status(200).json({ message: 'Deleted!' });
  }

  if (req.method === 'PATCH') {
    console.log(req.body);
    return res.status(200).json({ message: 'Edited!' });
  }
  res.status(200).json({ name: 'John Doe' });
}
