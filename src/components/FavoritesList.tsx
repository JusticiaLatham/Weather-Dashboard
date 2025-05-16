import React from 'react';
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Paper,
  Typography,
  ListItemButton
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

interface Location {
  name: string;
  lat: number;
  lon: number;
}

interface Props {
  favorites: Location[];
  onSelect: (location: Location) => void;
  onRemove: (locationName: string) => void;
}

export const FavoritesList: React.FC<Props> = ({
  favorites,
  onSelect,
  onRemove
}) => {
  if (favorites.length === 0) {
    return (
      <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
        <Typography variant="subtitle1" color="text.secondary">
          No favorite locations yet
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper elevation={3} sx={{ mb: 2 }}>
      <List>
        {favorites.map((location) => (
          <ListItem
            key={location.name}
            secondaryAction={
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={(e) => {
                  e.stopPropagation();
                  onRemove(location.name);
                }}
              >
                <DeleteIcon />
              </IconButton>
            }
            disablePadding
          >
            <ListItemButton onClick={() => onSelect(location)}>
              <ListItemText primary={location.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}; 