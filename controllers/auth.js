const { validationResult } = require("express-validator");
const Usuario = require("../models/Usuario");
const bcrypt = require("bcrypt");
const { generarJWT } = require("../helpers/jwt");
const crearUsuario = async (req, res = response) => {
  // console.log(req.body)
  const { email, name, password } = req.body;
  try {
    let usuario = await Usuario.findOne({ email });
    if (usuario) {
      return res.status(400).json({
        ok: true,
        msg: "ya existe un usuario con este email",
      });
    }
    usuario = new Usuario(req.body);

    //enctriptar password
    const salt = bcrypt.genSaltSync();
    //cambia el valor colocado por el usuario
    usuario.password = bcrypt.hashSync(password, salt);

    //grabacion base de datos
    await usuario.save();

    //generar jwt cuando se crea

    const token = await generarJWT(usuario.id, usuario.name);
    res.status(201).json({
      ok: true,
      uid: usuario.id,
      name: usuario.name,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "hable con e administrador",
    });
  }
};
const loginUsuario = async (req, res = response) => {
  const { email, password } = req.body;
  try {
    let usuario = await Usuario.findOne({ email });
    //confirmar usuario
    if (!usuario) {
      console.lgo;
      return res.json({
        ok: false,
        msg: "no existe el usuario y/o no coinciden las contrasenas",
      });
    }
    const salt = bcrypt.genSaltSync();
    //cambia el valor colocado por el usuario
    usuario.password = bcrypt.hashSync(password, salt);

    //confirmar password
    if (bcrypt.hashSync(password, salt) !== usuario.password) {
      return res.json({
        ok: false,
        msg: "no existe el usuario y/o no coinciden las contrasenas",
      });
    }
    //generara token
    const token = await generarJWT(usuario.id, usuario.name);

    res.status(201).json({
      ok: true,
      uid: usuario.id,
      name: usuario.name,
      token,
      // password: usuario.password,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "hable con e administrador",
    });
  }
};

const revalidacionToken = async (req, res = response) => {
  const uid = req.uid;
  const name = req.name;
  console.log(req)
  const token=await generarJWT(uid,name)
  res.json({
    ok: true,
    token
  });
};
module.exports = { crearUsuario, loginUsuario, revalidacionToken };
