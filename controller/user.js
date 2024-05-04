const { comparePassword } = require("../middleware/bcrypt");
const { generateJwt } = require("../middleware/jwt");
const User = require("../model/user");

//Register
const registerUser = async (req, res) => {
  try {
    const { name, designation, email, phone } = req.body;
    const password = req.hashedPassword;
    await User.create({
      name,
      designation,
      email,
      phone,
      password,
    });
    return res.json({
      status: "success",
      message: "user registered successfully",
    });
  } catch (error) {
    return res.status(404).json({
      status: "failed",
      message: error.message,
    });
  }
};

//Login
const loginUser = async (req, res) => {
  try {
    let { email, password } = req.body;
    let user = await User.findOne({ email });
    if (user) {
      let passwordMatched = await comparePassword(password, user.password);
      if (passwordMatched) {
        const token = await generateJwt(user._id);
        return res.json({
          status: "success",
          message: "user logged in successfully",
          token,
        });
      }
      return res.status(404).json({
        status: "failed",
        message: "incorrect password",
      });
    }
    return res.status(404).json({
      status: "failed",
      message: "user not found",
    });
  } catch (error) {
    return res.status(404).json({
      status: "failed",
      message: error.message,
    });
  }
};

//Get User

const getUser = async (req, res) => {
  try {
    let user = await User.findById({ _id: req.uid });
    return res.json({
      status: "success",
      message: "user data loaded successfully",
     data: user,
    });
  } catch (error) {
    return res.status(404).json({
      status: "failed",
      message: error.message,
    });
  }
};
module.exports = { registerUser, loginUser, getUser };
