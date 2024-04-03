const express = require("express");
const { dbConection } = require("./db/config");
const cors=require('cors')
require("dotenv").config();
const _PORT = process.env.PORT;
//opcional
// const dotenv=require('dotenv')
// dotenv.config()

// console.log(process.env);

//crear el servidor de express
const app = express();

//base de datos
dbConection();

//cors~
app.use(cors())

//directorio publico

app.use(express.static("public"));

//lectura y parseo del body 
app.use(express.json());

//rutas 

//auth

app.use("/api/auth", require("./routes/auth"));

// CRUD:eventos

app.use('/api/events',require('./routes/events'))

//escuchar peticiones
app.listen(_PORT, () => {
  console.log(`servidor corriendo en el puerto ${_PORT}`);
});
