$(function() {
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

  $(document).ready(function() {
    $(".animsition").animsition({
      inClass: 'fade-in',
      outClass: 'fade-out',
      inDuration: 800,
      outDuration: 800,
      linkElement: '.animsition-link',
      // e.g. linkElement: 'a:not([target="_blank"]):not([href^=#])'
      loading: true,
      loadingParentElement: 'body', //animsition wrapper element
      loadingClass: 'animsition-loading',
      loadingInner: '', // e.g '<img src="loading.svg" />'
      timeout: false,
      timeoutCountdown: 5000,
      onLoadEvent: true,
      browser: [ 'animation-duration', '-webkit-animation-duration'],
      // "browser" option allows you to disable the "animsition" in case the css property in the array is not supported by your browser.
      // The default setting is to disable the "animsition" in a browser that does not support "animation-duration".
      overlay : false,
      overlayClass : 'animsition-overlay-slide',
      overlayParentElement : 'body',
      transition: function(url){ window.location.href = url; }
    });
  });
});
