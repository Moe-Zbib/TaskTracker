const jwt = require("jsonwebtoken");
const secretKey = "86dtfyoguihoikp";

const createJWT = (user) => {
  const token = jwt.sign({ userId: user.id, email: user.email }, secretKey, {
    expiresIn: "1h",
  });
  return token;
};

const verifyJWT = (token) => {
  try {
    console.log("JWT check");
    const decoded = jwt.verify(token, secretKey);
    return decoded;
  } catch (error) {
    console.log(error);
    throw new Error("JWT verification failed");
  }
};

module.exports = { createJWT, verifyJWT };
