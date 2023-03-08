import React from "react";

export default function ListItem({img, name}) {
	return (
		<li>
			<div id="location-image">
				<img src={img} alt="Location Image"/>
			</div>
			<div id="location-info">
				<h2>{name}</h2>
			</div>
		</li>
	);
}
