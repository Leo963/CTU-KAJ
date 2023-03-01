let pages = {
	home: "home.html",
	locations: "locations.html",
}

function internetAlive() {
	document.querySelector('div#status-indicator').classList.toggle('online');
}

window.addEventListener('offline', internetAlive)
window.addEventListener('online', internetAlive)
