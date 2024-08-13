import { db } from '@/lib/prisma';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { NextAuthOptions, Session, User } from 'next-auth';
import { Adapter } from 'next-auth/adapters';
import GoogleProvider from 'next-auth/providers/google';

// module augmentation
declare module 'next-auth' {
  interface Session {
    user: User & {
      id?: string;
    };
  }
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db) as Adapter,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      httpOptions: {
        timeout: 10000,
      },
    }),
  ],
  callbacks: {
    async session({ session, user }: { session: Session; user: User }) {
      if (session.user && user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
};
