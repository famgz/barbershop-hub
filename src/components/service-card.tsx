import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { BarbershopService } from '@prisma/client';
import Image from 'next/image';

interface Props {
  service: BarbershopService;
}

export default function ServiceCard({ service }: Props) {
  return (
    <Card>
      <CardContent className="flex items-center gap-3 p-3">
        {/* Image */}
        <div className="relative size-[110px] overflow-hidden rounded-lg">
          <Image
            src={service.imageUrl}
            alt={service.name}
            fill
            className="object-cover"
            sizes="110px"
          />
        </div>

        {/* Info */}
        <div className="flex-1 space-y-2">
          <h3 className="font-semibold">{service.name}</h3>

          <p className="line-clamp-2 text-xs text-muted-foreground">
            {service.description}
          </p>

          <div className="flex items-center justify-between">
            <p className="text-sm font-bold text-primary">
              {Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(Number(service.price))}
            </p>

            <Button variant={'secondary'} size={'sm'}>
              Reservar
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
