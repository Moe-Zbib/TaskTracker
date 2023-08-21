const express = require("express");
const app = express();
const session = require("express-session");
const bodyParser = require("body-parser");
const routes = require("./routes");
const cors = require("cors");

const port = 3001;

app.use(
  session({ resave: true, saveUninitialized: true, secret: "9186f179a86" })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/", routes);

app.listen(port, () => {
  console.log("listneing on port: ", port);
});
