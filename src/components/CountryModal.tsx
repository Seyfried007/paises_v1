'use client';

import Image from 'next/image';
import { Country } from '@/types/Country';
import { useFavorites } from '@/context/FavoritesContext';
import FancyCheckbox from './FancyCheckbox';

interface CountryModalProps {
  country: Country | null;
  onClose: () => void;
}

export function CountryModal({ country, onClose }: CountryModalProps) {
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();

  if (!country) return null;

  const handleFavorite = () => {
    if (isFavorite(country.cca3)) {
      removeFavorite(country.cca3);
    } else {
      addFavorite(country.cca3);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full animate-bounce-in">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-2xl font-bold">{country.name.official}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            ✕
          </button>
        </div>
        <Image
          src={country.flags.png}
          alt={`Bandera de ${country.name.common}`}
          width={100}
          height={60}
          className="rounded mb-4"
        />
        <div className="space-y-2">
          <p><strong>Nombre común:</strong> {country.name.common}</p>
          <p><strong>Capital:</strong> {country.capital?.[0] || 'N/A'}</p>
          <p><strong>Región:</strong> {country.region}</p>
          <p><strong>Población:</strong> {country.population.toLocaleString()}</p>
        </div>
        <div className="mt-4 flex justify-center">
          <FancyCheckbox checked={isFavorite(country.cca3)} onChange={handleFavorite} id={country.cca3} />
        </div>
      </div>
    </div>
  );
}
