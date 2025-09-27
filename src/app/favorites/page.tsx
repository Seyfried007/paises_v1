'use client';

import { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useFavorites } from '@/context/FavoritesContext';
import { useCountries } from '@/context/CountriesContext';
import { CountryCard } from '@/components/CountryCard';
import { CountryModal } from '@/components/CountryModal';
import { useState } from 'react';
import { Country } from '@/types/Country';
import SplitText from '@/components/SplitText';
import FancyButton from '@/components/FancyButton';
import RotatingFavorites from '@/components/RotatingFavorites';

export default function Favorites() {
  const { favorites } = useFavorites();
  const { countries, loading, error } = useCountries();
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const router = useRouter();

  const favoriteCountries = useMemo(() => {
    return countries.filter((country) => favorites.has(country.cca3));
  }, [countries, favorites]);

  if (loading) return <div className="text-center py-10">Cargando favoritos...</div>;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <header className="text-center mb-6">
        <SplitText
          text="Países Favoritos"
          className="text-4xl font-bold mb-2"
          delay={100}
          duration={0.6}
          ease="power3.out"
          splitType="chars"
          from={{ opacity: 0, y: 40 }}
          to={{ opacity: 1, y: 0 }}
          threshold={0.1}
          rootMargin="-100px"
          textAlign="center"
          tag="h1"
        />
        <FancyButton onClick={() => router.push('/')} text="Volver al Inicio" />
      </header>

      {favoriteCountries.length === 0 ? (
        <div className="text-center py-10">
          <p>No tienes países favoritos aún.</p>
          <FancyButton onClick={() => router.push('/')} text="Agregar algunos" />
        </div>
      ) : (
        <RotatingFavorites countries={favoriteCountries} onCountryClick={setSelectedCountry} />
      )}

      <CountryModal
        country={selectedCountry}
        onClose={() => setSelectedCountry(null)}
      />
    </div>
  );
}
