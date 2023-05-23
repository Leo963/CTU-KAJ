import React, {useContext, useEffect} from "react";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import Core from "../components/Core.jsx";
import "../styles/core.css";
import WeatherContext from "../components/WeatherContext.jsx";
import useFavicon from "../hooks/useFavicon.js";
import LoadingSpinner from "../components/Loading.jsx";

export default function HomePage() {

	const { weatherData, readableLocation, loadingLocation, loadingWeather, currentLocationIndex, favoriteLocations, geoDisabled } = useContext(WeatherContext)
	useFavicon(weatherData[currentLocationIndex])
	if (loadingLocation || loadingWeather) {
		return <div id="loader"><LoadingSpinner/></div>;
	} else {
		if (geoDisabled) {
			return (
				<div id="geo-disabled">
					<h2>Geolocation is disabled or not supported</h2>
					<p>Enable geolocation in your browser to use this feature</p>
				</div>
			)
		} else {
			return (
				<div id="wrapper">
					<Header
						location={currentLocationIndex === 0 ? readableLocation[0] : favoriteLocations[currentLocationIndex - 1]}/>
					<Core mainInfo={weatherData[currentLocationIndex].current}
						  hourly={weatherData[currentLocationIndex].hourly}
						  daily={weatherData[currentLocationIndex].daily}/>
					<Footer/>
				</div>
			);
		}
	}
}
