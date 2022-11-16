import * as dotenv from "dotenv";
dotenv.config();

import express from "express";
import logger from "morgan";
import cors from "cors";

import './config/db.config.js'

const app = express();



// usando lib e liberando para qualquer dominio
app.use(cors());

//Em desenvolvimento show app logs
app.use(logger("dev"));

// Utilizar o json body das requisições
app.use(express.json());


//listen
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
