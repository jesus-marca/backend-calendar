/*
events routes
/api/events
*/

const { Router } = require("express");
const { check, custom } = require("express-validator");
const { validarJWT } = require("../middelwares/validar-jwt");
const {
  getEventos,
  crearEvento,
  actualizarEvento,
  eliminarEvento,
} = require("../controllers/events");
const { validarCampos } = require("../middelwares/validar-campos");
const { isDate } = require("../helpers/isDate");

const router = Router();
router.use(validarJWT);

//crud
//todas validades con el jwt
//obtenre eventos

router.get("/", [], getEventos);

//crear un nuevo evento

router.post(
  "/",
  [
    check("title", "titulo debe de ser obligatorio").not().isEmpty(),
    check("start", "fecha de inicio debe de ser obligatorio").custom(isDate),
    check("end", "fecha end debe de ser obligatorio").custom(isDate),
    validarCampos,
  ],
  crearEvento
);

//actualizar evento

router.put(
  "/:id",
  [
    check("title", "titulo debe de ser obligatorio").not().isEmpty(),
    check("start", "fecha de inicio debe de ser obligatorio").custom(isDate),
    check("end", "fecha end debe de ser obligatorio").custom(isDate),
    validarCampos,
  ],
  actualizarEvento
);

//eliminar evento

router.delete("/:id", [], eliminarEvento);
module.exports = router;
