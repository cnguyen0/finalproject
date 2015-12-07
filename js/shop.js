
angular.module('ProductsApp', [])
    .factory('productsJSON', function($http) {
        return $http.get('../data/products.json')
    })

    .controller('ProductsController', function($scope,productsJSON){
        'use strict';


        productsJSON.then(function (results) {
            $scope.products = results.data;


            $scope.categories = _.uniq(_.flatten(_.pluck($scope.products, 'categories')));

            $scope.filters = {};




        });

    })