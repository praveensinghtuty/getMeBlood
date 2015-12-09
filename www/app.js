var app = angular.module("homeApp", ['ngRoute']);

app.config(function($routeProvider){
	$routeProvider.when('/home',{
		templateUrl: "pages/home.html"
	})
	.when('/search',{
		templateUrl: "pages/search.html"
	})
	.when('/register',{
		templateUrl: "pages/register.html"
	})
	.otherwise({
		redirectTo: '/home'
	})
});