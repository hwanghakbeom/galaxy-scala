angular.module('projecttime', 
  ['ngRoute', 
  'myApp.controllers'
]).config(function($routeProvider) {
  $routeProvider
    .when('/', {
      controller:'ProjectListCtrl',
      templateUrl:'partials/list.html'
    })
    .otherwise({
      redirectTo:'/'
    });
});

 

angular.module('usertime', 
  ['ngRoute', 
'myApp.controllers'
]).config(function($routeProvider) {
  $routeProvider
    .when('/', {
      controller:'UserListCtrl',
      templateUrl:'partials/list.html'
    })
    .otherwise({
      redirectTo:'/'
    });
});