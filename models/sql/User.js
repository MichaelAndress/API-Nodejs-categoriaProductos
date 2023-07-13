const Sequelize = require("sequelize");
const db = require("../../database/mysql");
const bcrypt = require("bcryptjs");

const User = db.define(
   "users",
   {
      id: {
         type: Sequelize.INTEGER,
         primaryKey: true,
         autoIncrement: true,
      },
      nombre: {
         type: Sequelize.STRING(100),
      },
      correo: {
         type: Sequelize.STRING(100),
      },
      password: {
         type: Sequelize.STRING(100),
      },
   },

);

module.exports = User;
