import BarbershopCard from '@/components/barbershop-card';
import Header from '@/components/header';
import SearchInput from '@/components/inputs/search';
import { db } from '@/lib/prisma';
import { plainify } from '@/lib/utils';
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

  barbershops = plainify(barbershops);

  return (
    <div>
      <Header />
      <div className="container space-y-6 p-5">
        <SearchInput />

        <h2 className="section-title">
          {!!(name || service) ? (
            <>Resultados para {`"${name || service}"`}</>
          ) : (
            'Todas as Barbearias'
          )}
        </h2>

        <div className="flex flex-wrap gap-2 sm:gap-4">
          {barbershops.map((b) => (
            <BarbershopCard key={b.id} barbershop={b} />
          ))}
        </div>
      </div>
    </div>
  );
}
