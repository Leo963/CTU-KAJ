import React, {useContext} from "react";
import LocationsList from "../components/LocationsList.jsx";
import LoadingSpinner from "../components/Loading.jsx";
import WeatherContext from "../components/WeatherContext.jsx";

export default function Locations() {
	const {loadingLocation, loadingWeather, geoDisabled} = useContext(WeatherContext)
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
					<LocationsList/>
				</div>
			);
		}
	}
}
