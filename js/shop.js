var app = angular.module('ProductsApp', ['ui.bootstrap']);
    app.factory('productsJSON', function($http) {
        return $http.get('../data/products.json')
    });

    app.controller('ProductsListCtrl', function($scope,productsJSON){
        'use strict';

        productsJSON.then(function (results) {
            $scope.products = results.data;


            $scope.categories = _.uniq(_.flatten(_.pluck($scope.products, 'categories')));
            $scope.coffeeTypes = _.uniq(_.flatten(_.pluck($scope.products, 'coffeeType')));

            $scope.filters = {};
            $scope.filterCoffee = {};
            console.log($scope.filterCoffee);


        });

    });

    app.controller('ProductDetailCtrl', function($scope, $filter, $uibModal, $log, productsJSON) {
        $scope.closeAlert = function(){
            $scope.confirmation = !$scope.confirmation;

        };
        $scope.open = function(product) {
                $scope.confirmation = false;

                $scope.product = product;


                var modalInstance = $uibModal.open({
                    templateUrl:'product-detail.html',
                    size:'md',
                    controller: 'ModalInstanceCtrl',
                    resolve: {
                        product: function() {
                            return $scope.product;
                        }
                    }
                });

                modalInstance.result.then(function (selectedProduct) {

                    $scope.selectedProduct = selectedProduct;
                    //console.log($scope.selectedProduct);
                    $scope.confirmation = !$scope.confirmation;

                });

        };

    });

    app.controller('ModalInstanceCtrl', function($scope, $uibModalInstance, product) {
        $scope.product = product;
        $scope.product.quantity = '1';
        $scope.close = function () {
            $uibModalInstance.dismiss('cancel');
        };

        $scope.submit = function() {
            $uibModalInstance.close($scope.product);

        }


    });






