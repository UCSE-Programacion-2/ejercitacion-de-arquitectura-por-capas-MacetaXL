// Script para poblar la base de datos con los datos de data.json
// Uso: node seed.js

require('dotenv').config({ path: '.env' });
const mongoose = require('mongoose');
const Partido = require('./models/Partido');
const data = require('./data/data.json');

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Conectado a MongoDB');

    await Partido.deleteMany({});
    console.log('Colección limpiada');

    await Partido.insertMany(data);
    console.log(`${data.length} partidos insertados`);

    await mongoose.disconnect();
    console.log('Listo ✅');
  } catch (error) {
    console.error('Error al poblar la base de datos:', error.message);
    process.exit(1);
  }
};

seed();
