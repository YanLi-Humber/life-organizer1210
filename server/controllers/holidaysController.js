const axios = require('axios');

exports.getCountries = async (req, res) => {
    try {
        const apiKey = process.env.CALENDARIFIC_API_KEY; // Read API key from .env
        const response = await axios.get(`https://calendarific.com/api/v2/countries?api_key=${apiKey}`);
        
        const countries = response.data.response.countries.map((country) => ({
            name: country.country_name,
            code: country['iso-3166'],
        }));

        res.status(200).json(countries);
    } catch (error) {
        console.error('Error fetching countries:', error.message);
        res.status(500).json({ message: 'Error fetching country list.' });
    }
};


exports.getHolidays = async (req, res) => {
    const { country, year } = req.query;

    if (!country || !year) {
        return res.status(400).json({ message: 'Country and year are required.' });
    }

    try {
        const apiKey = process.env.CALENDARIFIC_API_KEY; // Ensure this is set in your .env file
        const response = await axios.get(`https://calendarific.com/api/v2/holidays`, {
            params: {
                api_key: apiKey,
                country: country.toLowerCase(), 
                year,
            },
        });

        const holidays = response.data.response.holidays.map((holiday) => ({
            name: holiday.name,
            date: { iso: holiday.date.iso },
        }));

        res.status(200).json(holidays);
    } catch (error) {
        console.error('Error fetching holidays:', error.message);
        res.status(500).json({ message: 'Error fetching holidays.' });
    }
};