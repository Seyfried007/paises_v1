'use client';

import FancySearchInput from './FancySearchInput';
import FancySelect from './FancySelect';
import FancyInput from './FancyInput';
import FancyToggleButton from './FancyToggleButton';

interface FiltersProps {
  search: string;
  setSearch: (value: string) => void;
  region: string;
  setRegion: (value: string) => void;
  minPopulation: string;
  setMinPopulation: (value: string) => void;
  maxPopulation: string;
  setMaxPopulation: (value: string) => void;
  sortBy: string;
  setSortBy: (value: string) => void;
}

export function Filters({
  search,
  setSearch,
  region,
  setRegion,
  minPopulation,
  setMinPopulation,
  maxPopulation,
  setMaxPopulation,
  sortBy,
  setSortBy,
}: FiltersProps) {
  const regions = [
    { value: 'Africa', label: 'Africa' },
    { value: 'Americas', label: 'Americas' },
    { value: 'Asia', label: 'Asia' },
    { value: 'Europe', label: 'Europe' },
    { value: 'Oceania', label: 'Oceania' },
  ];

  const handleSortName = () => {
    setSortBy(sortBy === 'name' ? '' : 'name');
  };

  const handleSortPopulation = () => {
    setSortBy(sortBy === 'population' ? '' : 'population');
  };

  return (
    <div className="bg-gray-800 dark:bg-gray-900 p-4 rounded-lg mb-6 space-y-4 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <FancySearchInput
          value={search}
          onChange={setSearch}
          placeholder="Buscar países..."
        />
        <FancySelect
          value={region}
          onChange={setRegion}
          options={regions}
          placeholder="Todas las regiones"
        />
        <FancyInput
          type="number"
          value={minPopulation}
          onChange={setMinPopulation}
          placeholder="Población mínima"
        />
        <FancyInput
          type="number"
          value={maxPopulation}
          onChange={setMaxPopulation}
          placeholder="Población máxima"
        />
      </div>
      <div className="flex justify-center gap-4">
        <FancyToggleButton
          isActive={sortBy === 'name'}
          onClick={handleSortName}
        >
          Ordenar por Nombre
        </FancyToggleButton>
        <FancyToggleButton
          isActive={sortBy === 'population'}
          onClick={handleSortPopulation}
        >
          Ordenar por Población
        </FancyToggleButton>
      </div>
    </div>
  );
}
