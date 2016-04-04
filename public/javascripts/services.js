'use strict';

var userServices = angular.module('userServices',['ngResource']);

userServices.factory('Users', ['$resource', function($resource){
    return $resource('Users/:userId' , {userId: '@id'}, { query: {method:'GET', isArray:true} });
}]);
