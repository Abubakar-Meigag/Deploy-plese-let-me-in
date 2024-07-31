require("dotenv").config();
const express = require("express");
const app = express();

// Import dependencies
const cors = require("cors");
const port = process.env.PORT || 3999;
const pool = require("./database/data");
const bodyParser = require("body-parser");

// Middleware setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
pool.connect();

app.listen(port, () => {
  console.log(`Server is running on Port: ${port}`);
});

// Import routes from endpoint folder
const getData = require("./apis/getData");
const checkIn = require("./apis/checkIn");
const checkOut = require("./apis/checkOut");
const postFormData = require("./apis/postFormData");
const getFormData = require("./apis/getFormData");
const formCheckOut = require("./apis/formCheckOut");
const getDataForCititec = require("./apis/cititecData");
const deleteFormData = require("./apis/deleteFormData");
const checkInCititec = require("./apis/checkInCititec");
const checkOutCititec = require("./apis/checkOutCititec");

// Set up routes
app.get("/data", getData);
app.get("/formData", getFormData);
app.get("/getDataForCititec", getDataForCititec);
app.post("/submit", postFormData);
app.put("/checkIn", checkIn);
app.put("/checkOut", checkOut);
app.put("/formCheckOut", formCheckOut);
app.put("/checkInCititec", checkInCititec);
app.put("/checkOutCititec", checkOutCititec);
app.delete("/delete", deleteFormData);
