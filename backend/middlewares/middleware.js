import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.toLowerCase().startsWith('bearer ')) {
    return res.status(403).send({ message: 'No authorization header provided' });
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(403).send({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded.userId) {
      req.userId = decoded.userId;
      next();
    } else {
      return res.status(403).json({ message: "Failed to authenticate" });
    }
  } catch (error) {
    return res.status(403).json({ message: "Failed to authenticate" });
  }
};

export default authMiddleware;
