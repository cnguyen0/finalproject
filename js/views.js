/*
 script file for the index.html page
 */

angular.module('ViewsApp', ['ui.router', 'angular-uuid', 'LocalStorageModule'])
    .constant('storageKey', 'contacts-list') //name and a value you want available to other controllers/factories created
    .factory('contacts', function(uuid, localStorageService, storageKey) {//fancy way of fetching data and making them available to multiple controllers
        return localStorageService.get(storageKey) || [];
    })
    .config(function($stateProvider, $urlRouterProvider) { //make sure spelling is exact //declares our various ui-routes and partials, when to show them, etc
        $stateProvider
            .state('minaShop', {
                url: '/minashops', //url will appear in html address
                templateUrl: 'views/shopview.html', //where is the partial html file that defines this view?
                controller: 'MinaShopsController' //which controller do I want to use?
            })
            .state('minaCart', {
                url: '/minacarts',
                templateUrl: 'views/cartview.html',
                controller: 'MinaCartsController'

            });

        $urlRouterProvider.otherwise('/minashops'); //just reset that the address ends in this
    })

    .controller('MinaShopsController', function($scope, contacts) {
    })
    .controller('MinaCartsController', function($scope, $stateParams, $state,
                                                  uuid, localStorageService, storageKey, contacts) {
    });
