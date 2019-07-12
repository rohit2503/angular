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


app.service("GroceryService", function () {

    var groceryService = {};

    groceryService.groceryItems = [

        {id:1, completed:true, itemName:'milk', date: new Date('October 21, 2014')},
        {id:2, completed:true, itemName:'cookies', date: new Date('September 10, 2017')},
        {id:3, completed:true, itemName:'pulses', date: new Date('October 1, 2015')},
        {id:4, completed:true, itemName:'wheat', date: new Date('December 23, 2018')},
        {id:5, completed:true, itemName:'bread', date: new Date('February 02, 2018')},
        {id:6, completed:true, itemName:'butter', date: new Date('March 09, 2006')},
        {id:7, completed:true, itemName:'cheese', date: new Date('January 21, 2014')},
        {id:8, completed:true, itemName:'chocobar', date: new Date('June 11, 2018')},
        {id:9, completed:true, itemName:'shampoo', date: new Date('August 12, 2018')},
        {id:10, completed:true, itemName:'rice', date: new Date('July 1, 2019')},
    ];

    groceryService.findById = function (id) {

        for (var item in groceryService.groceryItems){
            if(groceryService.groceryItems[item].id == id){
                return groceryService.groceryItems[item]
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
        console.log(entry.itemName);
        var index = groceryService.groceryItems.indexOf(entry);
        groceryService.groceryItems.splice(index, 1);

    };

    return groceryService;
});

app.controller("HomeController", ["$scope", "GroceryService", function ($scope, GroceryService) {

    $scope.apptitle = "GroceryList";
    $scope.groceryItems = GroceryService.groceryItems;
    $scope.remove = function (item) {
        GroceryService.remove(item);
    };

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