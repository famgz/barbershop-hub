import Logo from '@/components/icons/logo';
import SideBar from '@/components/sidebar';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';

export default async function Header() {
  return (
    <header>
      <Card className="">
        <CardContent className="container flex items-center justify-between p-4">
          <Link href={'/'}>
            <Logo />
          </Link>

          <SideBar />
        </CardContent>
      </Card>
    </header>
  );
}
