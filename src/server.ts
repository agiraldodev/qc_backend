import express from "express";
import router from "./router";

import db from './config/db'

async function conectarDB() {
  try {
    await db.authenticate()
    db.sync()
    console.log("Conexión exitosa a la BD")
  } catch (error) {
    console.log("Hubo un error al conectar a la BD")
  }
}

conectarDB()

const servidor = express();

servidor.use('/api/v1', router);

export default servidor;