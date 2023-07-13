const { Schema, default: mongoose } = require("mongoose");
const slugs = require("slug");

const ProductoEsquema = new Schema(
      {
            categoria_id:{
                  type: Schema.Types.ObjectId,
                  ref: "Categoria",
                  required: true
            },
            nombre:{
                  type:String,
                  unique: true,
                  trim: true,
                  required:true
            },
            slug:{
                  type: String
            },
            descripcion:{
                  type:String,
                  required: true
            },
            precio:{
                  type: Number
            }
      }
);

ProductoEsquema.pre("save",function(next){
      const slug = slugs(this.nombre);
      this.slug = `${slug}`;
      next();
})

module.exports = mongoose.model('Producto', ProductoEsquema);