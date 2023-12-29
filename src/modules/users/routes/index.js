const { Router } = require("express");
const { createUser, authUser } = require("../services");
const { check } = require("express-validator");
const { validateFields } = require("../../../middleware/validate-fields");
// const { ValidateJwt } = require("../../../middleware/validate-jwt");
const { loginLimiter } = require("../../../middleware/rate-limit");
const routes = Router();

routes.post(
  "",
  [
    check("email", "email es requerido").isEmail(),
    check("password", "contraseña es requerida").not().isEmpty(),
    check("firstName", "Nombre es requerido").not().isEmpty(),
    check("lastName", "apellido es requerido").not().isEmpty(),
    validateFields,
  ],
  createUser
);

routes.post("/auth", loginLimiter, authUser);
module.exports = routes;
