
const mongoose = require('mongoose');

const url = "mongodb+srv://bayma.mijqlwt.mongodb.net/"

async function conectaBancoDeDados() {
  try {
    console.log("Conectando ao MongoDB Atlas...");
    await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("Conectado ao MongoDB Atlas!");
  } catch (err) {
    console.error("Erro ao conectar no MongoDB Atlas:", err);
    process.exit(1);
  }
}

module.exports = conectaBancoDeDados;
