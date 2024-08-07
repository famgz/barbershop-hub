import { Button } from '@/components/ui/button';
import { ChevronLeftIcon } from 'lucide-react';
import Link from 'next/link';

export default function BackButton() {
  return (
    <Button size={'icon'} variant={'outline'} asChild>
      <Link href={'/'}>
        <ChevronLeftIcon />
      </Link>
    </Button>
  );
}
