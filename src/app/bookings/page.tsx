import { getBookingsByUser } from '@/actions/booking';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import BookingItem from '@/components/booking-item';
import Header from '@/components/header';
import { isFuture, isPast } from 'date-fns';
import { getServerSession } from 'next-auth';
import { notFound } from 'next/navigation';

export default async function BookingsPage() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) return notFound();

  const bookings = await getBookingsByUser();

  const confirmedBookings = bookings.filter((x) => isFuture(x.date));
  const finishedBookings = bookings.filter((x) => isPast(x.date));

  return (
    <>
      <Header />

      <div className="space-y-5 p-5">
        <h1 className="text-xl font-semibold">Agendamentos</h1>

        <div className="space-y-3">
          <h2 className="section-title">Confirmados</h2>
          {confirmedBookings.map((booking) => (
            <BookingItem key={booking.id} booking={booking} />
          ))}
        </div>

        <div className="space-y-3">
          <h2 className="section-title">Finalizados</h2>
          {finishedBookings.map((booking) => (
            <BookingItem key={booking.id} booking={booking} />
          ))}
        </div>
      </div>
    </>
  );
}
