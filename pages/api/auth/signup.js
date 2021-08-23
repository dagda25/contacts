import fs from 'fs';
import path from 'path';
import { hashPassword } from '../../../lib/auth';
import { nanoid } from 'nanoid';

async function handler(req, res) {
  if (req.method !== 'POST') {
    return;
  }

  const { email, password } = req.body;

  if (
    !email ||
    !email.includes('@') ||
    !password ||
    password.trim().length < 3
  ) {
    res.status(422).json({
      message: 'Invalid input',
    });
    return;
  }

  //const file = path.join('./public', 'users.json');
  const file = path.join('/', 'users.json');

  let fileContent = fs.readFileSync('/users.json', 'utf8');

  const users = JSON.parse(fileContent);

  const existingUser = users.find((user) => user.email === email);
  if (existingUser) {
    res
      .status(422)
      .json({ message: 'User exists already!', users: fileContent });
    return;
  }

  const hashedPassword = await hashPassword(password);

  users.push({
    email,
    password: hashedPassword,
    contacts: [{ name: 'My first contact', id: nanoid() }],
  });
  fs.writeFileSync(file, JSON.stringify(users));

  res.status(201).json({ message: 'Created user!' });
}

export default handler;
