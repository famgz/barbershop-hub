import Header from '@/components/header';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { SearchIcon } from 'lucide-react';
import Image from 'next/image';

export default function Home() {
  return (
    <div>
      <Header />

      <div className="space-y-6 p-5">
        <div>
          <h2 className="text-xl font-bold">Olá, Senhor!</h2>
          <p>Sexta-feira, 2 de fevereiro.</p>
        </div>

        <div className="flex gap-2">
          <Input placeholder="Faça sua busca..." />
          <Button>
            <SearchIcon />
          </Button>
        </div>

        <div className="relative h-[150px] w-full overflow-hidden rounded-xl">
          <Image
            src="/banner-01.png"
            alt="Agende com as melhores barbers"
            fill
            className="object-cover"
          />
        </div>

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
      </div>
    </div>
  );
}
