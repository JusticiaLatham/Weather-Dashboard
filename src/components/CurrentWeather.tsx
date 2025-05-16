import React from 'react';
import {
  Paper,
  Typography,
  Box,
  IconButton,
  Skeleton
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

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

interface Props {
  data: WeatherData | null;
  isLoading: boolean;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  formatTemperature: (temp: number) => string;
}

export const CurrentWeather: React.FC<Props> = ({
  data,
  isLoading,
  isFavorite,
  onToggleFavorite,
  formatTemperature
}) => {
  if (isLoading) {
    return (
      <Paper elevation={3} sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Skeleton variant="text" width={200} height={40} />
          <Skeleton variant="circular" width={40} height={40} />
        </Box>
        <Skeleton variant="rectangular" width="100%" height={200} />
      </Paper>
    );
  }

  if (!data) return null;

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Typography variant="h4" gutterBottom>
          {data.name}
        </Typography>
        <IconButton onClick={onToggleFavorite} color="primary">
          {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </IconButton>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <img
          src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
          alt={data.weather[0].description}
          style={{ width: 100, height: 100 }}
        />
        <Box sx={{ ml: 2 }}>
          <Typography variant="h3">
            {formatTemperature(data.main.temp)}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Feels like {formatTemperature(data.main.feels_like)}
          </Typography>
        </Box>
      </Box>

      <Typography variant="h6" sx={{ textTransform: 'capitalize' }}>
        {data.weather[0].description}
      </Typography>

      <Box sx={{ mt: 2 }}>
        <Typography variant="body1">
          Humidity: {data.main.humidity}%
        </Typography>
        <Typography variant="body1">
          Wind Speed: {data.wind.speed} m/s
        </Typography>
      </Box>
    </Paper>
  );
}; 