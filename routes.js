var passport = require('passport'),
    User = require('./app/models/users'),
    Product = require('./app/controller/productController'),
    productController = new Product(),
    formidable = require('formidable'),
    fs = require('fs');


module.exports = function (app) {

    // retourne tous les produits
    app.get('/api/products', function (req, res) {
        productController.getAllProducts(function(products) {
            return res.json(products);
        });
    });

    // cherche un seul produit en particulier
    app.get('/api/product/:product_id', function (req, res) {
        var product_id = req.params.product_id;
        productController.findProductById(product_id, function(products) {
            return res.json(products);
        });
    });

    /**
     * Fonction de création de produit à retoucher
     */
    // crée un produit
    app.post('/api/products/add', isAuthenticated, function (req, res) {
        var form = new formidable.IncomingForm();
        form.uploadDir = __dirname + '/public/img/produit/';
        form.keepExtensions = true;

        form.on('fileBegin', function (name, file){
            file.path = __dirname + '/public/img/produit/' + file.name;
        });

        form.parse(req, function(err, fields, files){
            var nomImage = files['image'].name;
            if (err) {
                fs.unlink(__dirname + '/public/img/produit/'+nomImage);
                res.render('/admin/gestion', {message: err});
            } else {

                fields.nomImage = nomImage;
                productController.createProduct(fields, function(success) {
                    if(success) {
                        res.redirect('/admin/gestion');
                    }
                });
            }
        });

    });

    // supprime un produit (doit être connecté en admin pour ça)
    app.get('/api/product/delete/:product_id', isAuthenticated,function (req, res) {
        var product_id = req.params.product_id;
        productController.deleteProduct(product_id, function(success) {
            if(success) {
                res.redirect('/admin/gestion');
            }
        });
    });

    //connexion depuis la partie client
    app.post('/api/login',
        passport.authenticate('local'),
        function(req, res) {
            if(req.user.role === "user") {
                return res.json(req.user);
            }
        });

    //inscription depuis la partie client
    app.post('/api/register', function(req, res) {
        req.body.role = "user";
        var user = new User(req.body);
        user.save(function (err) {
            if (err) {
                return res.json("Erreur lors de l'inscription");
            }else {
                return res.json(true);
            }
        });
    });

    //===============================================================
    //espace admin
    app.get('/admin', function(req, res) {
        var message = req.flash('success')[0] ? req.flash('success')[0]: req.flash('error')[0];
        res.render('admin', {isConnected: req.isAuthenticated(), message: message});
    });

    //espace admin -- gestion de produit
    app.get('/admin/gestion', isAuthenticated, function(req, res) {
        productController.getAllProducts(function(products) {
            res.render('gestion', {isConnected: true, products: products});
        });
    });

    app.get('/admin/gestion/product/:product_id', isAuthenticated, function(req, res) {
        productController.getAllProducts(function(products) {
            res.render('gestion', {isConnected: true, products: products});
        });
    });

    //connexion depuis la partie serveur
    app.post('/login',
        passport.authenticate('local', {
            successRedirect: '/admin/gestion',
            failureRedirect: '/admin',
            successFlash: 'Bienvenue',
            failureFlash: 'Identifiant ou mot de passe invalide.'
        })
    );

    //deconnexion depuis la partie serveur
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/admin');
    });

    // charge la partie client
    app.get('*', function (req, res) {
        res.sendFile(__dirname + '/public/index.html');
    });

};

var isAuthenticated = function (req, res, next) {
    if (req.isAuthenticated() && req.user.role === "admin") {
        return next();
    }else {
        res.redirect('/admin');
    }
};
