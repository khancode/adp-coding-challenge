/**
 * Created by khancode on 11/6/2016.
 */

app.controller('loginController', ['$scope', '$http', 'userInfo', '$location', function($scope, $http, userInfo, $location) {

    $scope.employer = '';
    $scope.password = '';

    $scope.verifyLogin = function () {
        console.log('employer: ' + $scope.employer);
        console.log('password: ' + $scope.password);

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
                console.log('GET /api/users/verify success! :D')
                console.log('dat data:')
                console.log(data);

                if (data.isAuthenticated) {
                    userInfo.employer = $scope.employer;
                    $location.path('/records');
                }

            })
            .error(function(data) {
                console.log('GET /api/users error! :0')
                throw data;
            });
    };

}]);