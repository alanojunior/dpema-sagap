'use trict';


app.controller("AcordoemediacaoCtrl",function($ionicLoading,$scope,Authenticate,$pull,APP,$http,$consulta,$state){
    $pull.set('acordoemediacao',null);
    $pull.set('dadosBuscarAcordoemediacao',null);

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
            $pull.set('dadosBuscarAcordoemediacao',buscar);


            var result = $consulta.get('acordoemediacao',tipo,valor,0);

            result.then(function(dados){
                $pull.set('acordoemediacao',dados);
                $state.go('acordoemediacaolista');
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

.controller("AcordoemediacaoListaController",function($pull,$scope,$consulta,$state,$ionicLoading){
    $scope.itens = $pull.get('acordoemediacao');

    $scope.mais = function(){
        $ionicLoading.show();
        var result = $consulta.get('acordoemediacao',$pull.get('dadosBuscarAcordoemediacao').tipo,$pull.get('dadosBuscarAcordoemediacao').valor,$scope.itens.length).then(
            function(dados){
                console.log($scope.itens.length);
                console.log($scope.item);
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
        $pull.set("itemAcordoemediacao",item);
        $state.go('acordoemediacaoItem');
    }
})
.controller("AcordoemediacaoItemController",function($pull,$scope, APP){

    $scope.item = $pull.get("itemAcordoemediacao");
    $scope.servidor = APP.LOCAL;
    console.log($scope.item);



})