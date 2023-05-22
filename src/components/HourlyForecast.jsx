import React from 'react';
import WeatherGraph from "./WeatherGraph.jsx";
import {windDegreesToDirection} from "./TopInfo.jsx";

export default function HourlyForecast({hourly}) {
	const hours = hourly.slice(0, 24);
	const hoursToShow = hours.filter((hour, i) => i % 3 === 0);

	return (
		<section id="hourly">
			<h2>Hourly forecast</h2>
			<div id="above">
				<section id="time">
					<h2>Times of given forecast</h2>
					{hoursToShow.map((hour) => (
						<p key={hour.dt}>
							{new Date(hour.dt * 1000).toLocaleTimeString([], {
								hour: "2-digit",
								minute: "2-digit",
								hour12: false,
							})}
						</p>
					))}
				</section>
				<section id="icons">
					<h2>Icons of given forecast</h2>
					{hoursToShow.map((hour) => (
						<img key={hour.dt} src={"https://openweathermap.org/img/wn/" + hour.weather[0].icon + ".png"}
							 alt={hour.weather[0].description}/>
					))}
				</section>
			</div>
			{!hoursToShow.map(data => data.rain && data.rain['1h'] ? data.rain['1h'] : 0).every(rain => rain === 0) &&
			<WeatherGraph rain={hoursToShow} />
			}
			<div id="below">
				<section id="temps">
					<h2>Forecast of temperatures at given times</h2>
					{hoursToShow.map((hour) => (
						<p key={hour.dt}>
							{Math.round(hour.temp)}°C
						</p>
					))}
				</section>
				<section id="winds">
					<h2>Forecast of winds at given times</h2>
					{hoursToShow.map((hour) => (
						<p key={hour.dt}>
							{Math.round(hour.wind_speed)} m/s<br/>
							{windDegreesToDirection(hour.wind_deg)}
						</p>
					))}
				</section>
			</div>
		</section>
	);
}
