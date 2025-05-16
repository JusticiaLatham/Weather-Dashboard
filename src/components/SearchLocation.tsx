import React, { useState } from 'react';
import {
  TextField,
  Autocomplete,
  Paper,
  CircularProgress,
  Box
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

interface Location {
  name: string;
  lat: number;
  lon: number;
}

interface Props {
  onLocationSelect: (location: Location) => void;
  isLoading?: boolean;
}

export const SearchLocation: React.FC<Props> = ({ onLocationSelect, isLoading = false }) => {
  const [search, setSearch] = useState('');
  const [options, setOptions] = useState<Location[]>([]);
  const [inputLoading, setInputLoading] = useState(false);

  const handleSearch = async (value: string) => {
    setSearch(value);
    if (value.length < 3) {
      setOptions([]);
      return;
    }

    setInputLoading(true);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${value}&limit=5&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}`
      );
      const data = await response.json();
      setOptions(data.map((item: any) => ({
        name: `${item.name}, ${item.country}`,
        lat: item.lat,
        lon: item.lon
      })));
    } catch (error) {
      console.error('Error fetching locations:', error);
      setOptions([]);
    } finally {
      setInputLoading(false);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
      <Autocomplete
        freeSolo
        options={options}
        getOptionLabel={(option) => typeof option === 'string' ? option : option.name}
        loading={inputLoading}
        onInputChange={(_, value) => handleSearch(value)}
        onChange={(_, value) => {
          if (value && typeof value !== 'string') {
            onLocationSelect(value);
          }
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search for a city"
            variant="outlined"
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  {inputLoading || isLoading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : (
                    <SearchIcon color="action" />
                  )}
                  {params.InputProps.endAdornment}
                </Box>
              ),
            }}
          />
        )}
      />
    </Paper>
  );
}; 