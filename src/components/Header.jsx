import React, {useContext, useEffect, useState} from "react";
import ConfigContext from "./ConfigContext.jsx";

export default function Header({location}) {
	const {timeOptions, locale, dateOptions, regionNames} = useContext(ConfigContext)
	const [time, setTime] = useState(new Intl.DateTimeFormat(locale, timeOptions).format(new Date()));
	const [date, setDate] = useState(new Intl.DateTimeFormat(locale, dateOptions).format(new Date()));
	useEffect(() => {
		const timer = setInterval(() => {
			setTime(new Intl.DateTimeFormat(locale, timeOptions).format(new Date()));
			setDate(new Intl.DateTimeFormat(locale, dateOptions).format(new Date()));
		}, 1000);
		return () => clearInterval(timer);
	})
	return (
		<header>
			<h1 id="Location">{
				// This ternary expression checks if the location has local names in the user's locale, and if not, falls back to the location name
				// It also appends the country name to the location name using the regionNames object
				location.local_names === undefined
					? location.name // If local names are undefined, use the location name
					: location.local_names[locale.substring(0, 2)] === undefined
						? location.name // If local names in the user's locale are undefined, use the location name
						: location.local_names[locale.substring(0, 2)] // Otherwise, use the local name in the user's locale
					}
				, {regionNames.of(location.country) // Append the country name to the location name using the regionNames object
				} 
				</h1>
				<h3 id="dateAndTime">{time}, {date}</h3>
		</header>
	);
}
