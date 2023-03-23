import React from "react";
import {Link} from "react-router-dom";

export default function Footer() {
	return (
		<nav>
			<div></div>
			<section id="location-list">
				<img src="src/assets/right-arrow.svg" id="prev"/>
				<div id="locations"></div>
				<img src="src/assets/right-arrow.svg" id="next"/>
			</section>
			<Link to={"/locations"} className="location-list-btn">
				<svg
					className="hamburger-icon"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="white"
				>
					<path d="M0 0h24v24H0z" fill="none"/>
					<path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
				</svg>
			</Link>
		</nav>
	)
}
