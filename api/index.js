const express = require("express");
const router = require("./routes");
require("dotenv").config({ path: ".env" });

const app = express();
app.use(express.json());

app.use(router);

app.listen(3000, () => {
  console.log("Server is running at port 3000...");
});
