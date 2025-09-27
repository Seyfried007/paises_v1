'use client';

import { useState, useMemo, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Country } from '@/types/Country';
import { useCountries } from '@/context/CountriesContext';
import { CountryCard } from '@/components/CountryCard';
import { CountryModal } from '@/components/CountryModal';
import { Filters } from '@/components/Filters';
import SplitText from '@/components/SplitText';
import FancyButton from '@/components/FancyButton';

export default function Home() {
  const { countries, loading, error } = useCountries();
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [region, setRegion] = useState(searchParams.get('region') || '');
  const [minPopulation, setMinPopulation] = useState(searchParams.get('minPop') || '');
  const [maxPopulation, setMaxPopulation] = useState(searchParams.get('maxPop') || '');
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || '');

  const updateUrl = useCallback(
    (params: Record<string, string>) => {
      const newParams = new URLSearchParams(searchParams.toString());
      Object.entries(params).forEach(([key, value]) => {
        if (value) {
          newParams.set(key, value);
        } else {
          newParams.delete(key);
        }
      });
      router.replace(`?${newParams.toString()}`, { scroll: false });
    },
    [searchParams, router]
  );

  const handleSetSearch = (value: string) => {
    setSearch(value);
    updateUrl({ search: value });
  };

  const handleSetRegion = (value: string) => {
    setRegion(value);
    updateUrl({ region: value });
  };

  const handleSetMinPopulation = (value: string) => {
    setMinPopulation(value);
    updateUrl({ minPop: value });
  };

  const handleSetMaxPopulation = (value: string) => {
    setMaxPopulation(value);
    updateUrl({ maxPop: value });
  };

  const handleSetSortBy = (value: string) => {
    setSortBy(value);
    updateUrl({ sort: value });
  };

  const filteredAndSortedCountries = useMemo(() => {
    let filtered = countries.filter((country) => {
      const matchesSearch = country.name.common.toLowerCase().includes(search.toLowerCase());
      const matchesRegion = !region || country.region === region;
      const matchesMinPop = !minPopulation || country.population >= parseInt(minPopulation);
      const matchesMaxPop = !maxPopulation || country.population <= parseInt(maxPopulation);
      return matchesSearch && matchesRegion && matchesMinPop && matchesMaxPop;
    });

    if (sortBy === 'name') {
      filtered.sort((a, b) => a.name.common.localeCompare(b.name.common));
    } else if (sortBy === 'population') {
      filtered.sort((a, b) => b.population - a.population);
    }

    return filtered;
  }, [countries, search, region, minPopulation, maxPopulation, sortBy]);

  if (loading) return <div className="text-center py-10">Cargando países...</div>;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <header className="text-center mb-6">
        <SplitText
          text="Países del Mundo"
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
        <FancyButton onClick={() => router.push('/favorites')} text="Ver Favoritos" />
      </header>

      <Filters
        search={search}
        setSearch={handleSetSearch}
        region={region}
        setRegion={handleSetRegion}
        minPopulation={minPopulation}
        setMinPopulation={handleSetMinPopulation}
        maxPopulation={maxPopulation}
        setMaxPopulation={handleSetMaxPopulation}
        sortBy={sortBy}
        setSortBy={handleSetSortBy}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredAndSortedCountries.map((country) => (
          <CountryCard
            key={country.cca3}
            country={country}
            onClick={() => setSelectedCountry(country)}
          />
        ))}
      </div>

      {filteredAndSortedCountries.length === 0 && (
        <div className="text-center py-10">No se encontraron países que coincidan con los filtros.</div>
      )}

      <CountryModal
        country={selectedCountry}
        onClose={() => setSelectedCountry(null)}
      />
    </div>
  );
}
