import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import db from './config/Database.js';
import router from './routes/index.js';
import helmet from 'helmet';

dotenv.config();
const app = express();

try {
  await db.authenticate();
  console.log('Database is Connected...');
} catch (error) {
  console.log(error);
}
const corsOptions = {
  origin: 'https://fe-m-banking.vercel.app',
  credentials: false, //access-control-allow-credentials:true
  // optionSuccessStatus:200,
};

// app.use((req, res)=>{
//   res.setHeader("Access-Control-Allow-Origin", true)
// })

// app.use((req,res,next)=>{
//   res.setHeader('Access-Control-Allow-Origin','*');
//   res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,PATCH,DELETE');
//   res.setHeader('Access-Control-Allow-Methods','Content-Type','Authorization');
//   next();
// })

app.use(helmet());
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(router);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server running at port:${PORT}`));
