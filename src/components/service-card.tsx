'use client';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent } from '@/components/ui/card';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { BarbershopService } from '@prisma/client';
import { ptBR } from 'date-fns/locale';
import Image from 'next/image';
import { useState } from 'react';

interface Props {
  service: BarbershopService;
}

export default function ServiceCard({ service }: Props) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  function handleDateSelect(date: Date | undefined) {
    setSelectedDate(date);
  }

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

            <Sheet>
              <SheetTrigger asChild>
                <Button variant={'secondary'} size={'sm'}>
                  Reservar
                </Button>
              </SheetTrigger>

              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Fazer Reserva</SheetTitle>
                </SheetHeader>

                <div className="py-5">
                  <Calendar
                    mode="single"
                    locale={ptBR}
                    selected={selectedDate}
                    onSelect={handleDateSelect}
                    styles={{
                      head_cell: {
                        width: '100%',
                        textTransform: 'capitalize',
                      },
                      cell: {
                        width: '100%',
                      },
                      button: {
                        width: '100%',
                      },
                      nav_button_previous: {
                        width: '32px',
                        height: '32px',
                      },
                      nav_button_next: {
                        width: '32px',
                        height: '32px',
                      },
                      caption: {
                        textTransform: 'capitalize',
                      },
                    }}
                  />
                </div>

                <div></div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
