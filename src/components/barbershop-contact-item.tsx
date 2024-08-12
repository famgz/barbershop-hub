import CopyClipboardButton from '@/components/buttons/copy-clipboard';
import { SmartphoneIcon } from 'lucide-react';

interface Props {
  phone: string;
}

export default function BarbershopContactItem({ phone }: Props) {
  return (
    <div className="flex items-center gap-2">
      <SmartphoneIcon size={20} />
      <p className="flex-1 text-sm font-light">{phone}</p>
      <CopyClipboardButton text={phone}>Copiar</CopyClipboardButton>
    </div>
  );
}
