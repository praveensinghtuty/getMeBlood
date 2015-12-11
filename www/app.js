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
	$scope.bloodtype = ['A+', 'B+', 'AB+', 'O+', 'A-', 'B-', 'O-'];
	var myFirebaseRef = new Firebase("https://brilliant-inferno-7097.firebaseio.com/");
	var obj = $scope.name;
	$scope.register = function(){
		myFirebaseRef.child($scope.phone).set({
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

app.controller("searchresultController", function($scope,$firebaseArray,$firebaseArray,productService){
	
	var searchResult = productService.getSearch();
	// alert(searchResult[0].locations);
	var ref = new Firebase("https://brilliant-inferno-7097.firebaseio.com/");
	var getData = $firebaseArray(ref);
	// ref.child(searchResult[0].locations).once('value', function(snap) {
	// 	$scope.searchresults = $firebaseArray(snap.val());
	// });
	$scope.searchresults = [];
	getData.$loaded()
    	.then(function(){
    	    angular.forEach(getData, function(getData) {
    	        console.log(getData);
    	        if(getData.location == searchResult[0].locations && getData.blood == searchResult[0].blood)
    	        	$scope.searchresults.push(getData)
    	    })
    	});
	// alert(JSON.stringify(getData));


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
		templateUrl: "pages/register.html",
		controller: 'databaseController'
	})
	.otherwise({
		redirectTo: '/home'
	})
});