const { filterIndex, calculateInvestmentValue } = require("../utils/functions");

exports.getInvestmentValue = async (req, res) => {
  const filteredIndex = await filterIndex(req.query.start, req.query.end);
  const calculatedInvestmentValue = await calculateInvestmentValue(
    filteredIndex,
    parseInt(req.query.monthlySaving),
    parseInt(req.query.startValue)
  );

  res.status(200).json(calculatedInvestmentValue);
};
