const Partido = require('../models/Partido');

// GET /partidos
const getPartidos = async (req, res) => {
  try {
    const partidos = await Partido.find().limit(20);
    res.json(partidos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los partidos' });
  }
};

// GET /partidos/:id
const getPartidoById = async (req, res) => {
  try {
    const partido = await Partido.findById(req.params.id);
    if (!partido) return res.status(404).json({ error: 'Partido no encontrado' });
    res.json(partido);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el partido' });
  }
};

// POST /partidos
const createPartido = async (req, res) => {
  try {
    const partido = new Partido(req.body);
    const saved = await partido.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ error: 'Error al crear el partido', detalle: error.message });
  }
};

// PUT /partidos/:id
const updatePartido = async (req, res) => {
  try {
    const partido = await Partido.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!partido) return res.status(404).json({ error: 'Partido no encontrado' });
    res.json(partido);
  } catch (error) {
    res.status(400).json({ error: 'Error al actualizar el partido', detalle: error.message });
  }
};

// DELETE /partidos/:id
const deletePartido = async (req, res) => {
  try {
    const partido = await Partido.findByIdAndDelete(req.params.id);
    if (!partido) return res.status(404).json({ error: 'Partido no encontrado' });
    res.json({ message: 'Partido eliminado correctamente', partido });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el partido' });
  }
};

// GET /partidos/torneo/:torneo
const getPartidosByTorneo = async (req, res) => {
  try {
    const partidos = await Partido.find({ tournament: req.params.torneo });
    res.json(partidos);
  } catch (error) {
    res.status(500).json({ error: 'Error al filtrar por torneo' });
  }
};

// GET /partidos/equipo/:equipo
const getPartidosByEquipo = async (req, res) => {
  try {
    const equipo = req.params.equipo;
    const partidos = await Partido.find({
      $or: [{ home_team: equipo }, { away_team: equipo }]
    });
    res.json(partidos);
  } catch (error) {
    res.status(500).json({ error: 'Error al filtrar por equipo' });
  }
};

// GET /partidos/fecha/:fechaInicio-:fechaFin
const getPartidosByFecha = async (req, res) => {
  try {
    const { fechaInicio, fechaFin } = req.params;
    const partidos = await Partido.find({
      date: { $gte: fechaInicio, $lte: fechaFin }
    });
    res.json(partidos);
  } catch (error) {
    res.status(500).json({ error: 'Error al filtrar por fecha' });
  }
};

module.exports = {
  getPartidos,
  getPartidoById,
  createPartido,
  updatePartido,
  deletePartido,
  getPartidosByTorneo,
  getPartidosByEquipo,
  getPartidosByFecha,
};
