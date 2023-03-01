import React from 'react';
import StatusBar from "./StatusBar.jsx";
import TopInfo from "./TopInfo.jsx";
import DailyForecast from "./DailyForecast.jsx";
import HourlyForecast from "./HourlyForecast.jsx";

export default function Core() {
    return (
        <article>
            <StatusBar/>
            <h2>Feels like: 15°C</h2>
            <TopInfo />
            <HourlyForecast />
            <DailyForecast />
        </article>
    )
}