'use strict';

app.controller('DefensoresCtrl',function($consulta,$scope,Authenticate,$ionicLoading){



		var user = Authenticate.getUser();
		console.log(user.id);
		$consulta.get('funcionariodefensor','buscar',user.id,0)
		.then(function(data){
			$scope.itens = data;
			console.log($scope.itens);
		},function(erro){
			alert(erro);
		});




})