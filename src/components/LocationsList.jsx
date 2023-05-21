import React, {useState, useEffect, useContext} from 'react';
import ListItem from "./ListItem.jsx";
import WeatherContext from "./WeatherContext.jsx";
import {Link} from "react-router-dom";

export default function LocationsList() {
	const {readableLocation, weatherData, addFavoriteLocation, favoriteLocations, favoriteLoading} = useContext(WeatherContext);
	const [modalOpen, setModalOpen] = useState(false);
	const [newLocation, setNewLocation] = useState("");

	async function fetchLocation(location) {
		// setLoadingLocation(true);
		try {
			const response = await fetch(
				`https://weather-proxy.fireup.studio/fulllocation?location=${location}`
			);
			const data = await response.json();
			addFavoriteLocation(data[0]);
		} catch (error) {
			console.error(error);
		} finally {
			// setLoadingLocation(false);
		}
	}
	async function handleAddFavorite() {
		if (newLocation) {
			await fetchLocation(newLocation);
			setModalOpen(false);
		}
	}

	return (
		<div id="locations-container">
			<ul>
				<ListItem key={0} weather={weatherData[0]} location={readableLocation[0]}/>
				{!favoriteLoading && favoriteLocations.map((location, index) => (
					<ListItem key={index+1} index={index} weather={weatherData[index+1]} location={location}/>
				))}
			</ul>
			<footer className="locations-list-footer">
				<Link to={"/"} className="go-back-btn">
					Back to Home
				</Link>
				<button className="add-favorite-btn" onClick={() => setModalOpen(true)}>
					Add Favorite
				</button>
			</footer>
			{modalOpen && (
				<div className="modal">
					<div className="modal-content">
						<h2>Add a new favorite location</h2>
						<input
							type="text"
							placeholder="Enter location i.e. New York or London"
							value={newLocation}
							onChange={(e) => setNewLocation(e.target.value)}
							onSubmit={() => handleAddFavorite()}
						/>
						<div className="modal-buttons">
							<button onClick={() => setModalOpen(false)}>Cancel</button>
							<button onClick={() => handleAddFavorite()}>Add</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
