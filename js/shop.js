angular.module('ProductsApp', ['ui.bootstrap'])
    .factory('productsJSON', function($http) {
        return $http.get('../data/products.json')
    })

    .controller('ProductsListCtrl', function($scope,productsJSON){
        'use strict';

        productsJSON.then(function (results) {
            $scope.products = results.data;


            $scope.categories = _.uniq(_.flatten(_.pluck($scope.products, 'categories')));
            $scope.coffeeTypes = _.uniq(_.flatten(_.pluck($scope.products, 'coffeeType')));

            $scope.filters = {};
            $scope.filterCoffee = {};
            console.log($scope.filterCoffee);


        });
    })

    .controller('ProductDetailCtrl', function($scope, $filter, $uibModal, $log, productsJSON) {

        $scope.cart = angular.fromJson(localStorage.getItem('product')) || {items:[]};

        function saveData() {
            localStorage.setItem('product', angular.toJson($scope.cart));
        }

        // Add a selected product to cart
        $scope.submit = function(product) {
            var qty = 0;
            $scope.cart.items.forEach(function(item) {
                qty += item.quantity;
            });
            qty += product.quantity;
            $scope.cart.items.push({
                name: product.name,
                price: product.price,
                quantity: product.quantity,
                grind: product.grind,
                extPrice: product.price * product.quantity
            });
            saveData();
        };

        // Return total prices in cart
        $scope.getCartTotal = function() {
            var total = 0;
            $scope.cart.items.forEach(function(item) {
                total += item.extPrice;
            });
            return total;
        };

        // Remove data from the cart once at a time
        $scope.removeFromCart = function(index) {
            $scope.cart.items.splice(index, 1);
            saveData();
        };


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

    })

    .controller('ModalInstanceCtrl', function($scope, $uibModalInstance, product) {
        $scope.product = product;
        $scope.product.quantity = '1';
        $scope.close = function () {
            $uibModalInstance.dismiss('cancel');
        };

        $scope.submit = function() {
            $uibModalInstance.close($scope.product);

        }
    });










