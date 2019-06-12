angular.module("tutorialCtrlModule", [])

.controller("TutorialCtrl", ["$scope", "Calculations", function ($scope, Calculations) {

    // programming work here

    $scope.tutorialObject = {};
    $scope.tutorialObject.title = "Main Page";
    $scope.tutorialObject.subtitle = "Sub title";

    $scope.tutorialObject.bindOutput = 2

    $scope.tutorialObject.firstname = "Rohit";
    $scope.tutorialObject.lastname = "Jaiswal";

    $scope.twotimes = function () {

        $scope.tutorialObject.bindOutput = Calculations.twotimes($scope.tutorialObject.bindOutput);
        
    }


}])


.factory("Calculations", function () {

    var myvar = [];

    myvar.twotimes = function (a) {

        return a*2;
    };

    return myvar;


})

.directive("welcomemessage",  function() {

    return {

        restrict : "AE",
        template : "<div>Howdy how are you </div>"

    }

})


.controller("TutorialRoute", ["$scope", function ($scope) {

    $scope.routescopeObject = {};
    $scope.routescopeObject.routetutorial = "Route Page";

}]);