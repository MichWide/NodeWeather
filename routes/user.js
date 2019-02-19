const express = require('express');
const router = express.Router();

const {
    getHomePage,
    getWeather
} = require('../controllers/weatherController');
/**
 * Routes
 **/

//GET
router.get('/', getHomePage);

router.get('/weather', getWeather);


module.exports = router;