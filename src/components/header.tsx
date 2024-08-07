import MenuButton from '@/components/buttons/menu';
import Logo from '@/components/icons/logo';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MenuIcon } from 'lucide-react';

export default function Header() {
  return (
    <header>
      <Card>
        <CardContent className="flex items-center justify-between p-4">
          <Logo />

          <MenuButton />
        </CardContent>
      </Card>
    </header>
  );
}
