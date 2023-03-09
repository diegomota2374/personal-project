const UserModel = require("../models/UserModel");
const bcrypt = require("bcrypt");

const validateFieldName = (req, res, next) => {
  if (!req.body.name) {
    return res.status(422).json({ msg: "Nome é necessário" });
  }
  next();
};
const validateFieldEmail = (req, res, next) => {
  if (!req.body.email) {
    return res.status(422).json({ msg: "email é obrigatório" });
  }
  next();
};
const validateFieldPassword = (req, res, next) => {
  if (!req.body.password) {
    return res.status(422).json({ msg: "senha é obrigatória" });
  }

  next();
};
const validateConfirmPassword = (req, res, next) => {
  if (req.body.password !== req.body.confirmPassword) {
    return res.status(422).json({ msg: "as senhas não são iguais" });
  }
  next();
};
const checkPassword = async (req, res, next) => {
  const user = await UserModel.findOne({ email: req.body.email });
  const checkPassword = await bcrypt.compare(req.body.password, user.password);
  if (!checkPassword) {
    return res.status(422).json({ msg: "Senha invalida " });
  }
  next();
};
const validateUserExists = async (req, res, next) => {
  const user = await UserModel.findOne({ email: req.body.email });
  if (user) {
    return res.status(422).json({ msg: "por favor, utilize outro email" });
  }
  next();
};
const validateUserNotExists = async (req, res, next) => {
  const user = await UserModel.findOne({ email: req.body.email });
  if (!user) {
    return res.status(422).json({ msg: "Usuario não encontrado" });
  }
  next();
};
const validateToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  const secret = process.env.SECRET;
  if (!token) {
    res.status(401).json({ msg: "sem acesso" });
  }
  try {
    jwt.verify(token, secret);
    res.status(200).json({ msg: "token valido"});
  } catch (error) {
    res.status(400).json({ msg: "token invalido" });
  }
  next();
};
module.exports = {
  validateFieldName,
  validateFieldEmail,
  validateFieldPassword,
  validateConfirmPassword,
  checkPassword,
  validateUserExists,
  validateUserNotExists,
  validateToken,
};
