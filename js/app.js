angular.module('WebApp', [])
	.controller('NavController', function($scope, $http) {
		'use strict';
		window.onscroll = changePos;
		var bodySize = window.innerHeight;
		console.log(bodySize);

		function changePos() {
		    var header = document.getElementById("navbar");
		    if (window.innerWidth > 768) {
			var nav = document.querySelector("nav");
				if (window.pageYOffset > 400 && window.innerHeight > 803) {
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
	});

	/*
	.controller('SlideController', function($scope, $http) {
		function CarouselDemoCtrl($scope){
			$scope.myInterval = 3000;
			$scope.slides = [
				{
				  image: 'http://lorempixel.com/400/200/'
				},
				{
				  image: 'http://lorempixel.com/400/200/food'
				},
				{
				  image: 'http://lorempixel.com/400/200/sports'
				},
				{
				  image: 'http://lorempixel.com/400/200/people'
				}
			];
		}
	});*/