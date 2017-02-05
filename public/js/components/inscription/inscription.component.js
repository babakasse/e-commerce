'use strict';

angular.module('inscriptionModule', ['userService'])
    .component('inscriptionPage', {
        templateUrl: "js/components/inscription/inscription.html",
        controller: ['$scope', '$log', 'Users', '$state', function ($scope, $log, Users, $state) {

            $scope.inscription = function() {
                var user = {
                    username: this.username,
                    email: this.email,
                    password: this.password
                };
                Users.register(user).then(
                    function success(response) {
                        if(response.data === true) {
                            $scope.connexion();
                        }
                    },
                    function error(err) {
                        $log.error(err);
                    }
                );
            };

            $scope.connexion = function(user) {
                if(!user) {
                    user = {
                        username: this.username,
                        email: this.email,
                        password: this.password
                    };
                }
                Users.login(user).then(
                    function success(response) {
                        Users.setUser(response.data);
                        $state.go('compte');
                    },
                    function error(err) {
                        $log.error(err);
                    }
                )
            };
        }]
    });