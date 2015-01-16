'use strict';


app.service('$consulta',function($q,$http,APP){


    return {
        get:function(controller,tipo,valor,limit){
            var d = $q.defer();
            var get = APP.CONSULTA+controller+'/'+tipo+'/'+valor+'/'+limit;
            $http.get(get)
            .success(function(data){
                if(data)
                d.resolve(data)
                else
                d.reject("Nenhuma uma Ocorrencia encontrada!");
            })
            .error(function(erro){
                d.reject(erro);
            })
            return d.promise;
        }
    }
});