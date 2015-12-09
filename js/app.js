angular.module('WebApp', [])

    .factory('usersJSON', function($http) {
        return $http.get('data/userInformation.json');
    })
    .controller('NavController', function($scope, $http, usersJSON) {
		'use strict';
        usersJSON.then(function(info) {
            $scope.users = info.data;
        });


        window.onscroll = changePos;

		function changePos() {
		    var header = document.getElementById("navbar");
		    if (window.innerWidth > 768) {
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
                    $scope.users.forEach(function(user) {
                        return (value === user.email);
                    });
                    return false;
                }
            }
        }
    });