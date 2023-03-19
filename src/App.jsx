import React, {useEffect, useState} from "react"
import {Route, Routes} from "react-router-dom"
import HomePage from "./pages/Home.jsx";
import Locations from "./pages/Locations.jsx";
import {WeatherProvider} from "./components/WeatherContext.jsx";
import {ConfigProvider} from "./components/ConfigContext.jsx";

function App() {
	return (
		<>
			<WeatherProvider>
				<ConfigProvider>
					<Routes>
						<Route path='/' element={<HomePage/>}/>
						<Route path='/locations' element={<Locations/>}/>
					</Routes>
				</ConfigProvider>
			</WeatherProvider>
		</>
	)

}

export default App
