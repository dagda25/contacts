import fs from 'fs';
import path from 'path';

async function handler(req, res) {
  if (req.method !== 'POST') {
    return;
  }

  const data = req.body;

  const { email, password } = data;

  if (
    !email ||
    !email.includes('@') ||
    !password ||
    password.trim().length < 7
  ) {
    res.status(422).json({
      message:
        'Invalid input - password should also be at least 7 characters long.',
    });
    return;
  }

  const file = path.join('./public', 'users.json');

  let fileContent = fs.readFileSync(file, 'utf8');

  const users = JSON.parse(fileContent);

  const existingUser = users.find((user) => user.email === email);
  if (existingUser) {
    res
      .status(422)
      .json({ message: 'User exists already!', users: fileContent });
    return;
  }

  users.push({ email, password });
  fs.writeFileSync(file, JSON.stringify(users));

  res.status(201).json({ message: 'Created user!' });
}

export default handler;
