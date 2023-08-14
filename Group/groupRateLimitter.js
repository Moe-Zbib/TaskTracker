const rateLimit = require("express-rate-limit");

const limit = rateLimit({
  windowMS: 5 * 60 * 100,
  max: 3,
  message: "Your are creating groups too fast",
});

module.exports = { limit };
