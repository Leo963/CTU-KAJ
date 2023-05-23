import React, {useState, useEffect, useContext} from 'react';
import ListItem from "./ListItem.jsx";
import WeatherContext from "./WeatherContext.jsx";
import {Link} from "react-router-dom";

export default function LocationsList() {
	const {readableLocation, weatherData, addFavoriteLocation, favoriteLocations, favoriteLoading, setCurrentLocationIndex} = useContext(WeatherContext);
	const [modalOpen, setModalOpen] = useState(false);
	const [newLocation, setNewLocation] = useState("");

	/**
	 * This function fetches the location data for a given location string and adds it to the favorite locations list
	 * @param {string} location - The location string to fetch data for
	 * @returns {void}
	 */
	async function fetchLocation(location) {
		try {
			const response = await fetch(
				`https://weather-proxy.fireup.studio/fulllocation?location=${location}`
			);
			const data = await response.json();
			if (data.length === 0) {
				alert(`Input "${location}" not found`);
				setNewLocation("")
				return;
			}
			addFavoriteLocation(data[0]);
		} catch (error) {
			console.error(error);
		}
	}

	/**
	 * This function handles the click event of the "Add Favorite" button and fetches the location data for the new location string
	 */
	async function handleAddFavorite() {
		if (newLocation.trim()) {
			await fetchLocation(newLocation);
			setModalOpen(false);
		} else {
			setNewLocation("")
			alert("Please enter a valid location not just whitespace")
		}
	}

	function closeModal() {
		setModalOpen(false);
		setNewLocation("");
	}

	function clearIndex() {
		setCurrentLocationIndex(0);
	}

	return (
		<div id="locations-container">
			<ul>
				<ListItem key={0} weather={weatherData[0]} location={readableLocation[0]} index={-1}/>
				{!favoriteLoading && favoriteLocations.map((location, index) => (
					<ListItem key={index+1} index={index} weather={weatherData[index+1]} location={location}/>
				))}
			</ul>
			<footer className="locations-list-footer">
				<Link to={"/"} onClick={clearIndex} className="go-back-btn">
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
							<button onClick={() => closeModal()}>Cancel</button>
							<button onClick={() => handleAddFavorite()}>Add</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
