const { Schema, model } = require("mongoose");
const slugs = require("slug");

const CategoriaEsquema = new Schema(
   {
      nombre: {
         type: String,
         unique: true,
         trim: true,
      },
      slug: {
         type: String,
      },
   },
   {
      timestamps: false,
      versionKey: false,
   }
);

CategoriaEsquema.pre("save",function(next){
      const slug = slugs(this.nombre);
      this.slug = `${slug}`;
      next();
})

module.exports = model("Categoria", CategoriaEsquema);
