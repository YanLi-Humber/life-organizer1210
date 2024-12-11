const express = require('express');
const router = express.Router();
const holidaysController = require('../controllers/holidaysController');

// Route to fetch supported countries
router.get('/countries', holidaysController.getCountries);

// Route to fetch holidays
router.get('/', holidaysController.getHolidays);

module.exports = router;



// const express = require('express');
// const axios = require('axios');
// const router = express.Router();
// const holidaysController = require('../controllers/holidaysController');
// const { getHolidays } = require('../controllers/holidaysController');


// // // Route to fetch supported countries
// // router.get('/countries', holidaysController.getCountries);

// const API_KEY = process.env.CALENDARIFIC_API_KEY;

// // Route to fetch country list
// router.get('/countries', async (req, res) => {
//     try {
//         const response = await axios.get(`https://calendarific.com/api/v2/countries?api_key=${API_KEY}`);
//         const countries = response.data.response.countries.map((country) => ({
//             name: country.country_name,
//             code: country['iso-3166'],
//         }));
//         res.json(countries);
//     } catch (error) {
//         console.error('Error fetching countries from Calendarific:', error.message);
//         res.status(500).json({ message: 'Failed to fetch countries' });
//     }
// });

// // router.get('/', getHolidays);
// router.get('/holidays', async (req, res) => {
//     const { country, year } = req.query;

//     if (!country || !year) {
//         return res.status(400).json({ message: 'Country and year are required.' });
//     }

//     try {
//         const apiKey = process.env.CALENDARIFIC_API_KEY;
//         const response = await axios.get('https://calendarific.com/api/v2/holidays', {
//             params: {
//                 api_key: apiKey,
//                 country: country.toLowerCase(),
//                 year,
//             },
//         });

//         const holidays = response.data.response.holidays.map((holiday) => ({
//             name: holiday.name,
//             date: holiday.date.iso,
//         }));

//         res.status(200).json({ holidays });
//     } catch (err) {
//         console.error('Error fetching holidays:', err.message);
//         res.status(500).json({ message: 'Failed to fetch holidays.' });
//     }
// });

// module.exports = router;
