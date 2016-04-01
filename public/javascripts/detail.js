/* global scotchTodo */
scotchTodo.controller('detailController', ['Users', '$location', '$scope', function(users, $location, $scope) {
        $scope.message = 'Look! I am an about page.';
        
        var qs = $location.search();
         // delete a todo after checking it
        users.query({userId: qs.id}).$promise.then(function(data) {
                if(data.length > 0)
                $scope.data = data[0];
                console.log($scope.data.address);
            });
            
     
         
    }]);