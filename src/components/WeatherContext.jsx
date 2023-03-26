import { createContext, useState, useEffect } from "react";

const WeatherContext = createContext();

export function WeatherProvider({ children }) {
	const [weatherData, setWeatherData] = useState(null);
	const [location, setLocation] = useState(null);
	const [readableLocation, setReadableLocation] = useState(null);
	const [favoriteLocations, setFavoriteLocations] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		getCurrentLocation();
	}, []);

	useEffect(() => {
		if (location) {
			fetchWeatherData(location);
			fetchReadableLocation(location);
		}
	}, [location]);

	useEffect(() => {
		const interval = setInterval(() => {
			if (navigator.onLine && location) {
				fetchWeatherData(location);
			}
		}, 300000); // 5 minutes in milliseconds

		return () => clearInterval(interval);
	}, [location]);

	async function fetchReadableLocation(location) {
		setLoading(true);
		try {
			const response = await fetch(
				`https://weather-proxy.fireup.studio/geolocation?lat=${location.lat}&lon=${location.lon}`
			);
			const data = await response.json();
			setReadableLocation(data)
			console.log(data)
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	}

	function getCurrentLocation() {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition((position) => {
				console.log(position);
				setLocation({
					lat: position.coords.latitude,
					lon: position.coords.longitude,
				});
			});
		}
	}

	async function fetchWeatherData(location) {
		setLoading(true);
		try {
			const response = await fetch(
				`https://weather-proxy.fireup.studio/weather?lat=${location.lat}&lon=${location.lon}`
			);
			const data = await response.json();
			console.log(data)
			setWeatherData(data);
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	}

	function addFavoriteLocation(location) {
		setFavoriteLocations((prevLocations) => [...prevLocations, location]);
	}

	function removeFavoriteLocation(location) {
		setFavoriteLocations((prevLocations) =>
			prevLocations.filter((l) => l !== location)
		);
	}

	return (
		<WeatherContext.Provider
			value={{
				weatherData,
				location,
				loading,
				favoriteLocations,
				addFavoriteLocation,
				removeFavoriteLocation,
				setLocation,
				readableLocation,
				setReadableLocation
			}}
		>
			{children}
		</WeatherContext.Provider>
	);
}

export default WeatherContext;
