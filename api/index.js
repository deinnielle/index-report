const express = require("express");
const router = require("./routes");
const cors = require("cors");
require("dotenv").config({ path: ".env" });

const app = express();
app.use(express.json());
app.use(cors());
app.use(router);

app.listen(3000, () => {
  console.log("Server is running at port 3000...");
});
