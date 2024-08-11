'use server';

import { db } from '@/lib/prisma';
import { plainify } from '@/lib/utils';
import { endOfDay, startOfDay } from 'date-fns';
import { revalidatePath } from 'next/cache';

interface CreateBookingProps {
  serviceId: string;
  userId: string;
  date: Date;
}

export async function createBooking(params: CreateBookingProps) {
  const res = await db.booking.create({
    data: params,
  });
  return plainify(res);
}

interface GetBookingsProps {
  serviceId: string;
  date: Date;
}

export async function getBookings({ serviceId, date }: GetBookingsProps) {
  const bookings = await db.booking.findMany({
    where: {
      serviceId,
      date: {
        lte: endOfDay(date),
        gte: startOfDay(date),
      },
    },
  });
  revalidatePath('/barbershops/[id]');

  return plainify(bookings);
}
