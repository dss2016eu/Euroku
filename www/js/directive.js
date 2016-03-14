angular.module('euroku.directives', [])

//Youtube videos directive to show Youtube videos in Ionic Framework
.directive('myYoutube', function($sce) {
  return {
    restrict: 'EA',
    scope: { code:'=' },
    replace: true,
    template: '<div style="height:250px;"><iframe style="overflow:hidden;height:100%;width:100%" width="100%" height="100%" src="{{url}}" frameborder="0" allowfullscreen></iframe></div>',
    link: function (scope) {
        console.log('here');
        scope.$watch('code', function (newVal) {
           if (newVal) {
               scope.url = $sce.trustAsResourceUrl("http://www.youtube.com/embed/" + newVal);
           }
        });
    }
  };
})
.directive('formManager', function () {

  return {
    restrict : 'A',
    controller : function($scope) {

      $scope.$watch('faleComigoForm.$valid', function() {
        console.log("Form validity changed. Now : " + $scope.faleComigoForm.$valid);
      });
    }
  };
})

.directive('compareTo', function () {

  return {
      require: "ngModel",
      scope: {
        otherModelValue: "=compareTo"
      },
      link: function(scope, element, attributes, ngModel) {

        ngModel.$validators.compareTo = function(modelValue) {
          return modelValue == scope.otherModelValue;
        };

        scope.$watch("otherModelValue", function() {
          ngModel.$validate();
        });
      }
    };
  })
.directive('imageonload', function() {
    return {
        restrict: 'A',
        controller: ["$scope", "$rootScope", function($scope, $rootScope) {
            
            
            $scope.test = function(arg) {
                console.log(arg);
            }
        }],
        link: function(scope, element, attrs) {
            element.bind('load', function() {
                console.log('image is loaded');
                console.log(scope.startTimer());
                
            });
        }
    };
})
.directive('dynamic', function ($compile) {
    return {
      restrict: 'A',
      replace: true,

      link: function (scope, ele, attrs) {
        scope.$watch(attrs.dynamic, function(html) {
          ele.html(html);
          $compile(ele.contents())(scope);
        });
      }
    };
  });


/*

.directive('formManager', function() {
  return {
    restrict : 'A',
    controller : function($scope) {

      $scope.$watch('faleComigoForm.$valid', function() {
        console.log("Form validity changed. Now : " + $scope.faleComigoForm.$valid);
      })
    }
  })
.directive('compareTo', function() {
    return {
      require: "ngModel",
      scope: {
        otherModelValue: "=compareTo"
      },
      link: function(scope, element, attributes, ngModel) {

        ngModel.$validators.compareTo = function(modelValue) {
          return modelValue == scope.otherModelValue;
        };

        scope.$watch("otherModelValue", function() {
          ngModel.$validate();
        });
      }
    };
})

*/
