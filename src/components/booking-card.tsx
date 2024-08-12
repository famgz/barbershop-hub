import BookingBadge from '@/components/booking-badge';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Prisma } from '@prisma/client';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface Props {
  booking: Prisma.BookingGetPayload<{
    include: { service: { include: { barbershop: true } } };
  }>;
}

export default function BookingCard({ booking }: Props) {
  return (
    <Card className="mt-2">
      <CardContent className="flex p-0">
        {/* left column */}
        <div className="flex flex-1 flex-col gap-2 p-4">
          <BookingBadge date={booking.date} />
          <h3 className="font-semibold">{booking.service.name}</h3>

          <div className="flex items-center gap-2">
            <Avatar className="size-6">
              <AvatarImage src={booking.service.barbershop.imageUrl} />
            </Avatar>

            <p className="text-sm">{booking.service.barbershop.name}</p>
          </div>
        </div>

        {/* right column */}
        <div className="flex-center flex-col border-l p-6 px-8">
          <p className="text-sm capitalize">
            {format(booking.date, 'MMMM', { locale: ptBR })}
          </p>
          <p className="text-2xl">{format(booking.date, 'd')}</p>
          <p className="text-sm">{format(booking.date, 'HH:mm')}</p>
        </div>
      </CardContent>
    </Card>
  );
}
