'use trict';


app.controller("FlagranteCtrl",function($ionicLoading,$scope,Authenticate,$pull,APP,$http,$consulta,$state){
    $pull.set('flagrante',null);
    $pull.set('dadosBuscarFlagrante',null);

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
            $pull.set('dadosBuscarFlagrante',buscar);


            var result = $consulta.get('flagrante',tipo,valor,0);

            result.then(function(dados){
                $pull.set('flagrante',dados);
                $state.go('flagrantelista');
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

.controller("FlagranteListaController",function($pull,$scope,$consulta,$state,$ionicLoading){
    $scope.itens = $pull.get('flagrante');

    $scope.mais = function(){
        $ionicLoading.show();
        var result = $consulta.get('flagrante',$pull.get('dadosBuscarFlagrante').tipo,$pull.get('dadosBuscarFlagrante').valor,$scope.itens.length).then(
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
        console.log(item)
        $pull.set("itemFlagrante",item);
        $state.go('flagranteItem');
    }
})
.controller("FlagranteItemController",function($pull,$scope, $consulta, $state,$ionicLoading){

    $scope.item = $pull.get("itemFlagrante");
    console.log($scope.item)
           

        var result = $consulta.get('flagranteprovidencia','numero', $scope.item.intflagranteid, 0).then(
            function(dados){
                            
                $scope.item_flagrante = dados;
                 console.log(dados);
                
            },
            function(error){
                 alert(error);
                $ionicLoading.hide()
            }
            )

    console.log($scope.item)



})