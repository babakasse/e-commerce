'use strict';

angular.module('ficheProduitModule', ['productService', 'ui.router'])
    .component('ficheProduitPresentation', {
        templateUrl: "js/components/fiche-produit/ficheProduit.html",
        controller: ['$scope', '$log', '$stateParams', 'Products', function ($scope, $log, $stateParams, Products) {

            var id_produit = $stateParams.id_produit;

            Products.find(id_produit).then(
                function success(response) {
                    if(!_.isEmpty(response.data) && response.data) {
                        $scope.produit = response.data;
                    }
                }, function error(response) {
                    $log.error(response);
                });

        }]
    });