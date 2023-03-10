import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import db from './config/Database.js';
import router from './routes/index.js';

dotenv.config();
const app = express();

try {
  await db.authenticate();
  console.log('Database is Connected...');
} catch (error) {
  console.log(error);
}
  
const corsConfig = {
  credentials: true,
  origin: true,
};
app.use(express.json());
app.use(cors(corsConfig));
app.use(cookieParser());
app.use(router);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server running at port:${PORT}`));
