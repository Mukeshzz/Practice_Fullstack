import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({
      message: "Something is missing",
      success: false,
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({
      message: "User registered successfully",
      user,
      success: true,
    });
  } catch (error) {
    console.log("Error while registering", error);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Please fill credentials",
      success: false,
    });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "No user found",
        success: false,
      });
    }

    const bcryptPassword = await bcrypt.compare(password, user.password);

    if (!bcryptPassword) {
      return res.status(401).json({
        message: "Password Incorrect",
        success: false,
      });
    }

    const tokenData = { userId: user._id };

    const token = await jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });
    

    const options = {
      httpOnly: true,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    };

    return res.status(200).cookie("token", token, options).json({
      message: "Login Successfull",
      user,
      success: true,
    });
  } catch (error) {
    console.log("Error in login", error);
  }
};

const logout = async (req, res) => {
  res.clearCookie("token");
  return res.status(200).json({
    message: "Logged out successfully",
    status: true,
  });
};

const logged = async (req, res) => {
  const user = await User.findById(req.userId);

  return res.status(200).json({
    message: "User alredy logged in",
    user,
    success: true,
  });
};

export { register, login, logout, logged };
