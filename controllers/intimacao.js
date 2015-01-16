'use strict';


app.controller("IntimacaoCtrl",function($ionicLoading,$scope,Authenticate,$pull,APP,$http,$consulta,$state){
    $pull.set('intimacao',null);
    $pull.set('dadosBuscarIntimacao',null);

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
            $pull.set('dadosBuscarIntimacao',buscar);


            var result = $consulta.get('intimacao',tipo,valor,0);

            result.then(function(dados){
                $pull.set('intimacao',dados);
                $state.go('intimacaolista');
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

.controller("IntimacaoListaController",function($pull,$scope,$consulta,$state,$ionicLoading){
    $scope.itens = $pull.get('intimacao');

    $scope.mais = function(){
        $ionicLoading.show();
        var result = $consulta.get('intimacao',$pull.get('dadosBuscarIntimacao').tipo,$pull.get('dadosBuscarIntimacao').valor,$scope.itens.length).then(
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
        $pull.set("itemIntimacao",item);
        $state.go('intimacaoItem');
    }
})
.controller("IntimacaoItemController",function($pull,$scope){

    $scope.item = $pull.get("itemIntimacao");
    console.log($scope.item)



})