const fs = require("fs");

const rawdata = fs.readFileSync("index.json");
const index = JSON.parse(rawdata);
console.log(index);

const startYear = 2000;
const startMonth = 9;
const startDay = 9;
const endYear = 2015;
const endMonth = 9;
const endDay = 9;

const filteredIndex = [];
let count = 0;
for (let i = 0; i < index.length; i++) {
  const indexYear = parseInt(index[i].Date.substring(6, 10));
  const indexMonth = parseInt(index[i].Date.substring(3, 5));
  const indexDay = parseInt(index[i].Date.substring(0, 2));

  if (indexYear >= startYear && indexYear <= endYear) {
    count++;
    // if (indexMonth === startMonth && startDay === indexDay) {
    // }
    if (count === 12) {
      filteredIndex.push(index[i]);
      count = 0;
    }
  }
}

let investmentValue = 0;
let monthly = 10000;
let start = 10000;
let saving = 0;

for (let i = 0; i < filteredIndex.length; i++) {
  if (i === 0) {
    if (start > monthly) {
      investmentValue += start;
      saving = start + monthly * filteredIndex.length;
    } else {
      investmentValue += monthly;
      saving = monthly * filteredIndex.length;
    }
  } else {
    const change = filteredIndex[i].Close / filteredIndex[i - 1].Close;

    const investmentChange = investmentValue * change;

    investmentValue = investmentChange + monthly;
  }
}

console.log(
  "saving :>> ",
  parseInt(saving)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
);
console.log(
  "investmentValue :>> ",
  parseInt(investmentValue)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
);
console.log(
  "ernings :>> ",
  parseInt(investmentValue - saving)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
);
