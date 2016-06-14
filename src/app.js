"use strict";

var module = angular.module('goodsApp', []);

module.controller('mainController', function($scope) {
    $scope.sortType = ''; // set the default sort type
    $scope.sortReverse = false; // set the default sort order
    $scope.searchItem = ''; // set the default search/filter term
    $scope.products = [{
        name: "Товар 1",
        count: 5,
        price: 12000,
        email: "abc@example.com"
    }, {
        name: "Товар 3",
        count: 5,
        price: 12001,
        email: "def@example.com"
    }, {
        name: "Товар 5",
        count: 4,
        price: 12002,
        email: "abc@example.com"
    }, {
        name: "Товар 4",
        count: 7,
        price: 12020,
        email: "ser"
    }, {
        name: "Товар 2",
        count: 7,
        price: 12020,
        email: "tgy"
    }];

    $scope.addRow = function() {
        $scope.products.push({
            'name': $scope.name,
            'email': $scope.email,
            'count': $scope.count,
            'price': $scope.price
        });
        $scope.name = '';
        $scope.email = '';
        $scope.count = '';
        $scope.price = '';
        $('#myModal').modal("hide");
    };


    $scope.modalShown = false;
    $scope.changeModal = function(product) {
        $scope.editProduct = product;
        $scope.modalShown = !$scope.modalShown;
    };
    $scope.modalInfoShown = false;
    $scope.infoModal = function(product) {
        $scope.infoProduct = product;
        $scope.modalInfoShown = !$scope.modalInfoShown;
    };
    $scope.modalDeleteShown = false;
    $scope.deleteModal = function(product) {
        $scope.deleteProduct = product;
        $scope.modalDeleteShown = !$scope.modalDeleteShown;
    };
});

module.directive('nameValidator', function() {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, element, attr, mCtrl) {
            function myValidation(value) {
                if (value != "" && value.length < 16 && /[^\s]/.test(value)) {
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

module.directive('countValidator', function() {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, element, attr, mCtrl) {
            function myValidation(value) {
                if (value > -1 && value != null) {
                    mCtrl.$setValidity('countValidator', true);
                } else {
                    mCtrl.$setValidity('countValidator', false);
                }
                return value;
            }
            mCtrl.$parsers.push(myValidation);
        }
    }
});

module.directive('validateElem', function($filter) {
    return {
        restrict: 'AC',
        link: function(scope, element, attrs) {
            element.val($filter('currency')(scope.amount));

            element.bind('focus', function() {
                element.val(scope.amount);
            });

            element.bind('input', function() {
                scope.amount = element.val();
                scope.$apply();
            });

            element.bind('blur', function() {
                element.val($filter('currency')(scope.amount));
            });
        }
    };
});

module.directive('modal', function($filter) {
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
        replace: true,
        scope: true,
        link: function postLink(scope, element, attrs) {
            scope.title = attrs.title;

            scope.$watch(attrs.visible, function(value) {
                if (value == true) {
                    $(element).modal('show');
                } else
                    $(element).modal('hide');
            });

            $(element).on('shown.bs.modal', function() {
                scope.$apply(function() {
                    scope.$parent[attrs.visible] = true;
                });
            });

            $(element).on('hidden.bs.modal', function() {
                scope.$apply(function() {
                    scope.$parent[attrs.visible] = false;
                });
            });

            //Add/Edit modal open
            $('#modalChange').on("show.bs.modal", function() {
                console.log("Edit" + scope.$parent.editProduct);
                if (scope.$parent.editProduct == null) {
                    scope.title = "Add product";
                } else {
                    scope.title = "Edit product";
                    $("#nameModal").val(scope.$parent.editProduct.name);
                    $("#priceModal").val(scope.$parent.editProduct.price);
                    $("#countModal").val(scope.$parent.editProduct.count);
                    $("#emailModal").val(scope.$parent.editProduct.email);
                }
            });

            //Add/Edit modal hidden      
            $('#modalChange').on("hidden.bs.modal", function() {
                $("#nameModal, #emailModal").val("");
                $("#countModal").val("");
                $("#priceModal").val("");
            });

            // Info modal open
            $("#modalInfo").on("show.bs.modal", function() {
                scope.title = "Info about product";
                $("#nameInfo").text(scope.$parent.infoProduct.name);
                $("#priceInfo").text($filter('currency')(scope.$parent.infoProduct.price));
                $("#countInfo").text(scope.$parent.infoProduct.count);
                $("#emailInfo").text(scope.$parent.infoProduct.email);
            });

            //Delete modal open
            $("#modalDelete").on("show.bs.modal", function() {
                scope.title = "Are you sure?";
                $("#question").text("Are you sure you want to delete product " + scope.$parent.deleteProduct.name + "?");
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
                        console.log("add" + $("#nameModal").val());
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
                        console.log("edit" + $("#nameModal").val());
                    }
                    $('#modalChange').modal("hide");
                    $("#nameModal, #emailModal").val("");
                    $("#countModal").val("");
                    $("#priceModal").val("");
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