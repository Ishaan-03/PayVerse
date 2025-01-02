// IMPORTANT: Make sure to import `instrument.js` at the top of your file.
import "./instrument.js";
import * as Sentry from "@sentry/node";
import express from "express";
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import databaseConnection from './Db.js';

import signinRouter from './routes/signin.js';
import signupRouter from './routes/SignUp.js';
import updateRouter from './routes/UpdateDetails.js';
import searchRouter from './routes/getUser.js';
import transactionRouter from './routes/transaction.js';
import balanceRouter from './routes/showbalance.js';

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

// Connect to the database
databaseConnection();


app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// Request logger middleware
app.use((req, res, next) => {
  console.log(`${req.method} request for '${req.url}'`);
  next();
});

// API routes
app.use('/api/v1/user/signin', signinRouter);
app.use('/api/v1/user/signup', signupRouter);
app.use('/api/v1/user/update', updateRouter);
app.use('/api/v1/user/bulk', searchRouter);
app.use('/api/v1/user/transaction', transactionRouter);
app.use('/api/v1/user/showbalance', balanceRouter);

// Root endpoint
app.get("/", function rootHandler(req, res) {
  res.end("Hello world!");
});

// Verify endpoint
app.get("/debug-sentry", function mainHandler(req, res) {
  throw new Error("My first Sentry error!");
});

// The error handler must be registered before any other error middleware and after all controllers
Sentry.setupExpressErrorHandler(app);

// Optional fallthrough error handler
app.use(function onError(err, req, res, next) {
  // The error id is attached to `res.sentry` to be returned
  // and optionally displayed to the user for support.
  res.statusCode = 500;
  res.end(res.sentry + "\n");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
