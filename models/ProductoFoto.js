const { Schema, default: mongoose } = require("mongoose");

const ProductoFotoEsquema = new Schema(
      {
            producto_id:{
                  type: Schema.Types.ObjectId,
                  ref: "Producto"
            },
            nombre:{
                  type:String,
                  required:true
            }
      }
);

module.exports = mongoose.model("ProductoFoto", ProductoFotoEsquema);