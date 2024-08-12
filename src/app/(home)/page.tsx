import { getBookingsByUser } from '@/actions/booking';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import BarbershopCard from '@/components/barbershop-card';
import BookingCard from '@/components/booking-card';
import Header from '@/components/header';
import SearchInput from '@/components/inputs/search';
import { Button } from '@/components/ui/button';
import { searchCategories } from '@/constants/categories';
import { db } from '@/lib/prisma';
import { plainify } from '@/lib/utils';
import { format, isPast } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { getServerSession } from 'next-auth';
import Image from 'next/image';
import Link from 'next/link';

export default async function Home() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  const barbershops = plainify(await db.barbershop.findMany({ take: 10 }));
  const popularBarbershops = Array.from(barbershops).sort((a, b) =>
    b.name.localeCompare(a.name),
  );

  const userBookings = user ? await getBookingsByUser() : null;
  const confirmedUserBookings = userBookings
    ? userBookings?.filter((x) => !isPast(x.date))
    : [];

  return (
    <div>
      <Header />

      <div className="space-y-6 p-5">
        {/* Greetings */}
        <div>
          <h2 className="text-xl font-bold">
            Olá, {user ? user.name.split(' ')[0] : 'visitante'}!
          </h2>
          <p className="">
            {format(new Date(), "eeee',' d 'de' MMMM", { locale: ptBR })}
          </p>
        </div>

        {/* Search */}
        <SearchInput />

        {/* Services */}
        <div className="hide-scrollbar -mr-5 flex gap-3 overflow-x-auto">
          {searchCategories.map((x, i) => (
            <Button
              key={i}
              variant={'secondary'}
              className="flex-center gap-2"
              asChild
            >
              <Link href={`/barbershops?service=${x.title}`}>
                <Image src={x.image} height={16} width={16} alt={x.title} />
                {x.title}
              </Link>
            </Button>
          ))}
        </div>

        {/* Banner */}
        <div className="relative aspect-[700/300] h-auto w-full overflow-hidden rounded-xl">
          <Image
            src="/banner-01.png"
            alt="Agende com as melhores barbers"
            fill
            className="object-cover"
          />
        </div>

        {/* User Bookings */}
        {user && (
          <div className="">
            <h2 className="section-title">Agendamentos</h2>
            {confirmedUserBookings?.length > 0 ? (
              confirmedUserBookings.map((booking) => (
                <BookingCard booking={booking} key={booking.id} />
              ))
            ) : (
              <span className="py-3">Não há reservas agendadas</span>
            )}
          </div>
        )}

        {/* Recommended */}
        <div>
          <h2 className="section-title">Recomendados</h2>

          <div className="hide-scrollbar -mr-5 mt-2 flex gap-4 overflow-x-auto">
            {barbershops.map((b) => (
              <BarbershopCard key={b.id} barbershop={b} />
            ))}
          </div>
        </div>

        {/* Recommended */}
        <div>
          <h2 className="section-title">Populares</h2>

          <div className="hide-scrollbar -mr-5 mt-2 flex gap-4 overflow-x-auto">
            {popularBarbershops.map((b) => (
              <BarbershopCard key={b.id} barbershop={b} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
