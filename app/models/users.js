'use strict';

var mongoose = require('mongoose');

module.exports = mongoose.model('Users', {
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        enum: ['admin', 'user']
    },
    address: {
        rue: {
            type: String
        },
        city: {
            type: String
        }
    },
    informationsBancaire: {
        type: String
    }
});