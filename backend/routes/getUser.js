import express from "express";
import User from "../models/userSchema.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const filter = req.query.filter || ""; 

    // If no filter is provided, return all users
    const query = filter
      ? {
          $or: [
            { firstName: { $regex: filter, $options: "i" } },
            { lastName: { $regex: filter, $options: "i" } }
          ]
        }
      : {}; // No filter

    const users = await User.find(query);

    const formattedUsers = users.map(user => ({
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      _id: user._id
    }));

    res.json({ users: formattedUsers });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
