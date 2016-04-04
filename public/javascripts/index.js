'use strict';

// public/core.js
var scotchTodo = angular.module('scotchTodo', ['userServices', 'authenticationService', 'ngResource', 'ui.router']);

var loginRoute = {
    url: '/',
    views: {
        "viewA": {
            templateUrl: 'views/login.html',
            controller: 'loginController'
        },
        "viewB": {
            templateUrl: 'views/header.html',
            controller: 'loginController'
        }
    }
};

var mainRoute = {
    url: '/main',
    views: {
        "viewA": {
            templateUrl: 'views/list.html',
            controller: 'mainController'
        },
        "viewB": {
            templateUrl: 'views/header.html',
            controller: 'loginController'
        }
    }
};

var detailRoute = {
    url: '/detail',
    views: {
        "viewA": {
            templateUrl: 'views/detail.html',
            controller: 'detailController'
        },
        "viewB": {
            templateUrl: 'views/header.html',
            controller: 'loginController'
        }
    }
};
scotchTodo.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider
        .state('/', loginRoute)
        .state('/main', mainRoute)
        .state('/detail', detailRoute);
});

scotchTodo.controller('loginController', ['authentication', '$scope', '$http', '$location', function(authentication, $scope, $http, $location) {

    $scope.loginSubmit = function() {

        authentication.Login($scope.userName, $scope.password, function() {
            $location.path("/main");
        });

    }
}]);

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