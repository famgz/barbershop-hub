import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import Logo from '@/components/icons/logo';
import SideBar from '@/components/sidebar';
import { Card, CardContent } from '@/components/ui/card';
import { getServerSession } from 'next-auth';
import Link from 'next/link';

export default async function Header() {
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
