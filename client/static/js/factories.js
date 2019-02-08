/**
 * Created by andyf on 1/22/17.
 */

app.factory('loginFactory', function ($http) {
    var factory = {};

    var user = {};

    // Register method
    factory.register = function(input, callback){
      $http.post('/reg', input).then(function(output){
        console.log("we made it back");
        callback(output);
      });
    }


    // Login method
    factory.login = function(input, callback){
      $http.post('/login', input).then(function(output){
        console.log("we made it back");
        callback(output);
      });
    }

    // Setter for user object
    factory.setUser = function(data, callback){
      user = data;
      callback();
    }

    // Getter for user object
    factory.getUser = function(callback){
      callback(user);
    }




    return factory;
});
