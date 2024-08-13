'use client';

import { deleteBooking } from '@/actions/booking';
import { Button, buttonVariants } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface Props {
  bookingId: string;
  callbackFn: () => void;
}

export default function BookingCancelModal({
  bookingId,
  callbackFn: onFinish,
}: Props) {
  async function handleCancelBookingClick() {
    try {
      await deleteBooking(bookingId);
      toast.success('Reserva cancelada com sucesso', {
        position: 'top-center',
      });
      onFinish();
    } catch (err) {
      toast.error('Erro ao cencelar reserva', {
        position: 'top-center',
      });
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={'destructive'} className="w-full">
          Cancelar Reserva
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Cancelar Reserva</DialogTitle>
        </DialogHeader>

        <DialogDescription className="text-center text-muted-foreground">
          Tem certeza que deseja cancelar essa reserva?
        </DialogDescription>

        <div className="flex gap-2">
          <DialogClose
            className={cn(buttonVariants({ variant: 'secondary' }), 'w-full')}
          >
            Voltar
          </DialogClose>

          <Button
            variant={'destructive'}
            className="w-full"
            onClick={handleCancelBookingClick}
          >
            Confirmar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
