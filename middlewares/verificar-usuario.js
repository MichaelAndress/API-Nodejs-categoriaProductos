const verificarUsuario=(req, res, next)=>{

      if (req.isAuthenticated()) {
            return next();
      }
      return res.send("debes estar logueado")
}


module.exports = {
      verificarUsuario
};