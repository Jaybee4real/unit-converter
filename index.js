/**
 * Copyright 2016 blakeyc
 * Author: Okoroji Faith <okorojijaybee1@gmail.com>
 * MIT Licensed
 *
 *  @module index.js
 */

const distanceAliases = {
    '<mm>|<milimetres>|<milimetre>|<milimeters>|<milimeter>': {
        name: 'millimetres',
    },
    '<cm>|<centimetres>|<centimetre>|<centimeters>|<centimeter>': {
        name: 'centimetres',
    },
    '<m>|<metres>|<metre>|<meters>|<meter>': {
        name: 'metres',
    },
    '<km>|<kilometres>|<kilometre>|<kilometers>|<kilometer>': {
        name: 'kilometres',
    },
    '<in>|<inch>|<inches>': {
        name: 'inches',
    },
    '<ft>|<feet>|<foot>|<feets>|<foots>': {
        name: 'feet',
    },
    '<yd>|<yard>|<yards>': {
        name: 'yards',
    },
    '<mi>|<mile>|<miles>': {
        name: 'miles',
    },
};

const weightAliases = {
    '<kg>|<kilo>|<kilograms>|<kilogram>': {
        name: 'kilograms',
    },
    '<lb>|<lbs>|<pound>|<pounds>': {
        name: 'pounds',
    },
    '<oz>|<ounce>|<ounces>': {
        name: 'ounces',
    },
    '<st>|<stone>|<stones>|': {
        name: 'stones',
    },
    '<g>|<gram>|<grams>': {
        name: 'grams',
    }
}

function checkAliases(unitName, aliasType) {
    let unitActualName;
    Object.keys(aliasType).forEach((key) => {
        if (key.indexOf(`<${unitName}>`) >= 0) {
            unitActualName = aliasType[key].name;
        }
    });
    return unitActualName;
}

function convertLowerValue(value, unit) {
    switch (unit) {
        case 'millimetres':
            return value * 0.001;
        case 'centimetres':
            return value * 0.01;
        case 'kilometres':
            return value * 1000;
        case 'inches':
            return value * (1 / 39.370079);
        case 'feet':
            return value * (1 / 3.280840);
        case 'yards':
            return value * (1 / 1.093613);
        case 'miles':
            return value * (1 / 0.000621371);
        default:
            return value;
    }
}

function convertHigherValue(value, unit) {
    switch (unit) {
        case 'millimetres':
            return value * 1000;
        case 'centimetres':
            return value * 100;
        case 'kilometres':
            return value / 1000;
        case 'inches':
            return value * 39.370079;
        case 'feet':
            return value * 3.280840;
        case 'yards':
            return value * 1.093613;
        case 'miles':
            return value * 0.000621371;
        default:
            return value;
    }
}


export function convertDistance(value, fromUnit, toUnit) {
    const inputValue = parseFloat(value);
    const from = checkAliases(fromUnit, distanceAliases);
    const to = checkAliases(toUnit, distanceAliases);

    if (!inputValue) {
        console.log('Missing value to convert!')
        throw new Error('Missing value to convert!')
    };

    if (!from) {
        console.log('Unit/Alias either to convert from not valid type or not currently supported!')
        throw new Error('Unit/Alias to convert from either not valid type, or not currently supported!')
    };
    if (!to) {
        console.log('Unit/Alias either to convert not to valid type or not currently supported!')
        throw new Error('Unit/Alias to convert to either not valid type, Or not currently supported!')
    };

    return convertHigherValue(convertLowerValue(value, from), to)
}


export function convertWeight(value, fromUnit, toUnit) {
    const inputValue = parseFloat(value);
    const from = checkAliases(fromUnit, weightAliases);
    const to = checkAliases(toUnit, weightAliases);

    if (!from) {
        console.log('Unit/Alias either to convert from not valid type or not currently supported!')
        throw new Error('Unit/Alias to convert from either not valid type, or not currently supported!')
    };
    if (!to) {
        console.log('Unit/Alias either to convert not to valid type or not currently supported!')
        throw new Error('Unit/Alias to convert to either not valid type, Or not currently supported!')
    };

    if (from === "kilograms") {
        switch (to) {
            case "pounds":
                return inputValue * 2.20462;
            case "ounces":
                return inputValue * 35.274;
            case "grams":
                return inputValue * 1000;
            case "stones":
                return inputValue * 0.157473;
            default:
                return inputValue;
        }
    }

    if (from === "pounds") {
        switch (to) {
            case "kilograms":
                return inputValue * (1 / 2.20462);
            case "ounces":
                return inputValue * 16;
            case "grams":
                return inputValue * 453.592;
            case "stones":
                return inputValue * 0.0714286;
            default:
                return inputValue;
        }
    }

    if (from === "ounces") {
        switch (to) {
            case "kilograms":
                return inputValue * (1 / 35.274);
            case "pounds":
                return inputValue * (1 / 16);
            case "grams":
                return inputValue * 28.3495;
            case "stones":
                return inputValue * (1 / 16);
            default:
                return inputValue;
        }
    }

    if (from === "grams") {
        switch (to) {
            case "kilograms":
                return inputValue * (1 / 1000);
            case "pounds":
                return inputValue * (1 / 453.592);
            case "ounces":
                return inputValue * (1 / 28.3495);
            case "stones":
                return inputValue * (1 / 6350.293);
            default:
                return inputValue;
        }
    }

    if (from === "stones") {
        switch (to) {
            case "kilograms":
                return inputValue * 6.35029;
            case "pounds":
                return inputValue * 14;
            case "ounces":
                return inputValue * 224;
            case "grams":
                return inputValue * 6350.293;
            default:
                return inputValue;
        }
    }
}
