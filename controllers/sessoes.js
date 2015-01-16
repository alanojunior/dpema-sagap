'use trict';


app.controller("SessoesCtrl",function($ionicLoading,$scope,Authenticate,$pull,APP,$http,$consulta,$state){
      $ionicLoading.show();

     $scope.msg = '';
       $scope.style1 = 'button-stable';
   $scope.style2 = 'button-light';
   $scope.ordinario = true;
    var d = new Date();
   var result = $consulta.get('sessoes','listar',d.getFullYear(),null);
   result.then(function(data){
     $scope.itens = data;
     $ionicLoading.hide();
   },function(erro){
        $ionicLoading.hide();

        alert(erro);

   })

 

   $scope.buscar = function(val){
        $ionicLoading.show();
         result = $consulta.get('sessoes','listar',val,null);

         result.then(function(data){
          console.log(data)
            if(data == 'null'){
                $scope.msg = "Nao foi encontrado nenhuma ocorrencia no ano "+val;
            }else{
               $scope.msg = '';
                 $scope.itens = data;
            }
        $ionicLoading.hide();

         },function(erro){
            alert(erro);
        $ionicLoading.hide();

         })
        

   }


   $scope.ver = function(item){
      $pull.set('idSessao',item)
      $state.go('sessaoItem');
   }
  
})
.controller('SessaoItemCtrl',function($pull,$scope,$consulta,APP,$ionicLoading){
    $ionicLoading.show();

    $scope.pdf = APP.LOCAL+'SAGAP/conselho/documentos/sessao/';
    $scope.item = $pull.get('idSessao');    
    result = $consulta.get('sessoes',null,$pull.get('idSessao').intatvconselhoid,null);

    result.then(function(data){
      console.log(data)
      $scope.conselhorepeat = data.conselho.length == 0 ? true : false;
      $scope.conselho = data.conselho;

      $scope.pautarepeat = data.pauta.length == 0 ? true : false;
      $scope.pauta = data.pauta;

      $scope.frequenciarepeat = data.frequencia.length == 0 ? true : false;
      $scope.frequencia = data.frequencia;

      $scope.pareceresrepeat = data.pareceres.length == 0 ? true : false;
      $scope.pareceres = data.pareceres;

      $scope.atasrepeat = data.atas.length == 0 ? true : false;
      $scope.atas = data.atas;

      $scope.processosrepeat = data.processos.length == 0 ? true : false;
      $scope.processos = data.processos;

      $scope.requerimentosrepeat = data.requerimentos.length == 0 ? true : false;
      $scope.requerimentos = data.requerimentos;

      $scope.oficiosrepeat = data.oficios.length == 0 ? true : false;
      $scope.oficios = data.oficios;

      $scope.docdiversosrepeat = data.docdiversos.length == 0 ? true : false;
      $scope.docdiversos = data.docdiversos;
        $ionicLoading.hide();

    },function(erro){
      alert(erro)
      $ionicLoading.hide();


    })
})