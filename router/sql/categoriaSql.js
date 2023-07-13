const { Router } = require("express");
const { listarCategorias, crearCategorias, editarCategoria, eliminarCategoria } = require("../../controllers/sql/categoriaSql")

const router = Router();

router.get("/", listarCategorias);
router.post("/add",crearCategorias);
router.put("/edit/:id",editarCategoria);
router.delete("/delete/:id", eliminarCategoria)

module.exports = router;