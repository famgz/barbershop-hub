import Logo from '@/components/icons/logo';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MenuIcon } from 'lucide-react';

export default function Header() {
  return (
    <Card>
      <CardContent className="flex items-center justify-between p-4">
        <Logo />
        <Button size={'icon'} variant={'outline'}>
          <MenuIcon />
        </Button>
      </CardContent>
    </Card>
  );
}
