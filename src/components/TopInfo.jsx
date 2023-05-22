import React, {useContext} from 'react'
import ConfigContext from "./ConfigContext.jsx";

export function windDegreesToDirection(degrees) {
	const compassPoints = [
		{ min: 348.75, max: 11.25, direction: "N" },
		{ min: 11.25, max: 33.75, direction: "NNE" },
		{ min: 33.75, max: 56.25, direction: "NE" },
		{ min: 56.25, max: 78.75, direction: "ENE" },
		{ min: 78.75, max: 101.25, direction: "E" },
		{ min: 101.25, max: 123.75, direction: "ESE" },
		{ min: 123.75, max: 146.25, direction: "SE" },
		{ min: 146.25, max: 168.75, direction: "SSE" },
		{ min: 168.75, max: 191.25, direction: "S" },
		{ min: 191.25, max: 213.75, direction: "SSW" },
		{ min: 213.75, max: 236.25, direction: "SW" },
		{ min: 236.25, max: 258.75, direction: "WSW" },
		{ min: 258.75, max: 281.25, direction: "W" },
		{ min: 281.25, max: 303.75, direction: "WNW" },
		{ min: 303.75, max: 326.25, direction: "NW" },
		{ min: 326.25, max: 348.75, direction: "NNW" },
	];

	const compassPoint = compassPoints.find(
		(point) => degrees >= point.min && degrees < point.max
	);

	return compassPoint ? compassPoint.direction : "N";
}

export default function TopInfo({mainInfo, isAdvancedMode}) {
	const {timeOptions, locale} = useContext(ConfigContext)
    return (
        <section id="top-info">
			<h2>Temperature information</h2>
			<div id="extra">
				<p>Temperature: {Math.round(mainInfo.temp)}°C</p>
				<p>
					Wind: {Math.round(mainInfo.wind_speed)} m/s{" "}
					{windDegreesToDirection(mainInfo.wind_deg)}
				</p>
				<div className="break"></div>
				<div id="advanced-info" className={isAdvancedMode ? "show-advanced" : ""}>
					<p>Pressure: {mainInfo.pressure} hPa</p>
					<p>Humidity: {mainInfo.humidity}%</p>
					<p>Dew Point: {Math.round(mainInfo.dew_point)}°C</p>
				</div>
			</div>
            <div id="sun">
                <span id="rise"><img src="src/assets/Sunrise.svg" alt="sunrise icon"/>{new Intl.DateTimeFormat(locale, timeOptions).format(new Date(mainInfo.sunrise*1000))}</span>
                <span id="set"><img src="src/assets/Sundown.svg" alt="sundown icon"/>{new Intl.DateTimeFormat(locale, timeOptions).format(new Date(mainInfo.sunset*1000))}</span>
            </div>
        </section>
    )
}
