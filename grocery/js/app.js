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
        .when("/addItem/:id", {
            templateUrl: "views/addItem.html",
            controller: "GroceryListItemsController"
        })

});


app.service("GroceryService", function () {

    var groceryService = {};

    groceryService.groceryItems = [

        {id:1, completed:true, itemName:'milk', date:'2014-10-21'},
        {id:2, completed:true, itemName:'cookies', date:'2017-10-01'},
        {id:3, completed:true, itemName:'pulses', date:'2015-10-21'},
        {id:4, completed:true, itemName:'wheat', date:'2018-10-23'},
        {id:5, completed:true, itemName:'bread', date:'2015-02-18'},
        {id:6, completed:true, itemName:'butter', date:'2013-03-06'},
        {id:7, completed:true, itemName:'cheese', date:'2017-11-19'},
        {id:8, completed:true, itemName:'chocobar', date:'2016-06-11'},
        {id:9, completed:true, itemName:'shampoo', date:'2018-08-12'},
        {id:10, completed:true, itemName:'rice', date:'2019-07-1'},
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
        $scope.groceryItem = {id:0, completed:true, itemName:"", date:Date()};


     }

    
    $scope.save = function () {
        GroceryService.save($scope.groceryItem);
        $location.path("/");
    };

}]);
