import React, {useContext, useEffect, useState} from "react";
import ConfigContext from "./ConfigContext.jsx";

export default function Header({location}) {
	const {timeOptions, locale, dateOptions} = useContext(ConfigContext)
	const [time, setTime] = useState(new Intl.DateTimeFormat(locale, timeOptions).format(new Date()));
	const [date, setDate] = useState(new Intl.DateTimeFormat(locale, dateOptions).format(new Date()));
	useEffect(() => {
		const timer = setInterval(() => {
			setTime(new Intl.DateTimeFormat(locale, timeOptions).format(new Date()));
			setDate(new Intl.DateTimeFormat(locale, dateOptions).format(new Date()));
		}, 1000);
		return () => clearInterval(timer);
	})
	console.log(location)
    return (
        <header>
            <h1 id="Location">{location.name}</h1>
            <h3 id="dateAndTime">{time}, {date}</h3>
        </header>
    );
}
