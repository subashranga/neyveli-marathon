var app = angular.module('myApp', ['ui.router']); //ngRoute dependency injection

app.config(function ($stateProvider, $locationProvider, 
    $urlRouterProvider) {
        $locationProvider.hashPrefix(''); // by default '!'
        $locationProvider.html5Mode(true);
        $stateProvider.

        //The below will be loaded when url is at home page
        state('home', {
            url: '/',
            templateUrl: 'pages/home.html',
            controller: 'HomeController'
        })
        .state('page', {
            url: '/:selectedpage',
            template: '<div ng-include="getPageUrl()"></div>',
            controller: "selectedPageCtrl"
        });

        //If clicked on any other link from navigation which has not been handled here, will be directed to home page
        $urlRouterProvider.otherwise("/");
});

// app.run(['$rootScope', '$state', function($rootScope, $state, userService) {
//     $rootScope.$on("$locationChangeStart", function(event, next, current) {
//        if(next == current) {
//              event.preventDefault();
//              $state.transitionTo('/');
//          }
//     });
// }]);

app.controller('HomeController', function ($scope) {
    $scope.message = 'Hello from HomeController';
});


app.controller('selectedPageCtrl', function ($scope, $stateParams) {
    var selected = $stateParams.selectedpage,
        selectedPage = 'home.html';

    $scope.message = 'Hello from HomeController';

    angular.forEach(pages, function(item) {
        if (item.url == selected) {
            selectedPage = item.url;
        }
      });

    console.log('page: ' + $scope.selectedPage);
    $scope.getPageUrl = function () {
        return 'pages/' + selectedPage;
    }
});

app.controller('NavigationCtrl', ['$scope', '$location', function ($scope, $location) {
    $scope.pageConfig = pages;
}]);