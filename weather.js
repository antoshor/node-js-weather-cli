#!/usr/bin/env node

import { getArgs } from './helpers/args.js';
import { printHelp, printError, printSuccess } from './services/log.service.js';
import { saveKeyValue, TOKEN_DICTIONARY } from './services/storage.service.js';
import { getCoords } from './services/api.service.js'

const saveToken = async (token) => {
    if (!token.length){
        printError(`The token isn't provided !`);
        return;
    }
    try {
        await saveKeyValue('token', TOKEN_DICTIONARY.token);
        printSuccess('Token saved');
    } catch(e) {
        printError(e.message);
    }
}

const intiCLI = () => {
    const args = getArgs(process.argv);
    console.log(process.env)
    if (args.h) {
        printHelp();
    }
    if (args.s) {
        // save city
    }
    if (args.t) {
        return saveToken(args.t);
    }
    getCoords('Donetsk');
    // output weather
};

intiCLI();