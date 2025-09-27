'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Country } from '@/types/Country';
import { fetchCountries } from '@/lib/api';

interface CountriesContextType {
  countries: Country[];
  loading: boolean;
  error: string | null;
}

const CountriesContext = createContext<CountriesContextType | undefined>(undefined);

export function CountriesProvider({ children }: { children: ReactNode }) {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCountries = async () => {
      try {
        const data = await fetchCountries();
        setCountries(data);
      } catch (err) {
        setError('Error al cargar los países');
      } finally {
        setLoading(false);
      }
    };
    loadCountries();
  }, []);

  return (
    <CountriesContext.Provider value={{ countries, loading, error }}>
      {children}
    </CountriesContext.Provider>
  );
}

export function useCountries() {
  const context = useContext(CountriesContext);
  if (!context) {
    throw new Error('useCountries must be used within a CountriesProvider');
  }
  return context;
}
