const { Router }= require("express");
const { body, check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos")
const { listarCategorias, agregarCategoria, editarCategoria,eliminarCategoria } = require("../controllers/categoria")

const router = Router();

router.get("/", listarCategorias);
router.post("/add",[
      check("nombre","ingrese un nombre valido").trim().notEmpty().escape()
],validarCampos, agregarCategoria);
router.put("/edit/:id", editarCategoria);
router.delete("/eliminar/:id",eliminarCategoria);

module.exports= router;