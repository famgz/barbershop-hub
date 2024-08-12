import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Barbershop } from '@prisma/client';
import { StarIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
  barbershop: Barbershop;
}

export default function BarbershopCard({ barbershop }: Props) {
  return (
    <Card className="max-w-[168px] rounded-2xl">
      <CardContent className="space-y-1 p-1">
        {/* Image */}
        <div className="relative size-[160px] overflow-hidden rounded-2xl">
          <Image
            src={barbershop.imageUrl}
            className="object-cover"
            alt={barbershop.name}
            fill
            sizes="160px"
          />

          <Badge className="absolute left-2 top-2 gap-1" variant={'secondary'}>
            <StarIcon size={12} className="fill-primary text-primary" />
            <p>5.0</p>
          </Badge>
        </div>

        {/* Text */}
        <div className="p-1">
          <h3 className="truncate font-semibold">
            {barbershop.name}
            {barbershop.name}
          </h3>
          <p className="truncate text-xs text-muted-foreground">
            {barbershop.address}
          </p>

          <Button variant={'secondary'} className="mt-3 w-full" asChild>
            <Link href={`/barbershops/${barbershop.id}`}>Reservar</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
