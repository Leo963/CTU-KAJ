function internetAlive() {
	document.querySelector('div#status-indicator').classList.toggle('online');
}

window.addEventListener('offline', internetAlive)
window.addEventListener('online', internetAlive)
