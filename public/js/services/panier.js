'use strict';

angular.module('panierService', ['LocalStorageModule'])
    .factory('Panier', ['localStorageService', '$rootScope', function(localStorageService, $rootScope) {
        return {
            addArticle: function(id_produit) {
                if(!localStorageService.get('produit')) {
                    localStorageService.set('produit', []);
                }
                var produit = _.find(localStorageService.get('produit'), {id: id_produit});
                if(produit) {
                    produit.quantite++;
                    var listProduit = localStorageService.get('produit');
                    var index = _.findIndex(listProduit, produit);
                    listProduit.splice(index, 1, produit);
                    localStorageService.set('produit', listProduit);
                }else {
                    localStorageService.set('produit', localStorageService.get('produit').concat({id: id_produit, quantite: 1}));
                }
                $rootScope.quantitePanier = _.map(localStorageService.get('produit'), 'quantite')[0];
            },
            getAllArticle: function() {
                return localStorageService.get('produit');
            },
            removeArticle: function(id_produit) {
                var produit = _.find(localStorageService.get('produit'), {id: id_produit});
                if(produit) {
                    produit.quantite--;
                    var listProduit = localStorageService.get('produit');
                    var index = _.findIndex(listProduit, produit);
                    listProduit.splice(index, 1, produit);
                    localStorageService.set('produit', listProduit);
                }
                $rootScope.quantitePanier = _.map(localStorageService.get('produit'), 'quantite')[0];
            },
            deleteArticle: function(id_produit) {
                console.log(id_produit);
                var listProduit = localStorageService.get('produit');
                _.remove(listProduit, {id: id_produit});
                localStorageService.set('produit', listProduit);
                $rootScope.quantitePanier = _.map(localStorageService.get('produit'), 'quantite')[0];
                if(!$rootScope.quantitePanier) {
                    $rootScope.quantitePanier = 0;
                }
            },
            clearPanier: function() {
                localStorageService.set('produit', []);
            }
        }
    }]);