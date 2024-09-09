const express = require("express");
const app = express();
const router = require("./src/routers/router");
const dbConfig = require("./src/config/database");
require("dotenv").config();
dbConfig();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/", router);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT} `);
});
