/**
 * Created by andyf on 1/22/17.
 */

app.controller('loginController', function($scope, loginFactory, $location){
  $scope.test = "hello world";

  $scope.regUser = function(){
    console.log($scope.reg);
    $scope.error = "";
    $scope.user = {};

    if($scope.reg.password == $scope.reg.password_confirm && $scope.reg.name && $scope.reg.email && $scope.reg.password){
      // call factory method to register user
      loginFactory.register($scope.reg, function(output){
        console.log(output);
        console.log("back from the factory ----> finished");
        $scope.user = output.data;

        if(output.data.error){
          $scope.error = output.data.error;
        } else {
          loginFactory.setUser(output.data, function(){
            $location.url('/wall');
          });
        }

      });
    } else {
      $scope.error = "passwords do no match!";
    }


    // clear input
    $scope.reg = {};
  }

  $scope.loginUser = function(){
    console.log($scope.login);

    // call factory method to log in user
    loginFactory.login($scope.login, function(output){
      console.log(output);
      console.log("back from the factory ----> finished login");

      if(output.data.error){
        $scope.error = output.data.error;
      } else {
        loginFactory.setUser(output.data, function(){
          $location.url('/wall');
        });
      }


    });

    // clear input
    $scope.login = {};
  }


});


app.controller('wallController', function($scope, loginFactory){
  console.log("in the wall controller");
  $scope.user = {};


  loginFactory.getUser(function(data){
    $scope.user = data;
  });




});
