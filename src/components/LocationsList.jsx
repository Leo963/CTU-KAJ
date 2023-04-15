import React, {useState, useEffect, useContext} from 'react';
import ListItem from "./ListItem.jsx";
import WeatherContext from "./WeatherContext.jsx";
import {Link} from "react-router-dom";

export default function LocationsList() {
	const {readableLocation, weatherData, setLoadingLocation} = useContext(WeatherContext);
	const [favoriteLocations, setFavoriteLocations] = useState([]);
	const [modalOpen, setModalOpen] = useState(false);
	const [newLocation, setNewLocation] = useState("");
	const [loadedLocation, setLoadedLocation] = useState(null);

	async function fetchLocation(location) {
		setLoadingLocation(true);
		try {
			const response = await fetch(
				`http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=5&appid=`
			);
			const data = await response.json();
			setLoadedLocation(data)
		} catch (error) {
			console.error(error);
		} finally {
			setLoadingLocation(false);
		}
	}
	function handleAddFavorite() {
		if (newLocation.trim()) {
			console.log(newLocation)
			fetchLocation(newLocation)
			console.log(loadedLocation)
			setFavoriteLocations([...favoriteLocations, loadedLocation]);
			console.log(loadedLocation)
			localStorage.setItem("favoriteLocations", JSON.stringify([...favoriteLocations, loadedLocation]));
			setNewLocation("");
		}
	}


	useEffect(() => {
		const storedLocations = localStorage.getItem('favoriteLocations');
		if (storedLocations) {
			setFavoriteLocations(JSON.parse(storedLocations));
		}
	}, []);

	return (
		<div id="locations-container">
			<ul>
				<ListItem key={-1} weather={weatherData} location={readableLocation[0]}/>
				{favoriteLocations.map((location, index) => (
					<ListItem key={index} location={location}/>
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
							placeholder="Enter location"
							value={newLocation}
							onChange={(e) => setNewLocation(e.target.value)}
						/>
						<div className="modal-buttons">
							<button onClick={() => {}}>Add</button>
							<button onClick={() => setModalOpen(false)}>Cancel</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
