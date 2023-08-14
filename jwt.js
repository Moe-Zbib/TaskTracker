const jwt = require("jsonwebtoken");
const secretKey = process.env.JWT_SECRET_KEY || "your-secret-key"; // Use environment variable or a default key

const createJWT = (user) => {
  const token = jwt.sign({ userId: user.id, email: user.email }, secretKey, {
    expiresIn: "1h",
  });
  return token;
};

const verifyJWT = (token) => {
  try {
    const decoded = jwt.verify(token, secretKey);
    return decoded;
  } catch (error) {
    throw new Error("JWT verification failed");
  }
};

module.exports = { createJWT, verifyJWT };
