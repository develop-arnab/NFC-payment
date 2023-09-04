import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import User from "../models/user.model";
const JWT_SECRET =
  "sdjkfh8923yhjdksbfma@#*(&@*!^#&@bhjb2qiuhesdbhjdsfg839ujkdhfjk";

const loginUser = async (req: Request, res: Response, next: any) => {
  const { username, password } = req.body;

  const user = await User.findOne({
    username: username,
  });

  if (user) {
    if (await bcrypt.compare(password, user.password)) {
      // the username, password combination is successful

      const token = jwt.sign(
        {
          id: user._id,
          username: user.username,
        },
        JWT_SECRET
      );

      return res.json({ status: "ok", data: token, username: username });
    }
  } else {
    res.json({ status: "error", error: "Invalid username/password" });
  }
};

const registerUser = async (req: Request, res: Response, next: any) => {
  const { username, password: plainTextPassword } = req.body;

  if (!username || typeof username !== "string") {
    return res.json({ status: "error", error: "Invalid username" });
  }

  if (!plainTextPassword || typeof plainTextPassword !== "string") {
    return res.json({ status: "error", error: "Invalid password" });
  }

  if (plainTextPassword.length < 5) {
    return res.json({
      status: "error",
      error: "Password too small. Should be atleast 6 characters",
    });
  }

  const password = await bcrypt.hash(plainTextPassword, 10);

  try {
    const response = await User.create({
      username,
      password,
    });
    console.log("User created successfully: ", response);
  } catch (error: any) {
    if (error.code === 11000) {
      // duplicate key
      return res.json({ status: "error", error: "Username already in use" });
    }
    throw error;
  }

  res.json({ status: "ok" });
};

export default {
    loginUser,
    registerUser
  };
