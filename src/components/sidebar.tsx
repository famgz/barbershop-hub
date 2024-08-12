'use client';

import LogoutButton from '@/components/buttons/logout';
import LoginDialog from '@/components/login-dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button, buttonVariants } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from '@/components/ui/sheet';
import { searchCategories } from '@/constants/categories';
import { cn } from '@/lib/utils';
import { CalendarIcon, HomeIcon, LogInIcon, MenuIcon } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function SideBar() {
  const { data } = useSession();
  const router = useRouter();
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
                  <DialogContent className="">
                    <LoginDialog />
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

          <div className="flex flex-col gap-0.5 border-b py-3">
            <SheetClose
              className={cn(
                buttonVariants({ variant: 'ghost' }),
                'justify-start gap-2',
              )}
              onClick={() => router.push(`/bookings`)}
            >
              <HomeIcon size={18} />
              Início
            </SheetClose>

            {user && (
              <SheetClose
                className={cn(
                  buttonVariants({ variant: 'ghost' }),
                  'justify-start gap-2',
                )}
                onClick={() => router.push(`/bookings`)}
              >
                <CalendarIcon size={18} />
                Agendamentos
              </SheetClose>
            )}
          </div>

          <div className="flex flex-1 flex-col gap-0.5 py-3">
            {searchCategories.map((x) => (
              <SheetClose
                key={x.title}
                onClick={() => router.push(`/barbershops?service=${x.title}`)}
                className={cn(
                  buttonVariants({ variant: 'ghost' }),
                  'justify-start gap-2',
                )}
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
              </SheetClose>
            ))}
          </div>

          {user && (
            <div className="border-t pt-3">
              <LogoutButton />
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
