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

const ConfigContext = createContext({
	dateOptions,
	timeOptions,
	locale,
});

export function ConfigProvider({ children }) {
	return (
		<ConfigContext.Provider value={{ dateOptions, timeOptions, locale }}>
			{children}
		</ConfigContext.Provider>
	);
}

export default ConfigContext;
