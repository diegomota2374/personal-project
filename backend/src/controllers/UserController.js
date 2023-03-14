const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/UserModel");

const userRegister = async (req, res) => {
  const { name, email, password } = req.body;
  const created_at = Date(Date.now);

  const salt = await bcrypt.genSalt(12);
  const passwordHash = await bcrypt.hash(password, salt);

  const user = new userModel({
    name,
    email,
    password: passwordHash,
    created_at
  });
  try {
    await user.save();

    const users = await userModel.findOne({ email: req.body.email });

    const secret = process.env.SECRET;
    const token = jwt.sign(
      {
        id: users.id,
      },
      secret
    );
    res.status(201).json({ msg: "Usuario criado com sucesso", token });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Aconteceu um error no servidor, tente novamente mais tarde",
    });
  }
};

const userLogin = async (req, res) => {
  const user = await userModel.findOne({ email: req.body.email });
  try {
    const secret = process.env.SECRET;
    const token = jwt.sign(
      {
        id: user.id,
      },
      secret
    );
    res.status(200).json({ msg: "Autenticação realizada com sucesso", token });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Aconteceu um erro no servidor, tente novamente mais tarde",
    });
  }
};
const userLogout = async (req, res) => {
  res.status(200).json({ msg: "usuario deslogado" });
};
const validateToken = async (req, res) => {
  const token = req.body.token;
  const secret = process.env.SECRET;
  console.log("token = " + token);
  try {
    jwt.verify(token, secret);
    res.status(200).json({ msg: "token valido", token });
  } catch (error) {
    res.status(400).json({ msg: "token invalido" });
  }
};

module.exports = {
  userRegister,
  userLogin,
  validateToken,
  userLogout,
};
