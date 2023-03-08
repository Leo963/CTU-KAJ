import React from 'react';
import StatusBar from "./StatusBar.jsx";
import TopInfo from "./TopInfo.jsx";
import DailyForecast from "./DailyForecast.jsx";
import HourlyForecast from "./HourlyForecast.jsx";

export default function Core({feelsLike, mainInfo}) {
    return (
        <article>
            <StatusBar/>
            <h2>Feels like: {feelsLike}°C</h2>
            <TopInfo mainInfo={mainInfo}/>
            <HourlyForecast />
            <DailyForecast />
        </article>
    )
}
