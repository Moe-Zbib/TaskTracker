const { body } = require("express-validator");

const validateGroupInput = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isString()
    .withMessage("Invalid Group name")
    .isLength({ min: 4 })
    .withMessage("Name too short")
    .isLength({ max: 30 })
    .withMessage("Name too big"),
];

module.exports = { validateGroupInput };
