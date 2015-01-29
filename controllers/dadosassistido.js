'use strict';


app.controller("DadosassistidoCtrl",function($ionicLoading,$scope,Authenticate,$pull,APP,$http,$consulta,$state){
    $pull.set('historico',null);
    $pull.set('dadosBuscarHistorico',null);

    $scope.buscar = function(tipo,v){
        $ionicLoading.show();
        var valor;
        if(v != undefined){



            switch(tipo){
                case 'cpf':
                    valor = v.cpf;
                break;
                case 'nome':
                    valor = v.nome;
                break;

            }

            var buscar = {};
             buscar.tipo = tipo;
             buscar.valor = valor;
            $pull.set('dadosBuscarHistorico',buscar);


            var result = $consulta.get('historico',tipo,valor,0);

            result.then(function(dados){
                    console.log(dados)

                $pull.set('historico',dados);
                $state.go('dadosassistidolista');
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

.controller("DadosassistidoListaController",function($pull,$scope,$consulta,$state,$ionicLoading){
    $scope.itens = $pull.get('historico');

    $scope.mais = function(){
        $ionicLoading.show();
        var result = $consulta.get('historico',$pull.get('dadosBuscarHistorico').tipo,$pull.get('dadosBuscarHistorico').valor,$scope.itens.length).then(
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
        $pull.set("itemDadosassistido",item);
        $state.go('dadosassistidoItem');
    }
})
.controller("DadosassistidoItemController",function($pull,$scope,$consulta,$state,$ionicLoading){

    $scope.item = $pull.get("itemDadosassistido");
    console.log($scope.item)

})