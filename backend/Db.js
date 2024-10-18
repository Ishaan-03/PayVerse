import mongoose from "mongoose";
import * as dotenv from "dotenv";

dotenv.config();

const databaseConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected successfully to the database");
  } catch (error) {
    console.error("Failed to connect to the database", error);
  }
};

export default databaseConnection;
