import { Router } from "express";

const router = Router();

// Armar las rutas
router.get("/crear-cuenta", (req, res) => {
  res.send("Pantalla para crear cuenta");
})

export default router;