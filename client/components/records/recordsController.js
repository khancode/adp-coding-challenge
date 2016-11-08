/**
 * Created by khancode on 11/6/2016.
 */

app.controller('recordsController', ['$scope', '$http', 'userInfo', '$location', function($scope, $http, userInfo, $location) {

    $scope.employer = userInfo.employer;
    $scope.records = [];
    $scope.gridOpts = {};
    $scope.newEmployee = {employer: $scope.employer};

    $scope.gridOpts.columDefs = [
        { name: 'userId', enableCellEdit: false },
        { name: 'firstName' },
        { name: 'lastName' },
        { name: 'phone' }
    ];

    getRecords();

    $scope.msg = {};
    $scope.gridOpts.onRegisterApi = function(gridApi){
        //set gridApi on scope
        $scope.gridApi = gridApi;
        gridApi.edit.on.afterCellEdit($scope,function(rowEntity, colDef, newValue, oldValue){
            // $scope.msg.lastCellEdited = 'edited row userId:' + rowEntity.userId + ', Column:' + colDef.name + ', newValue:' + newValue + ', oldValue:' + oldValue ;
            // $scope.$apply();

            var data = {};
            if (colDef.name === 'userId') {
                data.oldUserId = oldValue;
                data.userId = newValue;
            }
            // else if (colDef.name === 'firstName') {
            //     console.log('rowEntity.lastName: ', rowEntity.lastName);
            //     data.name = {
            //         first: newValue,
            //         last: rowEntity.lastName
            //     };
            // }
            // else if (colDef.name === 'lastName') {
            //     data.name = {
            //         first: rowEntity.firstName,
            //         last: newValue
            //     }
            // }
            else {
                data.userId = rowEntity.userId;
                data[colDef.name] = newValue;
            }

            $http.put('/api/employees', data)
                .success(function(data, status) {
                    console.log('PUT /api/employees success! :D')
                    console.log(data);
                })
                .error(function(data) {
                    console.log('PUT /api/employees error! :0')
                    console.log(data);
                });
        });
    };

    $scope.deleteSelected = function(){
        var deleteList = [];
        angular.forEach($scope.gridApi.selection.getSelectedRows(), function (data, index) {
            deleteList.push({
                op: "remove",
                userId: data.userId
            });
            $scope.gridOpts.data.splice($scope.gridOpts.data.lastIndexOf(data), 1);
        });

        if (deleteList.length === 0) {
            return;
        }

        $http.patch('/api/employees', deleteList)
            .success(function(data, status) {
                console.log('PATCH /api/employees success! :D')
                console.log('dat data:')
                console.log(data);
            })
            .error(function(data) {
                console.log('PATCH /api/employees failed! :0')
                console.log('dat data:')
                console.log(data);
            });
    };

    $scope.addEmployee = function() {
        var postBody = $scope.newEmployee;

        $scope.clearNewEmployee();

        $http.post('/api/employees', postBody)
            .success(function(data, status) {
                console.log('POST /api/employees success! :D')
                console.log('dat data:')
                console.log(data);

                $scope.gridOpts.data.push(postBody);
            })
            .error(function(data) {
                console.log('POST /api/employees failed! :0')
                console.log('dat data:')
                console.log(data);
            });
    };

    $scope.clearNewEmployee = function() {
        $scope.newEmployee = {employer: $scope.employer};
    };

    function getRecords() {
        var data = {
            employer: $scope.employer
        };

        var config = {
            params: data,
            headers : {'Accept' : 'application/json'}
        };

        $http.get('/api/employees', config)
            .success(function(data, status) {
                console.log('GET /api/employees success! :D')
                console.log('dat data:')
                console.log(data);

                $scope.records = parseEmployeesResponse(data);

                $scope.gridOpts.data = $scope.records;
            })
            .error(function(data) {
                console.log('GET /api/employees error! :0')
                throw data;
            });
    }

    function parseEmployeesResponse(records) {
        var dataList = [];
        for (var i in records) {
            var record = records[i];

            var data = {
                userId: record.userId,
                firstName: record.firstName,
                lastName: record.lastName,
                phone: record.phone
            };

            dataList.push(data);
        }

        return dataList;
    }

    // $scope.goToRecords = function() {
        // if ($scope.playerName.length == 0) {
        //     return;
        // }

        // playerInfo.name = $scope.playerName;
        // $location.path('/records');
    // };

}]);