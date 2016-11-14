smartShop.controller('apiController', function($scope, $http) {
    $http.get('http://localhost:3000/products').
        then(function(response) {
            $scope.products = response.data;
        });
});
