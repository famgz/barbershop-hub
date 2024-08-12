import { Badge } from '@/components/ui/badge';
import { isPast } from 'date-fns';

interface Props {
  date: Date;
}

export default function BookingBadge({ date }: Props) {
  const isBookingPast = isPast(date);
  return (
    <Badge className="w-fit" variant={isBookingPast ? 'secondary' : 'default'}>
      {isBookingPast ? 'Finalizado' : 'Confirmado'}
    </Badge>
  );
}
