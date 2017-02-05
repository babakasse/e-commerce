'use strict';

angular.module('productService', [])
	.factory('Products', ['$http',function($http) {
		return {
			getAll: function() {
				return $http.get('/api/products');
			},
			find: function(id) {
				return $http.get('api/product/' + id);
			},
			create: function(product) {
				return $http.post('/api/products', product);
			},
			delete: function(id) {
				return $http.delete('/api/products/' + id);
			},
			search: function(term) {
				return $http.get('/api/products/:categorie/search?term='+term);
			}
		}
	}]);