import express from 'express';
import dotenv from 'dotenv';
import db from './db/db.js';
import cors from 'cors';
import user from './routes/user.js'
import role from './routes/role.js'
import board from './routes/board.js'
dotenv.config()

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/user', user);
app.use('/api/role', role);
app.use('/api/board', board);


app.listen(process.env.PORT, () => console.log("Api listen ok") )

db.dbConnection()