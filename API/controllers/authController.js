import User from "../Models/userModels.js";
import { comparePasswords, hashPassword } from "../utils/hash.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required!",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email already exists!",
      });
    }

    const hashedPassword = await hashPassword(password);

    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();

    return res.status(201).json({
      success: true,
      message: "Sign Up successfully!",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "An error occurred: " + error.message,
    });
  }
};

export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required!",
      });
    }

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(409).json({
        success: false,
        message: "Sorry, you need to create an account first!",
      });
    }

    const matchPassword = await comparePasswords(
      password,
      existingUser.password
    );

    if (!matchPassword) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const accessToken = jwt.sign(
      { id: existingUser._id, is_Admin: existingUser.is_Admin },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    res.cookie('access_token', accessToken, {
      httpOnly: true,      
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',  
      maxAge: 24 * 60 * 60 * 1000, 
    });

    return res.status(200).json({
      success: true,
      message: "Sign In successfully!",
      user: {
        id: existingUser._id,
        name: existingUser.name,
        email: existingUser.email,
        is_Admin: existingUser.is_Admin,
      },
      access_token: accessToken,
      });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "An error occurred: " + error.message,
    });
  }
};

export const signout = async (req, res) => {
  try {
    res.clearCookie("access_token");
       return res.status(200).json({
      success: true,
      message: "Sign Out Successfilly !",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "An error occurred: " + error.message,
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if the user exists
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Delete the user
    await User.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "An error occurred: " + error.message,
    });
  }
};

export const getUser = async (req, res) => {
  try {
    if (!req.user.id) {
      return res.status(400).json({
        success: true,
        message: "no user found",
      });
    }
    const existingUser = await User.findById(req.user.id);
    if (!existingUser) {
      return res.status(409).json({
        success: false,
        message: "Sorry, you need to create an account first!",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User Info",
      user: {
        id: existingUser._id,
        name: existingUser.name,
        email: existingUser.email,
        is_Admin: existingUser.is_Admin,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "An error occurred: " + error.message,
    });
  }
};
