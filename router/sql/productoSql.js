const { Router } = require("express");
const { listarProductos, productosPorCategoria, crearProductos, editarProductos, eliminarProducto} = require("../../controllers/sql/productoSql")


const router = Router();

router.get("/", listarProductos);
router.get("/:id",productosPorCategoria);
router.post("/add", crearProductos);
router.put("/edit/:id", editarProductos);
router.delete("/delete/:id", eliminarProducto);


module.exports = router;