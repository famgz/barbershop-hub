'use server';

import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { db } from '@/lib/prisma';
import { plainify } from '@/lib/utils';
import { endOfDay, startOfDay } from 'date-fns';
import { getServerSession } from 'next-auth';
import { revalidatePath } from 'next/cache';

interface CreateBookingProps {
  serviceId: string;
  date: Date;
}

export async function createBooking(params: CreateBookingProps) {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  if (!user) throw new Error('Usuário não autenticado');

  const res = await db.booking.create({
    data: { ...params, userId: user.id },
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
