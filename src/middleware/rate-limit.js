const rateLimit  = require("express-rate-limit");

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 3, // 3 intentos
  message:
    "Demasiados intentos de inicio de sesión. Intenta de nuevo más tarde.",
});

module.exports = {
  loginLimiter,
};
