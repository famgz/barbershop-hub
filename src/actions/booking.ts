'use server';

import { getUserElseThrowError } from '@/actions/auth';
import { db } from '@/lib/prisma';
import { plainify } from '@/lib/utils';
import { endOfDay, startOfDay } from 'date-fns';
import { revalidatePath } from 'next/cache';

interface CreateBookingProps {
  serviceId: string;
  date: Date;
}

export async function createBooking(params: CreateBookingProps) {
  const user = await getUserElseThrowError();

  const res = await db.booking.create({
    data: { ...params, userId: user.id },
  });

  return plainify(res);
}

interface GetBookingsProps {
  serviceId: string;
  date: Date;
}

export async function getBookingsByDate({ serviceId, date }: GetBookingsProps) {
  const bookings = await db.booking.findMany({
    where: {
      serviceId,
      date: {
        lte: endOfDay(date),
        gte: startOfDay(date),
      },
    },
  });
  revalidatePath('/barbershops/[id]', 'page');

  return plainify(bookings);
}

export async function getBookingsByUser() {
  const user = await getUserElseThrowError();

  const bookings = await db.booking.findMany({
    where: { userId: user.id },
    include: {
      service: { include: { barbershop: true } },
    },
    orderBy: { date: 'asc' },
  });

  return plainify(bookings);
}

export async function deleteBooking(bookingId: string) {
  await getUserElseThrowError();

  await db.booking.delete({
    where: { id: bookingId },
  });

  revalidatePath('/');
  revalidatePath('/bookings');
}

interface UpdateBookingRatingProps {
  bookingId: string;
  rating: number;
}

export async function updateBookingRating({
  bookingId,
  rating,
}: UpdateBookingRatingProps) {
  await getUserElseThrowError();

  await db.booking.update({
    where: {
      id: bookingId,
    },
    data: {
      rating,
    },
  });

  revalidatePath('/bookings');
}
