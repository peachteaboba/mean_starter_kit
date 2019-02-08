/**
 * Created by peachteaboba on 1/22/17.
 */

// Require Mongoose
var mongoose = require('mongoose');

var bcrypt = require('bcrypt');

// Require the model and save it in a variable
var User = mongoose.model('User');



module.exports = (function() {
    return {
        reg: function(req, res) {
          console.log("In the reg method ---> users controller".cyan);
          console.log(req.body);

          User.findOne({email: req.body.email}, function(err, oneUser){
            if(err){
              console.log("===== error =====".red);
            } else {
              // 1. User was found
              if(oneUser){
                console.log("===== user was found =====".yellow);
                res.json({error: "Email is already registered. Please login instead."});
              } else {
                // 2. No user was found
                console.log("===== user is good to register =====".green);

                var pw = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(8));


                // create the user object and save into database
                var user = new User({name: req.body.name, email: req.body.email, password: pw});
                user.save(function(err){
                  if(err){
                    console.log("===== error when registering =====".red);
                  } else {
                    console.log("===== successfully registered a new user =====".green);
                    res.json(user);
                  }
                });
              }
            }
          });
        },



        login: function(req, res){
          console.log("In the login method ---> users controller".cyan);
          console.log(req.body);

          // find the user with the email
          User.findOne({email: req.body.email}, function(err, oneUser){
            if(err){
              console.log("===== error =====".red);
            } else {
              // 1. User was not found
              if(!oneUser){
                console.log("===== user was not found =====".yellow);
                res.json({error: "Email is not registered. Please register instead."});

              } else {
                // 2. No user found
                console.log("===== checking password =====".green);
                // authenticate password

                if(bcrypt.compareSync(req.body.password, oneUser.password)){
                  console.log("===== successfully logged a user =====".green);
                  res.json(oneUser);
                } else {
                  res.json({error: "Password incorrect"});
                }
              }
            }
          });








        }


    }
})();
