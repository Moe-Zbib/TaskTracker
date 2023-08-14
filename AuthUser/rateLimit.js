const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 10 * 60 * 100,
  max: 5,
  message: "Too may requests, try again later",
});

module.exports = limiter;
const whiteList = ["", ""];

const customLimiter = (req, res, next) => {
  const clientIp = req.ip;
  if (whiteList.includes(clientIp)) {
    next();
  } else {
    limiter(req, res, () => {
      if (req.rateLimit.remaining <= 0) {
        console.log("Ban", clientIp);
      }
      next();
    });
  }
};

module.exports = {
  customLimiter,
};
