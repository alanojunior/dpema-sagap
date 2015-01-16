'use trict';


app.controller("PeticaoCtrl",function($ionicLoading,$scope,Authenticate,$pull,APP,$http,$consulta,$state){
    $pull.set('peticao',null);
    $pull.set('dadosBuscarPeticao',null);

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
            $pull.set('dadosBuscarPeticao',buscar);


            var result = $consulta.get('peticao',tipo,valor,0);

            result.then(function(dados){
                console.log(dados);
                $pull.set('peticao',dados);
                $state.go('peticaolista');
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

.controller("PeticaoListaController",function($pull,$scope,$consulta,$state,$ionicLoading){
    $scope.itens = $pull.get('peticao');

    $scope.mais = function(){
        $ionicLoading.show();
        var result = $consulta.get('peticao',$pull.get('dadosBuscarPeticao').tipo,$pull.get('dadosBuscarPeticao').valor,$scope.itens.length).then(
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
        $pull.set("itemPeticao",item);
        $state.go('peticaoItem');
    }
})
.controller("PeticaoItemController",function($pull,$scope, APP){

    $scope.item = $pull.get("itemPeticao");
    $scope.servidor = APP.LOCAL;
    //console.log($scope.item)

   

})