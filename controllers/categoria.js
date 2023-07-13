const Categoria = require("../models/Categoria");
const { response } = require("express");

const listarCategorias = async (req, res = response) => {
   try {
      const datos = await Categoria.find().lean();
      res.json({
         ok: true,
         Categorias: datos,
      });
   } catch (error) {
      console.log(error);
   }
};

const agregarCategoria = async (req, res) => {
   const { nombre } = req.body;
   console.log(nombre);
   try {
      const categoria = await Categoria.findOne({ nombre });
      if (categoria) {
         return res.status(400).json({
            ok: false,
            msg: "Categoria Ya Existe",
         });
      }

      nuevaCategoria = new Categoria({ nombre: nombre });
      await nuevaCategoria.save();
      res.json({
         ok: true,
         msg: "Categoria creada exitosamente",
      });
   } catch (error) {
      console.log(error);
   }
};

const editarCategoria = async (req, res = response) => {
   const { id } = req.params;
   const { nombre } = req.body;
   try {
      const categoriaId = await Categoria.findById(id);
      if (!categoriaId) {
         return res.status(400).json({
            ok: false,
            msg: "Categoria no encontrada",
         });
      }

      await Categoria.updateOne({ nombre: nombre });
      res.json({
         ok: true,
         msg: "Categoria Modificada",
      });
   } catch (error) {
      res.status(400).json({
         ok: false,
         msg: "Error inesperado contactar con DEV",
      });
   }
};
const eliminarCategoria =async(req, res)=>{
   const { id } = req.params;
   try {
      const categoria = await Categoria.findById(id);
      if (!categoria) {
         return res.status(404).json({
            ok: false,
            msg: "Categoria no existe por ese id",
         });
      }
      await Categoria.findByIdAndDelete(id);
      res.json({
         ok:true,
         msg:"Categoria eliminada"
      });

   } catch (error) {
      res.status(400).json({
         ok:false,
         error
      })
   }
};
module.exports = { listarCategorias, agregarCategoria, editarCategoria, eliminarCategoria };
