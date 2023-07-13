const express = require("express");
require("dotenv").config();
const { dbConnection } = require("./database/mongodb");
const db = require("./database/mysql");
const passport = require("passport");
const session = require("express-session")
require("./models/sql/CategoriaSql");
require("./models/sql/ProductoSql");
require("./models/sql/ProductoFotoSql");
require("./models/sql/User")

//!Coneccion a bases de datos
// dbConnection();
const app = express();
db.sync()
   .then(() => {
      console.log("DB Sql conectada");
   })
   .catch((error) => {
      console.log(error);
   });

//!configuración de sesiones
app.use(
   session({
      secret: 123456,
      resave: false,
      saveUninitialized: false,
      name: "secret-name",
      cookie: {
         expires: 600000,
      },
   })
);

//!Passport
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser((user, done) =>
   done(null, {
      id: user.id,
      nombre: user.nombre,
   })
);
passport.deserializeUser(async(user, done)=>{
   return done(null, user)
});

//!Middlewares
app.use(express.json());
app.use((req, res, next)=>{
   if(req.isAuthenticated()){
      res.locals.user_id = req.user.id;
      res.locals.user_nombre = req.user.nombre;
   }
   next();
})

//!Rutas
app.use("/api/productos", require("./router/producto"));
app.use("/api/categorias", require("./router/categoria"));
app.use("/api/sql/categorias", require("./router/sql/categoriaSql"));
app.use("/api/sql/productos", require("./router/sql/productoSql"));
app.use("/api/sql/user", require("./router/sql/userSql"));

app.listen(process.env.PORT, () => {
   console.log(`servidor corriendo en el puerto ${process.env.PORT}`);
});
