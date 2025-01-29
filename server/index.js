require('dotenv').config();

const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.get('/api/weather', async (req, res) => {
    try {
        const city = req.query.city;
        const apiKey = process.env.OPENWEATHER_API_KEY;
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${apiKey}&units=metric`;

        const response = await axios.get(url);
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        res.status(500).json({error: 'Error fetching weather data'});
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});