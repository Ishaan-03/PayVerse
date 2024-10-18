import express from "express";
import User from "../models/userSchema.js";
import { z } from "zod";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();

const router = express.Router();


const SignInSchema = z.object({
  userName: z.string().email().min(3).max(30).trim().toLowerCase(),
  password: z.string().min(6)
});

router.post("/", async (req, res) => {
  const JWT_SECRET = process.env.JWT_SECRET;
  const body = req.body;

  const { success, error } = SignInSchema.safeParse(body);

  if (!success) {
    return res.status(400).json({
      message: "Invalid input",
      errors: error.errors
    });
  }

  const existingUser = await User.findOne({ userName: body.userName });
  if (!existingUser) {
    return res.status(401).json({
      message: "User doesn't exist or invalid credentials"
    });
  }

  const isPasswordValid = await bcrypt.compare(body.password, existingUser.password);
  if (!isPasswordValid) {
    return res.status(401).json({
      message: "Incorrect password"
    });
  }

  const token = jwt.sign({ userId: existingUser._id }, JWT_SECRET, { expiresIn: '1h' }); 

  res.json({
    message: "Signin successful",
    token
  });
});

export default router;
