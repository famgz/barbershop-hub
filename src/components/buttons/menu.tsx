import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from '@/components/ui/sheet';
import { searchCategories } from '@/constants/categories';
import { CalendarIcon, HomeIcon, LogOutIcon, MenuIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function MenuButton() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size={'icon'} variant={'outline'}>
          <MenuIcon />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col gap-0">
        <SheetHeader className="pb-3 text-left">Menu</SheetHeader>

        <div className="hide-scrollbar flex flex-1 flex-col overflow-y-auto">
          <div className="flex items-center gap-3 border-b py-3">
            <Avatar>
              <AvatarImage src="https://github.com/famgz.png" />
            </Avatar>

            <div>
              <p className="font-semibold">Senhor App</p>
              <p className="text-xs">senhor@email.me</p>
            </div>
          </div>

          <div className="flex flex-col gap-2 border-b py-3">
            <SheetClose asChild>
              <Button className="justify-start gap-2" asChild>
                <Link href={'/'}>
                  <HomeIcon size={18} />
                  Início
                </Link>
              </Button>
            </SheetClose>

            <Button className="justify-start gap-2" variant={'ghost'}>
              <CalendarIcon size={18} />
              Agendamentos
            </Button>
          </div>

          <div className="flex flex-1 flex-col gap-0.5 border-b py-3">
            {searchCategories.map((x) => (
              <Button
                className="justify-start gap-2"
                variant={'ghost'}
                key={x.title}
              >
                <div className="relative size-[18px]">
                  <Image
                    src={x.image}
                    alt={x.title}
                    fill
                    className="object-contain"
                  />
                </div>
                {x.title}
              </Button>
            ))}
          </div>

          <div className="pt-3">
            <Button variant={'ghost'} className="w-full justify-start gap-2">
              <LogOutIcon size={18} />
              Sair da conta
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
