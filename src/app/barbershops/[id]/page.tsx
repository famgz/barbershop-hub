import BackButton from '@/components/buttons/back';
import CopyClipboardButton from '@/components/buttons/copy-clipboard';
import ServiceCard from '@/components/service-card';
import SideBar from '@/components/sidebar';
import { db } from '@/lib/prisma';
import { plainify } from '@/lib/utils';
import { MapPinIcon, SmartphoneIcon, StarIcon } from 'lucide-react';
import Image from 'next/image';
import { notFound } from 'next/navigation';

interface Props {
  params: {
    id: string;
  };
}

export default async function BarbershopPage({ params }: Props) {
  const { id } = params;

  let barbershop = await db.barbershop.findUnique({
    where: { id },
    include: {
      services: true,
    },
  });

  if (!barbershop) return notFound();

  barbershop = plainify(barbershop);

  return (
    <div>
      {/* Image */}
      <div className="relative h-[250px] w-full">
        <Image
          src={barbershop.imageUrl}
          alt={barbershop.name}
          fill
          className="object-cover"
        />
        <div className="absolute left-4 top-4">
          <BackButton />
        </div>

        <div className="absolute right-4 top-4">
          <SideBar />
        </div>
      </div>

      {/* Info */}
      <div className="space-y-1 border-b p-5">
        <h1 className="text-xl font-bold">{barbershop.name}</h1>

        <div className="flex items-center gap-2">
          <MapPinIcon className="text-primary" size={18} />
          <p className="text-sm">{barbershop.address}</p>
        </div>

        <div className="flex items-center gap-2">
          <StarIcon className="fill-primary text-primary" size={18} />
          <p className="text-sm">5.0 (263 avaliações)</p>
        </div>
      </div>

      {/* Description */}
      <div className="space-y-2 border-b p-5">
        <h2 className="section-title">Sobre nós</h2>
        <p className="text-justify text-sm">{barbershop.description}</p>
      </div>

      {/* Services */}
      <div className="space-y-3 border-b p-5">
        <h2 className="section-title">Serviços</h2>
        {barbershop.services.map((service) => (
          <ServiceCard
            barbershopName={barbershop.name}
            service={service}
            key={service.id}
          />
        ))}
      </div>

      {/* Contact */}
      <div className="space-y-2 p-5">
        <h2 className="section-title">Contato</h2>

        <div className="space-y-1.5">
          {barbershop.phones.map((phone, i) => (
            <div key={i} className="flex items-center gap-2">
              <SmartphoneIcon size={20} />
              <p className="flex-1 text-sm">{phone}</p>
              <CopyClipboardButton text={phone}>Copiar</CopyClipboardButton>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
