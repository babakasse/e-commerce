'use strict';

angular.module('accueilModule', ['productService', 'produitModule'])
    .component('accueilPage', {
        templateUrl: "js/components/accueil/accueil.html",
        controller: ['$scope', '$log', 'Products', function ($scope, $log, Products) {

            Products.getAll().then(
                function success(response) {
                    if(!_.isEmpty(response.data) && response.data) {
                        $scope.produits = response.data;
                    }
                },
                function error(err) {
                    $log.error(err);
                }
            )
        }]
    });