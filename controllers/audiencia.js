'use strict';


app.controller("AudienciaCtrl",function($ionicLoading,$scope,Authenticate,$pull,APP,$http,$consulta,$state){
    $pull.set('audiencia',null);
    $pull.set('dadosBuscarAudiencia',null);

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
            $pull.set('dadosBuscarAudiencia',buscar);


            var result = $consulta.get('audiencia',tipo,valor,0);

            result.then(function(dados){
                $pull.set('audiencia',dados);
                $state.go('audiencialista');
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

.controller("AudienciaListaController",function($pull,$scope,$consulta,$state,$ionicLoading){
    $scope.itens = $pull.get('audiencia');

    $scope.mais = function(){
        $ionicLoading.show();
        var result = $consulta.get('audiencia',$pull.get('dadosBuscarAudiencia').tipo,$pull.get('dadosBuscarAudiencia').valor,$scope.itens.length).then(
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
        $pull.set("itemAudiencia",item);
        $state.go('audienciaItem');
    }
})
.controller("AudienciaItemController",function($pull,$scope){

    $scope.item = $pull.get("itemAudiencia");
    console.log($scope.item);



})