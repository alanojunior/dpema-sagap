'use trict';


app.controller("TutelaCtrl",function($cordovaCamera,$ionicLoading,$scope,Authenticate,$pull,APP,$http,$consulta,$state){
    $pull.set('tutela',null);
    $pull.set('dadosBuscarTutela',null);

    $scope.takePicture = function() {
    var options = {
        quality : 20,
        destinationType : Camera.DestinationType.DATA_URL,
        sourceType : Camera.PictureSourceType.PHOTOLIBRARY,
        allowEdit : true,
        encodingType: Camera.EncodingType.JPEG,
        targetWidth: 10,
        targetHeight: 10,
        popoverOptions: CameraPopoverOptions,
        saveToPhotoAlbum: false
    };

    $cordovaCamera.getPicture(options).then(function(imageData) {

      $ionicLoading.show();

      $http.get(APP.SERVIDOR+'foto/index/'+imageData).
      success(function(data){
        $scope.IMGSrc = "data:image/jpeg;base64," +data;
        $ionicLoading.hide();

     
        
    })
    .error(function(err) {
     alert(err)
        $ionicLoading.hide();

    });

        
    }, function(err) {
      // An error occured. Show a message to the user
    });
  }

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
            $pull.set('dadosBuscarTutela',buscar);


            var result = $consulta.get('tutela',tipo,valor,0);

            result.then(function(dados){
                $pull.set('tutela',dados);
                $state.go('tutelalista');
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

.controller("TutelaListaController",function($pull,$scope,$consulta,$state,$ionicLoading){
    $scope.itens = $pull.get('tutela');

    $scope.mais = function(){
        $ionicLoading.show();
        var result = $consulta.get('tutela',$pull.get('dadosBuscarTutela').tipo,$pull.get('dadosBuscarTutela').valor,$scope.itens.length).then(
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
        $pull.set("itemTutela",item);
        $state.go('tutelaItem');
    }
})
.controller("TutelaItemController",function($pull,$scope){

    $scope.item = $pull.get("itemTutela");
    console.log($scope.item)



})