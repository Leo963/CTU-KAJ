// src/hooks/useFavicon.js
import { useEffect } from "react";

function useFavicon(weather) {
	useEffect(() => {
		if (weather) {
			const iconId = weather.current.weather[0].icon;
			const link = document.querySelector("link[rel*='icon']") || document.createElement("link");
			link.type = "image/x-icon";
			link.rel = "shortcut icon";
			link.href = `https://openweathermap.org/img/wn/${iconId}@2x.png`;
			document.getElementsByTagName("head")[0].appendChild(link);
		}
	}, [weather]);
}

export default useFavicon;
