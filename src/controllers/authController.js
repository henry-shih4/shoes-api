const User = require("../models/users");
const catchAsyncErrors = require("../../middlewares/catchAsyncErrors");
const ErrorHandler = require("../utils/errorHandler");
const sendToken = require("../utils/jwtToken");


//create new user --> /api/v1/register

exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  const { username, email, password, role } = req.body;
  const user = await User.create({
    username,
    email,
    password,
    role,
  });

  res
    .status(200)
    .json({ success: true, message: "New user created. Log in to proceed." });
});

//login user ==> /api/v1/login

exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { username, password } = req.body;

  //check if username or password is entered
  if (!username || !password) {
    return next(new ErrorHandler("Please enter username and password", 400));
  }

  const user = await User.findOne({ username }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Invalid username or password", 401));
  }

  //validate password

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid username or password", 401));
  }

  sendToken(user, 200, res);
});

// logout user route ==> api/v1/logout

exports.logoutUser = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res
    .status(200)
    .json({ success: true, message: "User has been logged out successfully" });
});
