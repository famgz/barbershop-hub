'use client';

import { createBooking, getBookingsByDate } from '@/actions/booking';
import LoginDialog from '@/components/login-dialog';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { formatCurrency } from '@/lib/utils';
import { BarbershopService, Booking } from '@prisma/client';
import { addDays, format, set } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

const TIME_LIST = [
  '08:00',
  '08:15',
  '08:30',
  '08:45',
  '09:00',
  '09:15',
  '09:30',
  '09:45',
  '10:00',
  '10:15',
  '10:30',
  '10:45',
  '11:00',
  '11:15',
  '11:30',
  '11:45',
  '12:00',
  '12:15',
  '12:30',
  '12:45',
  '13:00',
  '13:15',
  '13:30',
  '13:45',
  '14:00',
  '14:15',
  '14:30',
  '14:45',
  '15:00',
  '15:15',
  '15:30',
  '15:45',
  '16:00',
  '16:15',
  '16:30',
  '16:45',
  '17:00',
  '17:15',
  '17:30',
  '17:45',
  '18:00',
];

function getAvailableServiceTimes(bookings: Booking[]) {
  const bookedTimes = bookings.map((x) => format(x.date, 'hh:mm'));
  const availableTimes = TIME_LIST.filter(
    (time) => !bookedTimes.some((x) => x === time),
  );
  return availableTimes;
}

interface Props {
  service: BarbershopService;
  barbershopName: string;
}

export default function ServiceCard({ service, barbershopName }: Props) {
  const { data } = useSession();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<String | undefined>(
    undefined,
  );
  const [dayBookings, setDayBookings] = useState<Booking[]>([]);
  const [isBookingSheetOpen, setIsBookingSheetOpen] = useState(false);
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);

  useEffect(() => {
    async function fetch() {
      if (!(selectedDate && service?.id)) return;
      const bookings = await getBookingsByDate({
        serviceId: service.id,
        date: selectedDate,
      });

      setDayBookings(bookings);
    }
    fetch();
  }, [selectedDate, service?.id]);

  useEffect(() => {
    function resetSelectedStatesWhenSheetCloses() {
      if (!isBookingSheetOpen) {
        setSelectedDate(undefined);
        setSelectedTime(undefined);
      }
    }
    resetSelectedStatesWhenSheetCloses();
  }, [isBookingSheetOpen]);

  function handleDateSelect(date: Date | undefined) {
    setSelectedDate(date);
  }

  function handleTimeSelect(time: string) {
    setSelectedTime(time);
  }

  function handleBookingClick() {
    data?.user ? setIsBookingSheetOpen(true) : setIsLoginDialogOpen(true);
  }

  async function handleCreateBooking() {
    if (!(selectedDate && selectedTime && data?.user)) return;

    try {
      const [hours, minutes] = selectedTime.split(':').map(Number);

      const newDate = set(selectedDate, {
        hours,
        minutes,
      });

      await createBooking({
        serviceId: service.id,
        date: newDate,
      });

      toast.success('Reserva criada com sucesso');
    } catch (err) {
      console.log(err);
      toast.error('Erro ao criar reserva');
    }
  }

  return (
    <>
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
                {formatCurrency(service.price)}
              </p>

              <Sheet
                open={isBookingSheetOpen}
                onOpenChange={setIsBookingSheetOpen}
              >
                {/* <SheetTrigger asChild> */}
                <Button
                  variant={'secondary'}
                  size={'sm'}
                  onClick={handleBookingClick}
                >
                  Reservar
                </Button>

                <SheetContent className="flex flex-col gap-0 p-0">
                  <SheetHeader className="border-b p-5">
                    <SheetTitle>Fazer Reserva</SheetTitle>
                  </SheetHeader>

                  <div className="border-b p-5">
                    <Calendar
                      mode="single"
                      locale={ptBR}
                      selected={selectedDate}
                      onSelect={handleDateSelect}
                      fromDate={addDays(new Date(), 1)}
                      styles={{
                        head_cell: {
                          width: '100%',
                          textTransform: 'capitalize',
                          fontSize: '10px',
                        },
                        cell: {
                          width: '32px',
                          height: '32px',
                          borderRadius: '9999px',
                        },
                        button: {
                          width: '32px',
                          height: '32px',
                          borderRadius: '9999px',
                          fontSize: '12px',
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

                  {/* timelist */}
                  {selectedDate && (
                    <div className="hide-scrollbar overflow-x-auto border-b p-5">
                      <div className="flex items-center gap-2">
                        {getAvailableServiceTimes(dayBookings).map((time) => (
                          <Button
                            key={time}
                            className="rounded-full text-xs"
                            variant={
                              time === selectedTime ? 'default' : 'outline'
                            }
                            onClick={() => handleTimeSelect(time)}
                          >
                            {time}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Resevation details */}
                  {selectedDate && selectedTime && (
                    <div className="flex flex-1 flex-col justify-between gap-5 p-5">
                      <Card>
                        <CardContent className="space-y-2 p-3 text-xs font-light">
                          <div className="flex items-center justify-between">
                            <h2 className="font-semibold">{service.name}</h2>
                            <p className="font-semibold">
                              {formatCurrency(service.price)}
                            </p>
                          </div>

                          <div className="flex items-center justify-between">
                            <h2 className="font-light text-muted-foreground">
                              Data
                            </h2>
                            <p className="">
                              {format(selectedDate, "d 'de' MMMM", {
                                locale: ptBR,
                              })}
                            </p>
                          </div>

                          <div className="flex items-center justify-between">
                            <h2 className="font-light text-muted-foreground">
                              Horário
                            </h2>
                            <p className="">{selectedTime}</p>
                          </div>

                          <div className="flex items-center justify-between">
                            <h2 className="font-light text-muted-foreground">
                              Barbearia
                            </h2>
                            <p className="">{barbershopName}</p>
                          </div>
                        </CardContent>
                      </Card>

                      <SheetClose asChild>
                        <Button
                          className="w-full"
                          onClick={handleCreateBooking}
                        >
                          Confirmar
                        </Button>
                      </SheetClose>
                    </div>
                  )}
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isLoginDialogOpen} onOpenChange={setIsLoginDialogOpen}>
        <DialogContent>
          <LoginDialog />
        </DialogContent>
      </Dialog>
    </>
  );
}
