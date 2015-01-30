'use strict';

app.controller('MainController',function($scope,Authenticate,$pull){

	$scope.item = Authenticate.getUser();
	
	

})