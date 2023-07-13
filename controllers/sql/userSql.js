const User = require("../../models/sql/User");
const bcrypt = require("bcryptjs");


const listarUser = async (req, res) => {
   const usuario = await User.findAll();
   res.json({
      ok: true,
      usuario,
   });
};
const loginn = async (req, res) => {
   const { correo, password } = req.body;
   try {
      const usuario = await User.findOne({ where: { correo } });
      console.log(usuario.password)
      if (!usuario) {
         return res.status(500).json({
            ok: false,
            msg: "Datos Ingesados incorrectos 1",
         });
      }
      const validarPasword =  bcrypt.compareSync(password, usuario.password);
      if (!validarPasword) {
         return res.status(400).json({
            ok:false,
            msg:"Password Incorrecto"
         })
      }
      return res.json({
         ok:true,
         msg:"LOGIN EXIOSO"
      })
      // bcrypt.compare(password, usuario.password, (err, data) => {
      //    if (err) {
      //       throw err;
      //    }
      //    if (data) {
      //       req.login(usuario, function (err) {
      //          if (err) {
      //             return res.json({
      //                err,
      //             });
      //          }
      //          return res.json({
      //             ok: true,
      //             msg: "LOGIN EXITOSO",
      //          });
      //       });
      //    } else {
      //       res.status(500).json({
      //          ok: false,
      //          msg: "Datos ingresados incorrectos 2",
      //       });
      //    }
      // });
   } catch (error) {
      res.status(500).json({
         ok: false,
         error,
      });
   }
};

const salir =(req = request, res)=>{
   req.logout(function(err){
      if (err) {
         return next(err)
      }
   })
};

const registro=async(req, res)=>{
   const {nombre,correo,password} = req.body;
   try {
      const user = await User.findOne({where:{correo}});
      if (user) {
         return res.status(500).json({
            ok:false,
            msg:"Email ingresado no es valido"
         })
      }
      usuario = new User(req.body);

      const salt = bcrypt.genSaltSync();
      usuario.password = bcrypt.hashSync(password,salt);
      await usuario.save();

      res.json({
         ok:true,
         msg:"registrado correctamente"
      })
   } catch (error) {
      res.json({
         ok:false,
         error
      })
   }


};

module.exports = {
   listarUser,
   loginn,
   salir,
   registro,
};
