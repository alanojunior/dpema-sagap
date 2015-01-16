'use strict';

 app.controller('AgendaCtrl',function($consulta,Authenticate,$scope,$ionicLoading,$pull){
 	var user = Authenticate.getUser().id;
 	$scope.itens = {};
 	

 	$scope.buscar = function(valor){
 		var v = user+'T'+valor.dtainicio+'T'+valor.dtafim;
 		$pull.set('agendadados',v);
 		var result = $consulta.get('agenda',1,v,0);
 		$ionicLoading.show();
	 	result.then(function(data){
	 		
	 		if(data != ""){
	 			$scope.itens.ordinario = data
	 			$scope.buttons = true;
	 			$scope.ordinario = true;
	 			$scope.style1 = 'button-stable';


	 		}
	 	})

	 	var result = $consulta.get('agenda',2,v,0);

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
 		var result = $consulta.get('agenda',i,$pull.get('agendadados'),total);
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