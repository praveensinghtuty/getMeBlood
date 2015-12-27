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

app.controller("bloodController", function($scope,$firebaseArray){
	var ref = new Firebase("https://brilliant-inferno-7097.firebaseio.com/");
	var getData = $firebaseArray(ref);
	$scope.bloodmembers = [
			{ name:'A+', members:0 }, 
			{ name:'B+', members:0 }, 
			{ name:'O+', members:0 }, 
			{ name:'A-', members:0 }, 
			{ name:'B-', members:0 }, 
			{ name:'O-', members:0 }, 
			{ name:'AB+', members:0 }, 
			{ name:'AB-', members:0 }
		];

	getData.$loaded()
    	.then(function(){
    	    angular.forEach(getData, function(getData) {
    	    	for(var i=0;i<5;i++){
    	    		if($scope.bloodmembers[i].name == getData.blood){
    	    			var no = $scope.bloodmembers[i].members;
    	    			$scope.bloodmembers[i].members = no+1;
    	    		}
    	    			// console.log(getData.blood)
    	    	}
    	        // var x = Number([$scope.bloodtype.indexOf()]);
    	        // $scope.bloodmembers[$scope.bloodtype.indexOf(getData.blood)] = x+1; 


    	    console.log($scope.bloodmembers);
    	    })
    	        
    	    
    	});
	
});

app.controller("databaseController", function($scope){
	$scope.bloodtype = ['Choose you blood group', 'A+', 'B+', 'AB+', 'O+', 'A-', 'B-', 'O-', 'AB-'];
	var myFirebaseRef = new Firebase("https://brilliant-inferno-7097.firebaseio.com/");
	var obj = $scope.name;
	$scope.register = function(){
		myFirebaseRef.child($scope.phone).set({
			name:$scope.name,
			blood:$scope.blood,
			phone:$scope.phone,
			location:$scope.location
		});
		alert("Thank you")
		$window.location.href = "#/home";
	}
});

app.controller("searchController", function($scope,$window,productService){
	$scope.bloodtype = ['Choose you blood group', 'A+', 'B+', 'AB+', 'O+', 'A-', 'B-', 'O-'];
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