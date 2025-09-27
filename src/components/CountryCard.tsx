'use client';

import Image from 'next/image';
import { Country } from '@/types/Country';

interface CountryCardProps {
  country: Country;
  onClick: () => void;
  vertical?: boolean;
}

export function CountryCard({ country, onClick, vertical = false }: CountryCardProps) {
  return (
    <div
      className={`bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105 animate-fade-in-up ${
        vertical ? 'flex flex-col items-center text-center' : 'flex items-center space-x-4'
      }`}
      onClick={onClick}
    >
      <Image
        src={country.flags.png}
        alt={`Bandera de ${country.name.common}`}
        width={vertical ? 80 : 60}
        height={vertical ? 60 : 40}
        className="rounded mb-2"
      />
      <div className={vertical ? '' : ''}>
        <h3 className="text-lg font-semibold">{country.name.common}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">{country.region}</p>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Población: {country.population.toLocaleString()}
        </p>
      </div>
    </div>
  );
}
