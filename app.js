//MODULES
var wapp = angular.module('wapp',['ngRoute','ngResource']);
wapp.config(function($routeProvider){

    
//ROUTES    
$routeProvider


.when('/',{
      templateUrl:'pages/main.html',
      controller:'mainController'
      })
.when('/Forecast',{
      templateUrl:'pages/second.html',
      controller:'secondController'
      })
    
.when('/Forecast/:days',{
      templateUrl:'pages/second.html',
      controller:'secondController'
    })
        
});

//SERVICES

wapp.service('cityService',function(){
    this.city = "Mumbai";
});



//CONTROLLERS
wapp.controller('mainController',['$scope','cityService' , function($scope,cityService){
    
    
   $scope.city=cityService.city;
   $scope.$watch('city',function(){
       cityService.city=$scope.city;
   }); 
    
    
}]);

wapp.controller('secondController',['$scope','cityService','$resource'  ,'$routeParams'  ,function($scope,cityService,$resource,$routeParams){
    
$scope.city=cityService.city;
                                    
    $scope.days=$routeParams.days || '2'; //This thing is Dope
    $scope.weatherAPI= $resource("https://api.openweathermap.org/data/2.5/forecast?APPID=2f70f26061d1862a597fad64174de0c9",{callback:"JSON_CALLBACK"},{get :{method:"JSONP" }});
    
    $scope.weatherResults=$scope.weatherAPI.get({q:$scope.city ,cnt:$scope.days});
    
    $scope.convertToFarenhit=function(degK){
     return Math.round((1.8 * (degK -273)) + 32)
    
    } 
}]);


//DIRECTIVES

wapp.directive('weatherApp',function(){
    
     return{
         
         restrict:'E',
         templateUrl:'Directives/weatherReport.html',
         replace:true,
         scope:{
          weatherDay: '=',
          convertToStandard:'&'
         }
         
         
         
         
     }
    
})

