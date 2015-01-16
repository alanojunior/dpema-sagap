'use strict';


app.service("$pull",function(){
	var _data = [];

	return {
		get:function(name){
			return _data[name];
		},
		set:function(name,valor){
			_data[name] = valor;
		},
		all:function(){
			return _data;
		}
	}

})