import { convertWeight, convertDistance } from './index.mjs'


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