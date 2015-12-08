angular.module('WebApp', [])
	.controller('NavController', function($scope, $http) {
		'use strict';
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
		    } else {
		    	nav.style.position = "";
		        nav.style.top = "";

		        nav.style.backgroundColor = "transparent";
		        nav.style.borderRadius = "none";
		        nav.style.border = "0px";
      }
    }
		}
	});