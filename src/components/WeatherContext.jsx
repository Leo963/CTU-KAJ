import { createContext, useState, useEffect } from "react";

const WeatherContext = createContext();

export function WeatherProvider({ children }) {
	const [weatherData, setWeatherData] = useState([]);
	const [location, setLocation] = useState(null);
	const [readableLocation, setReadableLocation] = useState(null);
	const [favoriteLocations, setFavoriteLocations] = useState([]);
	const [loadingWeather, setLoadingWeather] = useState(true);
	const [loadingLocation, setLoadingLocation] = useState(true);

	useEffect(() => {
		getCurrentLocation();
		loadFavoriteLocations();
	}, []);

	useEffect(() => {
		if (location) {
			fetchWeatherData(location, 0);
			fetchReadableLocation(location);
		}
	}, [location]);

	useEffect(() => {
		favoriteLocations.forEach((location, index) => {
			fetchWeatherData(location, index + 1);
		});
	}, [favoriteLocations]);

	useEffect(() => {
		localStorage.setItem("favoriteLocations", JSON.stringify(favoriteLocations));
	}, [favoriteLocations]);

	useEffect(() => {
		const interval = setInterval(() => {

			if (navigator.onLine) {
				if (location)
					fetchWeatherData(location, 0);
				favoriteLocations.forEach((location, index) => {
					if (navigator.onLine)
						fetchWeatherData(location, index + 1);
				})
			}
		}, 300000); // 5 minutes in milliseconds

		return () => clearInterval(interval);
	}, [location]);

	async function fetchReadableLocation(location) {
		setLoadingLocation(true);
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
			setLoadingLocation(false);
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

	async function fetchWeatherData(location, index) {
		setLoadingWeather(true);
		try {
			const response = await fetch(
				`https://weather-proxy.fireup.studio/weather?lat=${location.lat}&lon=${location.lon}`
			);
			const data = await response.json();
			setWeatherData((prevWeatherData) => {
				const newWeatherData = [...prevWeatherData];
				newWeatherData[index] = data;
				return newWeatherData;
			});
		} catch (error) {
			console.error(error);
		} finally {
			setLoadingWeather(false);
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

	function loadFavoriteLocations() {
		const storedLocations = JSON.parse(localStorage.getItem("favoriteLocations"));
		if (storedLocations) {
			setFavoriteLocations(storedLocations);
		}
	}

	return (
		<WeatherContext.Provider
			value={{
				weatherData,
				location,
				loadingWeather,
				loadingLocation,
				favoriteLocations,
				addFavoriteLocation,
				removeFavoriteLocation,
				setLocation,
				readableLocation,
				setReadableLocation,
				setLoadingLocation
			}}
		>
			{children}
		</WeatherContext.Provider>
	);
}

export default WeatherContext;
