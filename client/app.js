/**
 * Created by khancode on 11/3/2016.
 */

var app = angular.module('employeeRecords', ['ngRoute', 'ui.grid', 'ui.grid.edit', 'ui.grid.selection']);

// app.controller('myController', ['$scope', '$http', function($scope, $http) {
//
//     var arr = [1, 3, 2, 4, 6];
//
//     $scope.dataList = arr;
//
//     $http.post('/employee', {username:'khancode', firstName:'Omar', lastName:'Khan'})
//         .then(function() {
//             console.log('POST /employee success! :D')
//         },
//         function() {
//             console.log('POST /employee error! :0')
//         });
//
// }]);