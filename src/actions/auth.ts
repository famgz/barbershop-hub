'use server';

import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';

export async function getUserElseThrowError() {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  if (!user) throw new Error('Usuário não autenticado');
  return user;
}
