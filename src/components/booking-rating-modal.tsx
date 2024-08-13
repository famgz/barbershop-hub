'use client';

import { updateBookingRating } from '@/actions/booking';
import { Button, buttonVariants } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { Booking } from '@prisma/client';
import { StarIcon } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

interface Props {
  booking: Booking;
}

export default function BookingRatingModal({ booking }: Props) {
  const [rating, setRating] = useState(booking.rating || 0);

  async function handleSubmitClick() {
    try {
      await updateBookingRating({ bookingId: booking.id, rating });
      toast.success('Serviço avaliado com sucesso', {
        position: 'top-center',
      });
    } catch (err) {
      toast.error('Erro ao avaliar o serviço. Tente novamente', {
        position: 'top-center',
      });
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={'default'} className="w-full">
          Avaliar
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Avalie sua experiência</DialogTitle>
        </DialogHeader>

        <DialogDescription className="text-center text-muted-foreground">
          Toque nas estrelas para avaliar sua experiência na Vintage Barber!
        </DialogDescription>

        <div className="flex-center gap-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <StarIcon
              key={i}
              className={cn(
                'cursor-pointer',
                i + 1 <= rating
                  ? 'fill-primary stroke-primary'
                  : 'fill-none stroke-muted stroke-[1.5px]',
              )}
              onClick={() => setRating(i + 1)}
            />
          ))}
        </div>

        <DialogFooter className="flex-row gap-2">
          <DialogClose
            className={cn(buttonVariants({ variant: 'secondary' }), 'w-full')}
          >
            Cancelar
          </DialogClose>

          <DialogClose
            className={cn(buttonVariants({ variant: 'default' }), 'w-full')}
            onClick={handleSubmitClick}
          >
            Confirmar
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
