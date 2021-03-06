//inicializamos modulo app
'use strict';
var app = angular.module('app', ['ngRoute','ngSanitize']);

//ngRoute encargado de las redirecciones.

app.config(['$routeProvider', '$locationProvider',
  function ($routeProvider, $locationProvider)
  {
    $routeProvider.otherwise(
    {
      redirectTo: '/'
    })
    .when('/',
    {
      templateUrl: GBL_COFG.urlTemplate('inicial.html')
    })
    .when('/testbbdd',
    {
      templateUrl: GBL_COFG.urlTemplate('testbbdd.html'),
      controller: 'ng-app-controller-bbdd'
    })
    .when('/about',
    {
      templateUrl: GBL_COFG.urlTemplate('about.html'),
      controller: 'ng-app-controller-about'
    })
    
    .when('/buscador',
    {
      templateUrl: GBL_COFG.urlTemplate('buscador.html'),
      controller: 'ng-app-controller-buscador'
    })
    .when('/insertar',
    {
      //templateUrl: GBL_COFG.urlTemplate('buscador.html'),
      controller: 'ng-app-controller-insertar'
    })
    .when('/editar',
    {
      templateUrl: GBL_COFG.urlTemplate('insertar.html'),
      controller: 'ng-app-controller-editar'
     
    })
    .when('/editbbdd',
    {
      templateUrl: GBL_COFG.urlTemplate('editbbdd.html'),
      controller: 'ng-app-controller-editbbdd'
     
    })
    .when('/kirby',
    {
      templateUrl: GBL_COFG.urlTemplate('kirby.html')
   
    });
  }]);

//directiva para cargar y remover la clase de carga para el gif
app.directive('apploading',
['$http', function ($http)
  {
    var loading =
    {
      restrict: 'A',
      link: function (scope, elm, attrs)
      {
        scope.isLoading = function ()
        {
          return $http.pendingRequests.length > 0;
        };

        scope.$watch(scope.isLoading, function (v)
        {
          if (v)
          {
            elm[0].classList.add('appLoading');
          }
          else
          {
            elm[0].classList.remove('appLoading');
          }
        });
      }
    };

    return loading;
  }]);


/**
 *Directiva para editar el valor de las tablas en el buscador. 
 */

app.directive('editableTd', [function() {
	
	  return {
	    restrict: 'A',
	    link: function(scope, element, attrs) {    
	      element.attr('contenteditable', 'true');
	
	      element.bind('blur click change', function() {
	        scope.items[attrs.row][attrs.field] = element.text();
	        scope.$digest();
	     
	        
	      });
	     
	      element.bind('blur keyup change', function() {
	    	  
	    		var check=(document.querySelectorAll(".marcado"));		     
	        	var Row = document.querySelector("#campos");

		      if (scope.items[attrs.row][attrs.field])
		    	  {
		      
		    	  	check[attrs.row].checked=true;
		    	  	scope.$digest(); 
		    	  }
		      });
	      
	      element.bind('click', function(scope, element, attrs) {

	       document.execCommand('click', false, null);
	       
	      });
	  
	     
	    }
	  };
	
	}]);

