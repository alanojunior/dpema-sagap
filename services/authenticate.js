'use strict';


app.service('Authenticate',function($http,$q,APP,$ionicLoading,$pull){
	//{{ PRIVATE
		$pull.set("authenticatedUser",null);
		
		var _requestUser = function(get){
			var d = $q.defer();
			$http.get(get)
			//$http.get("users.json")
			.success(function(user){

				if(user != "false"){
					$pull.set("authenticatedUser",user);
					d.resolve(user);
				}
				else{
					d.reject('Usuário e/ou Senha inválida!');
				} 
					$ionicLoading.hide();
			})
			.error(function(erro,header){
				d.reject('Error Inesperado! N: '+header );
					$ionicLoading.hide();

			})

			return d.promise;
		}

		//}}


	//{{ PUBLIC

		return {

			getUser:function(){

				return $pull.get("authenticatedUser");

			},

			valida : function(val){
				return (val != undefined  && val.replace(' ','') != "");
			},

			login: function(local){

				return _requestUser(local);

			},
			logout:function(){

				$pull.set("authenticatedUser",null);

			},
			tmpl: function(val){
				return APP.VIEWS+'/'+val+'/index.html';
			}

		};


		//}}
})