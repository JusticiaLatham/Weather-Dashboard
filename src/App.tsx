import React, { useState, useCallback } from 'react';
import {
  Container,
  CssBaseline,
  ThemeProvider,
  createTheme,
  Box,
  Alert,
  Typography,
  Paper,
  AppBar,
  Toolbar,
  useTheme,
  useMediaQuery
} from '@mui/material';
import WbSunnyIcon from '@mui/icons-material/WbSunny';

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
      main: '#2196f3',
    },
    background: {
      default: '#f0f2f5',
      paper: '#ffffff',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          textTransform: 'none',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        },
      },
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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" elevation={0} sx={{ mb: 3, background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)' }}>
          <Toolbar>
            <WbSunnyIcon sx={{ mr: 2 }} />
            <Typography variant="h5" component="h1" sx={{ flexGrow: 1, fontWeight: 600 }}>
              Weather Dashboard
            </Typography>
            <UnitToggle
              unit={unit}
              onToggle={toggleUnit}
            />
          </Toolbar>
        </AppBar>

        <Container maxWidth="lg">
          <Box sx={{ py: 3 }}>
            <Paper elevation={0} sx={{ p: 3, mb: 3 }}>
              <SearchLocation
                onLocationSelect={handleLocationSelect}
                isLoading={loading}
              />
            </Paper>

            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                <Typography>{error}</Typography>
              </Alert>
            )}

            <Box sx={{ display: 'grid', gap: 3, gridTemplateColumns: isMobile ? '1fr' : '300px 1fr' }}>
              <Paper elevation={0} sx={{ p: 3, height: 'fit-content' }}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                  Favorite Locations
                </Typography>
                <FavoritesList
                  favorites={favorites}
                  onSelect={handleLocationSelect}
                  onRemove={removeFavorite}
                />
              </Paper>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                {weather && (
                  <Paper elevation={0} sx={{ p: 3 }}>
                    <CurrentWeather
                      data={weather}
                      isLoading={loading}
                      isFavorite={isFavorite(weather.name)}
                      onToggleFavorite={handleToggleFavorite}
                      formatTemperature={formatTemperature}
                    />
                  </Paper>
                )}

                {forecast && (
                  <Paper elevation={0} sx={{ p: 3 }}>
                    <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                      5-Day Forecast
                    </Typography>
                    <Forecast
                      data={forecast}
                      isLoading={loading}
                      formatTemperature={formatTemperature}
                    />
                  </Paper>
                )}
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
