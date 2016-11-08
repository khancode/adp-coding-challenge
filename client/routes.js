/**
 * Created by khancode on 11/6/2016.
 */

app.config(['$routeProvider', function($routeProvider) {

    $routeProvider

        .when('/', {
            templateUrl: '/components/login/login.html',
            controller: 'loginController'
        })

        .when('/records', {
            templateUrl: '/components/records/records.html',
            controller: 'recordsController'
        });

}]);