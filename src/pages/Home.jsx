import React, {useContext} from "react";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import Core from "../components/Core.jsx";
import "../styles/core.css";
import WeatherContext from "../components/WeatherContext.jsx";
import useFavicon from "../hooks/useFavicon.js";
import LoadingSpinner from "../components/Loading.jsx";

export default function HomePage() {

	const { weatherData, readableLocation, loadingLocation, loadingWeather } = useContext(WeatherContext)
	useFavicon(weatherData[0])
	if (loadingLocation || loadingWeather) {
		return <div id="loader"><LoadingSpinner/></div>;
	} else {
		return (
			<div id="wrapper">
				<Header location={readableLocation[0]}/>
				<Core mainInfo={weatherData[0].current} hourly={weatherData[0].hourly} daily={weatherData[0].daily}/>
				<Footer/>
			</div>
		);
	}
}
