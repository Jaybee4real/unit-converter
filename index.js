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
    '<feetIn>|<ftIn>|<feetInches>|<feet-inches>': {
        name: 'feet-inches',
    }
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
    },
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



// computation on first argument
function convertLowerValue(value, unit, shouldRound) {
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
        case 'feet-inches':
            let feet = Number(value.split(`'`)[0])
            let inches = Number(value.split(`"`)[1])
            let correctInches = (feet * 12) + inches
            let correctValue = correctInches * (1 / 39.370079)
            return shouldRound ? Math.round(correctValue) : correctValue
        default:
            return value;
    }
}

// computation on second argument
function convertHigherValue(value, unit, shouldRound) {
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
        case 'feet-inches':
            let inches = ((value * 0.393700787) * 100);
            let feet = Math.floor(inches / 12);
            inches %= 12;
            return `${feet}' ${shouldRound ? Math.round(inches) : inches}"`
        default:
            return value;
    }
}



// for values pertaining to height, distance, length
export function convertDistance(value, fromUnit, toUnit, shouldRound) {
    const inputValue = value.toString().includes(`"`) ? value : parseFloat(value);
    const from = checkAliases(fromUnit, distanceAliases);
    const to = checkAliases(toUnit, distanceAliases);

    if (!inputValue && inputValue !== 0) {
        console.error('Missing value to convert!')
        throw new Error('Missing value to convert!')
    };

    if (!from) {
        console.error('Unit/Alias either to convert from not valid type or not currently supported!')
        throw new Error('Unit/Alias to convert from either not valid type, or not currently supported!')
    };
    if (!to) {
        console.error('Unit/Alias either to convert not to valid type or not currently supported!')
        throw new Error('Unit/Alias to convert to either not valid type, Or not currently supported!')
    };

    let computedValue = convertHigherValue(convertLowerValue(value, from, shouldRound), to, shouldRound)
    if (shouldRound && from !== "feet-inches" && to !== "feet-inches") {
        // do not round feet inches because it returns a string instead of a number
        return Math.round(computedValue)
    } else return computedValue
}



// for values pertaining to weight values
export function convertWeight(value, fromUnit, toUnit, shouldRound) {
    const inputValue = parseFloat(value);
    const from = checkAliases(fromUnit, weightAliases);
    const to = checkAliases(toUnit, weightAliases);


    if (!inputValue && inputValue !== 0) {
        console.error('Missing value to convert!')
        throw new Error('Missing value to convert!')
    };

    if (!from) {
        console.error('Unit/Alias either to convert from not valid type or not currently supported!')
        throw new Error('Unit/Alias to convert from either not valid type, or not currently supported!')
    };
    if (!to) {
        console.error('Unit/Alias either to convert not to valid type or not currently supported!')
        throw new Error('Unit/Alias to convert to either not valid type, Or not currently supported!')
    };

    if (from === "kilograms") {
        switch (to) {
            case "pounds":
                return shouldRound ? Math.round(inputValue * 2.20462) : inputValue * 2.20462;
            case "ounces":
                return shouldRound ? Math.round(inputValue * 35.274) : inputValue * 35.274;
            case "grams":
                return shouldRound ? Math.round(inputValue * 1000) : inputValue * 1000;
            case "stones":
                return shouldRound ? Math.round(inputValue * 0.157473) : inputValue * 0.157473;
            default:
                return shouldRound ? Math.round(inputValue) : inputValue;
        }
    }

    if (from === "pounds") {
        switch (to) {
            case "kilograms":
                return shouldRound ? Math.round(inputValue * (1 / 2.20462)) : inputValue * (1 / 2.20462);
            case "ounces":
                return shouldRound ? Math.round(inputValue * 16) : inputValue * 16;
            case "grams":
                return shouldRound ? Math.round(inputValue * 453.592) : inputValue * 453.592;
            case "stones":
                return shouldRound ? Math.round(inputValue * 0.0714286) : inputValue * 0.0714286;
            default:
                return shouldRound ? Math.round(inputValue) : inputValue;
        }
    }

    if (from === "ounces") {
        switch (to) {
            case "kilograms":
                return shouldRound ? Math.round(inputValue * (1 / 35.274)) : inputValue * (1 / 35.274);
            case "pounds":
                return shouldRound ? Math.round(inputValue * (1 / 16)) : inputValue * (1 / 16);
            case "grams":
                return shouldRound ? Math.round(inputValue * 28.3495) : inputValue * 28.3495;
            case "stones":
                return shouldRound ? Math.round(inputValue * (1 / 16)) : inputValue * (1 / 16);
            default:
                return shouldRound ? Math.round(inputValue) : inputValue;
        }
    }

    if (from === "grams") {
        switch (to) {
            case "kilograms":
                return shouldRound ? Math.round(inputValue * (1 / 1000)) : inputValue * (1 / 1000);
            case "pounds":
                return shouldRound ? Math.round(inputValue * (1 / 453.592)) : inputValue * (1 / 453.592);
            case "ounces":
                return shouldRound ? Math.round(inputValue * (1 / 28.3495)) : inputValue * (1 / 28.3495);
            case "stones":
                return shouldRound ? Math.round(inputValue * (1 / 6350.293)) : inputValue * (1 / 6350.293);
            default:
                return shouldRound ? Math.round(inputValue) : inputValue;
        }
    }

    if (from === "stones") {
        switch (to) {
            case "kilograms":
                return shouldRound ? Math.round(inputValue * 6.35029) : inputValue * 6.35029;
            case "pounds":
                return shouldRound ? Math.round(inputValue * 14) : inputValue * 14;
            case "ounces":
                return shouldRound ? Math.round(inputValue * 224) : inputValue * 224;
            case "grams":
                return shouldRound ? Math.round(inputValue * 6350.293) : inputValue * 6350.293;
            default:
                return shouldRound ? Math.round(inputValue) : inputValue;
        }
    }
}
