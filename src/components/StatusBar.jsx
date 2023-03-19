import React, { useEffect, useState } from "react";

export default function StatusBar() {
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

	return (
		<div id="status-bar">
			<div id="status-indicator" className={online ? "online" : "offline"}></div>
			<div id="lod">
				<input type="radio" defaultChecked name="lod" id="basic" />
				<label htmlFor="basic">Basic</label>
				<input type="radio" name="lod" id="advanced" />
				<label htmlFor="advanced">Advanced</label>
			</div>
		</div>
	);
}
