import BarbershopCard from '@/components/barbershop-card';
import Header from '@/components/header';
import SearchInput from '@/components/inputs/search';
import { db } from '@/lib/prisma';
import { Barbershop } from '@prisma/client';

interface Props {
  searchParams?: {
    name: string;
    service: string;
  };
}

export default async function BarbershopsPage({ searchParams }: Props) {
  const name = searchParams?.name;
  const service = searchParams?.service;
  let barbershops: Barbershop[] = [];

  if (name || service) {
    barbershops = await db.barbershop.findMany({
      where: {
        OR: [
          name
            ? {
                name: { contains: name, mode: 'insensitive' },
              }
            : {},

          service
            ? {
                services: {
                  some: {
                    name: {
                      contains: service,
                      mode: 'insensitive',
                    },
                  },
                },
              }
            : {},
        ],
      },
    });
  } else {
    barbershops = await db.barbershop.findMany({});
  }

  console.log('length:', barbershops.length);

  return (
    <div>
      <Header />
      <div className="space-y-6 p-5">
        <SearchInput />

        <h2 className="section-title">
          {!!(name || service) ? (
            <>Resultados para {`"${name || service}"`}</>
          ) : (
            'Todas as Barbearias'
          )}
        </h2>

        <div className="grid grid-cols-2 gap-4">
          {barbershops.map((b) => (
            <BarbershopCard key={b.id} barbershop={b} />
          ))}
        </div>
      </div>
    </div>
  );
}
