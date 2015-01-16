'use strict';

// 200.141.131.10 IP EXTERNO

// 10.98.1.2 IP INTERNO

app.constant('APP',{
	VIEWS: 'app/views',
	LOCAL:'http://10.98.1.2/',
	SERVIDOR: 'http://10.98.1.2/SAGAP_MOBILE/index.php/',
	CONSULTA: 'http://10.98.1.2/SAGAP_MOBILE/index.php/consultaMobile/index/',
	LAYOUT:'app/views/layout/index.html'
});

app.constant('$ionicLoadingConfig', {
    template: '<i class="fa fa-refresh fa-spin"></i>',
    animation: 'fade-in'
  });


