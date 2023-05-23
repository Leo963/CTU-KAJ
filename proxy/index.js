const express = require('express');
const axios = require('axios');
const NodeCache = require('node-cache');
const cors = require('cors');

const app = express();
const port = 3000;
const cache = new NodeCache({ stdTTL: 1800 }); // cache weather for 30 minutes
const geoCache = new NodeCache({ stdTTL: 604800 }); // cache geolocation for a week
const apiKey = '';

app.use(cors());
// middleware to cache weather data
const cacheWeather = (req, res, next) => {
    const { lat, lon } = req.query;
    const cacheKey = `weather-${lat}-${lon}`;
    const cachedData = cache.get(cacheKey);
    if (cachedData) {
        console.log('serving weather data from cache');
        res.send(cachedData);
    } else {
        console.log('fetching weather data from API');
        axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
            .then(response => {
                cache.set(cacheKey, response.data);
                res.send(response.data);
            })
            .catch(error => {
                console.error(error);
                res.status(500).send('Error fetching weather data');
            });
    }
};

// middleware to cache geolocation data
const cacheGeoLocation = (req, res, next) => {
    const { lat, lon } = req.query;
    const cacheKey = `geolocation-${lat}-${lon}`;
    const cachedData = geoCache.get(cacheKey);
    if (cachedData) {
        console.log('serving geolocation data from cache');
        res.send(cachedData);
    } else {
        console.log('fetching geolocation data from API');
        axios.get(`https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&appid=${apiKey}`)
            .then(response => {
                geoCache.set(cacheKey, response.data);
                res.send(response.data);
            })
            .catch(error => {
                console.error(error);
                res.status(500).send('Error fetching geolocation data');
            });
    }
};

const cacheFullNameLocation = (req, res, next) => {
    const { location } = req.query;
    const cacheKey = `fullnameloca-${location}`;
    const cachedData = geoCache.get(cacheKey);
    if (cachedData) {
        console.log('serving fullname location data from cache');
        res.send(cachedData);
    } else {
        console.log('fetching fullname location data from API');
        axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=5&appid=${apiKey}`)
            .then(response => {
                geoCache.set(cacheKey, response.data);
                res.send(response.data);
            })
            .catch(error => {
                console.error(error);
                res.status(500).send('Error fetching fullname location data');
            });
    }
};

// route for weather data
app.get('/weather', cacheWeather);

// route for geolocation data
app.get('/geolocation', cacheGeoLocation);

app.get('/fulllocation', cacheFullNameLocation);

app.get('/', (req, res) => {
    res.send('Proxy is Alive');
});

app.listen(port, () => {
    console.log(`API proxy listening at https://weather-proxy.fireup.studio`);
});
