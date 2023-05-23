import React, { useEffect, useState } from "react";

export default function StatusBar({isAdvancedMode, setIsAdvancedMode}) {
	const [online, setOnline] = useState(navigator.onLine);

	useEffect(() => {
		const handleOnline = () => setOnline(true);
		const handleOffline = () => setOnline(false);

		window.addEventListener("online", handleOnline);
		window.addEventListener("offline", handleOffline);

		return () => {
			window.removeEventListener("online", handleOnline);
			window.removeEventListener("offline", handleOffline);
		};
	}, []);

	const handleBasicClick = () => {
		setIsAdvancedMode(false);
	};

	const handleAdvancedClick = () => {
		setIsAdvancedMode(true);
	};


	return (
		<div id="status-bar">
			<div id="status-indicator" className={online ? "online" : "offline"}></div>
			<div id="lod">
				<input type="radio" checked={!isAdvancedMode} name="lod" id="basic" onChange={handleBasicClick}/>
				<label htmlFor="basic">Basic</label>
				<input type="radio" checked={isAdvancedMode} name="lod" id="advanced" onChange={handleAdvancedClick} />
				<label htmlFor="advanced">Advanced</label>
			</div>
		</div>
	);
}
