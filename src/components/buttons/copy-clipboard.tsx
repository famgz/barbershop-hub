'use client';

import { Button } from '@/components/ui/button';
import { ReactNode } from 'react';
import { toast } from 'sonner';

interface Props {
  text: string;
  children: ReactNode;
}

export default function CopyClipboardButton({ text, children }: Props) {
  return (
    <Button
      variant={'outline'}
      size={'sm'}
      onClick={() => {
        navigator.clipboard.writeText(text);
        toast.success('Telefone copiado', { duration: 1000 });
      }}
    >
      {children}
    </Button>
  );
}
