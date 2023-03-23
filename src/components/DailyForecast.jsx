import React, {useContext} from 'react';
import WeatherContext from "./WeatherContext.jsx";

export default function DailyForecast() {
	const {weatherData} = useContext(WeatherContext)
	return (
		<section id="daily">
			{weatherData.daily.map((day) => (
				<div key={day.dt}>
					<p>
						{new Date(day.dt * 1000).toLocaleDateString([], {
							day: "numeric",
							month: "short",
						})}
					</p>
					<img src={"https://openweathermap.org/img/wn/" + day.weather[0].icon + ".png"}
						 alt={day.weather[0].description}/>
					<p>
						{Math.round(day.temp.max)}°C<br/>
						{Math.round(day.temp.min)}°C
					</p>
				</div>
			))}
		</section>
	)
}
