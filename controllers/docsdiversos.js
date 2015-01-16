'use trict';


app.controller("DocsdiversosCtrl",function($ionicLoading,$scope,Authenticate,$pull,APP,$http,$consulta,$state){
    $pull.set('docsdiversos',null);
    $pull.set('dadosBuscarDocsdiversos',null);

    $scope.buscar = function(tipo,v){
        $ionicLoading.show();
        var valor;
        if(v != undefined){

            switch(tipo){
                case 'numero':
                    valor = v.numero;
                break;
                case 'data':
                    valor = v.datainicio+'T'+v.datafim;
                break;
                case 'nome':
                    valor = v.assistido;
                break;

            }

            var buscar = {};
             buscar.tipo = tipo;
             buscar.valor = valor;
            $pull.set('dadosBuscarDocsdiversos',buscar);


            var result = $consulta.get('docsdiversos',tipo,valor,0);

            result.then(function(dados){
                $pull.set('docsdiversos',dados);
                $state.go('docsdiversoslista');
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

.controller("DocsdiversosListaController",function($pull,$scope,$consulta,$state,$ionicLoading){
    $scope.itens = $pull.get('docsdiversos');

    $scope.mais = function(){
        $ionicLoading.show();
        var result = $consulta.get('docsdiversos',$pull.get('dadosBuscarDocsdiversos').tipo,$pull.get('dadosBuscarDocsdiversos').valor,$scope.itens.length).then(
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
        $pull.set("itemDocsdiversos",item);
        $state.go('docsdiversosItem');
    }
})
.controller("DocsdiversosItemController",function($pull,$scope, APP){

    $scope.item = $pull.get("itemDocsdiversos");
    $scope.servidor = APP.LOCAL;
    //console.log($scope.item)



})