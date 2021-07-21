const fs = require("fs");

const data = fs.readFileSync("index.json");
const index = JSON.parse(data);

const startYear = 2021;
const startMonth = 1;
const endYear = 2021;
const endMonth = 6;

const interval = 1 + endMonth - startMonth + (endYear - startYear) * 12;
interval;

let month = startMonth;
let monthString;
let year = startYear;

const filteredIndex = [];
for (let i = 1; i <= interval; i++) {
  if (month < 10) {
    monthString = `0${month}`;
  } else {
    monthString = month;
  }
  const date = `20/${monthString}/${year} 16:00:00`;

  const result = index.find((o) => o.Date === date);

  if (result === undefined) {
    const date = `21/${monthString}/${year} 16:00:00`;
    const result = index.find((o) => o.Date === date);

    if (result === undefined) {
      const date = `22/${monthString}/${year} 16:00:00`;
      const result = index.find((o) => o.Date === date);
      filteredIndex.push(result);
    } else {
      filteredIndex.push(result);
    }
  } else {
    filteredIndex.push(result);
  }

  month++;

  if (month === 13) {
    month = 1;
    year++;
  }
}

console.log("filteredIndex", filteredIndex);

let investmentValue = 0;
let monthlySaving = 10000;
let start = 10000;
let saved = 0;

for (let i = 0; i < filteredIndex.length; i++) {
  if (i === 0) {
    if (start > monthlySaving) {
      investmentValue += start;
      saved = start + monthlySaving * filteredIndex.length;
    } else {
      investmentValue += monthlySaving;
      saved = monthlySaving * filteredIndex.length;
    }
  } else {
    const change = filteredIndex[i].Close / filteredIndex[i - 1].Close;

    const investmentChange = investmentValue * change;

    investmentValue = investmentChange + monthlySaving;
  }
}

console.log(
  "saved :>> ",
  parseInt(saved)
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
  "earnings :>> ",
  parseInt(investmentValue - saved)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
);
