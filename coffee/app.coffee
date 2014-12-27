app = angular.module("starter", ["ionic"]).run(($ionicPlatform) ->
  $ionicPlatform.ready ->
    cordova.plugins.Keyboard.hideKeyboardAccessoryBar true  if window.cordova and window.cordova.plugins.Keyboard
    StatusBar.styleDefault()  if window.StatusBar

).config(($stateProvider, $urlRouterProvider, $httpProvider) ->
  $stateProvider.state("app",
    url: "/app"
    abstract: true
    templateUrl: "templates/menu.html"
  ).state("app.dribble",
    url: "/dribble"
    views:
      menuContent:
        templateUrl: "templates/dribble.html"
        controller: "DribbleCtrl"
  )

  $urlRouterProvider.otherwise "/app/dribble"
)

