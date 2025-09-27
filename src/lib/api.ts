import { Country } from '@/types/Country';

export async function fetchCountries(): Promise<Country[]> {
  const response = await fetch('https://restcountries.com/v3.1/all?fields=name,cca3,flags,region,population,capital');
  if (!response.ok) {
    throw new Error('Failed to fetch countries');
  }
  return response.json();
}
