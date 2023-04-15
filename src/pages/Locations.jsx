import React, {useContext} from "react";
import LocationsList from "../components/LocationsList.jsx";
import LoadingSpinner from "../components/Loading.jsx";
import WeatherContext from "../components/WeatherContext.jsx";

export default function Locations() {
	const { loadingLocation, loadingWeather } = useContext(WeatherContext)
	if (loadingLocation || loadingWeather) {
		return <div id="loader"><LoadingSpinner/></div>;
	} else {
		return (
        <div id="wrapper">
            <LocationsList />
        </div>
    );
	}
}
