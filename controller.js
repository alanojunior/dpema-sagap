'use strict';

app.controller('Controller',function($scope,Authenticate,$ionicLoading,$ionicSideMenuDelegate,$http,APP,$consulta,$pull){

		
	 if(!Authenticate.getUser()){
  		$scope.tmpl = Authenticate.tmpl('login');
	  }else{

	  	$scope.tmpl = Authenticate.tmpl('layout');

	  }	



	  $scope.button = false;
	$scope.$on('Troca',function(){
		if($scope.button){
			$scope.button = false;
		}else{
			$scope.button = true;
		}
		
	})  
	$scope.esqueci = function(){
		$scope.tmpl = Authenticate.tmpl('esqueci');
	}

	$scope.enviaresqueci = function(cpf){
		$ionicLoading.show();
		$http.get(APP.SERVIDOR+'esqueci/index/'+cpf)

		.success(function(data){
			if(data == "true"){
				$scope.msg = "Verifique a nova senha no email cadastrado!";
			
		}else{
			$scope.msg = "CPF nao cadastrado!";
		}
		$scope.tmpl = Authenticate.tmpl('login');
		$ionicLoading.hide();

			
		})
		.error(function(error){
			alert("Houve um Erro");
		$ionicLoading.hide();
			
		})
	}

	$scope.login = function(user,pass){
		$scope.msg = "";
		$ionicLoading.show()
		if(Authenticate.valida(user) && Authenticate.valida(pass)){
			Authenticate.login(APP.SERVIDOR+'login/index/'+user+'/'+pass).then(function(data){
				$scope.tmpl = Authenticate.tmpl('layout');
			},function(error){
				$scope.msg = error;
			})

		}else{
			$scope.msg = "Preencha os campos Por Favor!";
		}		

	}

	$scope.logout = function(){
		Authenticate.logout();
		$scope.tmpl = Authenticate.tmpl('login')
	}

	$scope.toggleLeft = function() {
		$ionicSideMenuDelegate.toggleLeft();
	};

	$scope.toggleRight = function() {
		$ionicSideMenuDelegate.toggleRight();
	};

});