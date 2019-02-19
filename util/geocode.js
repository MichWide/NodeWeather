const axios = require('axios');

//Locationiq API key
const token = '457771117f5e0b';

/**
 * Returns latitude and longitude for given location
 * @param {*} location 
 */
function getLocationCords(location) {
    return new Promise((resolve, reject) => {
        let formattedLocation = encodeURIComponent(location);
        axios.get(`https://eu1.locationiq.com/v1/search.php?key=${token}&q=${formattedLocation}&format=json`)
            .then((response) => {
                let data = response.data[0];
                resolve({
                    name: data.display_name,
                    lat: data.lat,
                    lon: data.lon
                });

            }).catch((e) => {
                let errorCode = e.response.status;

                switch (errorCode) {
                    case '404':
                        reject('NOT_FOUND');
                    default:
                        reject('ERROR');
                }
            });
    })
}

module.exports = getLocationCords;