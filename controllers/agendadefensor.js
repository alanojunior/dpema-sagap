'use strict';

 app.controller('AgendadefensorCtrl',function($consulta,Authenticate,$scope,$ionicLoading, $pull, APP, $http, $state){


 	var user = Authenticate.getUser().id;
 	$scope.itens = {};
 	$scope.valor = {};
    //consulta 
	/*	$http.get(APP.SERVIDOR+'consultaMobile/index/funcionariodefensor/listar/null').
		then(
            function(data){
                console.log($scope.valor.length);
                $scope.valor = data;
                console.log(data);
            },
            function(error){
                alert(error);
            }
            ) */
///////////////////////////



    //$scope.valor = $pull.get('agendadefensor');

/*
        var result = $consulta.get('funcionariodefensor','listar','null','30').then(
            function(dados){
                console.log(dados);
                $scope.itens = dados;
                $ionicLoading.hide()
            },
            function(error){
                 alert(error);
                $ionicLoading.hide()

            }
            )
*/
   
 	$scope.buscar = function(valor){
 		var v = valor.func+'T'+valor.dtainicio+'T'+valor.dtafim;
 		$pull.set('agendadados',v);
 		var result = $consulta.get('agendadefensor',1,v,0);
 		$ionicLoading.show();
	 	result.then(function(data){
	 		
	 		if(data != ""){
	 			$scope.itens.ordinario = data
	 			$scope.buttons = true;
	 			$scope.ordinario = true;
	 			$scope.style1 = 'button-stable';


	 		}
	 	})

	 	var result = $consulta.get('agendadefensor',2,v,0);

	 	result.then(function(data){
	 		$scope.itens.extraordinario = data
 			$ionicLoading.hide();

	 	})
 	}

 	$scope.mais = function(i){

 		if(i == 1)
 			var total = $scope.itens.ordinario.length;
 		else
 			var total = $scope.itens.extraordinario.length;
 		var result = $consulta.get('agendadefensor',i,$pull.get('agendadados'),total);
 		$ionicLoading.show();
	 	result.then(function(data){
	 		
	 		if(data != ""){
	 			if(i == 1)
	 			$scope.itens.ordinario = $scope.itens.ordinario.concat(data);
	 		else
	 			$scope.itens.extra = $scope.itens.extraordinario.concat(data);

	 		}
	 		$ionicLoading.hide();
	 	})
 	}

 	
 });