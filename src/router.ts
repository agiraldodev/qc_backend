import { Router } from "express";
import { mostrarRoles, crearRole, obtenerRolPorId, borrarRol } from "./controllers/Role.controller";

const router = Router();

router.get('/roles', mostrarRoles)
router.post('/roles', crearRole )
router.get('/roles/:id', obtenerRolPorId )
router.delete('/roles/:id', borrarRol)

export default router;