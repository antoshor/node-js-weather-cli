import axios from 'axios';
import https from 'https';
import { getKeyValue, TOKEN_DICTIONARY } from './storage.service.js';


const getCoords = async (city) => {
    const token = await getKeyValue(TOKEN_DICTIONARY.token);
    if (!token) {
        throw new Error(`Token is empty. Use -t [TOKEN] to add it`);
    }
    await axios.get('http://api.openweathermap.org/geo/1.0/direct', {
        params: {
            q: city,
            appid: token
        }
    }).then (response => {
        getWeather(response.data[0].lon, response.data[0].lat);
    }) 
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
            appid: token
        }
    });

    // console.log('datsta', data)
    return data;

    // const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`\
    // const url = new URL('https://api.openweathermap.org/data/2.5/weather');
    // // url.searchParams.append('q', city);
    // url.searchParams.append('appid', token);
    // url.searchParams.append('lon', lon);
    // url.searchParams.append('lat', lat);
    // url.searchParams.append('lang', 'ru');
    // // url.searchParams.append('units', metric);

    // https.get(url, (response) => {
    //     let res = '';
    //     response.on('data', (chunk) => {
    //         res += chunk;
    //     });

    //     response.on('end', () => {
    //         console.log(url);
    //         console.log(res);
    //     });

    //     response.on('error', (error) => {

    //     });
    // });

};
export  { getCoords };