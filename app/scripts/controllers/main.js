'use strict';

/**
 * @ngdoc function
 * @name appApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the appApp
 */
angular.module('appApp')
  .controller('MainCtrl', function ($http,$scope) {

    $scope.config = {
      showCreate: false
    };

    $scope.newEmployee = {};


    function getEmployees(){
      $http.get('http://laravel-jwt.app/api/v1/employees')
        .success(function(response) {
          $scope.employees = response.data;
          console.log(response);
        });
    }

    $scope.toggleEdit = function (employee) {
      $scope.employeeProto = angular.copy(employee);
      if(!employee.showEdit){
        employee.showEdit = false;
      }
      angular.forEach($scope.employees, function (employee) {
        employee.showEdit = false;
      });
      employee.showEdit = !employee.showEdit;
    };


    $scope.editEmployee = function (employee, employeeProto) {
      $http.put('http://laravel-jwt.app/api/restricted/employees/' + employee.id, employeeProto)
        .success(function(response) {
          employee.showEdit = false;
          employee.name = response.data.name;
          employee.email = response.data.email;
          employee.contact_number = response.data.contact_number;
          employee.position = response.data.position;
        })
        .error(function (error) {
          console.log(error);
        });
    };


    $scope.deleteEmployees = function(id){
      $http.delete('http://laravel-jwt.app/api/restricted/employees/' + id)
        .success(function(response) {
          $scope.employees = response.data;
          console.log(response);
        })
        .error(function (error) {
          console.log(error);
        });
    };


    $scope.createEmployee = function(newEmployee){
      $http.post('http://laravel-jwt.app/api/restricted/employees', newEmployee)
        .success(function(response) {
          $scope.employees.push(response.data);
          $scope.newEmployee = {};
          console.log(response);
        })
        .error(function (error) {
          console.log(error);
        });
    };
    getEmployees();
  });
