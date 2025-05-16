import axios from 'axios';
import type { WeatherData, Location, Units } from '../types/weather';

const API_KEY = process.env.REACT_APP_OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';
const GEO_URL = 'https://api.openweathermap.org/geo/1.0';

export const weatherService = {
  async getLocationCoordinates(cityName: string): Promise<Location[]> {
    try {
      const response = await axios.get(
        `${GEO_URL}/direct?q=${encodeURIComponent(cityName)}&limit=5&appid=${API_KEY}`
      );
      return response.data.map((item: any) => ({
        name: item.name,
        lat: item.lat,
        lon: item.lon
      }));
    } catch (error) {
      throw new Error('Failed to fetch location coordinates');
    }
  },

  async getWeatherData(lat: number, lon: number, units: Units): Promise<WeatherData> {
    try {
      const response = await axios.get(
        `${BASE_URL}/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${API_KEY}`
      );
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch weather data');
    }
  },

  async getForecastData(lat: number, lon: number, units: Units): Promise<WeatherData[]> {
    try {
      const response = await axios.get(
        `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&units=${units}&appid=${API_KEY}`
      );
      return response.data.list;
    } catch (error) {
      throw new Error('Failed to fetch forecast data');
    }
  }
}; 