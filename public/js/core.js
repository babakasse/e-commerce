'use strict';

angular.module('commerceApp', [
    'ui.router',
    'panierService',
    'productService',
    'userService',
    'accueilModule',
    'compteModule',
    'ficheProduitModule',
    'navigationModule',
    'panierModule',
    'produitModule',
    'inscriptionModule'
]);

angular.module('commerceApp').config(["$stateProvider", "$qProvider", function ($stateProvider, $qProvider) {
    $qProvider.errorOnUnhandledRejections(false);
    $stateProvider.
    state({
        url: '',
        name: 'accueil2',
        template: "<accueil-page></accueil-page>"
    }).
    state({
        url: '/',
        name: 'accueil',
        template: "<accueil-page></accueil-page>"
    }).
    state({
        url: '/compte',
        name: 'compte',
        template: "<compte-page></compte-page>",
        resolve: {
            users: ["Users", "$state", "$q", function (Users, $state, $q) {
                if(Users.isConnected() === true) {
                    return $q.resolve();
                }else {
                    setTimeout(function() {
                        $state.go('inscription');
                        return $q.reject("accès interdit");
                    });
                }
            }]
        }
    }).
    state({
        url: '/inscription',
        name: 'inscription',
        template: "<inscription-page></inscription-page>"
    }).
    state({
        url: '/panier',
        name: 'panier',
        template: "<panier></panier>"
    }).
    state({
        url: '/produit/:id_produit',
        name: 'produit',
        template: "<fiche-produit-presentation></fiche-produit-presentation>"
    }).
    state({
        url: '/logout',
        name: 'logout',
        controller: ["Users", "$state", function(Users, $state) {
            Users.logout();
            $state.go('accueil');
        }]
    }).
    state({
        url: "*path",
        name: "otherwise",
        templateUrl: "error404.html"
    });
}]);