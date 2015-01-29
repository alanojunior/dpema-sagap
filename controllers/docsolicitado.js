'use trict';


app.controller("DocsolicitadoCtrl",function($ionicLoading,$scope,Authenticate,$pull,APP,$http,$consulta,$state){
    //$pull.set('peticao',null);
    //$pull.set('dadosBuscarPeticao',null);

    $scope.buscar = function(tipo,v){
        $ionicLoading.show();
        var valor;
        if(v != undefined){



            switch(tipo){
                case 'numero':
                    valor = v.numero;
                break;
                case 'nome':
                    valor = v.assistido;
                break;

            }

            var buscar = {};
             buscar.tipo = tipo;
             buscar.valor = valor;
            $pull.set('dadosBuscarDocsoliciatado',buscar);


            var result = $consulta.get('docsolicitado',tipo,valor,0);

            result.then(function(dados){
                console.log(dados);
                $pull.set('docsolicitado',dados);
                $state.go('docsolicitadolista');
                $ionicLoading.hide();

            },
            function(error){
                $scope.msg = error;
                $ionicLoading.hide();
                
            }
            )
            
        }
        
    }
  
})

.controller("DocsolicitadoListaController",function($pull,$scope,$consulta,$state,$ionicLoading){
    $scope.itens = $pull.get('docsolicitado');

    $scope.mais = function(){
        $ionicLoading.show();
        var result = $consulta.get('docsolicitado',$pull.get('dadosBuscarDocsolicitado').tipo,$pull.get('dadosBuscarDocsolicitado').valor,$scope.itens.length).then(
            function(dados){
                console.log($scope.itens.length);
                $scope.itens = $scope.itens.concat(dados);
                $ionicLoading.hide()
            },
            function(error){
                 alert(error);
                $ionicLoading.hide()

            }
            )
    }

    $scope.ver = function(item){
        var valor;

        valor = item.intatendidoid;
        //alert(valor);
        var result = $consulta.get('docsolicitado2',null,valor,0);

            result.then(function(dados){
                console.log(dados);
                $pull.set('docsolicitado2',dados);
                //alert(itens);
                $state.go('docsolicitadoItem');

                $ionicLoading.hide();

            },
            function(error){
                $scope.msg = error;
                $ionicLoading.hide();
                
            }
            )
        //$pull.set("itemDocsolicitado",item);
        //$state.go('docsolicitadoItem');
    }
})
.controller("DocsolicitadoItemController",function($pull,$scope, APP){

    $scope.itens = $pull.get("docsolicitado2");
    $scope.servidor = APP.LOCAL;
    console.log($scope.itens)

   

})