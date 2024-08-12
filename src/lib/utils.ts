import { Decimal } from '@prisma/client/runtime/library';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(price: Decimal | number) {
  return Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(Number(price));
}

export function plainify<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}
