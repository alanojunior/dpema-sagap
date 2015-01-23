'use strict';

app.controller("AtividadesCtrl",function($scope,$consulta,$ionicLoading,Authenticate){

	$ionicLoading.show();

	var user = Authenticate.getUser();

	var result = $consulta.get('eventos','listar',user.id,null);

	result.then(function(data){
		$scope.itens = data;
    	console.log($scope.itens);
		$ionicLoading.hide();
	},
	function(erro){
		alert(erro);
		$ionicLoading.hide();
	});

});