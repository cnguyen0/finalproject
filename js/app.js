
angular.module('WebApp', ['ui.bootstrap', 'ngAnimate', 'LocalStorageModule'])
    .constant('productKey', 'cart')
    .factory('productsJSON', function($http) {
        return $http.get('../data/products.json')
    })
    .factory('usersJSON', function($http) {
        return $http.get('../data/userInformation.json');
    })
    .factory('usersJSON', function(localStorageService, storageKey) {
        return localStorageService.get(storageKey) || {items:[]};
    })
    .controller('HomeController', function($scope, $http) {
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
                templateUrl:'product-detail.html',
                size:'md',
                controller: 'ModalInstanceCtrl',
                resolve: {
                    product: function() {
                        return $scope.product;
                    }
                }
            });

            modalInstance.result.then(function (selectedProduct, cartService) {

                $scope.selectedProduct = selectedProduct;
                // cartService.addProduct(selectedProduct);
                $scope.confirmation = !$scope.confirmation;

            });

        };

    })

    .controller('ModalInstanceCtrl', function($scope, $uibModalInstance, product) {
        'use strict';

        $scope.product = product;
        $scope.product.quantity = '1';
        $scope.close = function () {
            $uibModalInstance.dismiss('cancel');
        };

        $scope.submit = function() {
            $uibModalInstance.close($scope.product);
        }

    })

    .service('cartService', function(productKey) {
        var cart = angular.fromJson(localStorage.getItem(productKey)) || {items:[]};

        function saveData() {
            localStorage.setItem(productKey, angular.toJson($scope.cart));
        }

        var addProduct = function(product) {
            var qty = 0;
            cart.items.forEach(function (item) {
                qty += item.quantity;
            });
            cart.items.push({
                name: product.name,
                price: product.price,
                quantity: product.quantity,
                //grind: product.grind,
                extPrice: product.price * product.quantity
            });
            saveData();
        };

        var getCart = function() {
            return cart;
        };

        return {
            getCart: getCart,
            addProduct: addProduct
        };
    })


    .controller('CartCtrl', function($scope, cartService) {
        'use strict';

        $scope.cart = cartService.getCart();


        // Remove product from Cart
        $scope.removeProduct = function(index) {
            $scope.cart.items.splice(index, 1);
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

    })



    .controller('NavController', function($scope, $http, usersJSON) {
        'use strict';

        usersJSON.then(function(info) {
            $scope.users = info.data;
        });

        $scope.chosenUser = {};

        window.onscroll = changePos;

		function changePos() {
		    if (window.innerWidth > 768 && window.innerHeight > 803) {
		    	var nav = document.querySelector("nav");

		    	if (window.pageYOffset > 400) {
		        nav.style.position = "fixed";
		        nav.style.top = "0px";
		        nav.style.width = "100%";

		        nav.style.backgroundColor = "#F1F1F1";
		        nav.style.borderRadius = "5px";
		        nav.style.boxShadow = "0px 10px 10px #939393";
		    	} else {
			    	nav.style.position = "";
			        nav.style.top = "";

			        nav.style.backgroundColor = "transparent";
			        nav.style.borderRadius = "none";
			        nav.style.border = "0px";
			        nav.style.boxShadow = "";
      			}
    		}
    	}
	})

    .directive('existUser', function() {
        return {
            require: 'ngModel',
            link: function(scope, elem, attrs, controller) {
                controller.$validators.existUser = function(value) {
                    scope.users.forEach(function(user) {
                        scope.chosenUser = user;
                        return (value === user.email);
                    });
                    return false;
                }
            }
        }
    });

   /* .directive('validPassword', function() {
        return {
            require:'ngModel',
            link: function(scope, elem, attrs, controller) {
                controller.$validators.validPassword = function(value) {
                    return (value === scope.chosenUser.password);
                }
            }
        }
    });*/





