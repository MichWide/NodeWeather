//Weather Data Functions
const {
    getWeatherData
} = require('../util/weather');

exports.getHomePage = (req, res, next) => {
    res.render('home');
}

exports.getWeather = (req, res, next) => {
    let location = req.query.location;
    getWeatherData(location)
        .then((results) => {
            res.render('results', results);
        })
        .catch((e) => {
            console.log(e);
            res.redirect('/404');
        });
}