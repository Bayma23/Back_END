const mongoose = require('mongoose');

const produtoSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
    minlength: 3
  },
  preco: {
    type: Number,
    required: true
  }
});

const Produto = mongoose.model('Produto', produtoSchema);

module.exports = Produto;
