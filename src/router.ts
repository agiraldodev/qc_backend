import { Router } from "express";
import { mostrarRoles, crearRole, obtenerRolPorId, borrarRol, actualizarRole } from "./controllers/Role.controller";
import { mostrarUsuarios, crearUsuario, actualizarUsuario, obtenerUsuarioPorId, borrarUsuario} from './controllers/Usuario.controller'
import { mostrarAulas, crearAula, actualizarAula, obtenerAulaPorId, borrarAula} from './controllers/Aula.controller'

const router = Router();

router.get('/roles', mostrarRoles)
router.post('/roles', crearRole )
router.get('/roles/:id', obtenerRolPorId )
router.delete('/roles/:id', borrarRol)
router.put('/roles/:id', actualizarRole)

router.get('/usuarios', mostrarUsuarios)
router.post('/usuarios',  crearUsuario)
router.get('/usuarios/:id',  obtenerUsuarioPorId)
router.delete('/usuarios/:id', borrarUsuario)
router.put('/usuarios/:id', actualizarUsuario)

router.get('/aulas', mostrarAulas)
router.post('/aulas',  crearAula)
router.get('/aulas/:id',  obtenerAulaPorId)
router.delete('/aulas/:id', borrarAula)
router.put('/aulas/:id', actualizarAula)

export default router;