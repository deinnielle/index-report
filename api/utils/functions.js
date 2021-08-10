const fs = require("fs");
const path = require("path");
const data = fs.readFileSync(path.resolve(__dirname, "../data/index.json"));
const index = JSON.parse(data);
const _ = require("lodash");

exports.filterIndex = async (start, end) => {
  const startYear = parseInt(start.substring(0, 4));
  const startMonth = parseInt(start.substring(5, 7));
  const endYear = parseInt(end.substring(0, 4));
  const endMonth = parseInt(end.substring(5, 7));

  const interval = 1 + endMonth - startMonth + (endYear - startYear) * 12;

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

  return filteredIndex;
};

exports.calculateInvestmentValue = async (
  filteredIndex,
  monthlySaving,
  startValue
) => {
  const dates = [];
  const investmentByMonths = [];
  const savedByMonths = [];
  let investmentValue = 0;
  let savedValue = 0;
  let saved = 0;

  for (let i = 0; i < filteredIndex.length; i++) {
    if (i === 0) {
      if (startValue > monthlySaving) {
        investmentValue += startValue;
        savedValue += startValue;
        saved = startValue + monthlySaving * filteredIndex.length;
        savedByMonths.push(savedValue);
        investmentByMonths.push(parseInt(investmentValue));
        dates.push(filteredIndex[i].Date.substring(0, 10));
      } else {
        investmentValue += monthlySaving;
        savedValue += monthlySaving;
        saved = monthlySaving * filteredIndex.length;
        savedByMonths.push(savedValue);
        investmentByMonths.push(parseInt(investmentValue));
        dates.push(filteredIndex[i].Date.substring(0, 10));
      }
    } else {
      const change = filteredIndex[i].Close / filteredIndex[i - 1].Close;
      const investmentChange = investmentValue * change;
      investmentValue = investmentChange + monthlySaving;
      savedValue += monthlySaving;
      savedByMonths.push(savedValue);
      investmentByMonths.push(parseInt(investmentValue));
      dates.push(filteredIndex[i].Date.substring(0, 10));
    }
  }

  const r = {
    investmentValue: getInt(investmentValue),
    saved: getInt(saved),
    earnings: getInt(investmentValue - saved),
    investmentByMonths: investmentByMonths,
    savedByMonths: savedByMonths,
    dates: dates,
  };

  return r;
};

getInt = (number) => {
  return parseInt(number)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
