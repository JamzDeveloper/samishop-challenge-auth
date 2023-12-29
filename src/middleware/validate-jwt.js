const { request, response } = require("express");
const jwt = require("jsonwebtoken");
const { findUserId } = require("../modules/users/model");

const ValidateJwt = async (req = request, resp = response, next) => {
  if (!req.headers.authorization) {
    return resp.status(401).json({
      msg: "Acceso denegado",
    });
  }

  const token = req.headers.authorization.split(" ");

  var decoded = jwt.verify(token[1], process.env.JWT_SECRET);

  const foundUser = await findUserId(decoded.id);

  // if (foundUser.rol != "admin") {
  //   return resp.status(4001).json({
  //     msg: "Acceso denegado",
  //   });
  // }

  req.user = foundUser;
  next();
};

module.exports = {
  ValidateJwt,
};
