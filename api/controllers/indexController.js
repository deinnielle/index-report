const { filterIndex, calculateInvestmentValue } = require("../utils/functions");

exports.getInvestmentValue = async (req, res) => {
  const filteredIndex = await filterIndex();
  const calculatedInvestmentValue = await calculateInvestmentValue(
    filteredIndex
  );

  // console.log("calculatedInvestmentValue", calculatedInvestmentValue);
  res.status(200).json(calculatedInvestmentValue);
};
