var app = angular.module("homeApp", ['ngRoute']);

app.controller("databaseController", function($scope){
	var myFirebaseRef = new Firebase("https://brilliant-inferno-7097.firebaseio.com/");
	$scope.register = function(){
		myFirebaseRef.push({
			name:$scope.name,
			blood:$scope.blood,
			phone:$scope.phone,
			location:$scope.location
		});
		$scope.registerForm = {};
	}
})

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