import React, { useState, useCallback } from 'react';
import {
  Container,
  CssBaseline,
  ThemeProvider,
  createTheme,
  Box,
  Alert
} from '@mui/material';

import { SearchLocation } from './components/SearchLocation';
import { CurrentWeather } from './components/CurrentWeather';
import { Forecast } from './components/Forecast';
import { FavoritesList } from './components/FavoritesList';
import { UnitToggle } from './components/UnitToggle';
import { useUnits } from './hooks/useUnits';
import { useFavorites } from './hooks/useFavorites';

interface Location {
  name: string;
  lat: number;
  lon: number;
}

interface WeatherData {
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
  };
  weather: Array<{
    main: string;
    description: string;
    icon: string;
  }>;
  wind: {
    speed: number;
  };
  name: string;
}

interface ForecastData {
  dt: number;
  main: {
    temp: number;
    humidity: number;
  };
  weather: Array<{
    description: string;
    icon: string;
  }>;
  wind: {
    speed: number;
  };
}

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    background: {
      default: '#f5f5f5',
    },
  },
});

function App() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { unit, toggleUnit, formatTemperature } = useUnits();
  const { favorites, addFavorite, removeFavorite, isFavorite } = useFavorites();
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);

  const fetchWeatherData = useCallback(async (location: Location) => {
    setSelectedLocation(location);
    setLoading(true);
    setError(null);

    try {
      const [weatherResponse, forecastResponse] = await Promise.all([
        fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&units=${unit}&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}`
        ),
        fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${location.lat}&lon=${location.lon}&units=${unit}&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}`
        )
      ]);

      if (!weatherResponse.ok || !forecastResponse.ok) {
        throw new Error('Failed to fetch weather data');
      }

      const [weatherData, forecastData] = await Promise.all([
        weatherResponse.json(),
        forecastResponse.json()
      ]);

      setWeather(weatherData);
      setForecast(forecastData.list);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setWeather(null);
      setForecast(null);
    } finally {
      setLoading(false);
    }
  }, [unit]);

  const handleLocationSelect = useCallback((location: Location) => {
    fetchWeatherData(location);
  }, [fetchWeatherData]);

  const handleToggleFavorite = useCallback(() => {
    if (!weather || !selectedLocation) return;

    const location = {
      name: weather.name,
      lat: selectedLocation.lat,
      lon: selectedLocation.lon,
    };

    if (isFavorite(weather.name)) {
      removeFavorite(weather.name);
    } else {
      addFavorite(location);
    }
  }, [weather, selectedLocation, isFavorite, removeFavorite, addFavorite]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Box sx={{ py: 4 }}>
          <SearchLocation
            onLocationSelect={handleLocationSelect}
            isLoading={loading}
          />
          
          <UnitToggle
            unit={unit}
            onToggle={toggleUnit}
          />

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <FavoritesList
            favorites={favorites}
            onSelect={handleLocationSelect}
            onRemove={removeFavorite}
          />

          {weather && (
            <CurrentWeather
              data={weather}
              isLoading={loading}
              isFavorite={isFavorite(weather.name)}
              onToggleFavorite={handleToggleFavorite}
              formatTemperature={formatTemperature}
            />
          )}

          {forecast && (
            <Box sx={{ mt: 2 }}>
              <Forecast
                data={forecast}
                isLoading={loading}
                formatTemperature={formatTemperature}
              />
            </Box>
          )}
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;
