const Sequelize = require("sequelize");
const db = require("../../database/mysql");
const slug = require("slug");

const CategoriaSql = db.define('categoriasql',{
      id:{
            type:Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement:true,
      },
      nombre:{
            type:Sequelize.STRING(100),
      },
      slug:{
            type:Sequelize.STRING(100)
      }
},{
      hooks:{
            beforeCreate(categoriasql){
                  categoriasql.slug = slug(categoriasql.nombre).toLowerCase();
            }
      }
});



module.exports = CategoriaSql;