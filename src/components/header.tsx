import Logo from '@/components/icons/logo';
import SideBar from '@/components/sidebar';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';

export default async function Header() {
  return (
    <header>
      <Card className="">
        <CardContent className="container flex items-center justify-between p-4">
          <Link
            href={'/'}
            className="relative aspect-[1000/290] h-9 w-auto shrink-0"
          >
            <Image src="/logo.png" fill className="object-contain" alt="Logo" />
          </Link>

          <SideBar />
        </CardContent>
      </Card>
    </header>
  );
}
