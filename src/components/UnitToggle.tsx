import React from 'react';
import {
  ToggleButton,
  ToggleButtonGroup,
  Paper
} from '@mui/material';

interface Props {
  unit: 'metric' | 'imperial';
  onToggle: () => void;
}

export const UnitToggle: React.FC<Props> = ({ unit, onToggle }) => {
  return (
    <Paper elevation={3} sx={{ p: 1, mb: 2, display: 'flex', justifyContent: 'center' }}>
      <ToggleButtonGroup
        value={unit}
        exclusive
        onChange={onToggle}
        aria-label="temperature unit"
      >
        <ToggleButton value="metric" aria-label="celsius">
          °C
        </ToggleButton>
        <ToggleButton value="imperial" aria-label="fahrenheit">
          °F
        </ToggleButton>
      </ToggleButtonGroup>
    </Paper>
  );
}; 