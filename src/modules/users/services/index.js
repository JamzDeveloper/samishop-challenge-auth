const { request, response } = require("express");
const bcrypt = require("bcrypt");
const User = require("../model/index");

const { createToken } = require("../../../helpers/jwt.helper");

const createUser = async (req = request, resp = response) => {
  try {
    const data = req.body;

    const salt = bcrypt.genSaltSync(10);
    const password = bcrypt.hashSync(data.password, salt);

    data.password = password;

    const resul = new User(data);
    await resul.save();

    const token = createToken({ id: data.id });

    resp.json({
      user: { ...data },
      accessToken: token,
    });
  } catch (err) {
    throw err;
  }
};

const authUser = async (req = request, resp = response) => {
  try {
    const { email, password } = req.body;
    const userFound = await User.findOne({ email });

    const isCorrectPassword = bcrypt.compareSync(password, userFound.password); 
    if (!isCorrectPassword) {
      throw new Error("Contraseña incorrecta");
    }

    const token = createToken({ id: userFound.id });

    resp.json({
      user: userFound,
      accessToken: token,
    });
  } catch (err) {
    return resp.status(400).json({ msg: err.message });
  }
};

module.exports = {
  createUser,
  authUser,
};
