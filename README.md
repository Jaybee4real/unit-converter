## Installation

```
npm install @jaybee4real/unit-converter --save
```

## Usage

The library converts units from the desired type to the specified type.

```js

convert(
    value, /* = actual value to convert */
    from, /* = unit to convert to */
    to, /* = unit to convert to */
    shouldRound /* = if value should be rounded */ 
);
```

```js
import convert from "units-converter";

console.log(convert(1, "cm", "mm")); // 10
console.log(convert(1, "metres", "feet")); // 3.28084

// weight conversions
console.log(convertWeight(1, "kg", "pounds")); // 2.20462
console.log(convertWeight(1, "kg", "ounces")); // 35.274
console.log(convertWeight(1, "kg", "grams")); // 1000
console.log(convertWeight(1, "kg", "kilograms")); // 1

//
console.log(convertDistance(1, "km", "miles")); // 0.621371
console.log(convertDistance(1, "km", "yards")); // 1.09361
console.log(convertDistance(1, "km", "meters")); // 1000
console.log(convertDistance(1, "km", "kilometers")); // 1

// convert to and from feetInches (5' 3")

cconsole.log(convertDistance(100, "cm", "ftIn", "true")) // 3' 3"
console.log(convertDistance(`2' 12"`, "ftIn", "cm", true)) // 91
console.log(convertDistance(91, "cm", "ftIn", "true")) // 2' 12"
```
