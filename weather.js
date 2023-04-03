#!/usr/bin/env node

import { getArgs } from './helpers/args.js';
import { printHelp, printError, printSuccess, printWeather } from './services/log.service.js';
import { saveKeyValue, TOKEN_DICTIONARY, getKeyValue } from './services/storage.service.js';
import { getCoords, getIcon } from './services/api.service.js'

const saveToken = async (token) => {
    if (!token.length){
        printError(`The token isn't provided !`);
        return;
    }
    try {
        await saveKeyValue(TOKEN_DICTIONARY.token, token);
        printSuccess('Token saved');
    } catch(e) {
        printError(e.message);
    }
}

const saveCity = async (city) => {
    if (!city.length){
        printError(`The city isn't provided !`);
        return;
    }
    try {
        await saveKeyValue(TOKEN_DICTIONARY.city, city);
        printSuccess('City saved');
    } catch(e) {
        printError(e.message);
    }
}

const getForecast = async (city) => {
    try {
        console.log(`Getting weather data for ${city}...`);
        const weather = await getCoords(city);
        printWeather(weather, getIcon(weather.weather[0].icon));
    } catch (error) {
        if (error?.response?.status == 404  ){
            printError('The wrong ciry');
        } else if (error?.response?.status == 401  ){
            printError('Wrong token');
        } else {
            printError('Error getting weather data:', error);
        }
    }
}


const intiCLI = async () => {
    const args = getArgs(process.argv);
    if (args.h) {
        printHelp();
    }
    if (args.s) {
        return saveCity(args.s);
    }
    if (args.t) {
        return saveToken(args.t);
    }
    // getForecast();
    // output weather
    const city = process.env.CITY  ?? await getKeyValue(TOKEN_DICTIONARY.city);
    if (city){
        getForecast(city)
    } else {
        printError(`City can't be empty!`);
    }
    
};

intiCLI();