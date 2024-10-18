import mongoose from "mongoose";
import express from "express";
import Account from '../models/accountSchema.js';
import authMiddleware from "../middlewares/middleware.js";

const router = express.Router();

router.post("/", authMiddleware, async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { amount, to } = req.body;

    if (!amount || !to || amount <= 0) {
      await session.abortTransaction();
      return res.status(400).json({
        message: "Invalid request parameters"
      });
    }

 
    const account = await Account.findOne({ userId: req.userId }).session(session);
    if (!account) {
      await session.abortTransaction();
      return res.status(404).json({
        message: "Account not found"
      });
    }

    if (account.balance < amount) {
      await session.abortTransaction();
      return res.status(400).json({
        message: "Insufficient balance"
      });
    }

    const toAccount = await Account.findOne({ userId: to }).session(session);
    if (!toAccount) {
      await session.abortTransaction();
      return res.status(404).json({
        message: "Recipient account not found"
      });
    }

   
    await Account.updateOne({ userId: req.userId }, { $inc: { balance: -amount } }).session(session);
    await Account.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session);

    await session.commitTransaction();
    res.json({
      message: "Transfer successful"
    });
  } catch (error) {
    await session.abortTransaction();
    console.error("Error transferring funds:", error); 
    res.status(500).json({ message: "Error transferring funds", error });
  } finally {
    session.endSession();
  }
});

export default router;
