/**
 * created by rohit jaiswal on 9th June 2019
 * **/

var app = angular.module("groceryListApp", ["ngRoute"]);

app.config(function($routeProvider){

    $routeProvider
        .when("/", {
            templateUrl: "views/groceryList.html",
            controller: "HomeController"
        })
        .when("/addItem", {
            templateUrl: "views/addItem.html",
            controller: "GroceryListItemsController"
        })
        .when("/addItem/edit/:id", {
            templateUrl: "views/addItem.html",
            controller: "GroceryListItemsController"
        })

});


app.service("GroceryService", function ($http) {

    var groceryService = {};

    groceryService.groceryItems = [];

    $http.get("data/grocery_data.json").then(function success(response){

         groceryService.groceryItems = response.data;

         for(var item in groceryService.groceryItems){
                groceryService.groceryItems[item].date = new Date(groceryService.groceryItems[item].date);
          }

    }, function error(response){

    });

    groceryService.findById = function (id) {

        for (var item in groceryService.groceryItems){
            if(groceryService.groceryItems[item].id == id){
                return groceryService.groceryItems[item];
            }
        }
    };


    groceryService.getNewId = function () {

        if(groceryService.newId){
            groceryService.newId++;
        }
        else {
            var maxId = _.max(groceryService.groceryItems, function(entry){ return entry.id })
            groceryService.newId = maxId.id + 1;

        }
        return groceryService.newId;
    };

    groceryService.save = function (entry) {

        var updateditem = groceryService.findById(entry.id);
        if (updateditem){
            updateditem.itemName = entry.itemName;
            updateditem.completed = entry.completed;
            updateditem.date = entry.date;
        }
        else{
          entry.id = groceryService.getNewId();
          groceryService.groceryItems.push(entry);
        }
    };

    groceryService.remove = function (entry) {
        var index = groceryService.groceryItems.indexOf(entry);
        groceryService.groceryItems.splice(index, 1);

    };

    groceryService.markCompleted = function (entry) {
       entry.completed = !entry.completed;

    };

    return groceryService;
});

app.controller("HomeController", ["$scope", "GroceryService", function ($scope, GroceryService) {

    $scope.apptitle = "GroceryList";

    $scope.groceryItems = GroceryService.groceryItems;

    $scope.remove = function (item) {
        GroceryService.remove(item);
    };

    $scope.markCompleted = function (item) {
        GroceryService.markCompleted(item);
    };

    $scope.$watch(function() { return GroceryService.groceryItems }, function(groceryItems){

        $scope.groceryItems = groceryItems;
    });

}]);

app.controller("GroceryListItemsController", ["$scope", "$routeParams", "$location", "GroceryService",
    function ($scope, $routeParams, $location, GroceryService) {

    if($routeParams.id){
        $scope.groceryItem = _.clone(GroceryService.findById(parseInt($routeParams.id)));
     }
     else{
        $scope.groceryItem = {id:0, completed:true, itemName:"", date:new Date()};


     }

    
    $scope.save = function () {
        GroceryService.save($scope.groceryItem);
        $location.path("/");
    };

}]);


app.directive("tbGroceryItem", function(){
    return {
        restrict : "E",
        templateUrl: "views/groceryItem.html"
    }
});