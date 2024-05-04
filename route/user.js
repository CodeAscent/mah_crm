const express = require("express");
const { passwordBcrypt } = require("../middleware/bcrypt");
const { registerUser, loginUser, getUser } = require("../controller/user");
const { verifyToken } = require("../middleware/jwt");

const UserRouter = express.Router();

UserRouter.post("/api/v1/register", passwordBcrypt, registerUser);
UserRouter.post("/api/v1/login", loginUser);
UserRouter.post("/api/v1/user", verifyToken, getUser);

module.exports = UserRouter;
