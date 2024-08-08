'use client';

import GoogleIcon from '@/components/icons/google';
import { Button } from '@/components/ui/button';
import { LogOutIcon } from 'lucide-react';
import { signIn, signOut, useSession } from 'next-auth/react';

export default function LogoutButton() {
  async function handleLogoutClick() {
    await signOut({ callbackUrl: '/' });
  }

  return (
    <Button
      variant={'ghost'}
      className="w-full justify-start gap-2"
      onClick={handleLogoutClick}
    >
      <LogOutIcon size={18} />
      Sair da conta
    </Button>
  );
}
