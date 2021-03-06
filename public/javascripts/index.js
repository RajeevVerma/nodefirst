'use strict';

// public/core.js
var scotchTodo = angular.module('scotchTodo', ['userServices','ngResource', 'ngRoute']);

scotchTodo.config(function($routeProvider){
    $routeProvider
    
    .when('/', {
       templateUrl: 'views/list.html',
       controller : 'mainController' 
    })
     .when('/detail', {
       templateUrl: 'views/detail.html',
       controller : 'detailController' 
    }); 
});

scotchTodo.controller('mainController', function($scope, $http) {
    $scope.formData = {};

    // when landing on the page, get all todos and show them
    $http.get('/users')
        .success(function(data) {
            $scope.todos = data;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    // when submitting the add form, send the text to the node API
    $scope.createTodo = function() {
        $http.post('/users/todos', $scope.formData)
            .success(function(data) {
                $scope.formData = {}; // clear the form so our user is ready to enter another
                $scope.todos = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

   

});