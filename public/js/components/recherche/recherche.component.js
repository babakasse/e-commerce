'use strict';

angular.module('rechercheModule', ['productService', 'ui.bootstrap'])
    .component('recherchePage', {
        templateUrl: "js/components/recherche/recherche.html",
        controller: ['$scope', '$log', 'Products', '$rootScope', function ($scope, $log, Products, $rootScope) {

            var term = $rootScope.term;
            $log.debug(term);
            if(term) {
                Products.search(term).then(
                    function success(response) {
                        $log.info(response.data);
                    }, function error(response) {
                        $log.error(response);
                    });
            }


        }]
    });