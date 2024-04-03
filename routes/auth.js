/*
rutas de usuario /Auth
host + api/auth
*/

const { Router } = require("express");
const router = Router();
const { check } = require("express-validator");

const {
  crearUsuario,
  loginUsuario,
  revalidacionToken,
} = require("../controllers/auth");
const { validarCampos } = require("../middelwares/validar-campos");
const { validarJWT } = require("../middelwares/validar-jwt");

router.post(
  "/new",
  [
    check("name", "nombre obligatorio").not().isEmpty(),
    check("name", "nombre obligatorio").not().isEmpty(),
    check("password", "clave obligatoria").isLength({ min: 6 }),
    validarCampos,
  ],
  crearUsuario
);

router.post(
  "/",
  [
    check("email", "email obligatorio").isEmail(),
    check("password", "clave obligatoria").isLength({ min: 6 }),
    validarCampos
  ],
  loginUsuario
);
router.get("/renew", validarJWT,revalidacionToken);

module.exports = router;
