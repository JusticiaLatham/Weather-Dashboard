# Weather Dashboard

A modern weather dashboard built with React, TypeScript, and Material-UI that allows users to:
- Search for cities with autocomplete
- View current weather conditions
- See 5-day weather forecast
- Toggle between Celsius and Fahrenheit
- Save favorite locations
- Responsive design for all devices

## Live Demo
[View Live App](https://justicialatham.github.io/Weather-Dashboard)

## Features

- **City Search**: Autocomplete search functionality using OpenWeather's Geocoding API
- **Current Weather**: Displays temperature, weather conditions, humidity, and wind speed
- **5-Day Forecast**: Shows weather forecast with daily temperatures and conditions
- **Unit Toggle**: Switch between Celsius and Fahrenheit
- **Favorites**: Save and manage favorite locations with persistent storage
- **Responsive Design**: Built with Material-UI for a modern, mobile-friendly interface

## Technologies Used

- React 18
- TypeScript
- Material-UI v5
- OpenWeather API
- Axios for API requests
- Local Storage for favorites persistence

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/JusticiaLatham/Weather-Dashboard.git
   cd weather-dashboard
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your OpenWeather API key:
   ```
   REACT_APP_OPENWEATHER_API_KEY=17f2334fce210e594a33c13256f3e40c
   ```

4. Start the development server:
   ```bash
   npm start
   ```

   The app will run on http://localhost:3001

## Environment Variables

- `REACT_APP_OPENWEATHER_API_KEY`: OpenWeather API key (already set up in the live demo)

## Project Structure

```
src/
├── components/          # React components
│   ├── SearchLocation.tsx
│   ├── CurrentWeather.tsx
│   ├── Forecast.tsx
│   ├── FavoritesList.tsx
│   └── UnitToggle.tsx
├── hooks/              # Custom React hooks
│   ├── useUnits.ts
│   └── useFavorites.ts
├── services/          # API services
│   └── weatherService.ts
├── types/            # TypeScript types
│   └── weather.ts
└── App.tsx          # Main application component
```

## API Usage

The application uses the following OpenWeather API endpoints:
- Geocoding API for city search
- Current Weather API for current conditions
- 5 Day / 3 Hour Forecast API for forecast data

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Deployment

The app is deployed using GitHub Pages. To deploy new changes:

```bash
npm run deploy
```

This will build the app and deploy it to GitHub Pages automatically.

## License

MIT License - feel free to use this project for your own learning or as a base for your weather dashboard.

## Acknowledgments

- OpenWeather API for weather data
- Material-UI for the component library
- Create React App for the project bootstrap
