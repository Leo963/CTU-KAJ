import React, {useContext} from 'react';
import StatusBar from "./StatusBar.jsx";
import TopInfo from "./TopInfo.jsx";
import DailyForecast from "./DailyForecast.jsx";
import HourlyForecast from "./HourlyForecast.jsx";
import WeatherContext from "./WeatherContext.jsx";

export default function Core({mainInfo}) {
    return (
        <article>
            <StatusBar/>
            <h2>Feels like: {mainInfo.feels_like}°C</h2>
            <TopInfo mainInfo={mainInfo}/>
            <HourlyForecast />
            <DailyForecast />
        </article>
    )
}
