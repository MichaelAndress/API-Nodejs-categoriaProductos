const Productos = require("../../models/sql/ProductoSql");
const Categorias = require("../../models/sql/CategoriaSql");
const FotoProductos = require("../../models/sql/ProductoFotoSql");
const { response } = require("express");

const listarProductos = async (req, res = response) => {
   const productos = await Productos.findAll({
      order: [["id", "desc"]],
      include: { all: true, nested: true },
   });
   res.json({
      ok: true,
      productos,
   });
};

const productosPorCategoria = async (req, res = response) => {
   const { id } = req.params;
   try {
      const categoria = await Categorias.findOne({ where: id });
      if (!categoria) {
         return res.status(500).json({
            ok: false,
            msg: "Categoria no encontrada",
         });
      }
      const productos = await Productos.findAll({
         where: { category_id: id },
         order: [["id", "desc"]],
         include: { all: true, nested: true },
      });
      if (!productos) {
         return res.status(500).json({
            ok: false,
            msg: "Productos no encontrados",
         });
      }
      res.json({
         ok: true,
         productos,
      });
   } catch (error) {
      res.status(500).json({
         ok: false,
         error,
      });
   }
};

const crearProductos = async (req, res) => {
   const { nombre, descripcion, precio, category_id } = req.body;
   try {
      // const producto = await Productos.findOne({ where: nombre });
      // if (producto) {
      //    res.status(500).json({
      //       ok: false,
      //       msg: "El prodcuto ingresado ya existe",
      //    });
      // }
      const crear = await Productos.create({
         nombre,
         descripcion,
         precio,
         category_id,
      });
      if (!crear) {
         res.send("Algo salio mal");
      } else {
         res.send("Todo salio bien ");
      }
   } catch (error) {
      res.status(500).json({
         ok: false,
         error,
      });
   }
};

const editarProductos = async (req, res) => {
   const { id } = req.params;
   const { nombre, descripcion, precio, category_id } = req.body;
   try {
      const producto = await Productos.findOne({ where: { id: id } });
      if (!producto) {
         return res.status(500).json({
            ok: false,
            msg: "Producto no existe",
         });
      }
      await Productos.update(
         { nombre, descripcion, precio, category_id },
         { where: { id: id } }
      );
      res.json({
         ok: true,
         msg: "Producto modificado",
      });
   } catch (error) {
      res.status(500).json({
         ok: false,
         error,
      });
   }
};

const eliminarProducto = async (req, res) => {
   const { id } = req.params;
   try {
      const producto = await Productos.findOne({ where: { id: id } });
      if (!producto) {
         return res.status(500).json({
            ok: false,
            msg: "Producto no existe",
         });
      }
      await Productos.destroy({ where: { id: id } });
      res.json({
         ok: true,
         msg: "Producto Eliminado",
      });
   } catch (error) {
      res.status(500).json({
         ok: false,
         error,
      });
   }
};

const listarFotoProducto = async (req, res) => {
   const { id } = req.params;
   try {
      const producto = await Productos.findOne({ where: { id: id } });
      if (!producto) {
         res.status(400).json({
            ok: false,
            msg: "Producto no encontrado",
         });
      }
      const fotos = await FotoProductos.findAll({
         order: [["id", "desc"]],
         where: { producto_id: id },
      });
      res,json({
         ok:true,
         fotos
      });
   } catch (error) {
      res.status(500).json({
         ok:false,
         error
      })
   }
};

module.exports = {
   listarProductos,
   productosPorCategoria,
   crearProductos,
   editarProductos,
   eliminarProducto,
   listarFotoProducto,
};
