import React, {useContext} from 'react';
import WeatherContext from "./WeatherContext.jsx";

export default function DailyForecast({daily}) {
	return (
		<section id="daily">
			<h2>Forecast for next few days</h2>
			{daily.map((day) => (
				// This div contains the weather data for a single day
				<div key={day.dt}>
					{/* This paragraph displays the date of the day */}
					<p>
						{new Date(day.dt * 1000).toLocaleDateString([], {
							day: "numeric",
							month: "short",
						})}
					</p>
					{/* This image displays the weather icon for the day */}
					<img
						src={
							"https://openweathermap.org/img/wn/" +
							day.weather[0].icon +
							".png"
						}
						alt={day.weather[0].description}
					/>
					{/* This paragraph displays the maximum and minimum temperature for the day */}
					<p>
						{Math.round(day.temp.max)}°C<br/>
						{Math.round(day.temp.min)}°C
					</p>
				</div>
			))}Ł
		</section>
	)
}
