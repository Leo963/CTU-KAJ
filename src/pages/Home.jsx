import React, {useContext} from "react";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import Core from "../components/Core.jsx";
import "../styles/core.css";
import WeatherContext from "../components/WeatherContext.jsx";
import useFavicon from "../hooks/useFavicon.js";

export default function HomePage() {

	const { weatherData, loading, readableLocation } = useContext(WeatherContext)
	useFavicon(weatherData)
	if (loading) {
		return <div>Loading weather data...</div>;
	} else {
		return (
			<div id="wrapper">
				<Header location={readableLocation[0]}/>
				<Core mainInfo={weatherData.current} hourly={weatherData.hourly} daily={weatherData.daily}/>
				<Footer/>
			</div>
		);
	}
}
