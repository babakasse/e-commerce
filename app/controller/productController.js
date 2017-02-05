'use strict';

var product = require('../models/product');

class productController {

    constructor() {

    }

    createProduct(dataProduct, callback) {
        product.create(dataProduct, function (err) {
            if (err) {
                console.log(err);
                callback(false);
            }else {
                callback(true);
            }
        });
    }

    deleteProduct(id_produit, callback) {
        product.remove({
            _id: id_produit
        }, function (err, product) {
            if (err) {
                callback(false);
            }else {
                callback(true);
            }
        });
    }

    getAllProducts(callback) {
        product.find(function (err, products) {
            if (err) {
                callback([]);
            }else {
                callback(products);
            }
        });
    };

    getProductByCategorie(categorie, callback) {
        product.find({
            categorie: categorie
        }, function (err, product) {
            if (err) {
                callback([]);
            }
            callback(product);
        });
    }

    findProductById(id_produit, callback) {
        product.findOne({
            _id: id_produit
        }, function (err, product) {
            if (err) {
                callback([]);
            }
            callback(product);
        });
    }
}

module.exports = productController;