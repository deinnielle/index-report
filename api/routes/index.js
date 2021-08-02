const express = require("express");
const indexController = require("../controllers/indexController");
const app = express();

app.get("/getInvestmentValue", indexController.getInvestmentValue);

module.exports = app;
