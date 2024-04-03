const { response } = require("express");
const Evento = require("../models/Evento");
const getEventos = async (req, res = response) => {
  const eventos = await Evento.find().populate("user", "name");
  res.json({
    ok: true,
    eventos,
  });
};

const crearEvento = async (req, res = response) => {
  //verificar el evnto
  const evento = new Evento(req.body);
  //   console.log(req)
  evento.user = req.uid;
  try {
    const eventoSaved = await evento.save();
    res.json({
      ok: true,
      msg: "guardado",
      event: eventoSaved,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "hable con el admin",
    });
  }
};

const actualizarEvento = async (req, res = response) => {
  const eventoId = req.params.id;
  try {
    const evento = await Evento.findById(eventoId);
    if (!evento) {
      return res.status(404).json({
        ok: false,
        msg: "evento no existe ,no existe el id",
      });
    }
    if (evento.user.toString() !== req.uid) {
      return res.status(401).json({
        ok: false,
        msg: "no puedes editar evento de otros usuarios",
      });
    }
    const nuevoEvento = { ...req.body, user: req.uid };
    const eventoActualizado = await Evento.findByIdAndUpdate(
      eventoId,
      nuevoEvento,
      { new: true }
    );
    res.json({
      ok: true,
      evento: eventoActualizado,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "hable con el administrador",
    });
  }
};

const eliminarEvento = async (req, res = response) => {
  const eventoId = req.params.id;
  try {
    const evento = await Evento.findById(eventoId);
    if (!evento) {
      return res.status(404).json({
        ok: false,
        msg: "evento no existe ,no existe el id",
      });
    }
    if (evento.user.toString() !== req.uid) {
      return res.status(401).json({
        ok: false,
        msg: "no puedes remover evento de otros usuarios",
      });
    }
    //   const nuevoEvento = { ...req.body, user: req.uid };
    const eventoSelected = await Evento.findByIdAndDelete(eventoId);
    res.json({
      ok: true,
      
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "hable con el administrador",
    });
  }
};

module.exports = {
  crearEvento,
  getEventos,
  actualizarEvento,
  eliminarEvento,
};
