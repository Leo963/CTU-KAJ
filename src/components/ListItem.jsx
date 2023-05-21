import React, {useContext} from "react";
import WeatherContext from "./WeatherContext.jsx";

export default function ListItem({index, weather, location}) {

	const {removeFavoriteLocation} = useContext(WeatherContext);
	const handleDelete = () => {
		removeFavoriteLocation(location);
		console.log("Deleted location: " + location.name);
		console.log("Index: " + index);
	};

	return (
		<li className="list-item">
			<div id="location-info">
				<h2>{location.name}</h2>
			</div>
			<div id="location-weather">
				<h2>{Math.round(weather.current.temp)}°C</h2>
			</div>
			<div className="list-item-actions">
				<button onClick={handleDelete}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="white"
						width="25px"
						height="25px"
					>
						<path d="M0 0h24v24H0z" fill="none" />
						<path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
					</svg>
				</button>
			</div>
		</li>
	);
}
