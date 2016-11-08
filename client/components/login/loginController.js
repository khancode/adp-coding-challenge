/**
 * Created by khancode on 11/6/2016.
 */

app.controller('loginController', ['$scope', '$http', 'userInfo', '$location', function($scope, $http, userInfo, $location) {

    $scope.employer = '';
    $scope.password = '';

    $scope.verifyLogin = function () {
        var data = {
            "employer": $scope.employer,
            "password": $scope.password
        };

        var config = {
            params: data,
            headers : {'Accept' : 'application/json'}
        };

        $http.get('/api/users/verify', config)
            .success(function(data, status) {
                if (data.isAuthenticated) {
                    userInfo.employer = $scope.employer;
                    $location.path('/records');
                }
            })
            .error(function(data) {
                throw data;
            });
    };

}]);