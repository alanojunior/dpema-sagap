'use strict';


app.controller("HistoricoCtrl",function($ionicLoading,$scope,Authenticate,$pull,APP,$http,$consulta,$state){
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
                $state.go('historicolista');
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

.controller("HistoricoListaController",function($pull,$scope,$consulta,$state,$ionicLoading){
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
        $pull.set("itemHistorico",item);
        $state.go('historicoItem');
    }
})
.controller("HistoricoItemController",function($pull,$scope,$consulta,$state,$ionicLoading){

    $scope.item = $pull.get("itemHistorico");
    console.log($scope.item)

    //consulta de historico atendimentos
    var result = $consulta.get('historicoatendimentos','numero', $scope.item.intatendidoid, 0).then(
            function(dados){
                            
                $scope.item_atendimentos = dados;
                 console.log(dados);
                
            },
            function(error){
                 alert(error);
                $ionicLoading.hide()
            }
            )
    //consulta de historico peticao
    var result = $consulta.get('historicopeticoes','numero', $scope.item.intatendidoid, 0).then(
            function(dados){
                            
                $scope.item_historicopeticoes = dados;
                 console.log(dados);
                
            },
            function(error){
                 alert(error);
                $ionicLoading.hide()
            }
            )
    //consulta de historico audiencia
    var result = $consulta.get('historicoaudiencias','numero', $scope.item.intatendidoid, 0).then(
            function(dados){
                            
                $scope.item_historicoaudiencias = dados;
                 console.log(dados);
                
            },
            function(error){
                 alert(error);
                $ionicLoading.hide()
            }
            )

    //consulta de historico docs
    var result = $consulta.get('historicodocs','numero', $scope.item.intatendidoid, 0).then(
            function(dados){
                            
                $scope.item_historicodocs = dados;
                 console.log(dados);
                
            },
            function(error){
                 alert(error);
                $ionicLoading.hide()
            }
            )

    //consulta de historico flagrantes
    var result = $consulta.get('historicoflagrantes','numero', $scope.item.intatendidoid, 0).then(
            function(dados){
                            
                $scope.item_historicoflagrantes = dados;
                 console.log(dados);
                
            },
            function(error){
                 alert(error);
                $ionicLoading.hide()
            }
            )

    //consulta de historico acordo mediação
    var result = $consulta.get('historicoacordomediacao','numero', $scope.item.intatendidoid, 0).then(
            function(dados){
                            
                $scope.item_historicoacordomediacao = dados;
                 console.log(dados);
                
            },
            function(error){
                 alert(error);
                $ionicLoading.hide()
            }
            )
})