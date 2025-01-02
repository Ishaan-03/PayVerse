import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import signinRouter from './routes/signin.js';
import signupRouter from './routes/SignUp.js'; 
import updateRouter from './routes/UpdateDetails.js';
import searchRouter from './routes/getUser.js';
import transactionRouter from './routes/transaction.js';
import balanceRouter from './routes/showbalance.js';
import * as dotenv from 'dotenv';
import databaseConnection from './Db.js';

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();


databaseConnection();

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());


app.use((req, res, next) => {
  console.log(`${req.method} request for '${req.url}'`);
  next();
});

app.use('/api/v1/user/signin', signinRouter);
app.use('/api/v1/user/signup', signupRouter); 
app.use('/api/v1/user/update', updateRouter);
app.use('/api/v1/user/bulk', searchRouter);
app.use('/api/v1/user/transaction', transactionRouter);
app.use('/api/v1/user/showbalance', balanceRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
