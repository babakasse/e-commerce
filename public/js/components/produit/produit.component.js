'use strict';

angular.module('produitModule', ['productService', 'ui.router', 'panierService'])
    .component('produitPage', {
        templateUrl: "js/components/produit/produit.html",
        controller: ['$scope', '$log', '$stateParams', 'Products', 'Panier', function ($scope, $log, $stateParams, Products, Panier) {

            Products.getAll().then(
                function success(response) {
                    if(!_.isEmpty(response.data) && response.data) {
                        $scope.produits = response.data;
                    }
                },
                function error(err) {
                    $log.error(err);
                }
            );

            $scope.addArticle = function(id_produit) {
                Panier.addArticle(id_produit);
                noty({
                    type: 'success',
                    text: 'Produit ajouté au panier',
                    timeout: 2000
                });
            }
        }]
    });