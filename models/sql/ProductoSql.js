const Sequelize = require("sequelize");
const slug = require("slug");
const db = require("../../database/mysql");
const CategoriaSql = require("./CategoriaSql");

const ProductoSql = db.define('productosql',{
      id:{
            type:Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement:true
      },
      nombre:{
            type:Sequelize.STRING(100)
      },
      slug:{
            type:Sequelize.STRING(100)
      },
      descripcion:{
            type:Sequelize.TEXT('long'),
      },
      precio:{
            type:Sequelize.INTEGER(11)
      }
},{
      hooks:{
            beforeCreate(productosql){
                  productosql.slug = slug(productosql.nombre).toLowerCase();
            }
      }
});
//*Crear claves foraneas
ProductoSql.belongsTo(CategoriaSql,{foreignKey: 'category_id'});

module.exports = ProductoSql;