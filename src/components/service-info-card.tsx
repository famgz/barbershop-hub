import { Card, CardContent } from '@/components/ui/card';
import { formatCurrency } from '@/lib/utils';
import { BarbershopService } from '@prisma/client';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface Props {
  service: BarbershopService;
  barbershopName: string;
  date: Date;
  time: string;
}

export default function ServiceInfoCard({
  service,
  barbershopName,
  date,
  time,
}: Props) {
  return (
    <Card>
      <CardContent className="space-y-2 p-3 text-sm font-light">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold">{service.name}</h2>
          <p className="font-semibold">{formatCurrency(service.price)}</p>
        </div>

        <div className="flex items-center justify-between">
          <h2 className="font-light text-muted-foreground">Data</h2>
          <p className="">
            {format(date, "d 'de' MMMM", {
              locale: ptBR,
            })}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <h2 className="font-light text-muted-foreground">Horário</h2>
          <p className="">{time}</p>
        </div>

        <div className="flex items-center justify-between">
          <h2 className="font-light text-muted-foreground">Barbearia</h2>
          <p className="">{barbershopName}</p>
        </div>
      </CardContent>
    </Card>
  );
}
