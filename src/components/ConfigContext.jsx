// This file defines a context object for configuration options
import { createContext } from "react";

// These options define how to format dates
const dateOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
};

// These options define how to format times
const timeOptions = {
    hour: "numeric",
    minute: "numeric",
    hour12: false,
};

// This variable stores the user's locale
const locale = navigator.language;

// This variable stores the display names for regions in the user's locale
const regionNames = new Intl.DisplayNames([locale], { type: 'region' });

// This creates a context object with the above configuration options
const ConfigContext = createContext({
    dateOptions,
    timeOptions,
    locale,
    regionNames,
});

// This component provides the ConfigContext to its children
export function ConfigProvider({ children }) {
    return (
        <ConfigContext.Provider value={{ dateOptions, timeOptions, locale, regionNames }}>
            {children}
        </ConfigContext.Provider>
    );
}

export default ConfigContext;