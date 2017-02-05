'use strict';

angular.module('userService', [])
    .factory('Users', ['$http', function($http) {
        var user = null;
        return {
            isConnected: function() {
                return !!user;
            },
            login: function(todoData) {
                return $http.post('/api/login', todoData);
            },
            logout: function() {
                user = null;
            },
            register: function(todoData) {
                return $http.post('/api/register', todoData);
            },
            setUser: function(data) {
                user = data;
            }
        }
    }]);