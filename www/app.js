var app = angular.module("homeApp", ['ngRoute','firebase']);

app.service('productService', function() {
  var searchList = [];

  var addSearch = function(newObj) {
      searchList.push(newObj);
  };

  var getSearch = function(){
      return searchList;
  };

  return {
    addSearch: addSearch,
    getSearch: getSearch
  };

});

// app.factory("getData", ['$firebase', function($firebase){
// 	var data = new Firebase("https://brilliant-inferno-7097.firebaseio.com/");
// 	return $firebase(data).$asArray();
// }]);

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
});

app.controller("searchController", function($scope,$window,productService){
	$scope.search = function(){
		var currObj = {"blood":$scope.bloodtype, "locations":$scope.locations};
        productService.addSearch(currObj);
    	$window.location.href = "#/searchresult";
	}
});

app.controller("searchresultController", function($scope,$window,productService){
	// $scope.datas = getData;
	$scope.result = productService.getSearch();
});

app.config(function($routeProvider){
	$routeProvider.when('/home',{
		templateUrl: "pages/home.html"
	})
	.when('/search',{
		templateUrl: "pages/search.html",
		controller: 'searchController'
	})
	.when('/searchresult',{
		templateUrl: "pages/searchresult.html",
		controller: 'searchresultController'
	})
	.when('/register',{
		templateUrl: "pages/register.html"
	})
	.otherwise({
		redirectTo: '/home'
	})
});