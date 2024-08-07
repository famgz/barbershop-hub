import { searchCategories } from '@/app/constants/categories';
import BarbershopCard from '@/components/barbershop-card';
import Footer from '@/components/footer';
import Header from '@/components/header';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { db } from '@/lib/prisma';
import { SearchIcon } from 'lucide-react';
import Image from 'next/image';

export default async function Home() {
  const barbershops = await db.barbershop.findMany({ take: 10 });
  const popularBarbershops = Array.from(barbershops).sort((a, b) =>
    b.name.localeCompare(a.name),
  );

  return (
    <div>
      <Header />

      <div className="space-y-6 p-5">
        {/* Greetings */}
        <div>
          <h2 className="text-xl font-bold">Olá, Senhor!</h2>
          <p>Sexta-feira, 2 de fevereiro.</p>
        </div>

        {/* Search */}
        <div className="flex gap-2">
          <Input placeholder="Faça sua busca..." />
          <Button>
            <SearchIcon />
          </Button>
        </div>

        {/* Categories */}
        <div className="hide-scrollbar flex gap-3 overflow-x-auto">
          {searchCategories.map((x, i) => (
            <Button key={i} variant={'secondary'} className="flex-center gap-2">
              <Image src={x.image} height={16} width={16} alt={x.title} />
              {x.title}
            </Button>
          ))}
        </div>

        {/* Banner */}
        <div className="relative h-[150px] w-full overflow-hidden rounded-xl">
          <Image
            src="/banner-01.png"
            alt="Agende com as melhores barbers"
            fill
            className="object-cover"
          />
        </div>

        {/* Bookings */}
        <div>
          <h2 className="font-bold uppercase text-muted-foreground">
            Agendamentos
          </h2>

          <Card className="mt-2">
            <CardContent className="flex p-0">
              {/* left column */}
              <div className="flex flex-1 flex-col gap-2 p-6">
                <Badge className="w-fit">Confirmado</Badge>
                <h3 className="font-semibold">Corte de Cabelo</h3>

                <div className="flex items-center gap-2">
                  <Avatar className="size-6">
                    <AvatarImage src="https://github.com/famgz.png" />
                  </Avatar>

                  <p className="text-sm">Barbearia Show</p>
                </div>
              </div>

              {/* right column */}
              <div className="flex-center flex-col border-l p-6">
                <p className="text-sm">Fevereiro</p>
                <p className="text-2xl">05</p>
                <p className="text-sm">20:00</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recommended */}
        <div>
          <h2 className="font-bold uppercase text-muted-foreground">
            Recomendados
          </h2>

          <div className="hide-scrollbar mt-2 flex gap-4 overflow-x-auto">
            {barbershops.map((b) => (
              <BarbershopCard key={b.id} barbershop={b} />
            ))}
          </div>
        </div>

        {/* Recommended */}
        <div>
          <h2 className="font-bold uppercase text-muted-foreground">
            Populares
          </h2>

          <div className="hide-scrollbar mt-2 flex gap-4 overflow-x-auto">
            {popularBarbershops.map((b) => (
              <BarbershopCard key={b.id} barbershop={b} />
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
