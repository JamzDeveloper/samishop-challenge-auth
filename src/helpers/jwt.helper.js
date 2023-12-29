const jwt = require("jsonwebtoken");

const createToken = (data) => {
  const expiresInHours = 24;
  const token = jwt.sign(data, process.env.JWT_SECRET, {
    expiresIn: `${expiresInHours}h`,
  });

  return token;
};

module.exports = {
  createToken,
};
