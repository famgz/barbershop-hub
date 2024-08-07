import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

export default function BookingCard() {
  return (
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
  );
}
