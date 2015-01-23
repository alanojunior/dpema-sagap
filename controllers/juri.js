'use strict';


app.controller("JuriCtrl",function($ionicLoading,$scope,Authenticate,$pull,APP,$http,$consulta,$state){
    $pull.set('juri',null);
    $pull.set('dadosBuscarJuri',null);

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
            $pull.set('dadosBuscarJuri',buscar);


            var result = $consulta.get('juri',tipo,valor,0);

            result.then(function(dados){
                $pull.set('juri',dados);
                $state.go('jurilista');
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

.controller("JuriListaController",function($pull,$scope,$consulta,$state,$ionicLoading){
    $scope.itens = $pull.get('juri');

    $scope.mais = function(){
        $ionicLoading.show();
        var result = $consulta.get('juri',$pull.get('dadosBuscarJuri').tipo,$pull.get('dadosBuscarJuri').valor,$scope.itens.length).then(
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
        $pull.set("itemJuri",item);
        $state.go('juriItem');
    }
})
.controller("JuriItemController",function($pull,$scope){

    $scope.item = $pull.get("itemJuri");
    console.log($scope.item)



})