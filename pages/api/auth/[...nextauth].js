import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

import fs from 'fs';
import path from 'path';
import { verifyPassword } from '../../../lib/auth';

export default NextAuth({
  session: {
    jwt: true,
  },
  providers: [
    Providers.Credentials({
      async authorize(credentials) {
        //const file = path.join('./public', 'users.json');
        const file = path.join('/', 'users.json');
        let fileContent = fs.readFileSync('/users.json', 'utf-8');
        const users = JSON.parse(fileContent);
        const user = users.find((user) => user.email === credentials.email);

        if (!user) {
          throw new Error('No user found!');
        }

        const isValid = await verifyPassword(
          credentials.password,
          user.password
        );

        if (!isValid) {
          throw new Error('Could not log you in!');
        }

        return { email: user.email };
      },
    }),
  ],
});
