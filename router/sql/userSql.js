const {Router} = require("express");
const { check } = require("express-validator");
const { listarUser, loginn, salir, registro } = require("../../controllers/sql/userSql")
const { verificarUsuario } = require("../../middlewares/verificar-usuario")
const { validarCampos } = require("../../middlewares/validar-campos")

const router = Router();

router.get("/"/*[verificarUsuario]*/, listarUser);
router.post("/loginn", loginn);
router.get("/salir", salir);
router.post("/registro",[
      check("nombre","El nombre es obligatorio").not().isEmpty(),
      check("correo","El correo es obligatorio").trim().isEmail().normalizeEmail(),
      check("password","El password debe ser de 6 caracteres").isLength({
            min:6,
      })
],validarCampos, registro);

module.exports = router;