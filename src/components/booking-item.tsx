'use client';

import BarbershopContactItem from '@/components/barbershop-contact-item';
import BookingBadge from '@/components/booking-badge';
import BookingCancelModal from '@/components/booking-cancel-modal';
import BookingCard from '@/components/booking-card';
import BookingRatingModal from '@/components/booking-rating-modal';
import ServiceInfoCard from '@/components/service-info-card';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { buttonVariants } from '@/components/ui/button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { Prisma } from '@prisma/client';
import { format, isFuture } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import Image from 'next/image';
import { useState } from 'react';

interface Props {
  booking: Prisma.BookingGetPayload<{
    include: { service: { include: { barbershop: true } } };
  }>;
}

export default function BookingItem({ booking }: Props) {
  const barbershop = booking.service.barbershop;
  const isBookingConfirmed = isFuture(booking.date);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  return (
    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
      <SheetTrigger className="w-full cursor-pointer">
        <BookingCard booking={booking} />
      </SheetTrigger>

      <SheetContent className="flex w-[min(85%,500px)] flex-col gap-0 p-0">
        <SheetHeader className="border-b p-5">
          <SheetTitle className="text-left">Informações da Reserva</SheetTitle>
        </SheetHeader>

        <div className="flex-1 space-y-6 p-5">
          {/* Map and barbershop info */}
          <div className="relative h-[180px] w-full overflow-hidden rounded-md">
            <Image
              src="/map.jpg"
              fill
              className="object-cover"
              alt="map image"
              sizes="350px"
            />

            <div className="absolute bottom-3 left-3 right-3 flex items-center gap-3 rounded-md bg-background p-3">
              <Avatar>
                <AvatarImage
                  src={barbershop.imageUrl}
                  alt={barbershop.imageUrl}
                />
              </Avatar>

              <div className="flex flex-col gap-0.5">
                <h3 className="text-sm font-semibold">{barbershop.name}</h3>
                <p className="truncate text-xs font-light">
                  {barbershop.address}
                </p>
              </div>
            </div>
          </div>

          {/* booking details */}
          <div className="space-y-3">
            <BookingBadge date={booking.date} />

            <ServiceInfoCard
              service={booking.service}
              barbershopName={barbershop.name}
              date={booking.date}
              time={format(booking.date, 'hh:mm', { locale: ptBR })}
            />
          </div>

          {/* barbershop phones */}
          <div className="space-y-1.5">
            {barbershop.phones.map((phone, i) => (
              <BarbershopContactItem key={i} phone={phone} />
            ))}
          </div>
        </div>

        {/* buttons */}
        <SheetFooter className="flex-row gap-3 p-5">
          <SheetClose
            className={cn(buttonVariants({ variant: 'secondary' }), 'w-full')}
          >
            Voltar
          </SheetClose>

          {isBookingConfirmed ? (
            <BookingCancelModal
              bookingId={booking.id}
              callbackFn={() => setIsSheetOpen(false)}
            />
          ) : (
            <BookingRatingModal bookingId={booking.id} />
          )}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
