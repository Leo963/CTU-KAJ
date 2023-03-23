import React, {useContext, useState} from 'react';
import StatusBar from "./StatusBar.jsx";
import TopInfo from "./TopInfo.jsx";
import DailyForecast from "./DailyForecast.jsx";
import HourlyForecast from "./HourlyForecast.jsx";
import WeatherContext from "./WeatherContext.jsx";

export default function Core({mainInfo, hourly, daily}) {
	const [isAdvancedMode, setIsAdvancedMode] = useState(false);
    return (
        <article>
            <StatusBar isAdvancedMode={isAdvancedMode} setIsAdvancedMode={setIsAdvancedMode}/>
            <h2>Feels like: {mainInfo.feels_like}°C</h2>
            <TopInfo mainInfo={mainInfo} isAdvancedMode={isAdvancedMode}/>
            <HourlyForecast hourly={hourly}/>
            <DailyForecast daily={daily}/>
        </article>
    )
}
