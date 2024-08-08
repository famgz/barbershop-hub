import Logo from '@/components/icons/logo';
import SideBar from '@/components/sidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MenuIcon } from 'lucide-react';
import Link from 'next/link';

export default function Header() {
  return (
    <header>
      <Card>
        <CardContent className="flex items-center justify-between p-4">
          <Link href={'/'}>
            <Logo />
          </Link>

          <SideBar />
        </CardContent>
      </Card>
    </header>
  );
}
