import express from "express";
import router from "./router";

import db from './config/db'

const servidor = express();

servidor.use('/api/v1', router);

export default servidor;