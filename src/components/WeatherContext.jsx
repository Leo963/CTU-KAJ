// This file defines a context object for weather data and location information
import { createContext, useState, useEffect } from "react";

// This creates a context object for the weather data and location information
const WeatherContext = createContext();

// This component provides the WeatherContext to its children
export function WeatherProvider({ children }) {
  // These state variables store the weather data, location, readable location, favorite locations, and loading status
  const [weatherData, setWeatherData] = useState([]);
  const [location, setLocation] = useState(null);
  const [readableLocation, setReadableLocation] = useState(null);
  const [favoriteLocations, setFavoriteLocations] = useState([]);
  const [loadingWeather, setLoadingWeather] = useState(true);
  const [loadingLocation, setLoadingLocation] = useState(true);
  const [favoriteLoading, setFavoriteLoading] = useState(false);
  const [currentLocationIndex, setCurrentLocationIndex] = useState(0);
  const [geoDisabled, setGeoDisabled] = useState(false);

  // This effect hook runs once on mount and gets the user's current location and favorite locations from local storage
  useEffect(() => {
    getCurrentLocation();
    loadFavoriteLocations();
  }, []);

  // This effect hook runs whenever the location state variable changes and fetches the weather data and readable location for the new location
  useEffect(() => {
    if (location) {
      fetchWeatherData(location, 0);
      fetchReadableLocation(location);
    }
  }, [location]);

  // This effect hook runs whenever the favoriteLocations state variable changes and fetches the weather data for each favorite location
  useEffect(() => {
    let promiseList = [];
    favoriteLocations.forEach((location, index) => {
      promiseList.push(fetchWeatherData(location, index + 1));
    });
    Promise.all(promiseList).then(() => {
      setFavoriteLoading(false);
    });
  }, [favoriteLocations]);

  // This effect hook runs whenever the favoriteLocations state variable changes and saves the favorite locations to local storage
  useEffect(() => {
    localStorage.setItem("favoriteLocations", JSON.stringify(favoriteLocations));
  }, [favoriteLocations]);

  // This effect hook runs every 5 minutes and fetches the weather data for the current location and favorite locations
  useEffect(() => {
    const interval = setInterval(() => {
      if (navigator.onLine) {
        if (location) fetchWeatherData(location, 0);
        favoriteLocations.forEach((location, index) => {
          if (navigator.onLine) fetchWeatherData(location, index + 1);
        });
        setFavoriteLoading(false);
      }
    }, 300000); // 5 minutes in milliseconds

    return () => clearInterval(interval);
  }, [location]);

  /**
   * This function fetches the readable location for a given location
   * @param {Location} location - The location to fetch the readable location for
   */
  async function fetchReadableLocation(location) {
    setLoadingLocation(true);
    try {
      const response = await fetch(
        `https://weather-proxy.fireup.studio/geolocation?lat=${location.lat}&lon=${location.lon}`
      );
      const data = await response.json();
      setReadableLocation(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingLocation(false);
    }
  }

  /**
   * This function fetches the weather data for a given location and stores it in the weatherData state variable
   * @param {Location} location - The location to fetch the weather data for
   * @param {number} index - The index of the location in the weatherData array
   */
  async function fetchWeatherData(location, index) {
    setLoadingWeather(true);
    try {
      const response = await fetch(
        `https://weather-proxy.fireup.studio/weather?lat=${location.lat}&lon=${location.lon}`
      );
      const data = await response.json();
      setWeatherData((prevData) => {
        const newData = [...prevData];
        newData[index] = data;
        return newData;
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingWeather(false);
    }
  }

  // This function gets the user's current location and sets it as the location state variable
  function getCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        },
        (error) => {
          console.error(error);
          setGeoDisabled(true);
		  setLoadingLocation(false)
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      setGeoDisabled(true);
    }
  }

  // This function loads the user's favorite locations from local storage and sets them as the favoriteLocations state variable
  function loadFavoriteLocations() {
    const storedLocations = localStorage.getItem("favoriteLocations");
    if (storedLocations) {
      setFavoriteLocations(JSON.parse(storedLocations));
    }
  }

  // This object provides the weather data, location, readable location, favorite locations, and loading status to the WeatherContext
  const contextValue = {
    weatherData,
    location,
    readableLocation,
    favoriteLocations,
    loadingWeather,
    loadingLocation,
    favoriteLoading,
    currentLocationIndex,
    geoDisabled,
    setWeatherData,
    setLocation,
    setReadableLocation,
    setFavoriteLocations,
    setLoadingWeather,
    setLoadingLocation,
    setFavoriteLoading,
    setCurrentLocationIndex,
    setGeoDisabled,
  };

  return (
    <WeatherContext.Provider value={contextValue}>
      {children}
    </WeatherContext.Provider>
  );
}

export default WeatherContext;
