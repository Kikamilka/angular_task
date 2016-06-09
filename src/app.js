"use strict";

var module = angular.module('goodsApp', []);

module.controller('mainController', function($scope) {
  $scope.sortType     = 'count'; // set the default sort type
  $scope.sortReverse  = false;  // set the default sort order
  $scope.searchItem   = '';     // set the default search/filter term
  $scope.products = [
  { name: "Товар 1", count: 5, price: 12000, supplier: "abc" },
  { name: "Товар 3", count: 5, price: 12001, supplier: "def" },
  { name: "Товар 5", count: 4, price: 12002, supplier: "abc" },
  { name: "Товар 4", count: 7, price: 12020, supplier: "ser" },
  { name: "Товар 2", count: 7, price: 12020, supplier: "tgy" }
  ];
  $scope.modalShown = false;
  $scope.toggleModal = function() {
  	$scope.modalShown = !$scope.modalShown;
  };
  $scope.modalDeleteShown = false;
  $scope.deleteModal = function() {
  	$scope.modalDeleteShown = !$scope.modalDeleteShown;
  };
});

module.directive('modalDialog', function() {
	return {
		restrict: 'E',
		scope: {
			show: '='
		},
    replace: true, // Replace with the template below
    transclude: true, // we want to insert custom content inside the directive
    link: function(scope, element, attrs) {
    	scope.dialogStyle = {};
    	if (attrs.width)
    		scope.dialogStyle.width = attrs.width;
    	if (attrs.height)
    		scope.dialogStyle.height = attrs.height;
    	scope.hideModal = function() {
    		scope.show = false;
    	};
    },
    template: '<div class="ng-modal" ng-show="show">' + 
    '<div class="ng-modal" ng-backdrop="static">' + 
    '<div class="ng-modal-overlay" ng-click="hideModal()"></div>' +
    '<div class="ng-modal-dialog" ng-style="dialogStyle">' +
    '<div class="ng-modal-close" ng-click="hideModal()">x</div>' +
    '<div class="ng-modal-dialog-content" ng-transclude></div>' +
    '</div>' +
    '</div>'
  };
});

/*module.directive('modal', function () {
	return {
		template: '<div class="modal fade">' + 
		'<div class="modal-dialog">' + 
		'<div class="modal-content">' + 
		'<div class="modal-header">' + 
		'<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' + 
		'<h4 class="modal-title">{{ title }}</h4>' + 
		'</div>' + 
		'<div class="modal-body" ng-transclude></div>' + 
		'</div>' + 
		'</div>' + 
		'</div>',
		restrict: 'E',
		scope: {
			show: '='
		},
    replace: true, // Replace with the template below
    transclude: true, // we want to insert custom content inside the directive

    }
  };
});*/

/*module.directive('modal', function () {
    return {
        restrict: 'EA',
        scope: {
            body: '=modalBody'
            //callbackbutton: '&ngClickLeftButton',
            handler: '=op'
        },
        templateUrl: 'partialmodal.html',
        transclude: true,
        backdrop = "static",
        controller: function ($scope) {
            $scope.handler = 'pop'; 
        },
    };
});*/

