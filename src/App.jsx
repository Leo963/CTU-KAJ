import React, {useEffect, useState} from "react"
import {Route, Routes} from "react-router-dom"
import HomePage from "./pages/Home.jsx";
import Locations from "./pages/Locations.jsx";

function App() {
	return (
		<>
			<Routes>
				<Route path='/' element={<HomePage />}/>
				<Route path='/locations' element={<Locations />}/>
			</Routes>
		</>
	)

}

export default App
