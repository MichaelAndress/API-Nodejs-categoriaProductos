const Categorias = require("../../models/sql/CategoriaSql");
const { response } = require("express");
const slug = require("slug");

const listarCategorias = async (req, res = response) => {
   try {
      const datos = await Categorias.findAll({ order: [["id", "asc"]] });
      res.json({
         ok: true,
         datos,
      });
   } catch (error) {
      res.status(500).json({
         ok: false,
         error,
      });
   }
};

const crearCategorias = async (req, res = response) => {
   const { nombre } = req.body;

   try {
      const categoria = await Categorias.findOne({ where: { nombre: nombre } });
      if (categoria) {
         return res.json({
            ok: false,
            msg: "categoria ya existe",
         });
      }
      const guardar = await Categorias.create({ nombre: nombre });
      if (!guardar) {
         res.status(500).json({
            ok: false,
            msg: "Ocurrio un error inesperado, por favor vualva a intentarlo",
         });
      } else {
         res.json({
            ok: true,
            msg: "Se a creado el registro exitosamente",
         });
      }
   } catch (error) {
      res.json({
         ok: false,
         error,
      });
   }
};

const editarCategoria = async (req, res = response) => {
   const { id } = req.params;
   const { nombre } = req.body;
   try {
      const categoria = await Categorias.findOne({ where: { id: id } });
      if (!categoria) {
         return res.json({
            ok: false,
            msg: "categoria no existe",
         });
      }
      await Categorias.update(
         { nombre, slug: slug(nombre).toLowerCase() },
         { where: { id: id } }
      );
      res.json({
         ok: true,
         msg: "Categoria modificada",
      });
   } catch (error) {
      res.status(500).json({
         ok: false,
         error,
      });
   }
};

const eliminarCategoria = async (req, res = response) => {
   const { id } = req.params;
   try {
      const categoria = await Categorias.findOne({ where: { id: id } });
      if (!categoria) {
         res.status(500).json({
            ok:false,
            msg:"Categoria no existe"
         });
      };
      await Categorias.destroy({where:{id:id}});
      res.json({
         ok:true,
         msg:"Categoria eliminada"
      })

   } catch (error) {
      res.status(500).json({
         ok:false,
         error
      })
   }
};

module.exports = {
   listarCategorias,
   crearCategorias,
   editarCategoria,
   eliminarCategoria,
};
