// src/contexts/ConfigContext.js
import { createContext } from "react";

const dateOptions = {
	year: "numeric",
	month: "long",
	day: "numeric",
};

const timeOptions = {
	hour: "numeric",
	minute: "numeric",
	hour12: false,
};

const locale = navigator.language;

const regionNames = new Intl.DisplayNames([locale], { type: 'region' });

const ConfigContext = createContext({
	dateOptions,
	timeOptions,
	locale,
	regionNames,
});



export function ConfigProvider({ children }) {
	return (
		<ConfigContext.Provider value={{ dateOptions, timeOptions, locale, regionNames }}>
			{children}
		</ConfigContext.Provider>
	);
}

export default ConfigContext;
