var app;

app = angular.module("starter", ["ionic"]).run(function($ionicPlatform) {
  return $ionicPlatform.ready(function() {
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      return StatusBar.styleDefault();
    }
  });
}).config(function($stateProvider, $urlRouterProvider, $httpProvider) {
  $stateProvider.state("app", {
    url: "/app",
    abstract: true,
    templateUrl: "templates/menu.html"
  }).state("app.dribble", {
    url: "/dribble",
    views: {
      menuContent: {
        templateUrl: "templates/dribble.html",
        controller: "DribbleCtrl"
      }
    }
  });
  return $urlRouterProvider.otherwise("/app/dribble");
});

app.controller("AppCtrl", function($scope) {});

app.controller("DribbleCtrl", function($scope, $state, $http, $q) {
  var count;
  $scope.imageList = [];
  count = 0;
  $scope.init = function() {
    return $scope.getImages().then((function(res) {
      console.log("Images:", res.shots);
      $scope.imageList = $scope.imageList.concat(res.shots);
      console.log($scope.imageList);
      return $scope.$broadcast('scroll.infiniteScrollComplete');
    }), function(status) {
      return $scope.pageError = status;
    });
  };
  $scope.getImages = function() {
    var defer;
    count++;
    defer = $q.defer();
    $http.jsonp("http://api.dribbble.com/shots/everyone?&page=" + count + "&per_page=5&callback=JSON_CALLBACK").success(function(res) {
      return defer.resolve(res);
    }).error(function(status, err) {
      return defer.reject(status);
    });
    return defer.promise;
  };
  $scope.init();
  return $scope.goToLink = function(url) {
    return $window.open(url, '_blank');
  };
});
