'use server';

import { db } from '@/lib/prisma';
import { plainify } from '@/lib/utils';

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
