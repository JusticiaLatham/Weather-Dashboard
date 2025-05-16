export interface WeatherData {
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
  };
  weather: WeatherCondition[];
  wind: {
    speed: number;
    deg: number;
  };
  name: string;
  dt: number;
  sys: {
    country: string;
    sunrise: number;
    sunset: number;
  };
}

export interface WeatherCondition {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface Location {
  name: string;
  lat: number;
  lon: number;
}

export interface FavoriteLocation extends Location {
  id: string;
}

export type Units = 'metric' | 'imperial';

export interface WeatherError {
  message: string;
  code?: number;
} 