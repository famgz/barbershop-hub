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
import { StarIcon } from 'lucide-react';

interface Props {
  bookingId: string;
}

export default function BookingRatingModal({ bookingId }: Props) {
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
          {Array.from({ length: 4 }).map((_, i) => (
            <StarIcon className="fill-primary stroke-primary" key={i} />
          ))}
          <StarIcon className="fill-none stroke-muted stroke-[1.5px]" />
        </div>

        <DialogFooter className="flex-row gap-2">
          <DialogClose
            className={cn(buttonVariants({ variant: 'secondary' }), 'w-full')}
          >
            Cancelar
          </DialogClose>

          <DialogClose
            className={cn(buttonVariants({ variant: 'default' }), 'w-full')}
          >
            Confirmar
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
