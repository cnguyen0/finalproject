
angular.module('WebApp', ['ui.bootstrap', 'ngAnimate', 'LocalStorageModule', 'ui.router'])
    .constant('productKey', 'cart')

    .factory('productsJSON', function($http) {
        return $http.get('../data/products.json')
    })
    .factory('usersJSON', function($http) {
        return $http.get('../data/userInformation.json');
    })
    .factory('localStorageJSON', function(localStorageService, storageKey) {
        return localStorageService.get(storageKey) || {items:[]};
    })

    //configure views for shop to cart
    .config(function($stateProvider, $urlRouterProvider) { //make sure spelling is exact //declares our various ui-routes and partials, when to show them, etc
        $stateProvider
            .state('products', {
                url: '/products', //url will appear in html address
                templateUrl: '../views/products.html', //where is the partial html file that defines this view?
                controller: 'ProductsListCtrl'
                //controller: 'MinaShopsController' //which controller do I want to use?
            })
            .state('cart', {
                url: '/cart',
                templateUrl: '../views/cart.html',
                controller: 'CartCtrl'
            });

        $urlRouterProvider.otherwise('/products');
    })

    .controller('HomeController', function($scope, $http, usersJSON) {
        'use strict';

        if (window.innerWidth > 768) {
            $scope.visible = false;

            $scope.toggle = function() {
                $scope.visible = !$scope.visible;
                document.getElementById('enter').style.display = 'none';
            }

        } else {
            document.getElementById('enter').style.display = 'none';
            $scope.visible = true;
        }
    })

    .controller('ProductsListCtrl', function($scope,productsJSON){
        'use strict';

        productsJSON.then(function (results) {
            $scope.products = results.data;


            $scope.categories = _.uniq(_.flatten(_.pluck($scope.products, 'categories')));

            $scope.filters = {};
        });
    })

    .controller('ProductDetailCtrl', function($scope, $filter, $uibModal, $log, productsJSON) {
        'use strict';

        $scope.closeAlert = function(){
            $scope.confirmation = !$scope.confirmation;

        };
        $scope.open = function(product) {
            $scope.confirmation = false;

            $scope.product = product;


            var modalInstance = $uibModal.open({
                templateUrl:'../views/product-detail.html',
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

                $scope.confirmation = !$scope.confirmation;

            });
        };
    })

    .controller('ModalInstanceCtrl', function($scope, $uibModalInstance, product, cartService) {
        'use strict';

        $scope.product = product;
        $scope.product.quantity = '1';
        $scope.close = function () {
            $uibModalInstance.dismiss('cancel');
        };

        $scope.submit = function() {
            cartService.addProduct(product);
            $uibModalInstance.close($scope.product);


        }

    })

    .service('cartService', function(productKey) {
        var cart = angular.fromJson(localStorage.getItem(productKey)) || {items:[]};

        function saveData() {
            return localStorage.setItem(productKey, angular.toJson(cart));
        }

        var addProduct = function(product) {
            var qty = 0;
            cart.items.forEach(function (item) {
                qty += _.parseInt(item.quantity);
            });
            cart.items.push({
                name: product.name,
                price: product.price,
                quantity: _.parseInt(product.quantity),
                grind: product.grind,
                extPrice: product.price * product.quantity
            });
            saveData();
        };

        var getCart = function() {
            return cart;
        };

        return {
            getCart: getCart,
            addProduct: addProduct,
            saveData: saveData
        };
    })


    .controller('CartCtrl', function($scope, cartService, usersJSON) {
        'use strict';

        usersJSON.then(function(info) {
            $scope.customers = info.data;
        });

        $scope.cart = cartService.getCart();


        // Remove product from Cart
        $scope.removeProduct = function(index) {
            $scope.cart.items.splice(index, 1);
            cartService.saveData();
        };


        // Return total prices in cart
        $scope.getCartTotal = function() {
            var total = 0;
            $scope.cart.items.forEach(function(item) {
                total += item.extPrice;
            });
            return total;
        };

    })
    .controller('LoginCtrl', function($scope, usersJSON) {
        usersJSON.then(function(results) {
            $scope.customers = results.data;
        });

        $scope.login = function() {
            //login user
        };

    })

    .directive('existUser', function() {
        return {
            require: 'ngModel',
            link: function(scope, elem, attrs, controller) {
                controller.$validators.existUser = function(value) {
                    return undefined == value ||
                            value.length === 0 ||
                            undefined != scope.customers.find(function(cust) {
                                return cust.Email === value;
                            });

                }
            }
        }
    })
    .directive('validPassword', function() {
        return {
            require: 'ngModel',
            link: function(scope, elem, attrs, controller) {
                controller.$validators.validPassword = function(value) {
                    return undefined == value ||
                            value.length === 0 ||
                            undefined != scope.customers.find(function(cust) {
                                return cust.Email === scope.user.email &&
                                        cust.Password === value;
                            });
                }
            }
        }
    });






