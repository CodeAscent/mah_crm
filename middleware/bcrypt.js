const bcrypt = require("bcrypt");
const saltRounds = 10;

const passwordBcrypt = async (req, res, next) => {
  try {
    const plainPassword = await req.body.password;
    console.log(plainPassword);
    const hash = await bcrypt.hash(plainPassword, saltRounds);
    req.hashedPassword = hash;
    next();
  } catch (error) {
    return res.status(500).json({
      status: "failed",
      message: error.message,
    });
  }
};

const comparePassword = async (plainPassword, hash) => {
  try {
    let matched = await bcrypt.compare(plainPassword, hash);
    return matched;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { passwordBcrypt, comparePassword };
