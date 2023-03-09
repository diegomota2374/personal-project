const express = require("express");
const router = express.Router();
const userController = require("./controllers/UserController");
const userMiddleware = require("./middlewares/userMiddlewares");

router.post(
  "/auth/register",
  userMiddleware.validateToken,
  userMiddleware.validateFieldName,
  userMiddleware.validateFieldEmail,
  userMiddleware.validateFieldPassword,
  userMiddleware.validateConfirmPassword,
  userMiddleware.validateUserExists,
  userController.userRegister
);
router.post(
  "/auth/login",
  userMiddleware.validateFieldEmail,
  userMiddleware.validateFieldPassword,
  userMiddleware.validateUserNotExists,
  userMiddleware.checkPassword,
  userController.userLogin
);
router.post("/auth/validate", userController.validateToken);
router.post("/auth/logout", userController.userLogout);

module.exports = router;
