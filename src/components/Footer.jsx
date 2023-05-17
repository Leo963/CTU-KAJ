import React, {useState} from "react";
import {Link} from "react-router-dom";

export default function Footer() {
	let favoriteLocations = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
	const [currentLocationIndex, setCurrentLocationIndex] = useState(0);

	const handleArrowClick = (direction) => {
		if (direction === "prev") {
			setCurrentLocationIndex((prevIndex) =>
				prevIndex === 0 ? favoriteLocations.length : prevIndex - 1
			);
		} else if (direction === "next") {
			setCurrentLocationIndex((prevIndex) =>
				prevIndex === favoriteLocations.length ? 0 : prevIndex + 1
			);
		}
	};
	return (
		<nav>
			<div></div>
			<section id="location-list">
				<img
					src="src/assets/right-arrow.svg"
					id="prev"
					alt="previous arrow"
					onClick={() => handleArrowClick("prev")}
				/>
				<div id="locations">
          <span
			  className={
				  currentLocationIndex === 0
					  ? "location-icon location-arrow"
					  : "location-icon location-circle"
			  }
		  ></span>
					{favoriteLocations.map((location, index) => {
						return (
							<span
								className={
									currentLocationIndex === index + 1
										? "location-icon location-arrow"
										: "location-icon location-circle"
								}
								key={index}
							></span>
						);
					})}
				</div>
				<img
					src="src/assets/right-arrow.svg"
					id="next"
					alt="next arrow"
					onClick={() => handleArrowClick("next")}
				/>
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
