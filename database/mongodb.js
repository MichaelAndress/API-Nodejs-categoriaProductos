const mongoose = require("mongoose")

const dbConnection = async()=>{
      try {
            await mongoose.connect(process.env.URI_LOCAL,{

            })
            console.log("BD Mongo conectada")
            
      } catch (error) {
            console.log("fallo en la coneccion con la base de datos ")
      }
};

module.exports={
      dbConnection,
}