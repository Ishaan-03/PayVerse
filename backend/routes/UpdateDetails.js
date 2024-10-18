import express from "express"
import z from "zod"
import authMiddleware from "../middlewares/middleware.js";
import User from "../models/userSchema.js";



const router  = express.Router();



const updateSchema= z.object({

    password: z.string().min(6),
    firstName: z.string().max(30).trim(),
    lastName: z.string().max(30).trim()
}) 

router.put("/", authMiddleware, async(req, res, next)=>{
const {success}= updateSchema.safeParse(req.body)

if (!success) {
    return res.status(403)
    .json({message: "error while updating information "})
}

await User.updateOne({_id : req.userId} , req.body)

res.json({
    message: "user details updated successfully"
})


next();
})


export default router ; 