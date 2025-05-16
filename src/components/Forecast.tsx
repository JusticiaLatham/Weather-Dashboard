import React from 'react';
import {
  Paper,
  Typography,
  Box,
  Grid,
  Skeleton
} from '@mui/material';

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

interface Props {
  data: ForecastData[] | null;
  isLoading: boolean;
  formatTemperature: (temp: number) => string;
}

export const Forecast: React.FC<Props> = ({
  data,
  isLoading,
  formatTemperature
}) => {
  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>5-Day Forecast</Typography>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            {[1, 2, 3, 4, 5].map((item) => (
              <Grid item key={item} sx={{ width: { xs: '100%', sm: '50%', md: '20%' } }}>
                <Skeleton variant="rectangular" height={200} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Paper>
    );
  }

  if (!data) return null;

  // Group forecast data by day (taking the middle reading of each day)
  const dailyForecasts = data.reduce((acc: ForecastData[], curr) => {
    const date = new Date(curr.dt * 1000).setHours(0, 0, 0, 0);
    if (!acc.find(item => new Date(item.dt * 1000).setHours(0, 0, 0, 0) === date)) {
      acc.push(curr);
    }
    return acc;
  }, []).slice(0, 5);

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>5-Day Forecast</Typography>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          {dailyForecasts.map((day) => (
            <Grid item key={day.dt} sx={{ width: { xs: '100%', sm: '50%', md: '20%' } }}>
              <Paper elevation={2} sx={{ p: 2, height: '100%' }}>
                <Typography variant="subtitle1" gutterBottom>
                  {formatDate(day.dt)}
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <img
                    src={`https://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
                    alt={day.weather[0].description}
                    style={{ width: 50, height: 50 }}
                  />
                  <Typography variant="h6">
                    {formatTemperature(day.main.temp)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
                    {day.weather[0].description}
                  </Typography>
                  <Typography variant="body2">
                    Humidity: {day.main.humidity}%
                  </Typography>
                  <Typography variant="body2">
                    Wind: {day.wind.speed} m/s
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Paper>
  );
}; 