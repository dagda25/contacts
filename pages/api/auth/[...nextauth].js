import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

import fs from 'fs';
import path from 'path';

export default NextAuth({
  session: {
    jwt: true,
  },
  providers: [
    Providers.Credentials({
      async authorize(credentials) {
        const file = path.join('./public', 'users.json');
        let fileContent = fs.readFileSync(file, 'utf-8');
        console.log(fileContent, '16');
        const users = JSON.parse(fileContent);
        console.log(users, '18');
        const user = users.find((user) => user.email === credentials.email);
        console.log(user, '22');

        if (!user) {
          throw new Error('No user found!');
        }

        const isValid = user.password === credentials.password;
        console.log(isValid);

        if (!isValid) {
          throw new Error('Could not log you in!');
        }

        return { email: user.email };
      },
    }),
  ],
});