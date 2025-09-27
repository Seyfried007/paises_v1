'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface FavoritesContextType {
  favorites: Set<string>;
  addFavorite: (cca3: string) => void;
  removeFavorite: (cca3: string) => void;
  isFavorite: (cca3: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  useEffect(() => {
    const stored = localStorage.getItem('favorites');
    if (stored) {
      setFavorites(new Set(JSON.parse(stored)));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify([...favorites]));
  }, [favorites]);

  const addFavorite = (cca3: string) => {
    setFavorites(prev => new Set(prev).add(cca3));
  };

  const removeFavorite = (cca3: string) => {
    setFavorites(prev => {
      const newSet = new Set(prev);
      newSet.delete(cca3);
      return newSet;
    });
  };

  const isFavorite = (cca3: string) => favorites.has(cca3);

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
}
