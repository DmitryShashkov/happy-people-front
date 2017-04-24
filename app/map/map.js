'use strict';

angular.module('myApp.map', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/map', {
    templateUrl: 'map/map.html',
    controller: 'MapCtrl'
  });
}])

.controller('MapCtrl', [
    '$scope', '$uibModal', 'countriesService',
    function ($scope, $uibModal, countriesService) {

    $('#map-container').vectorMap({
        map: 'world_mill',
        onRegionClick: function (event, code) {
            var requestedCountry = $scope.countries
                .filter(function (country) {
                    return country['Code'] === code;
                })[0];

            if (!requestedCountry) {
                return console.log('country not found');
            }

            countriesService.getCountryInfo(requestedCountry['Id'])
                .then(function (res) {
                    var countryInfo = res.data;
                    console.log(requestedCountry['Code']);

                    var modalInstance = $uibModal.open({
                        animation: true,
                        templateUrl: 'country-info/country-info.html',
                        controller: 'CountryInfoCtrl',
                        resolve: {
                            countryInfo: function () {
                                return countryInfo;
                            }
                        }
                    });

                    modalInstance.result.then(function () {
                        console.log('resolved');
                    }, function () {
                        console.log('rejected');
                    });
                });
        }
    });

    countriesService.getAllCountries()
        .then(function (res) {
            $scope.countries = res.data;
        });
}]);