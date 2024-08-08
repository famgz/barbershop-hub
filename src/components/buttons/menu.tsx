'use client';

import LoginGoogleButton from '@/components/buttons/login-google';
import LogoutButton from '@/components/buttons/logout';
import GoogleIcon from '@/components/icons/google';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from '@/components/ui/sheet';
import { searchCategories } from '@/constants/categories';
import {
  CalendarIcon,
  HomeIcon,
  LogInIcon,
  LogOutIcon,
  MenuIcon,
} from 'lucide-react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';

export default function MenuButton() {
  const { data } = useSession();
  const user = data?.user;

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
          <div className="border-b py-3">
            {!user ? (
              <div className="flex items-center justify-between gap-3">
                <h2 className="font-bold">Ola, faça seu login</h2>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size={'icon'}>
                      <LogInIcon />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="w-[90%] rounded">
                    <DialogHeader>
                      <DialogTitle>Faça login na plataforma</DialogTitle>
                      <DialogDescription>
                        Conecte-se usando sua conta do Google
                      </DialogDescription>
                    </DialogHeader>
                    <LoginGoogleButton />
                  </DialogContent>
                </Dialog>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={user?.image || ''} />
                  <AvatarFallback>
                    {user.name!.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <p className="font-semibold">{user.name}</p>
                  <p className="text-xs">{user.email}</p>
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-2 border-b py-3">
            <SheetClose asChild>
              <Button className="justify-start gap-2" variant={'ghost'} asChild>
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
            <LogoutButton />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
