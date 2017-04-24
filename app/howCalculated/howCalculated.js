'use strict';

angular.module('myApp.howCalculated', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/how-it-was-calculated', {
    templateUrl: 'howCalculated/howCalculated.html',
    controller: 'HowCalculatedCtrl'
  });
}])

.controller('HowCalculatedCtrl', [function() {

}]);