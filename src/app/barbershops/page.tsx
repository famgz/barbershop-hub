import BarbershopCard from '@/components/barbershop-card';
import Header from '@/components/header';
import SearchInput from '@/components/inputs/search';
import { db } from '@/lib/prisma';
import { Barbershop } from '@prisma/client';

interface Props {
  searchParams?: {
    search: string;
  };
}

export default async function BarbershopsPage({ searchParams }: Props) {
  const search = searchParams?.search;
  let barbershops: Barbershop[] = [];

  if (search) {
    barbershops = await db.barbershop.findMany({
      where: {
        name: { contains: search, mode: 'insensitive' },
      },
    });
  }

  return (
    <div>
      <Header />
      <div className="space-y-6 p-5">
        <SearchInput />

        {!!search && (
          <>
            <h2 className="section-title">Resultados para {`"${search}"`}</h2>

            {barbershops.length > 0 && (
              <div className="grid grid-cols-2 gap-4">
                {barbershops.map((b) => (
                  <BarbershopCard key={b.id} barbershop={b} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
