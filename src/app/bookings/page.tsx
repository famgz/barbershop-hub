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

      <div className="container space-y-6 p-5">
        <h1 className="text-xl font-semibold">Agendamentos</h1>

        <div className="space-y-2">
          <h2 className="section-title">Confirmados</h2>
          <div className="flex flex-wrap gap-2">
            {confirmedBookings.length > 0 ? (
              confirmedBookings.map((booking) => (
                <BookingItem key={booking.id} booking={booking} />
              ))
            ) : (
              <p className="text-sm">Não há reservas confirmadas</p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <h2 className="section-title">Finalizados</h2>
          <div className="flex flex-wrap gap-2">
            {finishedBookings.length > 0 ? (
              finishedBookings.map((booking) => (
                <BookingItem key={booking.id} booking={booking} />
              ))
            ) : (
              <p className="text-sm">Não há reservas finalizadas</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
