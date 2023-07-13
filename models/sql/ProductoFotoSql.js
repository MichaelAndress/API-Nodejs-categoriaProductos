const Sequalize = require("sequelize");
const db = require("../../database/mysql");
const ProductoSql = require("./ProductoSql");

const ProductoFotoSql = db.define("productofotosql", {
   id: {
      type: Sequalize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
   },
   nombre: {
      type: Sequalize.STRING(100),
   },
});
ProductoFotoSql.belongsTo(ProductoSql, { foreignKey: "producto_id" });

module.exports = ProductoFotoSql;
