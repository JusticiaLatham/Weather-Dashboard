import { useState, useCallback } from 'react';

type TemperatureUnit = 'metric' | 'imperial';

export const useUnits = () => {
  const [unit, setUnit] = useState<TemperatureUnit>('metric');

  const toggleUnit = useCallback(() => {
    setUnit(prevUnit => prevUnit === 'metric' ? 'imperial' : 'metric');
  }, []);

  const formatTemperature = useCallback((temp: number): string => {
    if (unit === 'metric') {
      return `${Math.round(temp)}°C`;
    }
    return `${Math.round((temp * 9/5) + 32)}°F`;
  }, [unit]);

  return {
    unit,
    toggleUnit,
    formatTemperature
  };
}; 