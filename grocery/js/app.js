/**
 * created by rohit jaiswal on 9th June 2019
 * **/

var app = angular.module("tutorialapp", ["ngRoute", "tutorialCtrlModule"]);


app.config(function ($routeProvider) {

    $routeProvider

        .when("/", {

            templateUrl : "views/tutorialscope.html",
            controller: "TutorialCtrl"

        })

        .when("/tutorialroute", {

            templateUrl : "views/tutorialroute.html",
            controller: "TutorialRoute"
        })

        .otherwise({

            redirect: "/"
        });
    
});