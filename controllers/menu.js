'use strict';

app.controller('MenuCtrl',function($consulta,$scope,Authenticate,$ionicLoading){



		var user = Authenticate.getUser();
		console.log(user.idFunc);
		$consulta.get('menu','buscar',user.idFunc,0)
		.then(function(data){
			$scope.menus = data;
			console.log($scope.menus);
		},function(erro){
			alert(erro);
		});




})