'use strict';

var mongoose = require('mongoose');

module.exports = mongoose.model('Products', {
    nom: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    nomImage: {
        type: String,
        required: true
    },
    marque: {
        type: String,
        required: true
    },
    categorie: {
        type: String,
        required: true
    },
    couleur: {
        type: String
    },
    taille: [{
        type: String
    }],
    prix: {
        type: Number,
        required: true
    }
});