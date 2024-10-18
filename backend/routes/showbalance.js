import express from "express";
import authMiddleware from "../middlewares/middleware.js";
import Account from "../models/accountSchema.js";

const router = express.Router();

router.get("/", authMiddleware, async (req, res) => {
    try {
        const account = await Account.findOne({ userId: req.userId });
        if (!account) {
            return res.status(404).json({ message: 'Account not found' });
        }
        res.json({ balance: account.balance });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

export default router;
