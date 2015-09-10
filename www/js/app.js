// Ionic Starter App

var example = angular.module('ionicApp', ['ionic'])

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('tabs', {
      url: "/tab",
      abstract: true,
      templateUrl: "templates/tabs.html"
    })
    .state('tabs.home', {
      url: "/home",
      views: {
        'home-tab': {
          templateUrl: "templates/home.html",
          controller: 'HomeTabCtrl'
        }
      }
    })
    .state('tabs.facts', {
      url: "/facts",
      views: {
        'home-tab': {
          templateUrl: "templates/facts.html"
        }
      }
    })
    .state('tabs.facts2', {
      url: "/facts2",
      views: {
        'home-tab': {
          templateUrl: "templates/facts2.html"
        }
      }
    })
    .state('tabs.about', {
      url: "/about",
      views: {
        'about-tab': {
          templateUrl: "templates/about.html"
        }
      }
    })
    .state('tabs.browse', {
      url: "/browse",
      views: {
        'about-tab': {
          templateUrl: "templates/browse.html"
        }
      }
    })
    .state('tabs.contact', {
      url: "/contact",
      views: {
        'contact-tab': {
          templateUrl: "templates/contact.html"
        }
      }
    });


   $urlRouterProvider.otherwise("/tab/home");

})
// the controller determines what will be shown in the view the html part
// it is called Home Tab Controller
/* the controller and view share an object called a scope;
this object is at the core of its amazing two-way data binding.
The controller sets properties on the scope, and the view binds to those properties.
*/
.controller('HomeTabCtrl', function($scope) {
  console.log('HomeTabCtrl');
});

Parse.initialize("HPO14qrXOVv8i6NKQq5UJeGx07IUMDGY0fRhtK4z", "P1JI9V8KsBN88X0uwAfGh5FVngz4VU7Gc3GTWtrX");
Parse.User.enableRevocableSession()

example.controller("ExampleController", function($scope) {

var Post = Parse.Object.extend("Post");

function checkLogin() {
  if (Parse.User.current()){
    console.log("Logged in! "+Parse.User.current().get("username"));
    $("#current-user").html("User: "+Parse.User.current().get("username"));
  } else {
      $("#current-user").html("");
  }
}

checkLogin();

$("#logout").click(function(event) {
  Parse.User.logOut();
  console.log("You are now logged out!");
  checkLogin();
});

$("#login").submit(function(event){
  event.preventDefault();
  // this prevents people from refreshing the browser
  var name = $("#login-name").val();
  var pass = $("#login-password").val();
  //so next we have to send parse the uname and pass
  Parse.User.logIn(name, pass, {
    success: function(user){
      //success passes the user object back with a message
      console.log("You are now logged in!");
      checkLogin();
    }, error: function(user, error){
      console.log("Log in failed!"+error.message);
    }
  });
});

$("#signup").submit(function(event){
  event.preventDefault();

    var name = $("#signup-name").val();
    var pass = $("#signup-password").val();

    var user = new Parse.User();
    user.set("username", name);
    user.set("password", pass);

    user.signUp(null, {
      success: function(user){
        checkLogin();
      }, error: function(user, error){
        console.log("signup error:"+error.message);
      }
    });
  });

function getPosts() {
  var query = new Parse.Query(Post);
  query.find({
    success: function(results){
      var output ="";
      for (var i in results){
          var title = results[i].get("title");
          var content = results[i].get("content");
          output += "<li>";
          output += "<h3>"+title+"</h3>";
          output += "<p>"+content+"</p>";
          output += "</li>";
          //console.log("Title:"+title)
      }
      $("#list-posts").html(output);
    }, error: function(error){
      console.log("Query Error:"+error.message);
    }
  });
}

getPosts();

$("#post-form").submit(function(event){
  event.preventDefault();
    var title = $("#post-title").val();
    var content = $("#post-content").val();

    var newPost = new Post();
    newPost.set("title", title);
    newPost.set("content", content);

    newPost.save({
      success: function(){

      }, error: function(error){
          console.log("Error:" +error.message);
      }
    });
  });
});

example.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        if(window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if(window.StatusBar) {
            StatusBar.styleDefault();
        }
    });
});

example.controller("SliderController", function($scope, $ionicSlideBoxDelegate) {
    $scope.navSlide = function(index) {
        $ionicSlideBoxDelegate.slide(index, 500);
    }
});
