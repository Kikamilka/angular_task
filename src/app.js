"use strict";

var module = angular.module('goodsApp', []);

module.controller('mainController', function($scope) {
    $scope.sortType = 'count'; // set the default sort type
    $scope.sortReverse = false; // set the default sort order
    $scope.searchItem = ''; // set the default search/filter term
    $scope.products = [{
        name: "Товар 1",
        count: 5,
        price: 12000,
        supplier: "abc"
    }, {
        name: "Товар 3",
        count: 5,
        price: 12001,
        supplier: "def"
    }, {
        name: "Товар 5",
        count: 4,
        price: 12002,
        supplier: "abc"
    }, {
        name: "Товар 4",
        count: 7,
        price: 12020,
        supplier: "ser"
    }, {
        name: "Товар 2",
        count: 7,
        price: 12020,
        supplier: "tgy"
    }];

    $scope.addRow = function() {
        $scope.products.push({
            'name': $scope.name,
            'supplier': $scope.supplier,
            'count': $scope.count,
            'price': $scope.price
        });
        $scope.name = '';
        $scope.supplier = '';
        $scope.count = '';
        $scope.price = '';
        $('#myModal').modal("hide");
    };


    $scope.modalShown = false;
    $scope.changeModal = function(product){
    		console.log(product);
    		$scope.editProduct = product;
        $scope.modalShown = !$scope.modalShown;
    };
    $scope.modalInfoShown = false;
    $scope.infoModal = function(product){
    		console.log(product);
    		$scope.infoProduct = product;
        $scope.modalInfoShown = !$scope.modalInfoShown;
    };
    $scope.modalDeleteShown = false;
    $scope.deleteModal = function(product) {
    		$scope.deleteProduct = product;
        $scope.modalDeleteShown = !$scope.modalDeleteShown;
    };
});

/*module.directive('modalDialog', function() {
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
});*/

module.directive('overwriteEmail', function() {
  var EMAIL_REGEXP = /^[a-z0-9!#$%&'*+/=?^_`{|}~.-]+@example\.com$/i;

  return {
    require: '?ngModel',
    link: function(scope, elm, attrs, ctrl) {
      // only apply the validator if ngModel is present and Angular has added the email validator
      if (ctrl && ctrl.$validators.email) {

        // this will overwrite the default Angular email validator
        ctrl.$validators.email = function(modelValue) {
          return ctrl.$isEmpty(modelValue) || EMAIL_REGEXP.test(modelValue);
        };
      }
    }
  };
});

module.directive('nameValidator', function() {
    return {
      restrict: 'A',
      require:  'ngModel',
      link: function (scope, element, attr, mCtrl) {
        function myValidation(value) {
        if (value != "" && value.length < 16) {
          mCtrl.$setValidity('nameValidator', true);
        } else {
          mCtrl.$setValidity('nameValidator', false);
        }
        return value;
      }
      mCtrl.$parsers.push(myValidation);
      }
    }
});

/*module.directive('lengthF', function() {
    return {
        require: 'ngModel',
        link: function(scope, element, attrs, mCtrl) {
            ctrl.$validators.lengthF = function(modelValue, viewValue) {
                if (ctrl.$isEmpty(value)) {
                    // consider empty models to be valid
                    return false;
                }
                if (viewValue.length > 1 && viewValue.length < 15) {
                    return true;
                }
                return false;
            };        }    };}); */

module.directive('content1', function() {
    return {
        require: 'ngModel',
        link: function(scope, element, attr, mCtrl) {
            function myValidation(value) {
                if (value.indexOf("1") > -1) {
                    mCtrl.$setValidity('char1', true);
                } else {
                    mCtrl.$setValidity('char1', false);
                }
                return value;
            }
            mCtrl.$parsers.push(myValidation);
        }
    };
});

module.directive('space', function() {
    return {
        require: 'ngModel',
        link: function(scope, elm, attrs, ctrl) {
            ctrl.$validators.space = function(modelValue, viewValue) {
                if (ctrl.$isEmpty(modelValue)) {
                    // consider empty models to be valid
                    return false;
                }

                if (!viewValue.replace(/\s/g, '')) {
                    // it is valid
                    return true;
                }

                // it is invalid
                return false;
            };
        }
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

module.directive('modal', function ($filter) {
    return {
        template:
        '<div class="modal fade">' + 
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
        if(value == true) {
          $(element).modal('show');
        }
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

      //Add/Edit modal open
      $('#modalEdit').on("show.bs.modal", function () {
        if (scope.$parent.editProduct == null) {
          scope.title = "Add product";
        } else {
          scope.title = "Edit product";
          $("#nameModal").val(scope.$parent.editProduct.name);
          $("#priceModal").val(scope.$parent.editProduct.price);
          $("#countModal").val(scope.$parent.editProduct.count);
          $("#emailModal").val(scope.$parent.editProduct.supplier);
        }
      });

      // Info modal open
      $("#modalInfo").on("show.bs.modal", function () {
        $("#nameInfo").text(scope.$parent.infoProduct.name);
        $("#priceInfo").text($filter('currency')(scope.$parent.infoProduct.price));
        $("#countInfo").text(scope.$parent.infoProduct.count);
        $("#emailInfo").text(scope.$parent.infoProduct.supplier);
      });

      //Delete modal open
      $("#modalDelete").on("show.bs.modal", function () {
        $("#question").text("Are you sure you want to perform " + scope.$parent.deleteProduct.name + "?");
      });

      // Add/Edit product
      $("#doneProd").on("click", function() {
        if ($("#nameModal").val()) {
          if (scope.$parent.editProduct == null) {
            scope.$parent.products.push({
              name: $("#nameModal").val(),
              price: parseFloat($("#priceModal").val(), 10),
              count: parseInt($("#countModal").val(), 10),
              email: $("#emailModal").val()
            });
          } else {
            scope.$parent.products[
            scope.$parent.products
            .indexOf(scope.$parent.editProduct)
            ] = {
              name: $("#nameModal").val(),
              price: parseFloat($("#priceModal").val(), 10),
              count: parseInt($("#countModal").val(), 10),
              email: $("#emailModal").val()
            };
          }
          $('#modalEdit').modal("hide");
          $("#nameModal, #priceModal, #countModal, #emailModal")
          .val("");
        }
      });

      //Delete product
      $("#yesDelete").on("click", function() {
        scope.$parent.products
          .splice(scope.$parent.products
              .indexOf(scope.$parent.deleteProduct), 1);
        $("#modalDelete").modal("hide");
      });
      $("#noDelete").on("click", function() {
        $("#modalDelete").modal("hide");
      });

    } 
  }
});