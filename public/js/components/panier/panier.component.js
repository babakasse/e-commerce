'use strict';

angular.module('panierModule', ['productService', 'panierService'])
    .component('panier', {
        templateUrl: "js/components/panier/panier.html",
        controller: ['$scope', '$log', 'Panier', 'Products', function ($scope, $log, Panier, Products) {

            $scope.produits = [];

            _.each(Panier.getAllArticle(), function(produit) {
                Products.find(produit.id).then(
                    function success(response) {
                        if(!_.isEmpty(response.data) && response.data) {
                            response.data.quantite = produit.quantite;
                            response.data.total = produit.quantite * response.data.prix;
                            response.data.taille = "S";
                            $scope.produits.push(response.data)
                        }
                    }, function error(response) {
                        $log.error(response);
                    });
            });

            $scope.addArticle = function(id_produit) {
                var produit = _.find($scope.produits, {_id: id_produit});
                produit.quantite++;
                Panier.addArticle(id_produit);
            };

            $scope.removeArticle = function(id_produit) {
                var produit = _.find($scope.produits, {_id: id_produit});
                produit.quantite--;
                Panier.removeArticle(id_produit);
                if(produit.quantite === 0) {
                    $scope.deleteArticle(id_produit);
                }
            };

            $scope.deleteArticle = function(id_produit) {
                var produit = _.find($scope.produits, {_id: id_produit});
                Panier.deleteArticle(id_produit);
                _.remove($scope.produits, produit);
            }

        }]
    });