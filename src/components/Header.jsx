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
				location.local_names === undefined ? location.name : location.local_names[locale.substring(0, 2)] === undefined ? location.name : location.local_names[locale.substring(0, 2)]}, {regionNames.of(location.country)}
			</h1>
			<h3 id="dateAndTime">{time}, {date}</h3>
		</header>
	);
}
