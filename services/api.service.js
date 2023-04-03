import axios from 'axios';
import https from 'https';
import { getKeyValue, TOKEN_DICTIONARY } from './storage.service.js';

const getIcon = (icon) => {
	switch (icon.slice(0, -1)) {
		case '01':
			return '☀️';
		case '02':
			return '🌤️';
		case '03':
			return '☁️';
		case '04':
			return '☁️';
		case '09':
			return '🌧️';
		case '10':
			return '🌦️';
		case '11':
			return '🌩️';
		case '13':
			return '❄️';
		case '50':
			return '🌫️';
	}
};

const getCoords = async (city) => {
    const token = await getKeyValue(TOKEN_DICTIONARY.token);
    if (!token) {
        throw new Error(`Token is empty. Use -t [TOKEN] to add it`);
    }
    const response = await axios.get('http://api.openweathermap.org/geo/1.0/direct', {
        params: {
            q: city,
            appid: token
        }
    });
    const { lon, lat } = response.data[0];
    const weather = await getWeather(lon, lat);
    return weather;

}

const getWeather = async (lon, lat) => {

    const token = await getKeyValue(TOKEN_DICTIONARY.token);
    if (!token) {
        throw new Error(`Token is empty. Use -t [TOKEN] to add it`);
    }

    const { data } = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
        params: {
            lat: lat,
            lon: lon,
            appid: token,
            units: 'metric'
        }
    });
    
    return data;
};



export  { getCoords, getIcon };