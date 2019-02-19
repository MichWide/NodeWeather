const axios = require('axios');

const getCords = require('./geocode');

//Your Dark Sky API key
const token = 'XXXXXXXXXXX';

function setForecastIcon(icon) {

    switch (icon) {
        case 'clear-day':
            return 'day-sunny';
        case 'clear-night':
            return 'night-clear';
        case 'partly-cloudy-day':
            return 'day-cloudy';
        case 'partly-cloudy-night':
            return 'night-cloudy';
        case 'rain':
            return 'rain';
        case 'snow':
            return 'snow';
        case 'wind':
            return 'windy';
        case 'fog':
            return 'fog';
        case 'cloudy':
            return 'cloud';
        case 'sleet':
            return 'sleet';
        default:
            return 'na';
    }

}

function composeWeatherObject(...weatherData) {

    const geo = weatherData[0];
    const currData = weatherData[1].currently;

    //Data operations
    const location = geo.name.split(",")[0];
    const temperature = Math.round(currData.temperature);
    let icon = setForecastIcon(currData.icon);

    return {
        location,
        temperature,
        icon,
        humidity: currData.humidity,
        pressure: currData.pressure,
        windspeed: currData.windSpeed
    }
}

function getWeatherData(location) {
    //Call to Locationiq API
    return getCords(location)
        .then((geo) => {
            //Call to DarkSky API
            return new Promise((resolve, reject) => {
                axios.get(`https://api.darksky.net/forecast/${token}/${geo.lat},${geo.lon}?units=si`)
                    .then((response) => {
                        resolve(composeWeatherObject(geo, response.data));
                    })
                    .catch((e) => {
                        console.log(e);
                        reject(e);
                    });
            })
        })
        .catch((e) => {
            throw new Error(e);
        });
}

module.exports = {
    getWeatherData
}