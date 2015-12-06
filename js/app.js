$(function() {
  'use strict';

  window.onscroll = changePos;

  function changePos() {
    var header = document.getElementById("navbar");
    var nav = document.querySelector("nav");

    if (window.pageYOffset > 215) {
        header.style.position = "absolute";
        header.style.top = pageYOffset + "px";
        header.style.width = "100%";
        nav.style.backgroundColor = "#F1F1F1";
        nav.style.borderRadius = "5px"
    } else {
        header.style.position = "";
        header.style.top = "";
        nav.style.backgroundColor = "transparent";
        nav.style.borderRadius = "none";
        nav.style.border = "0px";
    }
  }
});
