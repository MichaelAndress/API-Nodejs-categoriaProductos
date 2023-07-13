// /api
const { Router } = require("express");
const { body } = require("express-validator");
const { addFoto, listarProductos, crearProducto, editarProducto, eliminarProducto, productosCat, unProducto, listarFoto } = require("../controllers/producto");

const router = Router();

router.get("/", listarProductos);
router.post("/add", crearProducto);
router.put("/edit/:id", editarProducto);
router.delete("/eliminar/:id", eliminarProducto);
router.get("/:id", productosCat);
router.post("/detalle/:id", unProducto);
router.get("/foto/:id", listarFoto);
router.post("/foto/:id", addFoto);


module.exports = router;