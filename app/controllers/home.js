var jsonTranslateApp = angular.module('jsonTranslateApp', []);

jsonTranslateApp.controller('homeController', function($scope, $http)
{
    $scope.apikey = "";
    
    $scope.rawJson = "{}";
    
    $scope.$watch("rawJson", function(newValue, oldValue)
    {
        try
        {
           var jsonObject = JSON.parse(newValue);
           
           $scope.objectJson = jsonObject;
        }
        catch(e)
        {
           //console.log(e);
        }
       
    });
    
    $scope.$watch("objectJson", function(newValue, oldValue)
    {
        try
        {
            var rawJson = JSON.stringify(newValue);
            
            $scope.rawJson = rawJson;
        }
        catch(e)
        {
            
        }
    }, true);
    
    $scope.removeElement = function(key)
    {
        delete $scope.objectJson[key];
    };
    
    $scope.lgsrc = "en";
    $scope.lgdest = "fr";
    
    $scope.translateElement = function(key)
    {
        $http({method: "GET", url: "https://www.googleapis.com/language/translate/v2?key=" + $scope.apikey + "&source=" + $scope.lgsrc + "&target=" + $scope.lgdest + "&q=" + $scope.objectJson[key]}).
        success(function(response, status, headers, config)
        {
            $scope.objectJson[key] = response.data.translations[0].translatedText;
            
            console.log("success translate");
        }).
        error(function(data, status, headers, config)
        {
            console.log("error translate");
        });
    };

    
    $scope.test = "valeur par default";
    
    $scope.addNew = function()
    {
       $scope.objectJson[(new Date()).getTime()] = "one value";  
    };
    
    $scope.objectJson = {
        "key" : "value"
    };
});