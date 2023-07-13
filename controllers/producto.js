const { response } = require("express");
const Producto = require("../models/Producto");
const ProFoto = require("../models/ProductoFoto");
const Categoria = require("../models/Categoria");

const listarProductos = async (req, res = response) => {
   const datos = await Producto.find()
      .populate("categoria_id")
      .lean()
      .sort({ _id: 1 });
   res.json({
      ok: true,
      productos: datos,
   });
};

const crearProducto = async (req, res = response) => {
   const { nombre, descripcion, precio, categoria_id } = req.body;
   console.log(nombre, descripcion, precio, categoria_id);
   try {
      const producto = await Producto.findOne({ nombre });
      if (producto) {
         return res.status(500).json({
            ok: false,
            msg: "producto ya existe",
         });
      }

      nuevoProducto = new Producto({
         categoria_id,
         nombre,
         descripcion,
         precio,
      });
      await nuevoProducto.save();
      res.json({
         ok: true,
         msg: "Producto agregado",
      });
   } catch (error) {
      res.status(500).json({
         ok: false,
         msg: "Error al intentar agregar el producto",
         error,
      });
   }
};

const editarProducto = async (req, res = response) => {
   const { id } = req.params;
   const { nombre, descripcion, precio, categoria_id } = req.body;
   try {
      const producto = await Producto.findById(id);
      if (!producto) {
         return res.json({
            ok: false,
            msg: "El producto no existe",
         });
      }
      await producto.updateOne({ nombre, descripcion, precio, categoria_id });
      res.json({
         ok: true,
         msg: "Producto modificado",
      });
   } catch (error) {
      res.status(500).json({
         ok: false,
         msg: "Error al intentar modificar el producto",
         error,
      });
   }
};

const eliminarProducto = async (req, res = response) => {
   const { id } = req.params;
   try {
      const producto = await Producto.findById(id);
      if (!producto) {
         return res.json({
            ok: false,
            msg: "Prodcuto no existe",
         });
      }
      await Producto.findByIdAndDelete(id);
      res.json({
         ok: true,
         msg: "Producto Eliminado",
      });
   } catch (error) {
      res.status(500).json({
         ok: false,
         msg: "error al eliminar el producto",
         error,
      });
   }
};

const productosCat = async (req, res = response) => {
   const { id } = req.params;

   try {
      const caegoria = await Categoria.findById(id);
      if (!caegoria) {
         res.status(500).json({
            ok: false,
            msg: "Id de categoria no encontrada",
         });
      }

      const productos = await Producto.find({ categoria_id: id }).populate(
         "categoria_id"
      );
      res.json({
         productos,
      });
   } catch (error) {}
};

const unProducto = async (req, res = response) => {
   const {id} = req.params;
   try {
      const producto = await Producto.findById(id);
      if (!producto) {
         res.status(500).json({
            ok:false,
            msg:"Producto no encontrado"
         });
      };
      res.json({
         ok:true,
         producto
      });
      
   } catch (error) {
      res.json({
         error
      });   
   }
};

const listarFoto=async(req,res=response)=>{
   const {id}=req.params;
   try {
      const producto = Producto.findById(id);
      if (!producto) {
         res.status(500).json({
            ok:"false",
            msg:"Producto no encontrado"
         })
      };
      const fotos = await ProFoto.find({producto_id:id}).sort({_id:-1});
   } catch (error) {
      
   }
};

const addFoto=async(req,res)=>{

};

module.exports = {
   listarProductos,
   crearProducto,
   editarProducto,
   eliminarProducto,
   productosCat,
   unProducto,
   listarFoto,
   addFoto
};
