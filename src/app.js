"use strict";

var modal = angular.module('goodsApp', []);

modal.controller('mainController', function($scope) {
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
  $scope.showModal = false;
  //$scope.toggleModal = function() {
  //      $scope.showModal = !$scope.showModal;
  //};
});

modal.directive('modal', function () {
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
      transclude: true,
      replace:true,
      scope:true,
      link: function postLink(scope, element, attrs) {
        scope.title = attrs.title;

        scope.$watch(attrs.visible, function(value){
          if(value == true)
            $(element).modal('show');
          else
            $(element).modal('hide');
        });

        $(element).on('shown.bs.modal', function(){
          scope.$apply(function(){
            scope.$parent[attrs.visible] = true;
          });
        });

        $(element).on('hidden.bs.modal', function(){
          scope.$apply(function(){
            scope.$parent[attrs.visible] = false;
          });
        });
      }
    };
  });



