import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import * as dotenv from 'dotenv';
import User from '../models/userSchema.js'; 
import Account from '../models/accountSchema.js'; 

dotenv.config();

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

// Define the Zod schema for validation
const SignUpSchema = z.object({
  userName: z.string().email().min(3).max(30).trim().toLowerCase(),
  password: z.string().min(6),
  firstName: z.string().max(30).trim(),
  lastName: z.string().max(30).trim(),
});

router.post('/', async (req, res) => {
  try {
    console.log('Received a signup request', req.body);
    const body = req.body;

    // Validate the request body
    const result = SignUpSchema.safeParse(body);
    if (!result.success) {
      console.log('Validation failed', result.error.errors);
      return res.status(400).json({
        message: 'Incorrect inputs',
        errors: result.error.errors,
      });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ userName: body.userName });
    if (existingUser) {
      console.log('User already exists');
      return res.status(401).json({
        message: 'User already exists, please try to sign in',
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(body.password, 10);
    body.password = hashedPassword;

    // Create a new user
    const dbUser = await User.create(body);

    // Generate a JWT token
    const token = jwt.sign({ userId: dbUser._id }, JWT_SECRET, { expiresIn: '1h' });

    // Create an initial account
    await Account.create({
      userId: dbUser._id,
      balance: 1 + Math.random() * 10000,
    });

   
    res.json({
      message: 'User created successfully',
      token,
    });

  } catch (error) {
    console.error('Error in signup route:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
