import React from "react";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import Core from "../components/Core.jsx";
import "../styles/core.css";

let weather = {
	feelsLike: 15,
	mainInfo: {
		temperature: 17,
		windSpeed: 5
	}
}

const options = {
	year: "numeric",
	month: "long",
	day: "numeric"
};

const timeOptions = {
	hour: "numeric",
	minute: "numeric",
	hour12: false
}

const locale = navigator.language;
export default function HomePage() {
	return (
		<div id="wrapper">
			<Header location={"Prague, Czech republic"} time={new Intl.DateTimeFormat(locale, timeOptions).format(new Date())} date={new Intl.DateTimeFormat(locale, options).format(new Date())}/>
			<Core mainInfo={weather.mainInfo} feelsLike={weather.feelsLike}/>
			<Footer/>
		</div>
	);
}
