import { Button } from '@/components/ui/button';
import { MenuIcon } from 'lucide-react';

export default function MenuButton() {
  return (
    <Button size={'icon'} variant={'outline'}>
      <MenuIcon />
    </Button>
  );
}
