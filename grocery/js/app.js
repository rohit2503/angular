/**
 * created by rohit jaiswal on 9th June 2019
 * **/

var app = angular.module("groceryListApp", []);

app.controller("HomeController", ["$scope", function ($scope) {

    $scope.apptitle = "GroceryList";

}]);

app.controller("GroceryListItemsController", ["$scope", function ($scope) {

    $scope.groceryItems = [

        {completed:true, itemName:'milk', date:'2014-10-21'},
        {completed:true, itemName:'cookies', date:'2017-10-01'},
        {completed:true, itemName:'pulses', date:'2015-10-21'},
        {completed:true, itemName:'wheat', date:'2018-10-23'},
        {completed:true, itemName:'bread', date:'2015-02-18'},
        {completed:true, itemName:'butter', date:'2013-03-06'},
        {completed:true, itemName:'cheese', date:'2017-11-19'},
        {completed:true, itemName:'chocobar', date:'2016-06-11'},
        {completed:true, itemName:'shampoo', date:'2018-08-12'},
        {completed:true, itemName:'rice', date:'2019-07-1'},

    ]

}]);
