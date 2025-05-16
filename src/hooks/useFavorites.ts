import { useState, useCallback, useEffect } from 'react';

interface Location {
  name: string;
  lat: number;
  lon: number;
}

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<Location[]>(() => {
    const saved = localStorage.getItem('weatherFavorites');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('weatherFavorites', JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = useCallback((location: Location) => {
    setFavorites(prev => {
      if (prev.some(fav => fav.name === location.name)) {
        return prev;
      }
      return [...prev, location];
    });
  }, []);

  const removeFavorite = useCallback((locationName: string) => {
    setFavorites(prev => prev.filter(fav => fav.name !== locationName));
  }, []);

  const isFavorite = useCallback((locationName: string) => {
    return favorites.some(fav => fav.name === locationName);
  }, [favorites]);

  return {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite
  };
}; 