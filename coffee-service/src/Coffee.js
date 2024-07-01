const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cafeSchema = new Schema({
    nom: { type: String, required: true },
    origine: { type: String, required: true },
    typeDeGrain: { type: String, required: true },
    niveauDeTorrefaction: { type: String, required: true },
    prix: { type: Number, required: true },
    notesDeGustation: [String],
    stock: { type: Number, default: 0 }
});

const Coffee = mongoose.model('Cafe', cafeSchema);
module.exports = Coffee;