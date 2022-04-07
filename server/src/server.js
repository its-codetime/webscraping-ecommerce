const express = require("express");
const volleyball = require("volleyball");
var cron = require("node-cron");
const cors = require("cors");
const { NotFoundHandler, ErrorHandler } = require("./error_handlers");
const api = require("./api");
const scrapeSmartPhones = require("./scrape/scrape");
const dbConnect = require("./db/db");

dbConnect();
scrapeSmartPhones();

cron.schedule("0 0,12 * * *", async () => {
  console.log("running every 12 hours");
  try {
    await mongoose.connection.db.dropCollection("products");
    await scrapeSmartPhones();
  } catch (error) {
    console.log(error.message);
  }
});
// express app
const app = express();

// enable cors requests
app.use(cors());

// http request response logger
app.use(volleyball);

// body parser
app.use(express.json());

// root
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to the scrape server📚📂📝✅",
  });
});

// api_route
app.use("/api", api);

// error handlers
app.use(NotFoundHandler);
app.use(ErrorHandler);

module.exports = app;
