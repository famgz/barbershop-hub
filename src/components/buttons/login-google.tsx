'use client';

import GoogleIcon from '@/components/icons/google';
import { Button } from '@/components/ui/button';
import { signIn, useSession } from 'next-auth/react';

export default function LoginGoogleButton() {
  async function handleLoginWithGoogleClick() {
    await signIn('google');
  }

  return (
    <Button
      className="flex items-center gap-2"
      variant={'outline'}
      onClick={handleLoginWithGoogleClick}
    >
      <GoogleIcon className="size-4" />
      <span className="font-bold">Google</span>
    </Button>
  );
}
