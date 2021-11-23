import { convertWeight, convertDistance } from './index.js'


// TODO: write tests using jest
// TODO: add more accepted units

// weight conversions
console.log(convertWeight(1, "kg", "pounds")) // 2.20462
console.log(convertWeight(1, "kg", "ounces")) // 35.274
console.log(convertWeight(1, "kg", "grams")) // 1000
console.log(convertWeight(1, "kg", "kilograms")) // 1

// 
console.log(convertDistance(1, "km", "miles")) // 0.621371
console.log(convertDistance(1, "km", "yards")) // 1.09361
console.log(convertDistance(1, "km", "meters")) // 1000
console.log(convertDistance(1, "km", "kilometers")) // 1

// convert to and from feetInches (5' 3")

console.log(convertDistance(100, "cm", "ftIn", "true")) // 3' 3"
console.log(convertDistance(`2' 12"`, "ftIn", "cm", true)) // 91
console.log(convertDistance(91, "cm", "ftIn", "true")) // 2' 12"


// // use the shouldRound boolean as last argument
// console.log(convertWeight(1, "kg", "pounds", true)) // 2 instead of 2.20462

