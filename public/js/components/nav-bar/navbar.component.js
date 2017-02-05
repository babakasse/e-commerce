'use strict';

angular.module('navigationModule', ['oc.lazyLoad', 'panierService'])
.component('navigationBar', {
    templateUrl: "js/components/nav-bar/navbar.html",
    controller: ['$scope', '$log', '$ocLazyLoad', '$rootScope', 'Panier', function ($scope, $log, $ocLazyLoad, $rootScope, Panier) {

        $scope.quantitePanier = Panier.getAllArticle();

        $rootScope.$watch("quantitePanier", function() {
            $scope.quantitePanier = $rootScope.quantitePanier;
        });

        $ocLazyLoad.load(['js/script/material-kit.js', 'js/script/script.js']);

        $scope.searchArticle = function() {
            $rootScope.term = this.nom_article;
        }
    }]
});