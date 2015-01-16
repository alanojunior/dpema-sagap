'use strict';

app.controller("ConfigController",function($scope,$consulta,$pull,$http,Authenticate,APP, $state, $window, $ionicLoading, $location){
	var user = Authenticate.getUser();
	$scope.editar = false;
	$consulta.get('funcionario','listar',user.id,null)
	.then(function(data){
		$scope.item = data;
		//console.log(data)
	},function(erro){
		alert(erro)
	})

var user = Authenticate.getUser().id;
$scope.valor = {};

	$scope.salvar = function(valor) {

		$http.get(APP.SERVIDOR+'consultaMobile/index/funcionario/editar/'+user+'T'+valor.celular+'T'+valor.endereco+'T'+valor.cep+'T'+valor.complemento).
		then(
            function(data){
                console.log($scope.valor.length);
                $scope.item.celular = valor.celular;
                $scope.item.endereco = valor.endereco;
                $scope.item.cep = valor.cep;
                $scope.item.complemento = valor.complemento;
            },
            function(error){
                alert(error);
            }
            )
	};
	

});
