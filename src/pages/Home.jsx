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
export default function HomePage() {
	return (
		<div id="wrapper">
			<Header/>
			<Core mainInfo={weather.mainInfo} feelsLike={weather.feelsLike}/>
			<Footer/>
		</div>
	);
}
